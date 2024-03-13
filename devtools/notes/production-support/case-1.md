# issue 1

when the user hovers a button,  
expected: its tooltip will reasonably be displayed in the fixed(stable) position.  
actual: yet the tooltip keeps shaking

date: Mar 13, 2024

solved: not yet

env: beta

possible cause:

```css
.bp5-overlay {
  /* position:fixed; */
}
```
