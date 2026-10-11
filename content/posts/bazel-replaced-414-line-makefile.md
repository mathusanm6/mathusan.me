---
title: "I Deleted a 414-Line Makefile. Bazel Replaced It With 3 Lines."
date: "2026-10-10"
category: Software Engineering
summary: "My LeetCode repo outgrew Make. Here's what broke, and how Bazel fixed each piece: hermetic dependencies, real caching, and a 3-line BUILD file."
cover: /posts/bazel-replaced-414-line-makefile/cover.png
---

My LeetCode repo started simple: C++ and Python solutions, each with unit tests. Then it grew.

By commit [`23d0a5d`](https://github.com/mathusanm6/Unit-Tested-Leetcode-Solutions/commit/23d0a5d667098e92abc010ecc0561b219ee2d1a5), building it took a **414-line Makefile** plus **300+ lines of GitHub Actions YAML**, held together with bash, `git diff` tricks and OS-specific workarounds.

So I deleted the Makefile and moved to Bazel. Here's what broke with Make, and how Bazel fixed each piece.

## 1. Make doesn't manage dependencies. It hopes.

My C++ tests need GoogleTest. My Python tests need pytest and PyYAML. Make just runs shell commands and assumes all of that is already installed.

So my Makefile went hunting:

- **macOS:** `brew --prefix googletest`, and hope Homebrew put it there.
- **Linux:** `/usr/local/include/gtest`, then `/usr/include/gtest`, then `pkg-config`.
- **CI:** `apt-get update`, clone GoogleTest, `cmake`, `make`, `sudo make install`. On every single run.

It got bad enough that I wrote a 40-line `make debug-gtest` target just to figure out why linking failed.

With Bazel, `MODULE.bazel` pins exactly what the project needs:

```python
bazel_dep(name = "rules_cc", version = "0.2.22")
bazel_dep(name = "googletest", version = "1.18.0.bcr.1")
bazel_dep(name = "rules_python", version = "1.7.0")
```

Run `bazel test //...` and Bazel fetches GoogleTest, a Python 3.14 interpreter and the pip packages locked in `requirements_lock.txt`. Same result on my Mac, on Ubuntu, on a bare CI runner. Zero setup.

That's what **hermetic** means: the build is sealed off from whatever happens to be installed on the machine.

## 2. Make rebuilt everything. Every time.

Make can track file timestamps. Mine didn't, because my test targets were `.PHONY` loops over every problem folder:

```bash
for dir in $(PROBLEM_DIRS); do \
    $(CXX) $(CXXFLAGS) ... -o $$dir/test_runner $$dir/*.cc; \
    cd $$dir && ./test_runner; \
    rm -f $$dir/test_runner; \
done
```

Compile. Run. Delete the binary. Repeat.

Edit one line in `two_sum.cc` and `make test:all` recompiled and re-ran **all 50 problems**, one after another.

To keep CI bearable, I wrote 168 lines of bash for C++ and 140 for Python: `git diff` piped through `grep`, `cut` and `sed`, trying to guess whether `common/` or a single problem had changed.

Bazel doesn't guess. It knows the dependency graph:

- **First run:** everything builds and tests in parallel.
- **Nothing changed:** every result comes straight from cache: `(cached) PASSED`.
- **Edit `two_sum.cc`:** only `two_sum` rebuilds and reruns.
- **Edit `common/trees/treenode.h`:** only the problems that declare `extra_cc_deps = ["//common/trees"]` rerun. `two_sum` stays cached.

All that `git diff` bash collapsed into a 20-line workflow whose real work is one command:

```bash
bazel test --test_tag_filters=cc //problems/...
```

## 3. From shell soup to a 3-line BUILD file

Bash inside Make recipes is its own special pain. Escaping `$$dir`. Converting kebab-case to snake_case. Propagating exit codes by hand (commit [`776aa6d`](https://github.com/mathusanm6/Unit-Tested-Leetcode-Solutions/commit/776aa6ddb4872419432ddb4aa7bd29dbd107de5a): *"fix: make test didn't return error on exit"*). Scrubbing `.pyc`, `.dSYM` and stray `test_runner` binaries out of my source folders.

Bazel is declarative: I say *what* a folder is, not *how* to build it.

Every problem in the repo has the same layout: `<name>.cc`, `<name>.h`, `<name>_test.cc`, `<name>.py`, `<name>_test.py`. So I wrote one macro, `leetcode_problem`, in `problems/defs.bzl`. Adding a problem now looks like this:

```python
load("//problems:defs.bzl", "leetcode_problem")

leetcode_problem()
```

That one call gives me:

- `:cc_test`: the C++ library and its GoogleTest target
- `:py_test`: the Python library and its pytest target
- `:test`: both, as one suite

Everything builds in a sandbox, so nothing leaks into the source tree. `make clean` is gone because there's nothing left to clean.

## 4. Not everything belongs in the build system

My Makefile was a junk drawer: compile, test, format, lint, install git hooks. When I split it up, I asked one question per task: does it need a dependency graph?

- **Yes → Bazel.** Building, testing, and the Python tools (`generate_readme`, `update_badges`). That's where caching and isolation pay off.
- **No → a plain script.** Formatting and linting now live in `scripts/format.sh` and `scripts/lint.sh`.

Bazel is a great build system. It's an overkill task runner.

## Make vs. Bazel, at a glance

|  | **Make** | **Bazel** |
| --- | --- | --- |
| Dependencies | Hope they're installed and the paths match | Pinned versions, downloaded automatically |
| Test runs | Rebuild and rerun everything, one by one | Parallel, sandboxed, cached |
| Change in `common/` | CI retests every problem | Only the problems that depend on it |
| CI | 300+ lines of bash and a manual GoogleTest build | `bazel test --test_tag_filters=cc //problems/...` |
| New problem | Match the wildcards and the kebab-case converter | A 3-line `BUILD.bazel` |

## When to switch

Make is great for a small, single-language project with no external dependencies. Mine stopped being that the moment I mixed C++ and Python, shared code across folders, and wanted identical results on macOS and Linux CI.

That's where Bazel earns its complexity. For me, it replaced hundreds of lines of brittle shell with a build I actually trust.
