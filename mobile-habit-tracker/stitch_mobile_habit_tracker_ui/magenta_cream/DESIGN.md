# Design System Document: The Editorial Ritual

## 1. Overview & Creative North Star
**Creative North Star: "The Curated Ritual"**

This design system rejects the "utility-first" aesthetic of standard productivity apps. Instead, it treats habit formation as a high-end editorial experience—akin to a bespoke digital journal or a luxury wellness magazine. We move away from rigid, boxed grids in favor of **Organic Asymmetry** and **Tonal Depth**.

The goal is to make the user feel like they are "curating" their life rather than "managing" tasks. This is achieved through generous whitespace (negative space as a luxury), sophisticated overlapping elements, and a focus on high-contrast magenta accents against a warm, paper-like cream foundation.

---

## 2. Colors & The Tonal Philosophy

The palette is rooted in warmth and tactile comfort, using deep berry tones to drive focus and intent.

### The Palette Logic
- **Foundation:** The `surface` (#fbf9f3) and `surface_container` series mimic high-quality cardstock.
- **The Pulse:** `primary` (#92004c) and `accent` (#F10080) are reserved strictly for momentum: active habits, "done" states, and primary calls to action.
- **The Success State:** `tertiary` (#00561a) is used only for completion celebrations to ensure it feels like a reward, not a default.

### The "No-Line" Rule
**Explicit Instruction:** You are prohibited from using 1px solid borders to define sections. Layout boundaries must be created through background color shifts.
- To separate a section, place a `surface_container_low` element against a `surface` background.
- If a container requires further nesting, move to `surface_container_high`. 
- Structural integrity is maintained through alignment and white space, never through "boxes."

### Signature Textures & Glassmorphism
To elevate the "gamified" elements beyond generic mobile UI, use **Glassmorphism** for floating elements (like FABs or Modals). 
- Use semi-transparent surface colors with a `backdrop-filter: blur(12px)`.
- Apply a subtle gradient to CTAs transitioning from `primary` (#92004c) to `primary_container` (#be0065). This adds a "soulful" depth that flat hex codes lack.

---

## 3. Typography: The Editorial Voice

We use a high-contrast typographic scale to guide the eye. The pairing of Poppins and Inter creates a balance between "Character" and "Function."

- **Headings (Poppins, Semi-Bold 600):** These are our "Editorial Statements." Use `display-lg` and `headline-lg` with tight letter-spacing (-2%) to create a bold, authoritative presence.
- **Body & Labels (Inter, 400-500):** Designed for maximum readability. Use `body-md` for habit descriptions and `label-sm` (all caps, +5% letter-spacing) for category chips to create a sophisticated, "tagged" look.

**Hierarchy Tip:** Never let a heading and a body font sit at the same visual weight. If the heading is large and bold, the body text should be significantly lighter and smaller to provide "breathing room."

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are too "software-heavy." We use **Tonal Layering** to create a physical sense of stack.

### The Layering Principle
Think of the UI as sheets of fine paper. 
1. **The Desk:** `surface` (The base background).
2. **The Folder:** `surface_container_low` (A large section or list area).
3. **The Card:** `surface_container_lowest` (The individual habit card). 

### Ambient Shadows
Shadows should only be used on "Floating" elements (FABs and Modals). 
- **Shadow Specs:** Blur: 32px, Spread: -4px, Opacity: 6%. 
- **Shadow Tint:** Use a tinted shadow based on `on_surface` (#1b1c18) rather than pure black to maintain the warm, organic feel.

### The "Ghost Border" Fallback
If accessibility requirements demand a border, use the **Ghost Border**: `outline_variant` at 15% opacity. It should be felt, not seen.

---

## 5. Components

### Cards
- **Construction:** Use `surface_container_lowest` for the card body. 
- **Rounding:** `xl` (1.5rem / 24px) for a soft, premium feel. 
- **Rule:** No dividers. Use `body-sm` vertical spacing (12px-16px) to separate content within the card.

### Floating Action Button (FAB)
- **Styling:** Circular (`full` rounding). 
- **Color:** `primary_container` with `on_primary` icon. 
- **Elevation:** Apply the Ambient Shadow spec. The FAB should feel like it is hovering 1 inch above the screen.

### Progress Bars
- **Design:** Ultra-minimal. The "track" should be `surface_container_highest` with only 4px height. The "progress" is `primary` with a subtle glow (2px blur) to make it feel like an active, living energy.

### Category Chips
- **Styling:** Pill-shaped (`full` rounding). 
- **State:** Unselected chips use `surface_variant` with `on_surface_variant` text. Selected chips transition to `secondary` with `on_secondary` text.

### Habit Toggles
- **Interaction:** Avoid the standard iOS/Android toggle. Use a "Tonal Switch": A soft-rect container where the "Active" state is a `primary_fixed` pill that slides behind the text labels, creating a tactile, mechanical feel.

---

## 6. Do’s and Don’ts

### Do:
- **Do** use intentional asymmetry. For example, left-align headlines while right-aligning progress percentages to create a dynamic visual path.
- **Do** allow elements to overlap slightly (e.g., a floating chip overlapping the edge of a card) to break the "grid" feel.
- **Do** use the Success Green (`tertiary`) sparingly. It is a reward, not a utility.

### Don’t:
- **Don’t** use pure black #000000. Use `primary_fixed_variant` for the darkest tones to maintain the plum/berry undertone.
- **Don’t** use 1px dividers to separate list items. Use 24px of whitespace or a `surface_container` background shift.
- **Don’t** cram icons everywhere. Let the typography and color communicate the hierarchy first; icons are purely supportive.

---