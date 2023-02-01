DROP TABLE IF EXISTS orders, items, suppliers;

CREATE TABlE suppliers (
	id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	supplier_name TEXT NOT NULL,
	phone TEXT,
	city TEXT
);

-- DROP TABLE IF EXISTS items;

CREATE TABLE items (
	id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  	item_name TEXT NOT NULL,
  	unit TEXT,
  	unit_cost numeric,
  	-- the supplier_id must actually match an id from the suppliers table
  	-- no cheating by making the supplier_id null
  	supplier_id INTEGER REFERENCES suppliers(id) NOT NULL
);

-- DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  created_at TIMESTAMPTZ DEFAULT now(),
  item_id INTEGER REFERENCES items(id) NOT NULL,
  amount numeric,
  total_cost numeric,
  shipping_status TEXT
);

-- first remove any data that may be present
TRUNCATE  suppliers, items, orders RESTART IDENTITY CASCADE;

-- insert some suppliers
INSERT INTO suppliers
  (supplier_name, phone, city)
  VALUES 
    ('Arnold Grummers Papermaking', '920-840-6056', 'Appleton'),
    ('Glatfelter', '49 (0) 3 39 86 / 69-0', 'Falkenhagen'),
    ('Blumfeld Paper', '555-6789', 'Moscow');

-- insert some items
INSERT INTO items
  (item_name, unit, unit_cost, supplier_id)
  VALUES
    ('Paper Additives', 'LBS', '3.85', 1),
    ('G-Colors Envelope Papers', 'LBS', '0.62', 2),    
    ('Abaca Sheet Pulp', 'LBS', '11.20', 1),    
    ('Unbleached Abaca', 'LBS', '1499.00', 1),    
    ('Wood pulp', 'LBS', '0.20', 3),
    ('White Envelope Papers', 'LBS', '0.52', 2);

-- insert some orders
INSERT INTO orders 
  (item_id, amount, total_cost, shipping_status)
  VALUES
    (1, 10, 38.5, 'Delivered'),
    (2, 2000, 1240, 'Shipped'),
    (3, 50, 560, 'Shipped'),
    (4, 1, 1499, 'Shipped'),
    (5, 2000, 400, 'Preparing'),
    (2, 1000, 620, 'Preparing');   
    
INSERT INTO orders
  (item_id, amount, total_cost, shipping_status)
VALUES
  (6, 20, 20, 'Shipped');
  
 	
INSERT INTO orders
  (item_id, amount, total_cost, shipping_status)
VALUES
  (1, 20, 20, 'Shipped');
  

DELETE FROM orders WHERE item_id = 1;
DELETE FROM items WHERE id = 1 ;

SELECT items.id AS potato, suppliers.id AS supplier_id, item_name, phone
FROM items
JOIN suppliers ON items.supplier_id = suppliers.id;

SELECT item_name, phone, unit_cost
FROM items
JOIN suppliers ON items.supplier_id = suppliers.id
WHERE unit_cost < 1;

SELECT * from items where unit_cost < 1;
SELECT * from suppliers where id = 2 or id = 3;


SELECT item_name, shipping_status
FROM orders
JOIN items ON orders.item_id = items.id
JOIN suppliers ON items.supplier_id = suppliers.id
WHERE phone LIKE '49%';
