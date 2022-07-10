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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `productId` int NOT NULL DEFAULT (floor((rand(10) * 1000000000))),
  `productName` varchar(50) NOT NULL,
  `productDescription` text NOT NULL,
  `productImgSrc` varchar(255) NOT NULL,
  `productImgAlt` varchar(50) NOT NULL DEFAULT 'default-product-oncoffee',
  `productSellerId` int NOT NULL,
  `productPrice` float NOT NULL,
  `productDiscount` int NOT NULL,
  `productFinalPrice` float NOT NULL,
  `productStockAmount` int NOT NULL,
  `productTotalSales` int NOT NULL,
  `productGrade` float NOT NULL,
  `productCategory` enum('CAFES','CAFETEIRAS','ACESSORIOS','CAPSULAS','DERIVADOS') NOT NULL DEFAULT 'CAFES',
  `productCreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `productEnabled` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`productId`),
  UNIQUE KEY `productid_UNIQUE` (`productId`) /*!80000 INVISIBLE */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (43529415,'Combo Café-Gourmet','Lorem Ipsium bla bla bla','Combo_CafesGourmet.png','combo-cafesgourmet-product',25022006,100,70,30,40,130,4.9,'ACESSORIOS','2022-01-06 21:00:31',1),(128206130,'Combo Café-Gourmet','Lorem Ipsium bla bla bla','Combo_CafesGourmet.png','combo-cafegourmet',25022006,240,50,120,90,14,4.8,'ACESSORIOS','2022-01-19 14:34:57',1),(176627286,'Capsula de Cafe Espresso Pimpinela','Lorem Ipsium bla bla bla','capsula-de-cafe-espresso-pimpinela-gourmet-tres-01.png','combo-cafegourmet',25022006,240,50,120,90,14,4.8,'ACESSORIOS','2022-01-19 14:36:05',1),(184656529,'Capsula de Cafe Espresso Pimpinela','Lorem Ipsium bla bla bla','capsula-de-cafe-espresso-pimpinela-gourmet-tres-01.png','combo-cafegourmet',25022006,240,50,120,90,14,4.8,'ACESSORIOS','2022-01-19 14:36:03',1),(198470870,'Batedeira Lenoxx 2.0','Lorem Ipsium bla bla bla','batedeira.png','batedeira-lenoxx',25022006,240,50,120,90,14,4.8,'ACESSORIOS','2022-01-19 12:45:47',1),(228817495,'Capsula de Cafe Espresso Pimpinela','Lorem Ipsium bla bla bla','capsula-de-cafe-espresso-pimpinela-gourmet-tres-01.png','combo-cafegourmet',25022006,240,50,120,90,14,4.8,'ACESSORIOS','2022-01-19 14:35:57',1),(264137142,'Combo Café-Gourmet','Lorem Ipsium bla bla bla','Combo_CafesGourmet.png','combo-cafegourmet',25022006,240,50,120,90,14,4.8,'ACESSORIOS','2022-01-19 14:34:59',1),(440588115,'Batedeira Lenoxx','Lorem Ipsium bla bla bla','batedeira.png','batedeira-lenoxx',25022006,200,20,160,67,35,4.6,'ACESSORIOS','2022-01-18 11:23:22',1),(550331984,'Combo Café-Gourmet','Lorem Ipsium bla bla bla','Combo_CafesGourmet.png','combo-cafegourmet',25022006,240,50,120,90,14,4.8,'ACESSORIOS','2022-01-19 14:34:57',1),(590117919,'Cafeteira Nespresso','Lorem Ipsium bla bla bla','cafeteira.png','cafeteira-nespresso-product',25022006,130,50,65.75,40,130,4.9,'CAFETEIRAS','2022-01-06 20:07:19',1),(657051521,'Capsula de Cafe Espresso Pimpinela','Lorem Ipsium bla bla bla','capsula-de-cafe-espresso-pimpinela-gourmet-tres-01.png','combo-cafegourmet',25022006,240,50,120,90,14,4.8,'ACESSORIOS','2022-01-19 14:36:06',1),(669876116,'Combo Café-Gourmet','Lorem Ipsium bla bla bla','Combo_CafesGourmet.png','combo-cafegourmet',25022006,240,50,120,90,14,4.8,'ACESSORIOS','2022-01-19 14:34:56',1),(673058746,'Café 1','O café tem notas de chocolate com canela, uma torra clara achocolatada, Alta Qualidade.','cafegourmet.png','cafe-gourmet-1',25022006,50.5,50,27.5,120,60,4.8,'CAFES','2022-01-05 12:12:13',1),(713418096,'Batedeira Lenoxx 2.0','Lorem Ipsium bla bla bla','batedeira.png','batedeira-lenoxx',25022006,240,50,120,90,14,4.8,'ACESSORIOS','2022-01-19 12:47:59',1),(768706269,'Batedeira Lenoxx 2.0','Lorem Ipsium bla bla bla','batedeira.png','batedeira-lenoxx',25022006,240,50,120,90,14,4.8,'ACESSORIOS','2022-01-19 12:47:15',1),(814182783,'Cápsula de Café Espresso Pimpinela Gourmet Tres','Lorem Ipsium bla bla bla','capsula-de-cafe-espresso-pimpinela-gourmet-tres-01.png','capsula-cafe-pimpinela',25022006,100,40,60,348,297,4.3,'CAPSULAS','2022-01-07 08:43:31',1),(861766135,'Combo Café-Gourmet','Lorem Ipsium bla bla bla','Combo_CafesGourmet.png','combo-cafegourmet',25022006,240,50,120,90,14,4.8,'ACESSORIOS','2022-01-19 14:34:55',1),(898155061,'Batedeira Lenoxx 2.0','Lorem Ipsium bla bla bla','batedeira.png','batedeira-lenoxx',25022006,240,50,120,90,14,4.8,'ACESSORIOS','2022-01-19 12:48:02',1),(959248524,'Combo Café-Gourmet','Lorem Ipsium bla bla bla','Combo_CafesGourmet.png','combo-cafesgourmet-product',25022006,180,50,90,40,130,4.9,'ACESSORIOS','2022-01-06 20:12:32',1),(964762220,'Capsula de Cafe Espresso Pimpinela','Lorem Ipsium bla bla bla','capsula-de-cafe-espresso-pimpinela-gourmet-tres-01.png','combo-cafegourmet',25022006,240,50,120,90,14,4.8,'ACESSORIOS','2022-01-19 14:35:59',1),(981792105,'Batedeira Lenoxx 2.0','Lorem Ipsium bla bla bla','batedeira.png','batedeira-lenoxx',25022006,240,50,120,90,14,4.8,'ACESSORIOS','2022-01-19 12:47:58',1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-03 16:58:51
