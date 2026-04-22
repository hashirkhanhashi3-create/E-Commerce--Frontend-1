/* =============================================
   LUXE E-COMMERCE — script.js
   Full featured: cart, wishlist sidebar, filter,
   sort, collections nav, smooth scroll, active nav
   ============================================= */

'use strict';

/* ═══════════════════════════════════════
   PRODUCT DATA
═══════════════════════════════════════ */
const PRODUCTS = [
  {
    id: 1,
    name: 'Silk Wrap Blazer',
    category: 'clothing',
    price: 249,
    originalPrice: null,
    emoji: '🧥',
    description: 'Fluid Japanese silk blend with a relaxed structured silhouette.',
    rating: 4.8,
    reviews: 124,
    badge: 'new',
  },
  {
    id: 2,
    name: 'Camel Wool Coat',
    category: 'clothing',
    price: 389,
    originalPrice: 520,
    emoji: '🪶',
    description: 'Pure virgin wool. Timeless cut. Exceptional warmth.',
    rating: 4.9,
    reviews: 88,
    badge: 'sale',
  },
  {
    id: 3,
    name: 'Merino Ribbed Sweater',
    category: 'clothing',
    price: 145,
    originalPrice: null,
    emoji: '🧶',
    description: 'Extra-fine merino for breathable, all-season layering.',
    rating: 4.7,
    reviews: 201,
    badge: null,
  },
  {
    id: 4,
    name: 'Gold Sculptural Ring',
    category: 'accessories',
    price: 98,
    originalPrice: null,
    emoji: '💍',
    description: '18K gold-plated brass. Hand-formed by local artisans.',
    rating: 4.6,
    reviews: 53,
    badge: 'new',
  },
  {
    id: 5,
    name: 'Tortoise Shell Shades',
    category: 'accessories',
    price: 175,
    originalPrice: 230,
    emoji: '🕶️',
    description: 'UV400 polarized lenses with acetate frame.',
    rating: 4.8,
    reviews: 77,
    badge: 'sale',
  },
  {
    id: 6,
    name: 'Suede Chelsea Boots',
    category: 'footwear',
    price: 320,
    originalPrice: null,
    emoji: '👢',
    description: 'Butter-soft suede upper with crepe rubber sole.',
    rating: 4.9,
    reviews: 156,
    badge: 'hot',
  },
  {
    id: 7,
    name: 'Leather Derby Shoes',
    category: 'footwear',
    price: 285,
    originalPrice: 340,
    emoji: '👞',
    description: 'Full-grain calfskin. Goodyear welt construction.',
    rating: 4.7,
    reviews: 99,
    badge: 'sale',
  },
  {
    id: 8,
    name: 'Minimalist Sneakers',
    category: 'footwear',
    price: 195,
    originalPrice: null,
    emoji: '👟',
    description: 'Clean canvas upper, vulcanized rubber sole. Icon status.',
    rating: 4.5,
    reviews: 310,
    badge: null,
  },
  {
    id: 9,
    name: 'Saddle Leather Tote',
    category: 'bags',
    price: 420,
    originalPrice: null,
    emoji: '👜',
    description: 'Vegetable-tanned Italian leather that ages beautifully.',
    rating: 5.0,
    reviews: 42,
    badge: 'new',
  },
  {
    id: 10,
    name: 'Woven Raffia Clutch',
    category: 'bags',
    price: 130,
    originalPrice: 160,
    emoji: '👝',
    description: 'Artisan hand-woven raffia with sterling clasp.',
    rating: 4.6,
    reviews: 65,
    badge: 'sale',
  },
  {
    id: 11,
    name: 'Canvas Weekend Bag',
    category: 'bags',
    price: 210,
    originalPrice: null,
    emoji: '🎒',
    description: 'Heavyweight waxed canvas. Built to last a lifetime.',
    rating: 4.8,
    reviews: 188,
    badge: 'hot',
  },
  {
    id: 12,
    name: 'Linen Wide-Leg Trousers',
    category: 'clothing',
    price: 165,
    originalPrice: null,
    emoji: '👔',
    description: 'Premium Belgian linen for effortless warm-weather dressing.',
    rating: 4.7,
    reviews: 142,
    badge: null,
  },
];

