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
-- Table structure for table `stickers_stickerpack`
--

DROP TABLE IF EXISTS `stickers_stickerpack`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stickers_stickerpack` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(60) COLLATE utf8_bin NOT NULL,
  `price` int NOT NULL,
  `user_id` int NOT NULL,
  `thumb_url` varchar(176) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `stickers_stickerpack_name_375f286b_uniq` (`name`),
  KEY `stickers_stickerpack_user_id_c3ea9926_fk_accounts_user_id` (`user_id`),
  CONSTRAINT `stickers_stickerpack_user_id_c3ea9926_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stickers_stickerpack`
--

LOCK TABLES `stickers_stickerpack` WRITE;
/*!40000 ALTER TABLE `stickers_stickerpack` DISABLE KEYS */;
INSERT INTO `stickers_stickerpack` VALUES (1,'춘식팩',120,1,'https://ssafy-d204-alsongdalsong.s3.ap-northeast-2.amazonaws.com/sticker/chunsik/thumb.png'),(3,'복숭아팩',150,1,'https://ssafy-d204-alsongdalsong.s3.ap-northeast-2.amazonaws.com/sticker/peach/thumb.png'),(4,'얼굴팩',100,1,'https://ssafy-d204-alsongdalsong.s3.ap-northeast-2.amazonaws.com/sticker/face/thumb.png'),(5,'마스킹테이프팩',80,1,'https://ssafy-d204-alsongdalsong.s3.ap-northeast-2.amazonaws.com/sticker/tape/thumb.png'),(6,'말랑팩',100,1,'https://ssafy-d204-alsongdalsong.s3.ap-northeast-2.amazonaws.com/sticker/malang/thumb.png'),(7,'다꾸팩',180,1,'https://ssafy-d204-alsongdalsong.s3.ap-northeast-2.amazonaws.com/sticker/dacu/thumb.png'),(8,'날씨팩',100,1,'https://ssafy-d204-alsongdalsong.s3.ap-northeast-2.amazonaws.com/sticker/weather/thumb.png');
/*!40000 ALTER TABLE `stickers_stickerpack` ENABLE KEYS */;
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

-- Dump completed on 2022-10-07 15:26:59
