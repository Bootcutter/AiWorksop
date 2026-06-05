const API_BASE = '/api';

/**
 * Fetches all products from the API.
 * @returns {Promise<Array>} Resolves to the product array.
 */
async function fetchProducts() {
  const response = await fetch(`${API_BASE}/products`);

  if (!response.ok) {
    const problem = await response.json().catch(() => null);
    const detail = problem?.detail ?? `HTTP ${response.status} ${response.statusText}`;
    throw new Error(detail);
  }

  return response.json();
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
 * Entry point — fetches products and renders them into the grid.
 */
async function init() {
  const grid   = document.getElementById('product-grid');
  const errEl  = document.getElementById('error-message');

  showSkeletons(grid);

  try {
    const products = await fetchProducts();

    grid.innerHTML = '';
    grid.setAttribute('aria-busy', 'false');

    if (products.length === 0) {
      grid.innerHTML = '<li class="product-card"><p>No products found.</p></li>';
      return;
    }

    const fragment = document.createDocumentFragment();
    products.forEach(p => fragment.appendChild(createProductCard(p)));
    grid.appendChild(fragment);
  } catch (err) {
    grid.innerHTML = '';
    grid.setAttribute('aria-busy', 'false');
    errEl.textContent = `Could not load products: ${err.message}`;
    errEl.hidden = false;
    console.error('[Products] fetch failed', err);
  }
}

init();