/* ═══════════════════════════════════════
   STATE
═══════════════════════════════════════ */
let cart     = loadFromStorage('luxe_cart', []);
let wishlist = new Set(loadFromStorage('luxe_wishlist', []));
let activeFilter = 'all';
let activeSort   = 'default';

/* ─── Safe localStorage helpers ─── */
function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_e) {
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (_e) {
    // Storage might be full or disabled — fail silently
  }
}

/* ═══════════════════════════════════════
   DOM REFERENCES
═══════════════════════════════════════ */
const $ = (id) => document.getElementById(id);

const productGrid       = $('productGrid');
const cartSidebar       = $('cartSidebar');
const cartOverlay       = $('cartOverlay');
const cartToggle        = $('cartToggle');
const cartClose         = $('cartClose');
const cartItemsEl       = $('cartItems');
const cartCountEl       = $('cartCount');
const cartEmpty         = $('cartEmpty');
const cartFooter        = $('cartFooter');
const cartSubtotal      = $('cartSubtotal');
const cartTotal         = $('cartTotal');
const checkoutBtn       = $('checkoutBtn');
const clearCartBtn      = $('clearCartBtn');
const toastEl           = $('toast');
const toastMsg          = $('toastMsg');
const noResults         = $('noResults');
const sortSelect        = $('sortSelect');
const modalOverlay      = $('modalOverlay');
const modalClose        = $('modalClose');
const modalOrderId      = $('modalOrderId');
const modalBtn          = $('modalBtn');
const hamburger         = $('hamburger');
const mobileNav         = $('mobileNav');
const navbar            = $('navbar');

// Wishlist DOM
const wishlistSidebar   = $('wishlistSidebar');
const wishlistOverlay   = $('wishlistOverlay');
const wishlistToggle    = $('wishlistToggle');
const wishlistClose     = $('wishlistClose');
const wishlistItemsEl   = $('wishlistItems');
const wishlistCountEl   = $('wishlistCount');
const wishlistEmpty     = $('wishlistEmpty');
const wishlistFooter    = $('wishlistFooter');
const addAllToCartBtn   = $('addAllToCartBtn');
const clearWishlistBtn  = $('clearWishlistBtn');

/* ═══════════════════════════════════════
   PRODUCT RENDERING
═══════════════════════════════════════ */
function getFilteredSorted() {
  let list = activeFilter === 'all'
    ? [...PRODUCTS]
    : PRODUCTS.filter(p => p.category === activeFilter);

  if (activeSort === 'low')  list.sort((a, b) => a.price - b.price);
  if (activeSort === 'high') list.sort((a, b) => b.price - a.price);
  if (activeSort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));

  return list;
}

