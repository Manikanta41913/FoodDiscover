# FoodHub - Quality Assurance Checklist

## ✅ Core Functionality

### Homepage (Body.js)
- [ ] Restaurants load from API (or fallback to mock data)
- [ ] Search bar works with debouncing
- [ ] "All Restaurants" filter shows all items
- [ ] "Top Rated" filter shows only 4+ rated restaurants
- [ ] "Fast Delivery" filter shows ≤30 min delivery
- [ ] Restaurant cards display correctly
- [ ] Clicking a card navigates to menu
- [ ] Shimmer loader shows while loading
- [ ] Offline message shows when no internet

### Restaurant Menu (RestaurantMenu.js)
- [ ] Breadcrumb navigation works
- [ ] Back button navigates to previous page
- [ ] Restaurant info displays correctly
- [ ] Menu categories are collapsible
- [ ] Items show veg/non-veg indicators
- [ ] "ADD" button adds items to cart
- [ ] Images load with fallbacks

### Shopping Cart (Cart.js)
- [ ] Cart shows all added items
- [ ] Items are grouped by ID with quantities
- [ ] + button increases quantity
- [ ] - button decreases quantity
- [ ] Delete icon appears when quantity is 1
- [ ] Remove item works correctly
- [ ] Clear cart empties the cart
- [ ] Order summary calculates correctly
- [ ] Toast notifications appear for actions
- [ ] Empty state shows when cart is empty

### Contact Page (Contact.js)
- [ ] Form fields accept input
- [ ] Name validation works (required)
- [ ] Email validation works (required + format)
- [ ] Message validation works (required + min 10 chars)
- [ ] Error messages display correctly
- [ ] Errors clear when typing
- [ ] Success toast shows on valid submission
- [ ] Form resets after submission

## 🎨 UI/UX Features

### Header (Header.js)
- [ ] Logo displays correctly
- [ ] Navigation links work
- [ ] Cart badge shows item count
- [ ] Dark mode toggle works
- [ ] Online/offline status shows
- [ ] Responsive on mobile

### Footer (Footer.js)
- [ ] All sections display
- [ ] Links are clickable
- [ ] Social icons present
- [ ] Responsive layout
- [ ] Dark mode styling

### Dark Mode
- [ ] Toggle switches theme
- [ ] Preference persists on reload
- [ ] All pages support dark mode
- [ ] Smooth transitions
- [ ] Proper contrast

### Responsive Design
- [ ] Mobile (< 640px) - single column
- [ ] Tablet (640-1024px) - 2-3 columns
- [ ] Desktop (> 1024px) - 4 columns
- [ ] All buttons are touch-friendly
- [ ] Text is readable on all sizes

### Animations & Interactions
- [ ] Toast slides in smoothly
- [ ] Scroll to top button appears/disappears
- [ ] Cards have hover effects
- [ ] Buttons have hover states
- [ ] Smooth page transitions

## 🔧 Technical Checks

### Performance
- [ ] Search is debounced (no lag)
- [ ] Images load efficiently
- [ ] No console errors
- [ ] Build completes successfully
- [ ] Bundle size is reasonable

### Error Handling
- [ ] API failure falls back to mock data
- [ ] Missing images show fallbacks
- [ ] Offline state handled
- [ ] Form errors are user-friendly
- [ ] No crashes on edge cases

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Alt text on images
- [ ] Semantic HTML used
- [ ] Color contrast sufficient

## 🚀 Deployment

### Pre-deployment
- [ ] All files committed to git
- [ ] .gitignore excludes node_modules
- [ ] package.json has correct metadata
- [ ] README is comprehensive
- [ ] render.yaml is configured

### Post-deployment
- [ ] Site loads on Render
- [ ] All routes work
- [ ] API calls succeed
- [ ] Images load
- [ ] Dark mode persists

## 🐛 Known Issues

_Document any known issues here_

## 📝 Notes

_Add any additional notes or observations_

---

**Last Updated**: [Date]
**Tested By**: [Name]
**Status**: ⏳ Pending / ✅ Passed / ❌ Failed
