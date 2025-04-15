CREATE DATABASE IF NOT EXISTS app_database;
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'pw';
FLUSH PRIVILEGES;

CREATE USER 'user'@'%' IDENTIFIED BY 'pw';
GRANT ALL PRIVILEGES ON app_database.* TO 'user'@'%';
FLUSH PRIVILEGES;

USE app_database;

CREATE TABLE IF NOT EXISTS ADMIN (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS PERSON (
    PersonID INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    tshirt VARCHAR(10),
    team VARCHAR(100),
    licenseCard BOOLEAN DEFAULT FALSE,
    freeText TEXT,
    tasks TEXT,
    days TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO ADMIN (email, password) VALUES
    (SHA2('antero.paivarinta@gmail.com', 256), SHA2('securepassword', 256));
