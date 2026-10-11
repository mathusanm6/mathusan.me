---
title: "A Playable Card System in Godot: Curved Hand, Slots and a Discard Pile"
date: "2026-10-08"
category: Game Development
summary: "A deckbuilder-style card system on a standard 52-card deck: a fanned hand, slot docking, drag-to-reorder and a discard pile, playable in your browser."
cover: /posts/godot-card-system-curved-hand/cover.png
---

**[Play it in your browser](https://godot-game-systems.mathusan.me/card-system/)** · [Source on GitHub](https://github.com/mathusanm6/godot-game-systems/tree/main/card-system)

I wanted a card system that feels good to touch before any game rules exist. So this one has no rules: a standard 52-card deck, a hand, slots on the table and a discard pile.

![Screen recording of the card system prototype](/posts/godot-card-system-curved-hand/demo.mp4)

- A **curved hand** of up to 8 cards.
- A **draw pile** and a **discard pile**.
- **Slots**: dock a card, swap it with another, or pull it back out.
- **Drag to reorder** the hand.

## Cards don't handle input, a manager does

Cards, slots and piles only emit signals (`card_hovered`, `drag_started`, …). A single `CardManager` listens to all of them and decides what happens. That matters when cards overlap: several `Area2D`s can be under the cursor at once, so the manager picks the one with the highest `z_index` and, on a tie, the latest in the tree. Without it, hover flickers between cards.

## The curve is three formulas

For a hand of `n` cards, with `u` the card's offset from the center and `norm = u / half_span`:

```gdscript
var spacing = minf(max_card_spacing, max_hand_width / (n - 1))
var pos_x   = hand_center.x + u * spacing
var pos_y   = hand_center.y + norm * norm * arc_height   # parabola
var angle   = minf(card_angle_step_deg, max_angle_spread_deg / (n - 1))
var rot     = deg_to_rad(u * angle)
```

Spacing and angle both *compress* as the hand grows, so 8 cards fan tighter instead of running off screen. Every constant is an `@export`, so tuning the feel never touches the logic.

## Reordering without jitter

While you drag, the card is live-inserted into the hand and the others slide aside. The naive version flickers: when the card sits on the boundary between two slots, the insertion index flips every frame.

The fix is a deadzone. `get_insertion_index_for_position` shifts the thresholds around the card's *current* index by 20 px, so you have to move clearly past the boundary before the order changes.

![Dragging a card over a slot](/posts/godot-card-system-curved-hand/image-2.png)

## Tilt from velocity, perspective from a shader

Two separate effects:

- **Drag tilt:** horizontal mouse velocity becomes a rotation, clamped to 25°, and settles with `1 - exp(-k·dt)`. That form is frame-rate independent, unlike a plain `lerp(a, b, 0.1)`.
- **Hover tilt:** `card_tilt.gdshader` fakes a 3D rotation on a 2D sprite. It remaps UVs with a perspective divide (`denom = cos·cam_dist + p.y·sin`), so the card leans away from the camera with no 3D node.

## Sound does half the work

`CardAudio` keeps a pool of 12 voices with priorities and steals the lowest-priority one when it runs out, so a fast shuffle never cuts off a drop or a discard. Every sound gets random pitch variation, and the discard is pitched *down* (0.88–0.94) so it lands heavier than a normal placement. Same sample, different feel.

![Cards docked in slots next to the discard pile](/posts/godot-card-system-curved-hand/image-3.png)

## Try it

[Open the playable](https://godot-game-systems.mathusan.me/card-system/) (desktop recommended), or read the [source](https://github.com/mathusanm6/godot-game-systems/tree/main/card-system).
