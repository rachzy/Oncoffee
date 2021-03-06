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
-- Table structure for table `searches`
--

DROP TABLE IF EXISTS `searches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `searches` (
  `searchId` int NOT NULL AUTO_INCREMENT,
  `searchValue` varchar(255) NOT NULL,
  `searchUserId` varchar(10) NOT NULL,
  `searchTimeMs` bigint NOT NULL,
  PRIMARY KEY (`searchId`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `searches`
--

LOCK TABLES `searches` WRITE;
/*!40000 ALTER TABLE `searches` DISABLE KEYS */;
INSERT INTO `searches` VALUES (1,'Exemplo1','25022006',1643043425532),(2,'Exemplo1','25022006',1643043544849),(3,'Exemplo2','25022006',1643044161140),(4,'asdfasd','25022006',1643044190926),(5,'asdfasd','25022006',1643044191752),(6,'asdas','25022006',1643044240992),(7,'Exemplo1','25022006',1643044994694),(8,'Exemplo1','25022006',1643045096129),(9,'qualquer coisa','25022006',1643046354615),(10,'dsfdssdaa','25022006',1643117216771),(11,'asdasdsa','25022006',1643117750275),(12,'nova pesquisa','25022006',1643117758766),(13,'Cafeteira Nespresso','25022006',1643117848248),(14,'Cápsula de Café Espresso Pimpinela Gourmet Tres','',1643118713978),(15,'Café 1','',1643124889030),(16,'Café 1','25022006',1643127991229),(17,'Café 1','25022006',1643128480671),(18,'asdfsdf','25022006',1643130835874),(19,'test','25022006',1643131543067),(20,'test','25022006',1643131632631),(21,'dfghdf','25022006',1643131714294),(22,'tt','25022006',1643131764076),(23,'tt','25022006',1643131776662),(24,'a','25022006',1643216831574),(25,'aa','25022006',1643216831579),(26,'a','25022006',1643216857492),(27,'aa','25022006',1643216895962),(28,'aaa','25022006',1643216898213),(29,'aaad','25022006',1643216898255),(30,'a','25022006',1643217087155),(31,'ad','25022006',1643217087258),(32,'ads','25022006',1643217087522),(33,'adsf','25022006',1643217088041),(34,'adsfa','25022006',1643217088189),(35,'adsfas','25022006',1643217088289),(36,'teste','25022006',1643224324896),(37,'zzzzzzz','25022006',1643224499289),(38,'asdas','25022006',1643224548615),(39,'dfsfds','25022006',1643224699986),(40,'teste2','25022006',1643224825836),(41,'xxxxx','25022006',1643224873157),(42,'','25022006',1643290786996),(43,'dfsfds','25022006',1643290886721),(44,'teste2','25022006',1643290963616),(45,'xxxxx','25022006',1643291065128),(46,'Cafeteira Nespresso','25022006',1643291080931),(47,'Cápsula de Café Espresso Pimpinela Gourmet Tres','25022006',1643291089324),(48,'Combo Café-Gourmet','25022006',1643291096546),(49,'xxxxx','25022006',1643291118810),(50,'Cafeteira Nespresso','25022006',1643291410902),(51,'xxxxx','25022006',1643291433294),(52,'Combo Café-Gourmet','25022006',1643291437206),(53,'xxxxx','25022006',1643294187386),(54,'xxxxx','25022006',1643294292638),(55,'xxxxx','25022006',1643298674778),(56,'xxxxx','25022006',1643298719643),(57,'ultima pesquisa','25022006',1643405061099),(58,'sdfsfdsfs','25022006',1643405069412),(59,'ultima pesquisa','25022006',1643405074174),(60,'pesquisa recente','25022006',1643405158449),(61,'pesquisa recente','25022006',1643405189589),(62,'ultima pesquisa','25022006',1643405189619),(63,'ultima pesquisa','25022006',1643405189621),(64,'sdfsfdsfs','25022006',1643405189627),(65,'sdfsfdsfs','25022006',1643733370191),(66,'dfsfds','25022006',1645319063356),(67,'teste2','25022006',1645320996897);
/*!40000 ALTER TABLE `searches` ENABLE KEYS */;
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
