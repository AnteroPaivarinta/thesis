CREATE DATABASE IF NOT EXISTS app_database;
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'pw';
FLUSH PRIVILEGES;

GRANT ALL PRIVILEGES ON app_database.* TO 'user'@'%';
FLUSH PRIVILEGES;

USE app_database;

CREATE TABLE ADMIN (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE PERSON (
    PersonID VARCHAR(100) PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    age VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    gender VARCHAR(100),
    tshirt VARCHAR(10),
    team VARCHAR(100),
    licenseCard BOOLEAN DEFAULT FALSE,
    freeText VARCHAR(100),
    tasks VARCHAR(100),
    days VARCHAR(100),
    created_at VARCHAR(100)
);

INSERT INTO ADMIN (email, password) VALUES
    (SHA2('antero.paivarinta@gmail.com', 256), SHA2('securepassword', 256));
