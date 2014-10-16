-- MySQL dump 10.13  Distrib 5.6.16, for osx10.7 (x86_64)
--
-- Host: localhost    Database: NBA
-- ------------------------------------------------------
-- Server version	5.6.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `event_id`
--

DROP TABLE IF EXISTS `event_id`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_id` (
  `event_id` int(11) NOT NULL AUTO_INCREMENT,
  `event_type` varchar(45) NOT NULL,
  PRIMARY KEY (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1014 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_id`
--

LOCK TABLES `event_id` WRITE;
/*!40000 ALTER TABLE `event_id` DISABLE KEYS */;
INSERT INTO `event_id` VALUES (1001,'twopointmiss'),(1002,'rebound'),(1003,'shootingfoul'),(1004,'freethrowmiss'),(1005,'twopointmade'),(1006,'turnover'),(1007,'threepointmiss'),(1008,'personalfoul'),(1009,'freethrowmade'),(1010,'offensivefoul'),(1011,'teamtimeout'),(1012,'threepointmade'),(1013,'technicalfoul');
/*!40000 ALTER TABLE `event_id` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game` (
  `game_id` int(11) NOT NULL,
  `team1_id` int(11) NOT NULL,
  `team2_id` int(11) NOT NULL,
  PRIMARY KEY (`game_id`),
  KEY `team_id_idx` (`team1_id`,`team2_id`),
  KEY `team2_id_idx` (`team2_id`),
  CONSTRAINT `team2_id` FOREIGN KEY (`team2_id`) REFERENCES `team` (`team_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `team1_id` FOREIGN KEY (`team1_id`) REFERENCES `team` (`team_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `play_by_play`
--

DROP TABLE IF EXISTS `play_by_play`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `play_by_play` (
  `game_id` int(11) NOT NULL,
  `period` int(11) NOT NULL,
  `clock` time NOT NULL,
  `position_x` int(11) DEFAULT NULL,
  `position_y` int(11) DEFAULT NULL,
  `event_id` int(11) NOT NULL,
  `player_number` int(11) DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL,
  `assist` int(11) DEFAULT NULL,
  `describe` text NOT NULL,
  KEY `event_id_idx` (`event_id`),
  KEY `game_id_idx` (`game_id`),
  KEY `team_id_idx` (`team_id`),
  CONSTRAINT `team_fk` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `event_id` FOREIGN KEY (`event_id`) REFERENCES `event_id` (`event_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `game_id` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `play_by_play`
--

LOCK TABLES `play_by_play` WRITE;
/*!40000 ALTER TABLE `play_by_play` DISABLE KEYS */;
/*!40000 ALTER TABLE `play_by_play` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `player` (
  `name` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `player_number` int(11) NOT NULL,
  KEY `team_id_idx` (`team_id`),
  CONSTRAINT `team_id` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (
  `team_id` int(11) NOT NULL,
  `team_name` varchar(45) NOT NULL,
  PRIMARY KEY (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (1,'Bulls'),(2,'Pacers'),(3,'Wizards'),(4,'Nets'),(5,'Knicks'),(6,'76ers'),(7,'Hornets'),(8,'Cavaliers'),(9,'Warriors'),(10,'Pistons'),(11,'Timberwolves'),(12,'Grizzlies'),(13,'Lakers'),(14,'Rockets'),(15,'Hawks'),(16,'Pelicans'),(17,'Celtics'),(18,'Spurs'),(19,'Raptors'),(20,'Clippers'),(21,'Jazz'),(22,'Heat'),(23,'Bucks'),(24,'Mavericks'),(25,'Suns'),(26,'Thunder'),(27,'Kings'),(28,'Trail Blazers'),(29,'Nuggets'),(30,'Magic');
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-10-15 22:26:52
