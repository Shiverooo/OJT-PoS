CREATE TABLE users (
    user_id INTEGER UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'cashier')) DEFAULT 'cashier'
);

CREATE TRIGGER set_user_id
AFTER INSERT ON users
FOR EACH ROW
WHEN NEW.user_id IS NULL
BEGIN
    UPDATE users
    SET user_id = (abs(random()) % 1000 + 2025000)
    WHERE rowid = NEW.rowid;
END;

-- insert into users(
-- first_name,
-- last_name,
-- email,
-- phone_number,
-- username,
-- password_hash
-- )
-- values(
-- 'Jerson',
-- 'Mamangun',
-- 'jeron.mamangun@gmail.com',
-- '09123456789',
-- 'Jeron',
-- 'MyNewNameIsJeron'
-- );

insert into users(
first_name,
last_name,
email,
phone_number,
username,
password_hash
)
values(
'Joshua Jeriel',
'Falla',
'joshuajeriel.falla@gmail.com',
'09123556789',
'Jeriel',
'MyNameisJeriel'
);

SELECT * FROM users;

DROP TABLE users;

create table sample(
    id integer primary key default (random()),
    username varchar(100) unique not null
);

INSERT INTO sample(
    username
)
VALUES(
    'Jeron'
);

SELECT random() % 1000 modulo;

