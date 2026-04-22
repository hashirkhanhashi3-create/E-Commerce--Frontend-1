# LUXE — Premium E-Commerce Store

![LUXE Store](https://img.shields.io/badge/LUXE-Premium%20Store-c8a96e?style=for-the-badge&labelColor=0f0e0d)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-All%20Devices-5cbb8a?style=for-the-badge)

> A fully responsive, client-ready luxury e-commerce front-end built with pure HTML, CSS, and vanilla JavaScript. No frameworks. No dependencies. Just clean, fast, production-quality code.

---

## Table of Contents

- [Overview](#overview)
- [Live Preview](#live-preview)
- [Features](#features)
- [File Structure](#file-structure)
- [Pages & Sections](#pages--sections)
- [Product Catalogue](#product-catalogue)
- [Cart System](#cart-system)
- [Wishlist System](#wishlist-system)
- [Filter & Sort](#filter--sort)
- [Responsive Breakpoints](#responsive-breakpoints)
- [Accessibility](#accessibility)
- [Browser Support](#browser-support)
- [Customisation Guide](#customisation-guide)
- [How to Run](#how-to-run)
- [Known Limitations](#known-limitations)
- [Credits](#credits)

---

## Overview

**LUXE** is a dark-themed, luxury e-commerce storefront built entirely with vanilla HTML, CSS, and JavaScript — no build tools, no frameworks, no external dependencies beyond Google Fonts. It is designed to be handed off directly to a client or deployed as a static site.

The design language is minimal and editorial: deep dark backgrounds, warm gold accents, serif display typography paired with a clean sans-serif body font, and smooth micro-interactions throughout. Everything from the sticky filter bar to the animated floating cards in the About section has been crafted to feel polished and premium.

---

## Live Preview

To preview the site locally, open `index.html` directly in any modern browser. No server or build step is required.

```bash
# Option 1 — open directly
open index.html

# Option 2 — serve with VS Code Live Server extension
# Right-click index.html → "Open with Live Server"

# Option 3 — Python simple server
python3 -m http.server 8000
# Then visit http://localhost:8000
```

---

## Features

### Core Shopping Features
| Feature | Description |
|---|---|
| 🛒 **Cart Sidebar** | Slide-in cart with quantity controls, item removal, subtotal, and checkout flow |
| ♥ **Wishlist Sidebar** | Save items, view them in a dedicated panel, add all to cart in one click |
| 🔍 **Category Filter** | Filter products by All, Clothing, Accessories, Footwear, or Bags |
| ↕ **Sort** | Sort by Featured, Price Low→High, Price High→Low, or Name A–Z |
| ✅ **Checkout Modal** | Order confirmation dialog with a generated order ID |
| 💾 **Persistence** | Cart and wishlist survive page refresh via `localStorage` |

### UI & Experience Features
| Feature | Description |
|---|---|
| 📱 **Fully Responsive** | Tested at 420px, 640px, 900px, 1100px, and 1440px+ |
| 🍔 **Mobile Navigation** | Hamburger menu with animated open/close transition |
| 🔔 **Toast Notifications** | Non-blocking feedback for cart adds, wishlist changes |
| 📜 **Smooth Scroll** | All anchor links scroll smoothly with navbar offset correction |
| 👁 **Scroll Spy** | Active nav link updates automatically as the user scrolls |
| 🎨 **Sticky Filter Bar** | Filter bar sticks below the navbar while scrolling the shop |
| ✨ **Card Animations** | Staggered fade-in on product cards, hover lift effects |
| 🏷 **Product Badges** | NEW, SALE, and HOT labels on relevant products |
| ⌨️ **Keyboard Navigation** | Escape closes sidebars/modals; collection cards respond to Enter/Space |

---

## File Structure

```
luxe-store/
│
├── index.html        # Main HTML document — all sections and markup
├── style.css         # All styles including CSS variables, layout, components, responsive
├── script.js         # All JavaScript — state, rendering, cart, wishlist, events
└── README.md         # This file
```

All three files are self-contained. There is no build process, no `node_modules`, no compiled assets.

---

## Pages & Sections

The site is a single-page application (SPA) with smooth-scroll navigation between sections.

### 1. Navbar (`#navbar`)
- Fixed to the top of the viewport at all times
- Contains: logo, desktop nav links, wishlist button (with live count badge), cart button (with live count badge), hamburger menu (mobile only)
- Adds a `scrolled` class and drop shadow after 20px of scroll
- Desktop links hidden below 900px; hamburger shown instead

### 2. Hero (`#home`)
- Full-viewport height section
- Animated headline, eyebrow label, CTA button, and secondary text link
- Three animated decorative circles (hidden on mobile for performance)
- Stats bar: 12+ items, 4.8★ average rating, Free Shipping

### 3. Collections (`#collections`)
- Four clickable collection cards: Clothing, Accessories, Footwear, Bags
- Each card has an emoji visual area with hover scale and overlay animation
- Clicking a card filters the shop section and scrolls to it automatically
- Grid: 4 columns → 2 columns → 1 column across breakpoints

### 4. Shop (`#shop`)
- Sticky filter bar with category pill buttons and a sort dropdown
- Product grid with auto-fill columns, responsive down to 1 column
- Each product card: emoji image, badge, wishlist heart, category, name, description, star rating, price (with optional original/sale price), Add to Cart button

### 5. About (`#about`)
- Brand story text with values list (Ethically Sourced, Free Shipping, 30-Day Returns)
- Animated floating product cards (visible on desktop)
- Rotating "Est. 2020" badge
- Visual hidden on mobile to keep the layout clean

### 6. Footer
- Brand name and tagline
- Three navigation columns: Navigate, Legal, Support
- Bottom bar with copyright and trust badges (Secure Checkout, Free Shipping, 30-Day Returns)

---

## Product Catalogue

12 products across 4 categories, defined in the `PRODUCTS` array in `script.js`.

| # | Name | Category | Price | Badge |
|---|---|---|---|---|
| 1 | Silk Wrap Blazer | Clothing | $249 | NEW |
| 2 | Camel Wool Coat | Clothing | $389 ~~$520~~ | SALE |
| 3 | Merino Ribbed Sweater | Clothing | $145 | — |
| 4 | Gold Sculptural Ring | Accessories | $98 | NEW |
| 5 | Tortoise Shell Shades | Accessories | $175 ~~$230~~ | SALE |
| 6 | Suede Chelsea Boots | Footwear | $320 | HOT |
| 7 | Leather Derby Shoes | Footwear | $285 ~~$340~~ | SALE |
| 8 | Minimalist Sneakers | Footwear | $195 | — |
| 9 | Saddle Leather Tote | Bags | $420 | NEW |
| 10 | Woven Raffia Clutch | Bags | $130 ~~$160~~ | SALE |
| 11 | Canvas Weekend Bag | Bags | $210 | HOT |
| 12 | Linen Wide-Leg Trousers | Clothing | $165 | — |

### Adding a New Product

Open `script.js` and add an object to the `PRODUCTS` array:

```js
{
  id: 13,                              // Must be unique
  name: 'Your Product Name',
  category: 'clothing',               // clothing | accessories | footwear | bags
  price: 199,
  originalPrice: 250,                 // null if no sale price
  emoji: '🧣',                        // Emoji used as product image
  description: 'Short product description.',
  rating: 4.7,                        // 0.0 – 5.0
  reviews: 80,
  badge: 'new',                       // 'new' | 'sale' | 'hot' | null
}
```

---

## Cart System

The cart is managed entirely in JavaScript with `localStorage` persistence.

### How It Works

1. Clicking **Add** on any product card calls `addToCart(id)`
2. If the product is already in the cart, its quantity increments by 1
3. The cart count badge on the navbar button updates immediately
4. Clicking the cart icon opens the cart sidebar
5. Each cart item shows: emoji, name, total line price, quantity controls (− and +), and a Remove link
6. The footer displays Subtotal, Shipping (always Free), and Total
7. **Proceed to Checkout** triggers the order confirmation modal
8. **Clear Cart** empties the cart entirely

### localStorage Keys
| Key | Value |
|---|---|
| `luxe_cart` | JSON array of `{ id: number, qty: number }` objects |
| `luxe_wishlist` | JSON array of product IDs (numbers) |

---

## Wishlist System

### How It Works

1. Clicking the heart icon ♥ on any product card toggles it in/out of the wishlist
2. A filled red heart and red border indicates the item is saved
3. The wishlist button in the navbar shows a red count badge when items are saved
4. Clicking the navbar heart opens the **Wishlist Sidebar**
5. Each wishlist item shows: emoji, name, price, **Add to Cart** button, and a Remove link
6. **Add All to Cart** adds every wishlist item to the cart, closes the wishlist, then opens the cart
7. **Clear Wishlist** removes all items and resets all heart icons on the product grid
8. The wishlist state is saved to `localStorage` and persists on page refresh

### Mutual Exclusivity
The cart and wishlist sidebars cannot be open simultaneously. Opening one automatically closes the other.

---

## Filter & Sort

### Filter Pills
Located in the sticky bar below the navbar. Options:

- **All** — shows all 12 products (default)
- **Clothing** — 4 products
- **Accessories** — 2 products
- **Footwear** — 3 products
- **Bags** — 3 products

Clicking a Collection card on the Collections section also triggers the filter and scrolls to the shop automatically.

### Sort Dropdown
| Option | Behaviour |
|---|---|
| Sort: Featured | Original order as defined in `PRODUCTS` array |
| Price: Low → High | Ascending by `price` |
| Price: High → Low | Descending by `price` |
| Name: A–Z | Alphabetical by `name` |

Filter and sort state are independent and compose — e.g., you can filter to Bags and sort by price simultaneously.

---

## Responsive Breakpoints

| Breakpoint | Key Changes |
|---|---|
| **≥ 1100px** | Full layout: 4-col collections, 2-col about grid, all decorative elements visible |
| **≤ 1100px** | Collections grid → 2 columns; About section → single column |
| **≤ 900px** | Desktop nav links hidden; hamburger shown; hero decorative circles hidden |
| **≤ 640px** | Hero actions stack vertically; collections → 2 cols; filter pills scroll horizontally; cart/wishlist sidebars → full width; About visual hidden |
| **≤ 420px** | Collections → 1 column; product grid → 1 column; hero stats stack vertically; footer nav stacks vertically |

---

## Accessibility

- All interactive elements have descriptive `aria-label` attributes
- Cart and wishlist count badges include `aria-label` for screen readers
- Collection cards use `role="button"` and `tabindex="0"` with keyboard handlers
- Product grid uses `role="list"` / `role="listitem"`
- Cart and wishlist sidebars use `aria-hidden` toggled on open/close
- Modal uses `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`
- Toast uses `role="alert"` and `aria-live="assertive"`
- Filter group uses `role="group"` with `aria-label`
- `aria-pressed` state maintained on filter pills and wishlist buttons
- Focus is moved to the close button when sidebars/modals open
- Escape key closes any open overlay
- `.sr-only` utility class for screen-reader-only labels (sort select label)

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full (webkit prefixes included) |
| Edge 90+ | ✅ Full |
| iOS Safari 14+ | ✅ Full |
| Android Chrome | ✅ Full |
| Internet Explorer | ❌ Not supported |

CSS features used: Custom Properties, Grid, Flexbox, `clamp()`, `min()`, `backdrop-filter` (with `-webkit-` prefix), `appearance: none`.

---

## Customisation Guide

### Change the Brand Name
Search and replace `LUXE` in `index.html`. Update the `<title>` tag and footer copyright text as well.

### Change Accent Colour
In `style.css`, update the `--accent` and `--accent-light` CSS variables:

```css
:root {
  --accent:       #c8a96e;   /* Main gold — change to any colour */
  --accent-light: #e0c88a;   /* Hover/lighter variant */
  --accent-dim:   rgba(200,169,110,0.15); /* Background tint */
}
```

### Change Background / Dark Theme
Update `--bg`, `--bg2`, `--bg3`, `--card`, and `--card-hover` in the `:root` block.

### Add a New Product Category
1. Add products with the new `category` string in `script.js`
2. Add a new filter pill in the filter bar in `index.html`:
   ```html
   <button class="pill" data-filter="yourcategory" aria-pressed="false">Your Category</button>
   ```
3. Add a new Collection card in the Collections section in `index.html`

### Change Font
Replace the Google Fonts `<link>` in `index.html` and update `--font-display` and `--font-body` in `style.css`.

### Integrate a Real Backend
The `handleCheckout()` function in `script.js` is the integration point. Replace or extend it to POST the cart to your API:

```js
async function handleCheckout() {
  if (cart.length === 0) return;
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: cart }),
  });
  const order = await response.json();
  // show confirmation with order.id
}
```

---

## How to Run

**No installation required.** This is a static site.

```bash
# Clone or download the project folder
# Open index.html in your browser

# OR serve locally (optional, for clean URLs):
npx serve .
# or
python3 -m http.server 8000
```

To deploy, upload all three files (`index.html`, `style.css`, `script.js`) to any static host:

- **Netlify** — drag and drop the folder
- **Vercel** — `vercel deploy`
- **GitHub Pages** — push to a repo and enable Pages
- **Cloudflare Pages** — connect repo or upload directly
- **Any shared hosting** — upload via FTP/SFTP

---

## Known Limitations

- **No real payment processing** — the checkout modal is a UI simulation only
- **No server-side cart** — cart data lives in `localStorage` only; it will be lost if the user clears browser data
- **Emoji as product images** — designed intentionally for this demo; real product images would require `<img>` elements and an image hosting solution
- **Single currency** — prices are displayed in USD only; multi-currency would require additional logic
- **No search** — there is no free-text product search; filtering by category is the primary discovery mechanism

---

## Credits

| Resource | Usage |
|---|---|
| [Google Fonts — Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) | Display / headline font |
| [Google Fonts — DM Sans](https://fonts.google.com/specimen/DM+Sans) | Body / UI font |
| SVG icons | Custom inline SVGs (no external icon library) |

---

## License

This project is delivered as a client work product. All rights are transferred to the client upon delivery. The code may be freely modified, extended, and deployed.

---

*Built with care. Designed to sell.*
<p align="center">
  <img src="screenshots/home.png" width="45%">
  <img src="screenshots/cart.png" width="45%">
</p>

