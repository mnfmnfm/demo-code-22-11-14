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
