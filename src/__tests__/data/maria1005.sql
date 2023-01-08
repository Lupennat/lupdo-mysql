CREATE DATABASE IF NOT EXISTS test_db;
USE test_db;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS types;
CREATE TABLE `test_db`.`users` (`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,`name` VARCHAR(255) NOT NULL,`gender` VARCHAR(255) NOT NULL,PRIMARY KEY (`id`));
CREATE TABLE `test_db`.`companies` (`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,`name` VARCHAR(255) NULL,`opened` TIMESTAMP NOT NULL, `active` TINYINT(1) NOT NULL, `binary` BLOB NULL, PRIMARY KEY (`id`));
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Edmund","Multigender");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Kyleigh","Cis man");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Josefa","Cisgender male");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Cecile","Agender");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Sincere","Demi-girl");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Baron","Cisgender male");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Mckayla","Genderflux");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Wellington","Cisgender woman");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Tod","Demi-man");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Jeffrey","Androgyne");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Keenan","Two-spirit person");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Lucile","Man");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Kyra","Other");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Jermain","Gender neutral");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Kelli","Agender");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Jeffry","Two-spirit person");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Dawn","Male to female");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Ofelia","Cis female");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Icie","F2M");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Matilde","Trans");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Marcelina","Transgender female");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Destin","Male to female transsexual woman");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Reilly","Intersex man");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Casimer","Other");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Carli","Bigender");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Harry","Cis man");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Ellie","Omnigender");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Solon","Gender neutral");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Lesley","Cis");
INSERT INTO `test_db`.`users` (`name`, `gender`) VALUES ("Nikolas","Agender");
INSERT INTO `test_db`.`companies` (`name`, `opened`, `active`) VALUES ("Satterfield Inc", '2022-10-22 00:00:00', 1);
INSERT INTO `test_db`.`companies` (`name`, `opened`, `active`) VALUES ("Grimes - Reinger", '2022-11-22 00:00:00', 0);
INSERT INTO `test_db`.`companies` (`name`, `opened`, `active`) VALUES ("Skiles LLC", '2022-12-12 00:00:00', 0);
INSERT INTO `test_db`.`companies` (`name`, `opened`, `active`) VALUES ("White, Hermiston and Kihn", '2020-10-01 00:00:00', 1);
INSERT INTO `test_db`.`companies` (`name`, `opened`, `active`) VALUES ("Huel LLC", '2018-12-22 00:00:00', 1);
INSERT INTO `test_db`.`companies` (`name`, `opened`, `active`) VALUES ("Aufderhar - Schroeder", '2019-12-22 00:00:00', 1);
INSERT INTO `test_db`.`companies` (`name`, `opened`, `active`) VALUES ("Powlowski - VonRueden", '2014-12-22 00:00:00', 1);
INSERT INTO `test_db`.`companies` (`name`, `opened`, `active`) VALUES ("Murray - Hagenes", '2015-12-22 00:00:00', 1);
INSERT INTO `test_db`.`companies` (`name`, `opened`, `active`) VALUES ("Bednar LLC", '2013-12-22 00:00:00', 1);
INSERT INTO `test_db`.`companies` (`name`, `opened`, `active`) VALUES ("Kirlin - Bednar", '2011-12-22 00:00:00', 1);
INSERT INTO `test_db`.`companies` (`name`, `opened`, `active`) VALUES ("Kassulke - Auer", '2010-12-22 00:00:00', 1);
INSERT INTO `test_db`.`companies` (`name`, `opened`, `active`) VALUES ("Orn - Pouros", '2021-12-22 00:00:00', 1);
INSERT INTO `test_db`.`companies` (`name`, `opened`, `active`) VALUES ("Greenfelder - Paucek", '2009-12-22 00:00:00', 1);
INSERT INTO `test_db`.`companies` (`name`, `opened`, `active`) VALUES ("Hand, Effertz and Shields", '2000-12-22 00:00:00', 1);
INSERT INTO `test_db`.`companies` (`name`, `opened`, `active`) VALUES ("Harber - Heidenreich", '2001-12-22 00:00:00', 0);
INSERT INTO `test_db`.`companies` (`name`, `opened`, `active`) VALUES ("Greenholt - Durgan", '2000-12-22 00:00:00', 1);
INSERT INTO `test_db`.`companies` (`name`, `opened`, `active`) VALUES ("Hauck - Murazik", '2000-12-22 00:00:00', 0);
INSERT INTO `test_db`.`companies` (`name`, `opened`, `active`) VALUES ("Beier and Sons", '1999-12-22 00:00:00', 0);
INSERT INTO `test_db`.`companies` (`name`, `opened`, `active`) VALUES ("Harvey Inc", '2022-12-22 00:00:00', 1);
CREATE TABLE `test_db`.`types`(
`char` CHAR NULL,
`varchar` VARCHAR(50) NULL,
`binary` BINARY(3) NULL,
`char_byte` CHAR BYTE NULL,
`varbinary` VARBINARY(20) NULL,
`tinyblob` TINYBLOB NULL,
`tinytext` TINYTEXT NULL,
`text` TEXT NULL,
`blob` BLOB NULL,
`mediumtext` MEDIUMTEXT NULL,
`long` LONG NULL,
`long_varchar` LONG VARCHAR NULL,
`mediumblob` MEDIUMBLOB NULL,
`longtext` LONGTEXT NULL,
`longblob` LONGBLOB NULL,
`enum` ENUM('x-small', 'small', 'medium', 'large', 'x-large') NULL,
`set` SET('a', 'b', 'c', 'd') NULL,
`json` JSON NULL,
`inet6` INET6 NULL,
`bit` BIT NULL,
`tinyint` TINYINT NULL,
`int1` INT1 NULL,
`bool` BOOL NULL,
`boolean` BOOLEAN NULL,
`smallint` SMALLINT NULL,
`int2` INT2 NULL,
`mediumint` MEDIUMINT NULL,
`int3` INT3 NULL,
`int` INT NULL,
`int4` INT4 NULL,
`integer` INTEGER NULL,
`bigint` BIGINT NULL,
`int8` INT8 NULL,
`decimal` DECIMAL(65,30) NULL,
`dec` DEC(65,30) NULL,
`numeric` NUMERIC(65,30) NULL,
`fixed` FIXED(65,30) NULL,
`float` FLOAT(65,30) NULL,
`double` DOUBLE(65,30) NULL,
`double_precision` DOUBLE PRECISION(65,30) NULL,
`real` REAL(65,30) NULL,
`tinyint_zero` TINYINT(3) ZEROFILL NULL,
`smallint_zero` SMALLINT(5) ZEROFILL NULL,
`mediumint_zero` MEDIUMINT(7) ZEROFILL NULL,
`int_zero` INT(10) ZEROFILL NULL,
`integer_zero` INTEGER(10) ZEROFILL NULL,
`bigint_zero` BIGINT(20) ZEROFILL NULL,
`decimal_zero` DECIMAL(65,30) ZEROFILL NULL,
`dec_zero` DEC(65,30) ZEROFILL NULL,
`float_zero` FLOAT(65,30) ZEROFILL NULL,
`double_zero` DOUBLE(65,30) ZEROFILL NULL,
`double_precision_zero` DOUBLE PRECISION(65,30) ZEROFILL NULL,
`date` DATE NULL,
`datetime` DATETIME(6) NULL,
`timestamp` TIMESTAMP(3) NULL,
`time` TIME NULL,
`year` YEAR NULL,
`geometry` GEOMETRY NULL,
`point` POINT NULL,
`linestring` LINESTRING NULL,
`polygon` POLYGON NULL,
`multipoint` MULTIPOINT NULL,
`multilinestring` MULTILINESTRING NULL,
`multipolygon` MULTIPOLYGON NULL,
`geometrycollection` GEOMETRYCOLLECTION NULL
);