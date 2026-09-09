# Design Critique Skill

## Purpose

The most important skill. Before accepting any significant design change,
run the complete critique process. The agent must be comfortable removing
its own previous work.

---

## Critique Process (Mandatory)

### Before Implementation

1. **Inspect** the current implementation
   - Read the code
   - View in browser
   - Test interactions
   - Test responsive
   - Test reduced motion

2. **Understand** the intended experience
   - What problem does this solve?
   - Who is it for?
   - What should they feel/understand/do?

3. **Identify Strengths**
   - What works?
   - What should be preserved?
   - What patterns are successful?

4. **Identify Weaknesses**
   - What confuses?
   - What's visually weak?
   - What's technically fragile?
   - What's inaccessible?
   - What's slow?

5. **Identify Unnecessary Elements**
   - What can be removed?
   - What duplicates another element?
   - What adds noise?
   - What serves ego not user?

6. **Identify Inconsistencies**
   - Visual (color, spacing, type, radius)
   - Interaction (hover, focus, timing)
   - Motion (easing, duration, purpose)
   - Content (tone, terminology, hierarchy)

7. **Compare Against Design Language**
   - Does it use design tokens?
   - Does it follow typography scale?
   - Does it respect spacing rhythm?
   - Does it match component patterns?
   - Does it support the visual identity?

8. **Evaluate Hierarchy**
   - Clear primary/secondary/tertiary?
   - Does eye know where to go?
   - Is the most important thing most visible?

9. **Evaluate Interaction**
   - Affordance clear?
   - Feedback immediate?
   - States complete?
   - Keyboard accessible?
   - Touch friendly?

10. **Evaluate Motion**
    - Purpose clear?
    - Enhances static design?
    - Respects reduced motion?
    - Performant?

11. **Evaluate Accessibility**
    - Semantic HTML?
    - Focus visible?
    - Contrast sufficient?
    - Screen reader tested?
    - Reduced motion works?

12. **Evaluate Responsive**
    - Mobile composition intentional?
    - Touch targets sufficient?
    - Hierarchy preserved?
    - Performance acceptable?

13. **Evaluate Performance**
    - Frame budget met?
    - No layout thrashing?
    - Minimal hydration?
    - Assets optimized?

### After Implementation

14. **Implement** the change

15. **Inspect** the result
    - Same checks as 1-12
    - Compare before/after

16. **Critique** the result again
    - Did it improve?
    - Did it regress anything?
    - Is it complete?

17. **Refine**
    - Iterate until standards met
    - Remove if not improving

18. **Only then declare completion**

---

## Critique Questions (Quick Reference)

### Visual
- Does this look professionally designed?
- Does it look intentional?
- Is there visual rhythm?
- Does it feel coherent?
- Does every element earn its existence?

### Interaction
- Can I tell what's interactive?
- Does feedback feel immediate?
- Are states complete?
- Is keyboard navigation smooth?

### Motion
- Why is this moving?
- What does the motion communicate?
- Does it respect reduced motion?
- Is it performant?

### Content
- Is the hierarchy clear?
- Is the language precise?
- Is there evidence over claims?
- Is the tone appropriate?

### Technical
- Semantic HTML?
- No unnecessary dependencies?
- Performance budget met?
- Accessible?

---

## Permission to Remove

The agent MUST be comfortable:
- Reverting its own changes
- Removing features it previously added
- Simplifying what it made complex
- Admitting "this didn't work"

**Red flag**: Defending work because "I spent time on it."

---

## Conflict Resolution

When skills conflict:

1. **Design Director** — Final authority on visual system
2. **Taste** — Veto on visual quality
3. **Accessibility** — Veto on a11y regression
4. **Performance** — Veto on perf regression
5. **Frontend Quality** — Veto on unnecessary complexity

Design Director + Taste = Final on aesthetic decisions.
Accessibility + Performance = Non-negotiable floors.

---

## Critique Template (Use for Every Change)

```
## Change: [What]

### Before Critique
- Strengths preserved:
- Weaknesses addressed:
- Unnecessary removed:
- Inconsistencies fixed:

### Design Language Check
- Tokens used: Y/N
- Type scale: Y/N
- Spacing rhythm: Y/N
- Component patterns: Y/N

### Hierarchy: Clear / Confused
### Interaction: Complete / Gaps
### Motion: Purposeful / Decorative
### Accessibility: Pass / Fail
### Responsive: Intentional / Shrunk
### Performance: Budget met / Exceeded

### Decision: Proceed / Revise / Abandon
```