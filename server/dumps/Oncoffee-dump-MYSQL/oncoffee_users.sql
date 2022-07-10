-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: oncoffee
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

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` varchar(10) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `userLastName` varchar(50) NOT NULL,
  `userPfp` varchar(50) NOT NULL DEFAULT 'default-pfp.png',
  `userFavoriteProducts` text,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userId_UNIQUE` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('0070325736','Henrique','Ferreira','default-pfp.png','814182783'),('0149909891','Pedro','Henrique','default-pfp.png',NULL),('0712047492','jsdnfjdas','asduabsdu','default-pfp.png',NULL),('1203567262','ajsbdsajh','fbhdsabfhjasdb','default-pfp.png',NULL),('2566862310','asdasdsad','dfsffashb','default-pfp.png',NULL),('3010677974','123123','123123','default-pfp.png',NULL),('3481802113','Pedro','Henrique','default-pfp.png',NULL),('3865070243','Henrique','Ferreira','default-pfp.png',NULL),('4005501534','Henrique','Ferreira','default-pfp.png',NULL),('4066954753','ashjdah','ashdbashb','default-pfp.png',NULL),('4628796245','asdsa','asfsafsa','default-pfp.png',NULL),('4687395042','ehrm','asdn','default-pfp.png',NULL),('4887196450','123123','123123','default-pfp.png',NULL),('5071788151','asdasd','asdffadsfd','default-pfp.png',NULL),('5613477422','asdsa','asfdsafs','default-pfp.png',NULL),('5874812015','aaaasjnj','fsdgfdgsn','default-pfp.png',NULL),('6138005825','jasfdnjka','fdsbfsdau','default-pfp.png',NULL),('6320935084','ajdnajsnd','dhfbsdhbf','default-pfp.png',NULL),('6609045934','Pedro','Henrique','default-pfp.png',NULL),('7046149067','asdsad','asdffdsafas','default-pfp.png',NULL),('7461262997','hsdafbjhas','fbshajdbsahj','default-pfp.png',NULL),('7795191749','Henrique','Ferreira','default-pfp.png',NULL),('8212878825','asdausd','ashfbahfb','default-pfp.png',NULL),('8860506083','Pedro','Henrique','default-pfp.png',NULL),('9007468978','sadfdsafads','hbfdsjbfajhs','default-pfp.png',NULL),('9529608000','Henrique','Ferreira','default-pfp.png',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-03 16:58:50
