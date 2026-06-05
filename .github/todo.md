# Frontend Improvement Backlog

Improvements identified during the CLEAR brief evaluation on 2026-06-05.
Implement in order — each item builds on the previous.

**Constraint:** No API changes until further notice. All filtering and sorting is client-side.

---

## 1 — Live search bar + result count
**Status:** not started

- Text input above the grid, debounced 200ms
- Filters cards client-side across `name`, `description`, and `category` fields (case-insensitive)
- Result count line above grid: "Showing 12 of 48 products" / "No products match your search"
- Structured so the fetch call can be swapped from client-side to `GET /api/products?q=...` in one line when the API is ready
- Accessibility: `role="search"`, `<label>` for the input, `aria-live` on the count

---

## 2 — Category filter pills
**Status:** not started  
**Depends on:** #1 (shares the same `applyFiltersAndRender()` function)

- Pills auto-generated from unique categories in the API response — no hardcoding
- "All" pill resets the category filter
- Active pill has a distinct visual state (not just colour — also underline or bold for contrast accessibility)
- Search and category filters apply simultaneously (AND logic)

---

## 3 — Sort control
**Status:** not started  
**Depends on:** #1

- `<select>` dropdown with options: A–Z (default), Z–A, Price: low → high, Price: high → low
- Sorts the in-memory filtered array and re-renders — no network call
- Default: A–Z by name (agreed 2026-06-05 — more intuitive for a catalogue than API insertion order)

---

## 4 — Paginated render ("Load more" button)
**Status:** not started  
**Depends on:** #1, #2, #3

- Render 12 cards per page
- "Load more" button appended below the grid, hidden when all results are visible
- Button updates the result count: "Showing 12 of 48 products"
- Chosen over infinite scroll for accessibility and testability (keyboard users can reliably reach the button; the position is predictable)

---

## 5 — Empty state and zero-result feedback
**Status:** not started  
**Depends on:** #1, #2 (triggered by the filter function)

- When filters produce zero results: show an illustrated or icon-led empty state instead of a blank grid
- Message must be specific: "No products in Electronics match 'thunderbolt'" — not a generic "No results"
- "Clear filters" link resets search + category simultaneously
- Distinct from the API error state (network failure vs. valid-but-empty filter result)