function generateStars(rating) {
  const full  = Math.floor(rating);
  const half  = (rating % 1) >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function renderProducts() {
  const list = getFilteredSorted();
  productGrid.innerHTML = '';

  if (list.length === 0) {
    noResults.classList.remove('hidden');
    return;
  }
  noResults.classList.add('hidden');

  const fragment = document.createDocumentFragment();

  list.forEach((p, i) => {
    const isLiked = wishlist.has(p.id);
    const badgeHTML = p.badge
      ? `<span class="product-badge badge-${p.badge}" aria-label="${p.badge}">${p.badge}</span>` : '';
    const originalPriceHTML = p.originalPrice
      ? `<span class="price-original" aria-label="Original price $${p.originalPrice}">$${p.originalPrice}</span>` : '';
    const stars = generateStars(p.rating);

    const card = document.createElement('article');
    card.className = 'product-card';
    card.style.animationDelay = `${Math.min(i * 0.06, 0.5)}s`;
    card.dataset.id = p.id;
    card.setAttribute('role', 'listitem');

    card.innerHTML = `
      <div class="product-img-wrap">
        <div class="product-emoji" aria-hidden="true">${p.emoji}</div>
        ${badgeHTML}
        <button class="product-wishlist ${isLiked ? 'liked' : ''}"
                data-id="${p.id}"
                aria-label="${isLiked ? 'Remove from wishlist' : 'Add to wishlist'}: ${p.name}"
                aria-pressed="${isLiked}">
          <svg viewBox="0 0 24 24" fill="${isLiked ? 'currentColor' : 'none'}"
               stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>
      </div>
      <div class="product-info">
        <span class="product-category">${p.category}</span>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.description}</p>
        <div class="product-rating" aria-label="Rating: ${p.rating} out of 5, ${p.reviews} reviews">
          <span class="stars" aria-hidden="true">${stars}</span>
          <span class="rating-count">(${p.reviews})</span>
        </div>
        <div class="product-footer">
          <div class="price-block">
            <span class="price" aria-label="Price: $${p.price}">$${p.price}</span>
            ${originalPriceHTML}
          </div>
          <button class="add-to-cart-btn" data-id="${p.id}" aria-label="Add ${p.name} to cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            Add
          </button>
        </div>
      </div>
    `;

    fragment.appendChild(card);
  });

  productGrid.appendChild(fragment);
}

/* ═══════════════════════════════════════
   CART — LOGIC
═══════════════════════════════════════ */
function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }

  saveToStorage('luxe_cart', cart);
  updateCartUI();
  showToast(`${product.name} added to cart`);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveToStorage('luxe_cart', cart);
  updateCartUI();
  renderCartItems();
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }
  saveToStorage('luxe_cart', cart);
  updateCartUI();
  renderCartItems();
}

function clearCart() {
  cart = [];
  saveToStorage('luxe_cart', cart);
  updateCartUI();
  renderCartItems();
}

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
}

function getCartCount() {
  return cart.reduce((sum, i) => sum + i.qty, 0);
}

function updateCartUI() {
  const count = getCartCount();
  cartCountEl.textContent = count;
  cartCountEl.classList.toggle('visible', count > 0);
  cartToggle.setAttribute('aria-label', `Open cart (${count} items)`);

  const total = getCartTotal();
  cartSubtotal.textContent = `$${total.toFixed(2)}`;
  cartTotal.textContent    = `$${total.toFixed(2)}`;

  const isEmpty = cart.length === 0;
  cartEmpty.classList.toggle('hidden', !isEmpty);
  cartFooter.style.display = isEmpty ? 'none' : 'flex';
}

