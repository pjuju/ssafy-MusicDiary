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
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app` varchar(255) COLLATE utf8_bin NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2022-10-07 01:12:45.402464'),(2,'contenttypes','0002_remove_content_type_name','2022-10-07 01:12:45.577060'),(3,'auth','0001_initial','2022-10-07 01:12:46.103535'),(4,'auth','0002_alter_permission_name_max_length','2022-10-07 01:12:46.210472'),(5,'auth','0003_alter_user_email_max_length','2022-10-07 01:12:46.246838'),(6,'auth','0004_alter_user_username_opts','2022-10-07 01:12:46.278753'),(7,'auth','0005_alter_user_last_login_null','2022-10-07 01:12:46.313661'),(8,'auth','0006_require_contenttypes_0002','2022-10-07 01:12:46.341586'),(9,'auth','0007_alter_validators_add_error_messages','2022-10-07 01:12:46.371539'),(10,'auth','0008_alter_user_username_max_length','2022-10-07 01:12:46.403423'),(11,'auth','0009_alter_user_last_name_max_length','2022-10-07 01:12:46.433343'),(12,'auth','0010_alter_group_name_max_length','2022-10-07 01:12:46.532857'),(13,'auth','0011_update_proxy_permissions','2022-10-07 01:12:46.593143'),(14,'auth','0012_alter_user_first_name_max_length','2022-10-07 01:12:46.639430'),(15,'accounts','0001_initial','2022-10-07 01:12:47.409623'),(16,'account','0001_initial','2022-10-07 01:12:47.818297'),(17,'account','0002_email_max_length','2022-10-07 01:12:47.938993'),(18,'accounts','0002_alter_user_point','2022-10-07 01:12:47.969548'),(19,'accounts','0003_alter_user_point','2022-10-07 01:12:48.094415'),(20,'accounts','0004_auto_20220926_2157','2022-10-07 01:12:48.313857'),(21,'accounts','0005_alter_user_point','2022-10-07 01:12:48.348811'),(22,'admin','0001_initial','2022-10-07 01:12:48.808994'),(23,'admin','0002_logentry_remove_auto_add','2022-10-07 01:12:48.844291'),(24,'admin','0003_logentry_add_action_flag_choices','2022-10-07 01:12:48.880091'),(25,'stickers','0001_initial','2022-10-07 01:12:49.475835'),(26,'stickers','0002_auto_20220922_1505','2022-10-07 01:12:49.636888'),(27,'musics','0001_initial','2022-10-07 01:12:50.171275'),(28,'diaries','0001_initial','2022-10-07 01:12:51.262208'),(29,'diaries','0002_remove_diarysticker_sticker','2022-10-07 01:12:51.473670'),(30,'diaries','0003_diarysticker_sticker','2022-10-07 01:12:51.615999'),(31,'diaries','0004_auto_20220923_2109','2022-10-07 01:12:51.740931'),(32,'diaries','0005_auto_20220924_0303','2022-10-07 01:12:52.280950'),(33,'diaries','0006_auto_20220924_0348','2022-10-07 01:12:52.346720'),(34,'diaries','0007_auto_20220924_1326','2022-10-07 01:12:52.470292'),(35,'diaries','0008_auto_20220924_1328','2022-10-07 01:12:52.534618'),(36,'diaries','0009_auto_20220924_1604','2022-10-07 01:12:52.601439'),(37,'diaries','0010_rename_image_id_diaryimage_image_url','2022-10-07 01:12:52.662680'),(38,'diaries','0011_auto_20220924_1631','2022-10-07 01:12:52.751453'),(39,'diaries','0012_diary_bookmarked','2022-10-07 01:12:52.866234'),(40,'diaries','0013_diary_created_date','2022-10-07 01:12:52.984137'),(41,'diaries','0014_auto_20220926_1617','2022-10-07 01:12:53.209215'),(42,'diaries','0015_diarymusic_like','2022-10-07 01:12:53.302129'),(43,'diaries','0016_remove_diarymusic_like','2022-10-07 01:12:53.392855'),(44,'diaries','0017_diarymusic_like','2022-10-07 01:12:53.525237'),(45,'diaries','0018_alter_diarymusic_like','2022-10-07 01:12:53.626079'),(46,'sessions','0001_initial','2022-10-07 01:12:53.756648'),(47,'sites','0001_initial','2022-10-07 01:12:53.856287'),(48,'sites','0002_alter_domain_unique','2022-10-07 01:12:53.920096'),(49,'socialaccount','0001_initial','2022-10-07 01:12:54.869877'),(50,'socialaccount','0002_token_max_lengths','2022-10-07 01:12:55.015482'),(51,'socialaccount','0003_extra_data_default_dict','2022-10-07 01:12:55.055677'),(52,'stickers','0003_alter_sticker_sticker_pack','2022-10-07 01:12:55.103731'),(53,'stickers','0004_stickerpack_thumb_url','2022-10-07 01:12:55.225147'),(54,'token_blacklist','0001_initial','2022-10-07 01:12:55.607763'),(55,'token_blacklist','0002_outstandingtoken_jti_hex','2022-10-07 01:12:55.687707'),(56,'token_blacklist','0003_auto_20171017_2007','2022-10-07 01:12:55.771549'),(57,'token_blacklist','0004_auto_20171017_2013','2022-10-07 01:12:55.912635'),(58,'token_blacklist','0005_remove_outstandingtoken_jti','2022-10-07 01:12:56.006327'),(59,'token_blacklist','0006_auto_20171017_2113','2022-10-07 01:12:56.070827'),(60,'token_blacklist','0007_auto_20171017_2214','2022-10-07 01:12:56.560467');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
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
