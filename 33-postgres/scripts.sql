-- contains scripts that we ran during lecture

CREATE TABLE IF NOT EXISTS items (
  id           SERIAL       PRIMARY KEY,
  item_name    TEXT         NOT NULL,
  description  TEXT,
  completed    BOOLEAN      DEFAULT false,  
  created      TIMESTAMPTZ  DEFAULT now()
);


-- now that we have made the items table,
-- insert a row into that table
-- with this specific item_name and description
INSERT INTO items (item_name, description) 
    VALUES (
        'take attendance', 
        'gotta make sure we know who is here'
        );


INSERT INTO items 
  (item_name, description)
VALUES 
  ('Avocados', 'avacado mash'),
  ('Orange juice', 'not just for breakfast'),
  ('Ice Cream', 'Ben & Jerry''s'),
  ('Oil Change', 'stop at dealership'),
  ('Cat Food', null),
  ('Sun Glasses', 'for vacation'),
  ('Dark roast', 'nectar of the gods'),
  ('Running Shoes', null),
  ('Espresso', 'nectar of the gods'),
  ('Merlot', 'for dinner');
 
 SELECT * FROM items;
select id, item_name FROM items;
select * from items WHERE item_name = 'Sun Glasses';
select id from items where item_name = 'Sun Glasses';
select * from items where id < 10;
select * from items where description IS NULL AND id < 10;
select * from items limit 5;
select * from items order by item_name limit 5;

UPDATE items set description = 'the new description' WHERE id = 1;
DELETE FROM items WHERE description IS NULL;


select * from products;
-- select everything whose aisle is coffee
SELECT * FROM products WHERE aisle = 'coffee';
SELECT COUNT(*) FROM products WHERE aisle = 'coffee';
SELECT count (distinct aisle) from products;
SELECT * FROM products WHERE aisle = 'tea' AND price > 40 AND product_name ILIKE '%herbal%' ORDER BY price DESC;

SELECT * FROM products WHERE department = 'pets' ORDER BY price DESC;
SELECT COUNT(*), department  FROM products GROUP BY department;

SELECT * FROM products WHERE product_name ILIKE '%canned%' AND department NOT LIKE '%canned%';

SELECT ROUND(AVG(price), 2), department FROM products GROUP BY department ORDER BY AVG(price);
