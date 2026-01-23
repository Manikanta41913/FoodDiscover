# Supabase Integration Guide

## 1. Install Supabase Client

```bash
npm install @supabase/supabase-js
```

## 2. Create Supabase Config

Create `src/utils/supabaseClient.js`:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## 3. Environment Variables

Create `.env` file:

```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_anon_key
```

## 4. Database Schema Example

In Supabase SQL Editor:

```sql
-- Restaurants table
CREATE TABLE restaurants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  cuisines TEXT[],
  avg_rating DECIMAL(2,1),
  cost_for_two INTEGER,
  image_url TEXT,
  delivery_time INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Menu items table
CREATE TABLE menu_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id),
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  is_veg BOOLEAN DEFAULT true,
  image_url TEXT,
  category TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID,
  items JSONB NOT NULL,
  total_amount DECIMAL(10,2),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Public read access for restaurants and menu
CREATE POLICY "Public restaurants" ON restaurants FOR SELECT USING (true);
CREATE POLICY "Public menu items" ON menu_items FOR SELECT USING (true);
```

## 5. Usage Examples

### Fetch Restaurants
```javascript
import { supabase } from './utils/supabaseClient';

const fetchRestaurants = async () => {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .order('avg_rating', { ascending: false });
  
  if (error) console.error(error);
  return data;
};
```

### Fetch Menu Items
```javascript
const fetchMenu = async (restaurantId) => {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('restaurant_id', restaurantId);
  
  if (error) console.error(error);
  return data;
};
```

### Create Order
```javascript
const createOrder = async (orderData) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select();
  
  if (error) console.error(error);
  return data;
};
```

## 6. Deploy to Render

### For Static Site:
1. Push code to GitHub
2. Connect to Render
3. Add environment variables in Render dashboard
4. Deploy

### For Full Stack (with Express backend):
Create `server.js`:

```javascript
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// API routes
app.get('/api/restaurants', async (req, res) => {
  // Supabase queries here
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

Update `render.yaml`:
```yaml
services:
  - type: web
    name: foodhub
    env: node
    buildCommand: npm install && npm run build
    startCommand: node server.js
    envVars:
      - key: REACT_APP_SUPABASE_URL
        sync: false
      - key: REACT_APP_SUPABASE_ANON_KEY
        sync: false
```

## 7. Authentication (Optional)

```javascript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});

// Get current user
const { data: { user } } = await supabase.auth.getUser();
```

## Next Steps

1. Create Supabase account at https://supabase.com
2. Create a new project
3. Get your API keys from Project Settings
4. Set up database tables
5. Install Supabase client
6. Update your components to use Supabase
7. Deploy to Render

Would you like me to implement any of these features?
