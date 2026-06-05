// When served locally by the .NET app, use a relative path.
// When served from GitHub Pages, the API is still running on localhost.
const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? '/api'
  : 'http://localhost:5090/api';

/**
 * Fetches products from the API, optionally filtered by a search query.
 * All callers must go through this function — do not construct URLs elsewhere.
 * @param {string} [query] - Optional search term; omit or pass empty string for all products.
 * @returns {Promise<Array>}
 */
async function fetchProducts(query) {
  const url = query && query.trim()
    ? `${API_BASE}/products/search?q=${encodeURIComponent(query.trim())}`
    : `${API_BASE}/products`;

  const response = await fetch(url);

  if (!response.ok) {
    const problem = await response.json().catch(() => null);
    const detail = problem?.detail ?? `HTTP ${response.status} ${response.statusText}`;
    throw new Error(detail);
  }

  return response.json();
}

/**
 * Returns a debounced version of fn, delaying execution by wait ms.
 * @param {Function} fn
 * @param {number} wait
 * @returns {Function}
 */
function debounce(fn, wait) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

/**
 * Renders a single product as a <li> card element.
 * @param {object} product
 * @returns {HTMLElement}
 */
function createProductCard(product) {
  const formatter = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });

  const li = document.createElement('li');
  li.className = 'product-card';
  li.setAttribute('role', 'listitem');

  li.innerHTML = `
    <span class="product-card__category">${escapeHtml(product.category)}</span>
    <h2 class="product-card__name">${escapeHtml(product.name)}</h2>
    <p class="product-card__description">${escapeHtml(product.description)}</p>
    <p class="product-card__price">${formatter.format(product.price)}</p>
  `;

  return li;
}

/**
 * Shows skeleton placeholder cards while loading.
 * @param {HTMLElement} grid
 * @param {number} count
 */
function showSkeletons(grid, count = 5) {
  grid.innerHTML = Array.from(
    { length: count },
    () => `<li class="product-card skeleton" role="listitem" aria-label="Loading…"></li>`
  ).join('');
}

/**
 * Escapes a string for safe insertion into HTML.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Single pipeline for fetching and rendering products.
 * All controls (search, future filters) must call this — never fetch directly.
 * @param {string} [query]
 */
async function applyFiltersAndRender(query) {
  const grid    = document.getElementById('product-grid');
  const errEl   = document.getElementById('error-message');
  const countEl = document.getElementById('result-count');

  errEl.hidden = true;
  grid.setAttribute('aria-busy', 'true');
  showSkeletons(grid);

  try {
    const products = await fetchProducts(query);

    grid.innerHTML = '';
    grid.setAttribute('aria-busy', 'false');

    if (products.length === 0) {
      const term = query && query.trim() ? query.trim() : '';
      countEl.textContent = term
        ? `No products match your search for "${escapeHtml(term)}"`
        : 'No products found.';
      return;
    }

    countEl.textContent = `Showing ${products.length} product${products.length === 1 ? '' : 's'}`;

    const fragment = document.createDocumentFragment();
    products.forEach(p => fragment.appendChild(createProductCard(p)));
    grid.appendChild(fragment);
  } catch (err) {
    grid.innerHTML = '';
    grid.setAttribute('aria-busy', 'false');
    errEl.textContent = `Could not load products: ${err.message}`;
    errEl.hidden = false;
    countEl.textContent = '';
    console.error('[Products] fetch failed', err);
  }
}

/**
 * Entry point.
 */
function init() {
  const searchInput = document.getElementById('search-input');

  const onSearch = debounce((e) => {
    applyFiltersAndRender(e.target.value);
  }, 200);

  searchInput.addEventListener('input', onSearch);

  applyFiltersAndRender();
}

init();
