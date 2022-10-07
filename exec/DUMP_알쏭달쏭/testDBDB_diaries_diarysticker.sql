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
-- Table structure for table `diaries_diarysticker`
--

DROP TABLE IF EXISTS `diaries_diarysticker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diaries_diarysticker` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `sticker_x` double NOT NULL,
  `sticker_y` double NOT NULL,
  `diary_id` bigint NOT NULL,
  `sticker_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `diaries_diarysticker_diary_id_b38a098c_fk_diaries_diary_id` (`diary_id`),
  KEY `diaries_diarysticker_sticker_id_5a333db0_fk_stickers_sticker_id` (`sticker_id`),
  CONSTRAINT `diaries_diarysticker_diary_id_b38a098c_fk_diaries_diary_id` FOREIGN KEY (`diary_id`) REFERENCES `diaries_diary` (`id`),
  CONSTRAINT `diaries_diarysticker_sticker_id_5a333db0_fk_stickers_sticker_id` FOREIGN KEY (`sticker_id`) REFERENCES `stickers_sticker` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diaries_diarysticker`
--

LOCK TABLES `diaries_diarysticker` WRITE;
/*!40000 ALTER TABLE `diaries_diarysticker` DISABLE KEYS */;
INSERT INTO `diaries_diarysticker` VALUES (35,719,199,45,61),(36,1021,316,45,63);
/*!40000 ALTER TABLE `diaries_diarysticker` ENABLE KEYS */;
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

-- Dump completed on 2022-10-07 15:26:57
