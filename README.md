# TeeShop - E-Commerce T-Shirt Store

A modern, production-ready e-commerce website built with Vue.js 3, Composition API, and Tailwind CSS.

## Features

### Product Management
- **Product Catalog** with grid/list views
- **Individual Product Pages** with:
  - High-quality image gallery with swipeable navigation
  - Size selector (S, M, L, XL, XXL)
  - Color variants with preview
  - Quantity selector
  - Real-time stock status

### Product Filtering & Sorting
- Filter by category (Men, Women, Unisex, Limited Edition)
- Filter by size availability
- Filter by color
- Price range slider
- Sorting options (Price low-high, Price high-low, Newest, Popularity)
- Product search with autocomplete

### Shopping Cart
- Slide-out cart panel (fullscreen on mobile)
- Real-time cart updates
- Cart items with editable quantity
- Cart summary with:
  - Subtotal calculation
  - Shipping cost estimator
  - Tax calculation
  - Grand total
- Persistent cart using localStorage

### Checkout Process
- Multi-step checkout wizard:
  1. Contact information (email, phone)
  2. Shipping address with validation
  3. Shipping method selection
  4. Payment method selection
  5. Order review
- Form validation with visual feedback
- Order confirmation page with order number

### Additional Features
- Wishlist functionality
- Product search with autocomplete
- Newsletter signup
- Responsive design (mobile-first)
- Toast notifications
- Loading states with skeleton screens
- SEO-friendly product pages

### Pages
- Home page with featured products and hero banner
- Shop page with filtering and sorting
- Product detail pages
- Checkout page
- About page
- Contact page
- 404 redirect to home

## Tech Stack

- **Frontend Framework**: Vue.js 3 with Composition API
- **Routing**: Vue Router 4
- **State Management**: Pinia
- **Styling**: Tailwind CSS + Custom CSS
- **Build Tool**: Vite
- **Language**: TypeScript
- **HTTP Client**: Axios (for future API integration)

## Project Structure

```
src/
├── components/
│   ├── ui/              # Base reusable components
│   │   ├── BaseButton.vue
│   │   ├── BaseInput.vue
│   │   ├── BaseModal.vue
│   │   └── Notification.vue
│   ├── layout/          # Layout components
│   │   ├── Header.vue
│   │   └── Footer.vue
│   └── features/        # Feature-specific components
│       ├── ProductCard.vue
│       ├── ProductGallery.vue
│       ├── CartSidebar.vue
│       └── CheckoutWizard.vue
├── views/               # Page components
│   ├── Home.vue
│   ├── Shop.vue
│   ├── ProductDetail.vue
│   ├── Checkout.vue
│   ├── About.vue
│   └── Contact.vue
├── stores/              # Pinia stores
│   ├── cartStore.ts
│   ├── productStore.ts
│   └── notificationStore.ts
├── composables/         # Composition API functions
│   └── useComposables.ts
├── services/            # API services
│   └── mockApi.ts
├── utils/               # Helper functions
│   └── helpers.ts
├── data/                # Mock data
│   └── products.ts
├── styles/              # Global styles
│   └── global.css
├── router/              # Vue Router configuration
│   └── index.ts
├── App.vue             # Root component
├── main.ts             # Application entry point
```

## Setup & Installation

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. **Navigate to project directory**
```bash
cd shirt
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```
The application will open at `http://localhost:5173`

4. **Build for production**
```bash
npm run build
```

5. **Preview production build**
```bash
npm run preview
```

## Key Components

### Header Component
- Logo and navigation
- Search functionality with autocomplete
- Cart icon with badge
- Wishlist button

### ProductCard Component
- Product image with hover effects
- Product title and rating
- Price display with discount badge
- Quick add to cart button
- Wishlist toggle

### ProductGallery Component
- Main image display
- Navigation arrows
- Image counter
- Thumbnail navigation

### CartSidebar Component
- Slide-out panel design
- Cart items with quantity controls
- Item removal
- Cart summary
- Checkout button

### CheckoutWizard Component
- Multi-step form wizard
- Step validation
- Form inputs for each step
- Order review
- Order submission

## Store Management

### cartStore (Pinia)
Manages:
- Cart items
- Quantity management
- Cart calculations (subtotal, shipping, tax, total)
- localStorage persistence

### productStore (Pinia)
Manages:
- Product list
- Filter states
- Sorting preference
- Filtered products computation

### notificationStore (Pinia)
Manages:
- Toast notifications
- Cart sidebar visibility
- UI state

## Composables

### useSearch
- Debounced search functionality
- Search query management

### usePagination
- Pagination logic
- Page navigation

### useWishlist
- Wishlist management
- localStorage persistence

### useFormValidation
- Form field validation
- Error tracking

### useLoading
- Loading state management
- Async operation wrapper

## Mock API

The application uses a mock API service that simulates:
- Fetching products with optional filters
- Getting single product by ID
- Fetching related products
- Searching products with autocomplete
- API delay simulation (100-300ms)

## Styling

The application uses Tailwind CSS with custom CSS for:
- Consistent color scheme (Primary: #3B82F6, Secondary: #1F2937)
- Responsive breakpoints (mobile, tablet, desktop)
- Smooth animations and transitions
- Card-based layout with shadows
- Proper spacing and typography

## Data

### Product Data
The application includes 15+ mock t-shirt products with:
- ID, name, description
- Price and original price (for sales)
- Product images (using picsum.photos)
- Color variants with hex codes
- Available sizes
- Category (Men, Women, Unisex, Limited Edition)
- Tags
- Stock count
- Featured status
- Rating and review count

## Future Enhancements

- Real API integration
- User authentication & accounts
- Order history
- Product reviews and ratings
- Shipping address book
- Multiple payment methods
- Inventory management
- Admin dashboard
- Analytics and reporting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Code splitting with dynamic imports
- Lazy loading of images
- Debounced search
- Optimized re-renders with Vue 3 reactivity
- CSS minification
- Bundle optimization with Vite

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please contact support@teeshop.com

---

**Created with ❤️ using Vue.js 3 and Tailwind CSS**
