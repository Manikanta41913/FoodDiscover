-- Sample Restaurant Data

-- Insert Restaurants
INSERT INTO restaurants (name, cuisines, avg_rating, total_ratings, cost_for_two, delivery_time, image_url, promoted) VALUES
('Pizza Palace', ARRAY['Italian', 'Pizza'], 4.5, '500+ ratings', 400, 30, 'https://images.unsplash.com/photo-1513104890138-7c749659a591', true),
('Burger King', ARRAY['American', 'Burgers', 'Fast Food'], 4.2, '1000+ ratings', 300, 25, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd', false),
('Sushi World', ARRAY['Japanese', 'Sushi', 'Asian'], 4.7, '300+ ratings', 800, 40, 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351', true),
('Taco Fiesta', ARRAY['Mexican', 'Tacos'], 4.3, '400+ ratings', 350, 28, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', false),
('Curry House', ARRAY['Indian', 'Curry', 'Vegetarian'], 4.6, '600+ ratings', 450, 35, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe', false),
('Pasta Paradise', ARRAY['Italian', 'Pasta'], 4.4, '350+ ratings', 500, 32, 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9', false);

-- Get restaurant IDs (you'll need to replace these with actual UUIDs from your database)
-- Run this query first: SELECT id, name FROM restaurants;
-- Then replace the UUIDs below with your actual restaurant IDs

-- Example Menu Items (replace restaurant_id with actual UUIDs)
-- For Pizza Palace
INSERT INTO menu_items (restaurant_id, name, description, price, is_veg, category) VALUES
((SELECT id FROM restaurants WHERE name = 'Pizza Palace'), 'Margherita Pizza', 'Classic tomato and mozzarella', 29900, true, 'Pizzas'),
((SELECT id FROM restaurants WHERE name = 'Pizza Palace'), 'Pepperoni Pizza', 'Loaded with pepperoni', 34900, false, 'Pizzas'),
((SELECT id FROM restaurants WHERE name = 'Pizza Palace'), 'Veggie Supreme', 'Mixed vegetables and cheese', 32900, true, 'Pizzas'),
((SELECT id FROM restaurants WHERE name = 'Pizza Palace'), 'Garlic Bread', 'Crispy garlic bread', 12900, true, 'Sides');

-- For Burger King
INSERT INTO menu_items (restaurant_id, name, description, price, is_veg, category) VALUES
((SELECT id FROM restaurants WHERE name = 'Burger King'), 'Whopper', 'Flame-grilled beef patty', 24900, false, 'Burgers'),
((SELECT id FROM restaurants WHERE name = 'Burger King'), 'Veggie Burger', 'Plant-based patty', 19900, true, 'Burgers'),
((SELECT id FROM restaurants WHERE name = 'Burger King'), 'Chicken Burger', 'Crispy chicken fillet', 22900, false, 'Burgers'),
((SELECT id FROM restaurants WHERE name = 'Burger King'), 'French Fries', 'Crispy golden fries', 9900, true, 'Sides');

-- For Sushi World
INSERT INTO menu_items (restaurant_id, name, description, price, is_veg, category) VALUES
((SELECT id FROM restaurants WHERE name = 'Sushi World'), 'California Roll', 'Crab, avocado, cucumber', 39900, false, 'Rolls'),
((SELECT id FROM restaurants WHERE name = 'Sushi World'), 'Veggie Roll', 'Cucumber, avocado, carrot', 29900, true, 'Rolls'),
((SELECT id FROM restaurants WHERE name = 'Sushi World'), 'Salmon Nigiri', 'Fresh salmon on rice', 49900, false, 'Nigiri'),
((SELECT id FROM restaurants WHERE name = 'Sushi World'), 'Miso Soup', 'Traditional Japanese soup', 14900, true, 'Soups');

-- For Taco Fiesta
INSERT INTO menu_items (restaurant_id, name, description, price, is_veg, category) VALUES
((SELECT id FROM restaurants WHERE name = 'Taco Fiesta'), 'Beef Tacos', 'Seasoned beef with toppings', 27900, false, 'Tacos'),
((SELECT id FROM restaurants WHERE name = 'Taco Fiesta'), 'Veggie Tacos', 'Grilled vegetables', 22900, true, 'Tacos'),
((SELECT id FROM restaurants WHERE name = 'Taco Fiesta'), 'Chicken Burrito', 'Wrapped with rice and beans', 32900, false, 'Burritos'),
((SELECT id FROM restaurants WHERE name = 'Taco Fiesta'), 'Nachos', 'Tortilla chips with cheese', 17900, true, 'Sides');

-- For Curry House
INSERT INTO menu_items (restaurant_id, name, description, price, is_veg, category) VALUES
((SELECT id FROM restaurants WHERE name = 'Curry House'), 'Paneer Tikka Masala', 'Cottage cheese in creamy gravy', 34900, true, 'Main Course'),
((SELECT id FROM restaurants WHERE name = 'Curry House'), 'Chicken Curry', 'Traditional chicken curry', 37900, false, 'Main Course'),
((SELECT id FROM restaurants WHERE name = 'Curry House'), 'Dal Makhani', 'Black lentils in butter', 27900, true, 'Main Course'),
((SELECT id FROM restaurants WHERE name = 'Curry House'), 'Garlic Naan', 'Butter naan with garlic', 7900, true, 'Breads');

-- For Pasta Paradise
INSERT INTO menu_items (restaurant_id, name, description, price, is_veg, category) VALUES
((SELECT id FROM restaurants WHERE name = 'Pasta Paradise'), 'Spaghetti Carbonara', 'Creamy bacon pasta', 39900, false, 'Pasta'),
((SELECT id FROM restaurants WHERE name = 'Pasta Paradise'), 'Penne Arrabbiata', 'Spicy tomato sauce', 32900, true, 'Pasta'),
((SELECT id FROM restaurants WHERE name = 'Pasta Paradise'), 'Fettuccine Alfredo', 'Creamy white sauce', 36900, true, 'Pasta'),
((SELECT id FROM restaurants WHERE name = 'Pasta Paradise'), 'Caesar Salad', 'Fresh romaine with dressing', 19900, true, 'Salads');
