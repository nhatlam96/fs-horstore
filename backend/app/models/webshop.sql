-- Active: 1683206101302@@127.0.0.1@5433@postgres
DROP SCHEMA IF EXISTS public CASCADE;

CREATE SCHEMA IF NOT EXISTS public;

SET SCHEMA 'public';

CREATE TABLE
    name (
        id serial PRIMARY KEY,
        first_name varchar(45) NOT NULL,
        last_name varchar(45) NOT NULL
    );

CREATE TABLE
    address (
        id serial PRIMARY KEY,
        street varchar(45) NOT NULL,
        house_number varchar(45) NOT NULL,
        postal_code integer NOT NULL,
        city varchar(45) NOT NULL,
        country varchar(45) NOT NULL
    );

CREATE TABLE
    customer (
        id serial PRIMARY KEY,
        name_id integer,
        address_id integer,
        phone varchar(45) NOT NULL,
        email varchar(45) NOT NULL,
        CONSTRAINT customer_name_id_fk FOREIGN KEY (name_id) REFERENCES name (id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT customer_address_id_fk FOREIGN KEY (address_id) REFERENCES address (id) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    administrator (
        id serial PRIMARY KEY,
        customer_id integer,
        CONSTRAINT administrator_customer_id_fk FOREIGN KEY (customer_id) REFERENCES customer (id) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    payment (
        id serial PRIMARY KEY,
        payment_type varchar(32),
        customer_id integer,
        total_amount double precision NOT NULL,
        CONSTRAINT payment_customer_id_fk FOREIGN KEY (customer_id) REFERENCES customer (id) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    main_category (
        id serial PRIMARY KEY,
        category_type varchar(45) NOT NULL,
        CONSTRAINT main_category_type_unique UNIQUE (category_type)
    );

CREATE TABLE
    sub_category (
        id serial PRIMARY KEY,
        category_type varchar(45) NOT NULL,
        main_category_id integer,
        CONSTRAINT category_main_category_id_fk FOREIGN KEY (main_category_id) REFERENCES main_category (id) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    product (
        id serial PRIMARY KEY,
        title varchar(255) NOT NULL,
        price double precision NOT NULL,
        category_id integer NOT NULL,
        description varchar(255) NOT NULL,
        is_favorite BOOLEAN NOT NULL,
        image VARCHAR(255) NOT NULL,
        CONSTRAINT product_category_fk FOREIGN KEY (category_id) REFERENCES main_category (id) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    watchlist (
        customer_id integer,
        product_id integer,
        CONSTRAINT watchlist_customer_id_fk FOREIGN KEY (customer_id) REFERENCES customer (id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT watchlist_product_id_fk FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    shopping_cart (
        customer_id integer,
        product_id integer,
        CONSTRAINT shopping_cart_customer_id_fk FOREIGN KEY (customer_id) REFERENCES customer (id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT shopping_cart_product_id_fk FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    checkout (
        customer_id integer,
        payment_id integer,
        total_amount double precision NOT NULL,
        CONSTRAINT checkout_customer_id_fk FOREIGN KEY (customer_id) REFERENCES customer (id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT checkout_payment_id_fk FOREIGN KEY (payment_id) REFERENCES payment (id) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    date (
        id serial PRIMARY KEY,
        day int NOT NULL,
        month int NOT NULL,
        year int NOT NULL
    );

CREATE TABLE
    rating (
        id serial PRIMARY KEY,
        customer_id integer,
        product_id integer,
        date_id integer,
        comment varchar(255) NULL DEFAULT NULL,
        rating double precision NOT NULL,
        CONSTRAINT rating_customer_id_fk FOREIGN KEY (customer_id) REFERENCES customer (id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT rating_product_id_fk FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT rating_date_id_fk FOREIGN KEY (date_id) REFERENCES date (id) ON DELETE CASCADE ON UPDATE CASCADE
    );

START TRANSACTION;

INSERT INTO
    name (first_name, last_name)
VALUES
    ('Nhat-Lam', 'Luong');

INSERT INTO
    address (street, house_number, postal_code, city, country)
VALUES
    (
        'Erenburgerstrasse',
        '19',
        67549,
        'Worms',
        'Deutschland'
    );

INSERT INTO
    customer (name_id, address_id, phone, email)
VALUES
    (1, 1, '110', 'inf3381@hs-worms.de');

INSERT INTO
    administrator (customer_id)
VALUES
    (1);

INSERT INTO
    payment (payment_type, customer_id, total_amount)
VALUES
    ('PayPal', 1, 0.0);

INSERT INTO
    checkout (customer_id, payment_id, total_amount)
VALUES
    (1, 1, 0.0);

INSERT INTO
    main_category (category_type)
VALUES
    ('Damen'),
    ('Herren'),
    ('Kinder'),
    ('Pferde');

INSERT INTO
    sub_category (category_type, main_category_id)
VALUES
    ('Reithosen', 1),
    ('Reitstiefel', 1),
    ('Reitjacken', 1),
    ('Reithelme', 1),
    ('Reithandschuhe', 1),
    ('Reitsocken', 1),
    ('Accessoires', 1),
    ('Reithosen', 2),
    ('Reitstiefel', 2),
    ('Reitjacken', 2),
    ('Reithelme', 2),
    ('Reithandschuhe', 2),
    ('Reitsocken', 2),
    ('Accessoires', 2),
    ('Reithosen', 3),
    ('Reitstiefel', 3),
    ('Reitjacken', 3),
    ('Reithelme', 3),
    ('Reithandschuhe', 3),
    ('Reitsocken', 3),
    ('Accessoires', 3),
    ('Gebisse', 4),
    ('Beinschutz', 4),
    ('Pferdedecken', 4),
    ('Sattelunterlagen', 4),
    ('Sättel & Sattelgurte', 4),
    ('Gerten, Peitschen & Sporen', 4),
    ('Pferdepflege', 4);

INSERT INTO
    product (
        title,
        price,
        category_id,
        description,
        is_favorite,
        image
    )
VALUES
    (
        'Damen-Reithose (HorStore Legacy)',
        5.95,
        1,
        'Wie will man das überbieten?',
        FALSE,
        '140366_2.jpg'
    ),
    (
        'Damen Reitstiefel IRHOlania Echtleder bordeaux/flower',
        159.95,
        1,
        'aus wunderschönem argentinischem Leder',
        FALSE,
        '181394_1.jpg'
    ),
    (
        'Funktionsunterwäsche Set ALASKA grau',
        39.95,
        1,
        'elastisch und hautfreundlich',
        FALSE,
        '12895_1yN2ZjJwykxIvq.jpg'
    ),
    (
        'Damen Fliegerhut HVPReflective dark grey',
        35.95,
        1,
        'modische Fliegermütze, auch Trappermütze genannt',
        FALSE,
        '171079_1.jpg'
    ),
    (
        'Reithandschuhe PROFESSIONAL Nubuk Lederimitat schwarz/dunkelgrau',
        11.95,
        1,
        'Kontraststoff: 60% Polyurethan, 25% Polyester, 15% Baumwolle',
        FALSE,
        '74152-4.jpeg'
    ),
    (
        'Herren-Reithose (HorStore Legacy)',
        17.66,
        2,
        'Kann man nicht toppen!',
        FALSE,
        '29966_2C5VH5J56WvsZ4.jpg'
    ),
    (
        'Herren Reitweste marine',
        45.95,
        2,
        'leichte Wattierung',
        FALSE,
        '156552_1.jpg'
    ),
    (
        'Herren Poloshirt langarm MESH weiß',
        37.95,
        2,
        'atmungsaktiv und schnelltrocknend',
        FALSE,
        '124233_1.jpg'
    ),
    (
        'Einwegoverall PP weiß',
        3.95,
        2,
        'zum Schutz vor Staub, Schmutz und Spritzern',
        FALSE,
        '189213_1.jpg'
    ),
    (
        'Arbeitshandschuhe TEXAS gelb',
        28.95,
        2,
        'Original Westernhandschuh in bester Lederqualität',
        FALSE,
        '70539_19zy52lufkJ4W4.jpg'
    ),
    (
        'Kinder-Reithose (HorStore Legacy)',
        42.42,
        3,
        'Unglaublich, aber wahr?!',
        FALSE,
        '93555_15ab2b2df26c97.jpg'
    ),
    (
        'Kinder Turniersakko SAMANTHA schwarz/grau',
        39.95,
        3,
        'mit 2 Reißverschlusstaschen',
        FALSE,
        '81865_1.jpg'
    ),
    (
        'Kinder Steppweste LUCKY GRETA nachtblau/Lucky Heart',
        26.95,
        3,
        'Leichte Steppweste mit verspielten Details',
        FALSE,
        '169381_5.jpg'
    ),
    (
        'Kinder Langarmshirt BUTTERFLY cranberry',
        7.95,
        3,
        'kleine Raffungen kurz unter der Schulterhöhe unterstreichen den verspielten Charakter',
        FALSE,
        '163515_1fZxGjnoMqVJVs.jpg'
    ),
    (
        'Kinder Reit-, Fahrrad- und Skihelm NORI Einhorn schwarz/grau',
        63.95,
        3,
        'nach Norm VG1 01.040 2014-12 (Reitzulassung), EN 1078+A1:2012 (Fahrradzulassung) und EN 1077:2007 (Skizulassung) geprüft',
        FALSE,
        '115126_1cx5RCRBiFC2dN.jpg'
    ),
    (
        'Pferde-Gebiss (HorStore Legacy)',
        14.00,
        4,
        'Das ist doch nicht euer Ernst?!',
        FALSE,
        '22770_14HgdQ7uqAbdAn.jpg'
    ),
    (
        'Dreieckszügel TRAINREIN Leder schwarz',
        35.95,
        4,
        'Durch die Umlenkrolle gibt der Zügel nach und erleichtert ein sanftes und maulfreundliches Biegen',
        FALSE,
        '139980_1.jpg'
    ),
    (
        'Shettysattel-Set mit Trense ADVANCED pink/schwarz',
        199.95,
        4,
        'inkl. Sattelgurt, Steigbügelriemen und Steigbügel',
        FALSE,
        '164294_1.jpg'
    ),
    (
        'Kappzaum Nylon mit Plüschpolsterung schwarz',
        11.95,
        4,
        'gepolsterter Nasenriemen',
        FALSE,
        '79937_1.jpg'
    ),
    (
        'STRAX Ekzem-Bundle',
        64.95,
        4,
        'Das Ekzem-Bundle besteht aus dem Ekzemdecke STRAX, der Ekzemmaske STRAX und dem Ekzem-Spray STRAX',
        FALSE,
        '127636_1Ma5W5ExrNDLUV.jpg'
    );

INSERT INTO
    watchlist (customer_id, product_id)
VALUES
    (1, 1);

INSERT INTO
    shopping_cart (customer_id, product_id)
VALUES
    (1, 1);

INSERT INTO
    date (day, month, year)
VALUES
    (29, 03, 2023);

INSERT INTO
    rating (customer_id, product_id, date_id, comment, rating)
VALUES
    (1, 1, 1, 'Furchtbar!!', 1.5);

END TRANSACTION;