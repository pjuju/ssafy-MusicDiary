-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: asds.cspd92r3jqje.ap-northeast-2.rds.amazonaws.com    Database: testDBDB
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `accounts_user`
--

DROP TABLE IF EXISTS `accounts_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) COLLATE utf8_bin NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `first_name` varchar(150) COLLATE utf8_bin NOT NULL,
  `last_name` varchar(150) COLLATE utf8_bin NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `username` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `sad` int DEFAULT NULL,
  `angry` int DEFAULT NULL,
  `depressed` int DEFAULT NULL,
  `normal` int DEFAULT NULL,
  `point` int NOT NULL,
  `image_url` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_user`
--

LOCK TABLES `accounts_user` WRITE;
/*!40000 ALTER TABLE `accounts_user` DISABLE KEYS */;
INSERT INTO `accounts_user` VALUES (1,'pbkdf2_sha256$260000$oTMpYPWraNjmI6Uyj1y63v$CHz2e43EPQqvBnCxsdNEAH9It5fTqpYfbcYUHdNDNdQ=',NULL,0,'','',0,1,'2022-10-07 01:40:34.412933','관리자','admin@test.com',1,4,4,2,2147483497,'NULL'),(2,'pbkdf2_sha256$260000$jx8XonshmVwp8bwfVvilg5$owZPPSz79A/m3mNWwluWfN5Vj9sfzlujzvOOg5av870=',NULL,0,'','',0,1,'2022-10-07 01:41:13.961673','re','rere@rere.com',2,3,4,1,2147483647,'NULL'),(3,'pbkdf2_sha256$260000$8cxLoULYLyzYSqXIbdnAAg$yJVdyBEGNlbdBv/CSxOD3/GC43DqTidjo1RCWyac7Eo=',NULL,0,'','',0,1,'2022-10-07 01:42:30.673233','앱소','apso@test.com',1,1,1,1,2147483647,'string'),(4,'pbkdf2_sha256$260000$ybLd5wG8gnjmCASmOfEDNU$0cE4xE6dwq7trh0UihXHff6G4mDHNeVXPWNCI7Tbgis=',NULL,0,'','',0,1,'2022-10-07 01:43:02.521342','회쏘 언제 먹냐','jks@jks.com',1,4,2,3,2147483647,'NULL'),(5,'pbkdf2_sha256$260000$DGjQLYFDJrK3ClFGuKW65L$+8rkLRCXln34TC8c0/FLxOnLFcT3qNkEmOdAxWuShCo=',NULL,0,'','',0,1,'2022-10-07 01:44:08.889798','test','test@test.com',1,3,4,2,2147483647,'NULL'),(7,'pbkdf2_sha256$260000$1ZYnsijndjuZ3wKcoIZy2K$yA3ShhEesU6aCxFPxCfugNlcU9jfPH4a6LCMkws/Tq4=',NULL,0,'','',0,1,'2022-10-07 01:52:28.730330','ak','akak@ak.com',1,1,1,1,2147483647,'NULL'),(8,'pbkdf2_sha256$260000$8hWbv1ipji5QWW2FHQZTZA$3+OamxK09FDQTui+cVB/DiTYoXb8NNQDmdOjFqbYiTo=',NULL,0,'','',0,1,'2022-10-07 02:20:19.781341','송싸피','alsongdalsong@naver.com',1,3,2,4,2147483547,'ssafy-d204-alsongdalsong.s3.ap-northeast-2.amazonaws.com/e1d63ea5-7d83-4988-a423-47e31b39207f'),(9,'pbkdf2_sha256$260000$Z4whkpJrvbphTADPCcaPpx$k5N8VxGzQTdWHOfzvt0IS+6jYRdOOreMVfnra3fPRuw=',NULL,0,'','',0,1,'2022-10-07 02:55:19.991702','alsong','alsong@naver.com',3,4,3,1,0,'NULL');
/*!40000 ALTER TABLE `accounts_user` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07 15:27:09
