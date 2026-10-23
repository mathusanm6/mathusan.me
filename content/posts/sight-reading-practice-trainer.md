---
title: "Portée: A Staff-Reading Trainer I Built with Claude Code in Half a Day"
date: "2026-10-23"
category: Software Engineering
summary: "A small web app that flashes a note on the staff and times how fast I name it. Built with Claude Code in half a day, to train sheet-music reading 15 minutes a day."
cover: /posts/sight-reading-practice-trainer/cover.png
---

**[Try it in your browser](https://mathusan.me/apps/sight-reading-practice/)** · [Source on GitHub](https://github.com/mathusanm6/Sight-Reading-Practice)

I read sheet music slowly. I can work out a note, but I have to count lines and think, and that is far too slow to play anything in real time. Reading has to become a reflex: see the note, know the name.

That is a drilling problem, and drilling is easy to automate. So I built **Portée** (French for "staff"), a tiny trainer that shows one note on the staff and waits for me to name it.

![Portée showing a note on the staff with a piano keyboard to answer](/posts/sight-reading-practice-trainer/cover.png)

## How it works

A note appears on the staff. I answer by clicking the piano keys or by typing. Then the next note appears.

- **Clefs:** treble, bass, or both at once on a grand staff.
- **Ledger lines:** none, up to 2, or up to 4. This is where I am slowest, so I want to be able to dial it up.
- **Free mode:** a running average of my reaction time, so I can see whether I'm getting faster.
- **Timed mode:** 60 seconds, with a best score saved for each clef and ledger combination.
- **French or English note names:** Do Ré Mi… or C D E…. I think in fixed-do, so I wanted both.
- **Keyboard shortcuts:** the keys line up with the home row, so I can answer without looking at the keyboard.

## The plan: 15 minutes a day

Reading speed comes from repetition, not from long sessions. So the goal is short and boring on purpose:

1. Fifteen minutes, every day.
2. Start on one clef with no ledger lines, and only add difficulty once the average reaction time stops dropping.
3. Finish with a timed round, and try to beat the saved best.

The reaction-time average is the number I care about. If the drill works, it should go down over the weeks.

## Built with Claude Code in half a day

I wrote this with Claude Code in about half a day: the Next.js app, the staff rendering, the two clefs and ledger lines, the two languages, the layout, the dark and light themes, and the deployment to GitHub Pages.

I think this is where AI-assisted coding is most useful: a small tool for a personal need that I would otherwise never have built, because it would have cost me a weekend. A few hours was an easy trade for something I will use every day.

## What's next

I'll report back after a few weeks of daily practice, with the reaction times to show whether it worked. If it does, the next step is reading intervals and short phrases, not just single notes.