function renderCartItems() {
  cartItemsEl.innerHTML = '';

  if (cart.length === 0) {
    cartEmpty.classList.remove('hidden');
    cartFooter.style.display = 'none';
    return;
  }

  cartEmpty.classList.add('hidden');
  cartFooter.style.display = 'flex';

  const fragment = document.createDocumentFragment();

  cart.forEach(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return;

    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <div class="cart-item-emoji" aria-hidden="true">${product.emoji}</div>
      <div class="cart-item-details">
        <div class="cart-item-name">${product.name}</div>
        <div class="cart-item-price">$${(product.price * item.qty).toFixed(2)}</div>
      </div>
      <div class="cart-item-controls">
        <div class="qty-controls" role="group" aria-label="Quantity for ${product.name}">
          <button class="qty-btn" data-action="dec" data-id="${item.id}"
                  aria-label="Decrease quantity">−</button>
          <span class="qty-value" aria-live="polite">${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-id="${item.id}"
                  aria-label="Increase quantity">+</button>
        </div>
        <button class="remove-btn" data-id="${item.id}"
                aria-label="Remove ${product.name} from cart">Remove</button>
      </div>
    `;
    fragment.appendChild(el);
  });

  cartItemsEl.appendChild(fragment);
}

/* ═══════════════════════════════════════
   CART — OPEN / CLOSE
═══════════════════════════════════════ */
function openCart() {
  // Close wishlist if open
  if (wishlistSidebar.classList.contains('open')) closeWishlist();

  renderCartItems();
  updateCartUI();
  cartSidebar.classList.add('open');
  cartSidebar.setAttribute('aria-hidden', 'false');
  cartOverlay.classList.add('active');
  cartOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  cartClose.focus();
}

function closeCart() {
  cartSidebar.classList.remove('open');
  cartSidebar.setAttribute('aria-hidden', 'true');
  cartOverlay.classList.remove('active');
  cartOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  cartToggle.focus();
}

/* ═══════════════════════════════════════
   TOAST
═══════════════════════════════════════ */
let toastTimer;
function showToast(message) {
  toastMsg.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2800);
}

/* ═══════════════════════════════════════
   WISHLIST — LOGIC
═══════════════════════════════════════ */
function toggleWishlist(id) {
  const wasLiked = wishlist.has(id);
  if (wasLiked) {
    wishlist.delete(id);
    const p = PRODUCTS.find(x => x.id === id);
    if (p) showToast(`${p.name} removed from wishlist`);
  } else {
    wishlist.add(id);
    const p = PRODUCTS.find(x => x.id === id);
    if (p) showToast(`${p.name} added to wishlist ♥`);
  }
  saveToStorage('luxe_wishlist', [...wishlist]);
  updateWishlistUI();

  // Update the heart button on the product card
  const btn = productGrid.querySelector(`.product-wishlist[data-id="${id}"]`);
  if (btn) {
    const nowLiked = wishlist.has(id);
    btn.classList.toggle('liked', nowLiked);
    btn.setAttribute('aria-pressed', String(nowLiked));
    btn.setAttribute('aria-label',
      `${nowLiked ? 'Remove from' : 'Add to'} wishlist: ${PRODUCTS.find(p => p.id === id)?.name}`);
    const svgPath = btn.querySelector('path');
    if (svgPath) svgPath.setAttribute('fill', nowLiked ? 'currentColor' : 'none');
  }

  // Re-render wishlist items if sidebar is open
  if (wishlistSidebar.classList.contains('open')) {
    renderWishlistItems();
  }
}

function updateWishlistUI() {
  const count = wishlist.size;
  wishlistCountEl.textContent = count;
  wishlistCountEl.classList.toggle('visible', count > 0);
  wishlistToggle.setAttribute('aria-label', `Open wishlist (${count} items)`);
  wishlistToggle.classList.toggle('has-items', count > 0);
}

function renderWishlistItems() {
  wishlistItemsEl.innerHTML = '';

  if (wishlist.size === 0) {
    wishlistEmpty.classList.remove('hidden');
    wishlistFooter.style.display = 'none';
    return;
  }

  wishlistEmpty.classList.add('hidden');
  wishlistFooter.style.display = 'flex';

  const fragment = document.createDocumentFragment();

  wishlist.forEach(id => {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    const el = document.createElement('div');
    el.className = 'wishlist-item';
    el.innerHTML = `
      <div class="wishlist-item-emoji" aria-hidden="true">${product.emoji}</div>
      <div class="wishlist-item-details">
        <div class="wishlist-item-name">${product.name}</div>
        <div class="wishlist-item-price">$${product.price.toFixed(2)}</div>
      </div>
      <div class="wishlist-item-controls">
        <button class="wishlist-add-btn" data-id="${product.id}"
                aria-label="Add ${product.name} to cart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          Add
        </button>
        <button class="remove-btn" data-id="${product.id}" data-source="wishlist"
                aria-label="Remove ${product.name} from wishlist">Remove</button>
      </div>
    `;
    fragment.appendChild(el);
  });

  wishlistItemsEl.appendChild(fragment);
}

/* ═══════════════════════════════════════
   WISHLIST — OPEN / CLOSE
═══════════════════════════════════════ */
function openWishlist() {
  // Close cart if open
  if (cartSidebar.classList.contains('open')) closeCart();

  renderWishlistItems();
  updateWishlistUI();
  wishlistSidebar.classList.add('open');
  wishlistSidebar.setAttribute('aria-hidden', 'false');
  wishlistOverlay.classList.add('active');
  wishlistOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  wishlistClose.focus();
}

function closeWishlist() {
  wishlistSidebar.classList.remove('open');
  wishlistSidebar.setAttribute('aria-hidden', 'true');
  wishlistOverlay.classList.remove('active');
  wishlistOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  wishlistToggle.focus();
}

function addAllWishlistToCart() {
  if (wishlist.size === 0) return;
  let count = 0;
  wishlist.forEach(id => {
    addToCart(id);
    count++;
  });
  showToast(`${count} item${count > 1 ? 's' : ''} added to cart`);
  closeWishlist();
  // Small delay then open cart for seamless UX
  setTimeout(openCart, 350);
}

function clearWishlist() {
  // Remove liked state from all product cards
  wishlist.forEach(id => {
    const btn = productGrid.querySelector(`.product-wishlist[data-id="${id}"]`);
    if (btn) {
      btn.classList.remove('liked');
      btn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('aria-label', `Add to wishlist: ${PRODUCTS.find(p => p.id === id)?.name}`);
      const svgPath = btn.querySelector('path');
      if (svgPath) svgPath.setAttribute('fill', 'none');
    }
  });
  wishlist.clear();
  saveToStorage('luxe_wishlist', []);
  updateWishlistUI();
  renderWishlistItems();
}

/* ═══════════════════════════════════════
   CHECKOUT MODAL
═══════════════════════════════════════ */
function handleCheckout() {
  if (cart.length === 0) return;
  closeCart();
  const orderId = 'LXE-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  modalOrderId.textContent = 'Order #' + orderId;
  modalOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  modalBtn.focus();
}

function closeModal() {
  modalOverlay.classList.add('hidden');
  document.body.style.overflow = '';
  clearCart();
}

/* ═══════════════════════════════════════
   FILTER & SORT
═══════════════════════════════════════ */
function setFilter(value) {
  activeFilter = value;
  document.querySelectorAll('.pill').forEach(p => {
    const isActive = p.dataset.filter === value;
    p.classList.toggle('active', isActive);
    p.setAttribute('aria-pressed', String(isActive));
  });
  renderProducts();
}

/* ═══════════════════════════════════════
   MOBILE NAVIGATION
═══════════════════════════════════════ */
function openMobileNav() {
  hamburger.classList.add('open');
  mobileNav.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
}

function closeMobileNav() {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

function toggleMobileNav() {
  if (mobileNav.classList.contains('open')) {
    closeMobileNav();
  } else {
    openMobileNav();
  }
}

/* ═══════════════════════════════════════
   ACTIVE NAV HIGHLIGHTING (Scroll Spy)
═══════════════════════════════════════ */
const sections = ['home', 'collections', 'shop', 'about'];

function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  let current = 'home';

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollY) current = id;
  });

  const sectionToNav = {
    home: 'shop',
    collections: 'collections',
    shop: 'shop',
    about: 'about',
  };
  const activeNav = sectionToNav[current] || 'shop';

  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.section === activeNav);
  });
}

/* ═══════════════════════════════════════
   NAVBAR SCROLL EFFECT
═══════════════════════════════════════ */
function handleNavbarScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}

/* ═══════════════════════════════════════
   COLLECTIONS → SHOP FILTER NAV
═══════════════════════════════════════ */
function setupCollectionCards() {
  document.querySelectorAll('.collection-card').forEach(card => {
    const handler = () => {
      const filter = card.dataset.filter;
      if (!filter) return;
      setFilter(filter);
      const shopSection = document.getElementById('shop');
      if (shopSection) {
        const offset = shopSection.offsetTop - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    };
    card.addEventListener('click', handler);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handler();
      }
    });
  });
}

/* ═══════════════════════════════════════
   SMOOTH SCROLL FOR ALL ANCHOR LINKS
═══════════════════════════════════════ */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      closeMobileNav();
      const navHeight = navbar.offsetHeight || 68;
      const top = target.offsetTop - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ═══════════════════════════════════════
   EVENT LISTENERS
═══════════════════════════════════════ */

// Product grid — delegated click
productGrid.addEventListener('click', e => {
  const addBtn  = e.target.closest('.add-to-cart-btn');
  const wishBtn = e.target.closest('.product-wishlist');
  if (addBtn)  addToCart(Number(addBtn.dataset.id));
  if (wishBtn) toggleWishlist(Number(wishBtn.dataset.id));
});

// Cart items — delegated click
cartItemsEl.addEventListener('click', e => {
  const qtyBtn    = e.target.closest('.qty-btn');
  const removeBtn = e.target.closest('.remove-btn');
  if (qtyBtn) {
    updateQty(Number(qtyBtn.dataset.id), qtyBtn.dataset.action === 'inc' ? 1 : -1);
  }
  if (removeBtn) {
    removeFromCart(Number(removeBtn.dataset.id));
  }
});

// Wishlist items — delegated click
wishlistItemsEl.addEventListener('click', e => {
  const addBtn    = e.target.closest('.wishlist-add-btn');
  const removeBtn = e.target.closest('.remove-btn[data-source="wishlist"]');
  if (addBtn) {
    addToCart(Number(addBtn.dataset.id));
  }
  if (removeBtn) {
    toggleWishlist(Number(removeBtn.dataset.id));
  }
});

// Filter pills
document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', () => setFilter(pill.dataset.filter));
});

// Sort
sortSelect.addEventListener('change', () => {
  activeSort = sortSelect.value;
  renderProducts();
});

// Cart open / close
cartToggle.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Wishlist open / close
wishlistToggle.addEventListener('click', openWishlist);
wishlistClose.addEventListener('click', closeWishlist);
wishlistOverlay.addEventListener('click', closeWishlist);

// Wishlist actions
addAllToCartBtn.addEventListener('click', addAllWishlistToCart);
clearWishlistBtn.addEventListener('click', clearWishlist);

// Checkout
checkoutBtn.addEventListener('click', handleCheckout);
clearCartBtn.addEventListener('click', clearCart);

// Modal
modalClose.addEventListener('click', closeModal);
modalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});

// Mobile hamburger
hamburger.addEventListener('click', toggleMobileNav);

// Close mobile nav when a link is clicked
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', closeMobileNav);
});

// Close mobile nav on outside click
document.addEventListener('click', e => {
  if (mobileNav.classList.contains('open') &&
      !hamburger.contains(e.target) &&
      !mobileNav.contains(e.target)) {
    closeMobileNav();
  }
});

// Keyboard: Escape closes cart, wishlist or modal
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (!modalOverlay.classList.contains('hidden')) {
    closeModal();
  } else if (cartSidebar.classList.contains('open')) {
    closeCart();
  } else if (wishlistSidebar.classList.contains('open')) {
    closeWishlist();
  }
});

// Scroll events (throttled)
let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      handleNavbarScroll();
      updateActiveNav();
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}, { passive: true });

/* ═══════════════════════════════════════
   INIT
═══════════════════════════════════════ */
function init() {
  renderProducts();
  updateCartUI();
  updateWishlistUI();
  setupCollectionCards();
  setupSmoothScroll();
  handleNavbarScroll();
  updateActiveNav();
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
