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
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add user',1,'add_user'),(2,'Can change user',1,'change_user'),(3,'Can delete user',1,'delete_user'),(4,'Can view user',1,'view_user'),(5,'Can add diary',2,'add_diary'),(6,'Can change diary',2,'change_diary'),(7,'Can delete diary',2,'delete_diary'),(8,'Can view diary',2,'view_diary'),(9,'Can add image',3,'add_image'),(10,'Can change image',3,'change_image'),(11,'Can delete image',3,'delete_image'),(12,'Can view image',3,'view_image'),(13,'Can add diary sticker',4,'add_diarysticker'),(14,'Can change diary sticker',4,'change_diarysticker'),(15,'Can delete diary sticker',4,'delete_diarysticker'),(16,'Can view diary sticker',4,'view_diarysticker'),(17,'Can add diary music',5,'add_diarymusic'),(18,'Can change diary music',5,'change_diarymusic'),(19,'Can delete diary music',5,'delete_diarymusic'),(20,'Can view diary music',5,'view_diarymusic'),(21,'Can add bookmark',6,'add_bookmark'),(22,'Can change bookmark',6,'change_bookmark'),(23,'Can delete bookmark',6,'delete_bookmark'),(24,'Can view bookmark',6,'view_bookmark'),(25,'Can add diary image',7,'add_diaryimage'),(26,'Can change diary image',7,'change_diaryimage'),(27,'Can delete diary image',7,'delete_diaryimage'),(28,'Can view diary image',7,'view_diaryimage'),(29,'Can add music',8,'add_music'),(30,'Can change music',8,'change_music'),(31,'Can delete music',8,'delete_music'),(32,'Can view music',8,'view_music'),(33,'Can add sticker pack',9,'add_stickerpack'),(34,'Can change sticker pack',9,'change_stickerpack'),(35,'Can delete sticker pack',9,'delete_stickerpack'),(36,'Can view sticker pack',9,'view_stickerpack'),(37,'Can add user sticker',10,'add_usersticker'),(38,'Can change user sticker',10,'change_usersticker'),(39,'Can delete user sticker',10,'delete_usersticker'),(40,'Can view user sticker',10,'view_usersticker'),(41,'Can add sticker',11,'add_sticker'),(42,'Can change sticker',11,'change_sticker'),(43,'Can delete sticker',11,'delete_sticker'),(44,'Can view sticker',11,'view_sticker'),(45,'Can add log entry',12,'add_logentry'),(46,'Can change log entry',12,'change_logentry'),(47,'Can delete log entry',12,'delete_logentry'),(48,'Can view log entry',12,'view_logentry'),(49,'Can add permission',13,'add_permission'),(50,'Can change permission',13,'change_permission'),(51,'Can delete permission',13,'delete_permission'),(52,'Can view permission',13,'view_permission'),(53,'Can add group',14,'add_group'),(54,'Can change group',14,'change_group'),(55,'Can delete group',14,'delete_group'),(56,'Can view group',14,'view_group'),(57,'Can add content type',15,'add_contenttype'),(58,'Can change content type',15,'change_contenttype'),(59,'Can delete content type',15,'delete_contenttype'),(60,'Can view content type',15,'view_contenttype'),(61,'Can add session',16,'add_session'),(62,'Can change session',16,'change_session'),(63,'Can delete session',16,'delete_session'),(64,'Can view session',16,'view_session'),(65,'Can add site',17,'add_site'),(66,'Can change site',17,'change_site'),(67,'Can delete site',17,'delete_site'),(68,'Can view site',17,'view_site'),(69,'Can add blacklisted token',18,'add_blacklistedtoken'),(70,'Can change blacklisted token',18,'change_blacklistedtoken'),(71,'Can delete blacklisted token',18,'delete_blacklistedtoken'),(72,'Can view blacklisted token',18,'view_blacklistedtoken'),(73,'Can add outstanding token',19,'add_outstandingtoken'),(74,'Can change outstanding token',19,'change_outstandingtoken'),(75,'Can delete outstanding token',19,'delete_outstandingtoken'),(76,'Can view outstanding token',19,'view_outstandingtoken'),(77,'Can add email address',20,'add_emailaddress'),(78,'Can change email address',20,'change_emailaddress'),(79,'Can delete email address',20,'delete_emailaddress'),(80,'Can view email address',20,'view_emailaddress'),(81,'Can add email confirmation',21,'add_emailconfirmation'),(82,'Can change email confirmation',21,'change_emailconfirmation'),(83,'Can delete email confirmation',21,'delete_emailconfirmation'),(84,'Can view email confirmation',21,'view_emailconfirmation'),(85,'Can add social account',22,'add_socialaccount'),(86,'Can change social account',22,'change_socialaccount'),(87,'Can delete social account',22,'delete_socialaccount'),(88,'Can view social account',22,'view_socialaccount'),(89,'Can add social application',23,'add_socialapp'),(90,'Can change social application',23,'change_socialapp'),(91,'Can delete social application',23,'delete_socialapp'),(92,'Can view social application',23,'view_socialapp'),(93,'Can add social application token',24,'add_socialtoken'),(94,'Can change social application token',24,'change_socialtoken'),(95,'Can delete social application token',24,'delete_socialtoken'),(96,'Can view social application token',24,'view_socialtoken');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
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

-- Dump completed on 2022-10-07 15:27:04
