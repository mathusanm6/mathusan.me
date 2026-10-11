---
title: "20 Minutes of Boilerplate, Gone: How One AI Skill Turns LeetCode Snippets Into Tested Code"
date: "2026-10-11"
category: Software Engineering
summary: "Paste your solution. Get back a Bazel-built, unit-tested Python and C++ module, and the AI never touches your algorithm."
cover: /posts/ai-skill-leetcode-boilerplate/cover.png
---

On LeetCode, you write code inside a throwaway `class Solution`, hit Submit, and move on.

Keeping a real repository of solutions is different. Mine is unit-tested in Python and C++ and built with Bazel, so every new problem costs another **15–20 minutes of boilerplate**.

The [`new-problem`](https://github.com/mathusanm6/Unit-Tested-Leetcode-Solutions/blob/main/.agents/skills/new-problem/SKILL.md) skill does that work in seconds. You stay the author of the algorithm, and the AI acts as a disciplined build engineer.

---

## Why: Two Ways to Get It Wrong

### By hand: death by boilerplate

For every problem, you:

1. Create a folder and 7 files (`BUILD.bazel`, `config.yml`, `.py`, `_test.py`, `.h`, `.cc`, `_test.cc`).
1. Strip LeetCode's `class Solution` wrapper and `self` arguments to get clean free functions.
1. Write matching parameterized tests in both `pytest` and GoogleTest.
1. Run the Bazel tests, the formatters, the linters, and the README generator.

### With a generic AI: chaos and drift

Tell an AI *"Add problem 88 to my repo"* and it will:

- **Invent things.** It guesses the complexities, or swaps your solution for its own.
- **Play 20 Questions.** It asks *"What's the difficulty?"*, then *"Should I create the files now?"*, one turn at a time.
- **Break conventions.** It keeps `class Solution`, lets the Python and C++ test cases drift apart, or edits `README.md` by hand instead of running the generator.

A skill avoids both problems by giving the AI a strict standard operating procedure (SOP).

---

## What: Anatomy of the Skill

A **skill** is a folder of instructions and templates that the agent loads when it needs them. `new-problem` lives in [`.agents/skills/new-problem/`](https://github.com/mathusanm6/Unit-Tested-Leetcode-Solutions/tree/main/.agents/skills/new-problem) and has three files:

- **[`SKILL.md`](https://github.com/mathusanm6/Unit-Tested-Leetcode-Solutions/blob/main/.agents/skills/new-problem/SKILL.md) holds the rules.** It defines the workflow and 7 "Golden Rules", including:
  - *Never invent data.* You supply the code, the complexities, and the metadata.
  - *Never change the algorithm.* Only mechanical cleanups are allowed.
  - *No needless back-and-forth.* The agent asks for everything missing in one batch, and never asks "Ready to proceed?"
  - *Strict test parity.* Python and C++ run the same cases in the same order.
- **[`references/templates.md`](https://github.com/mathusanm6/Unit-Tested-Leetcode-Solutions/blob/main/.agents/skills/new-problem/references/templates.md) is the blueprint.** It has:
  - exact templates for all 7 files;
  - modern Python 3.14 type hints (`list[int]`, `X | None`);
  - C++20 designated initializers for GoogleTest;
  - handling for data structures like `TreeNode`.
- **[`references/git-workflow.md`](https://github.com/mathusanm6/Unit-Tested-Leetcode-Solutions/blob/main/.agents/skills/new-problem/references/git-workflow.md) is the release process.** It sets the branch naming (`feat-<number>-<PascalCaseTitle>`), the commit format, and the PR template, which the agent uses when you ask it to ship.

---

## How: The Pipeline, Step by Step

Say *"Add a new problem"* and the skill runs this pipeline.

### 0. Silent reconnaissance

Before saying a word, the agent does two things:

- It reads [`config/difficulties.yml`](https://github.com/mathusanm6/Unit-Tested-Leetcode-Solutions/blob/main/config/difficulties.yml) and [`config/tags.yml`](https://github.com/mathusanm6/Unit-Tested-Leetcode-Solutions/blob/main/config/tags.yml) to learn which values are allowed.
- It checks `problems/` to make sure the problem isn't already there.

### 1. One-shot information gathering

The agent needs eight things: number, title, difficulty, tags, Python code, C++ code, test cases, and complexities.

- If you paste all eight, it asks **zero questions**.
- If you forget two, it asks for both **in a single message**.

### 2. Derivation and mechanical cleanup

The agent derives every name itself (`snake_case`, `PascalCase`, URLs). Then it adapts your snippets mechanically, for example:

- It turns `class Solution` methods into free functions.
- It modernizes Python typing, for example `List[int]` → `list[int]`.
- It splits the C++ code into `.h` and `.cc` and adds the missing `#include`s.
- It switches loop indices to `std::size_t`, so `-Wall -Wextra -Wpedantic` passes cleanly.

### 3. Single-source tests

You write the test cases once, in plain text. The agent turns them into two suites:

- [`<snake>_test.py`](https://github.com/mathusanm6/Unit-Tested-Leetcode-Solutions/blob/main/.agents/skills/new-problem/references/templates.md#L47-L70) uses `@pytest.mark.parametrize` with `snake_case` test IDs.
- [`<snake>_test.cc`](https://github.com/mathusanm6/Unit-Tested-Leetcode-Solutions/blob/main/.agents/skills/new-problem/references/templates.md#L93-L131) uses GoogleTest `TEST_P` with `PascalCase` test names.

### 4. Scaffolding

All 7 files land in `problems/<snake>/`:

```text
problems/<snake>/
├── BUILD.bazel       # Bazel build targets
├── config.yml        # Metadata, tags, Big-O complexities
├── <snake>.py        # Clean Python free function
├── <snake>_test.py   # Parameterized pytest suite
├── <snake>.h         # C++ header
├── <snake>.cc        # C++ implementation
└── <snake>_test.cc   # Parameterized GoogleTest suite
```

### 5. Verification and self-healing

Next, the agent runs your CI toolchain locally to prove the files work. It fixes anything that fails along the way.

1. **`bazel test //problems/<snake>:test`** builds and runs both test suites.
1. **`./scripts/format.sh` and `./scripts/lint.sh`** format the code and run static analysis.
1. **`bazel run //scripts:generate_readme` and `update_badges`** add the problem to the README table and increment the badges.
1. **`git diff --exit-code`** confirms that the formatting will pass GitHub Actions.

### 6. Summary and optional PR

You get a short summary: the files created, the mechanical changes made to your code, and the test results.

If you ask, the agent also creates the branch, commits, pushes, and opens a formatted pull request.

---

## The Takeaway

> **Good AI skills are about constraints, not just capabilities.**

`new-problem` works because it tells the AI what *not* to do, not just which files to create:

- Don't invent solutions.
- Don't touch the algorithm.
- Don't ask permission at every step.
- Don't let the Python and C++ tests drift apart.

Encode your engineering standards in a skill, and one prompt turns LeetCode scratch code into a tested, multi-language library.
