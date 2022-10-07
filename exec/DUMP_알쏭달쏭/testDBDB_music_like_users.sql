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
-- Table structure for table `music_like_users`
--

DROP TABLE IF EXISTS `music_like_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `music_like_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `music_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `music_like_users_music_id_user_id_4f193a1d_uniq` (`music_id`,`user_id`),
  KEY `music_like_users_user_id_c7a9fd12_fk_accounts_user_id` (`user_id`),
  CONSTRAINT `music_like_users_music_id_079649d1_fk_music_id` FOREIGN KEY (`music_id`) REFERENCES `music` (`id`),
  CONSTRAINT `music_like_users_user_id_c7a9fd12_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `music_like_users`
--

LOCK TABLES `music_like_users` WRITE;
/*!40000 ALTER TABLE `music_like_users` DISABLE KEYS */;
INSERT INTO `music_like_users` VALUES (17,2525,8),(8,6084,8),(5,12411,8),(18,25706,8),(1,28410,8),(10,45153,8),(11,49484,8),(3,49643,8),(14,50874,8),(9,51997,8),(2,52575,8),(7,52766,8),(15,52865,4),(13,53021,8),(4,53224,8),(6,61208,8),(12,61734,8),(16,62444,4);
/*!40000 ALTER TABLE `music_like_users` ENABLE KEYS */;
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

-- Dump completed on 2022-10-07 15:27:10
