CREATE DATABASE IF NOT EXISTS test_db;
USE test_db;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS companies;
CREATE TABLE `test_db`.`users` (`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,`name` VARCHAR(255) NOT NULL,`gender` VARCHAR(255) NOT NULL,PRIMARY KEY (`id`));
CREATE TABLE `test_db`.`companies` (`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,`name` VARCHAR(255) NULL,`opened` DATETIME NOT NULL, `active` TINYINT(1) NOT NULL, `binary` BLOB NULL, PRIMARY KEY (`id`));
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