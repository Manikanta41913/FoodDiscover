# Database Schema Documentation

## Overview
FoodHub uses 6 main tables to manage restaurants, menus, carts, and orders.

## Tables

### 1. user_profiles
Extends Supabase auth.users with additional profile information.
- `id` (UUID, PK) - References auth.users
- `full_name` (TEXT)
- `phone` (TEXT)
- `created_at`, `updated_at` (TIMESTAMP)

### 2. restaurants
Stores restaurant information.
- `id` (UUID, PK)
- `name` (TEXT, required)
- `cuisines` (TEXT[], required) - Array of cuisine types
- `avg_rating` (DECIMAL) - Average rating out of 5
- `total_ratings` (TEXT) - Display string like "100+ ratings"
- `cost_for_two` (INTEGER) - Cost in rupees
- `delivery_time` (INTEGER) - Minutes
- `image_url` (TEXT)
- `promoted` (BOOLEAN) - Featured restaurant flag
- `created_at` (TIMESTAMP)

### 3. menu_items
Menu items for each restaurant.
- `id` (UUID, PK)
- `restaurant_id` (UUID, FK → restaurants)
- `name` (TEXT, required)
- `description` (TEXT)
- `price` (INTEGER, required) - Price in paise (₹1 = 100 paise)
- `default_price` (INTEGER) - Alternative pricing
- `is_veg` (BOOLEAN) - Vegetarian flag
- `image_id` (TEXT) - Cloudinary image ID
- `category` (TEXT, required) - Menu category
- `created_at` (TIMESTAMP)

### 4. cart_items
User shopping cart (persisted).
- `id` (UUID, PK)
- `user_id` (UUID, FK → auth.users)
- `menu_item_id` (UUID, FK → menu_items)
- `quantity` (INTEGER)
- `created_at` (TIMESTAMP)
- UNIQUE constraint on (user_id, menu_item_id)

### 5. orders
Order history.
- `id` (UUID, PK)
- `user_id` (UUID, FK → auth.users)
- `total_amount` (DECIMAL) - Subtotal
- `delivery_fee` (DECIMAL)
- `platform_fee` (DECIMAL)
- `gst` (DECIMAL) - 5% tax
- `grand_total` (DECIMAL)
- `status` (TEXT) - 'pending', 'confirmed', 'delivered', 'cancelled'
- `created_at` (TIMESTAMP)

### 6. order_items
Items in each order.
- `id` (UUID, PK)
- `order_id` (UUID, FK → orders)
- `menu_item_id` (UUID, FK → menu_items)
- `quantity` (INTEGER)
- `price` (INTEGER) - Price at time of order
- `created_at` (TIMESTAMP)

## Security (Row Level Security)

### Public Access
- ✅ Anyone can read `restaurants`
- ✅ Anyone can read `menu_items`

### Authenticated Access
- ✅ Users can CRUD their own `user_profiles`
- ✅ Users can CRUD their own `cart_items`
- ✅ Users can create and read their own `orders`
- ✅ Users can create and read their own `order_items`

## Relationships

```
auth.users (Supabase Auth)
  ↓
user_profiles (1:1)
  ↓
cart_items (1:many) → menu_items
  ↓
orders (1:many)
  ↓
order_items (1:many) → menu_items

restaurants (1:many)
  ↓
menu_items
```

## Indexes
- `menu_items.restaurant_id` - Fast menu lookups
- `cart_items.user_id` - Fast cart queries
- `orders.user_id` - Fast order history
- `order_items.order_id` - Fast order details

## How to Apply

1. Go to your Supabase project
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the contents of `supabase-schema.sql`
5. Paste and click **Run**
6. Wait for "Success. No rows returned"

## Next Steps

After running the schema:
1. Populate restaurants and menu_items with sample data
2. Test authentication
3. Implement API service layer
4. Update components to use Supabase
