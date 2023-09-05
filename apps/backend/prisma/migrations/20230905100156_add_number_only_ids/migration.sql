CREATE OR REPLACE FUNCTION number_id(length int DEFAULT 6)
RETURNS text AS $$
DECLARE 
  id text;
BEGIN
  id := LPAD(FLOOR(RANDOM() * POWER(10, length))::text, length, '0');
  RETURN id; 
END;

$$ LANGUAGE PLPGSQL STABLE;