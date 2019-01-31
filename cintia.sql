-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 31-01-2019 a las 11:53:31
-- Versión del servidor: 10.1.28-MariaDB
-- Versión de PHP: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cintia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `activity`
--

CREATE TABLE `activity` (
  `activityId` int(11) NOT NULL,
  `clientsId` int(11) NOT NULL,
  `hash` varchar(255) NOT NULL,
  `usersId` int(11) NOT NULL,
  `jobsId` int(11) NOT NULL,
  `tags` varchar(255) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `duration` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `activity`
--

INSERT INTO `activity` (`activityId`, `clientsId`, `hash`, `usersId`, `jobsId`, `tags`, `start`, `end`, `duration`) VALUES
(3, 2, '-1', 3, 3, '', '2019-01-30 16:56:59', '2019-01-30 16:57:03', 0.05),
(4, 2, '-1', 3, 2, '', '2019-01-30 17:13:39', '2019-01-30 17:13:41', 0.03),
(5, 2, '-1', 3, 62, '', '2019-01-31 11:49:12', '2019-01-31 11:49:14', 0.03),
(7, 1, '-1', 3, 62, '', '2019-01-31 11:51:39', '2019-01-31 11:51:41', 0.04);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clients`
--

CREATE TABLE `clients` (
  `clientsId` int(11) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `clients`
--

INSERT INTO `clients` (`clientsId`, `logo`, `name`, `created`, `updated`) VALUES
(1, '', 'Demo', '2019-01-30 13:04:51', '2019-01-30 13:14:13'),
(2, '', 'Pepa Paper', '2019-01-30 13:04:51', '2019-01-30 13:14:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `jobsId` int(11) NOT NULL,
  `clientsId` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `jobs`
--

INSERT INTO `jobs` (`jobsId`, `clientsId`, `parent_id`, `name`, `created`, `updated`) VALUES
(1, 2, 0, 'Enganxar', '2019-01-30 13:05:31', '2019-01-30 13:15:06'),
(2, 2, 0, 'Tallar', '2019-01-30 13:05:31', '2019-01-30 13:15:12'),
(3, 2, 0, 'Enmagatzemar', '2019-01-30 13:05:31', '2019-01-30 13:15:23'),
(61, 0, 0, 'Retallar', '2019-01-31 11:28:44', '2019-01-31 11:28:44'),
(62, 0, 0, 'Netejar', '2019-01-31 11:28:49', '2019-01-31 11:28:49');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `usersId` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`usersId`, `client_id`, `name`, `password`, `email`, `created`, `updated`) VALUES
(1, 1, 'Lucas', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 'betolopezayesa@gmail.com', '2019-01-30 17:18:52', '2019-01-31 11:29:32'),
(3, 0, 'demo', '6bb61e3b7bce0931da574d19d1d82c88', 'betolopezayesa@gmail.com', '2019-01-31 11:29:34', '2019-01-31 11:29:34');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`activityId`);

--
-- Indices de la tabla `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`clientsId`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`jobsId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`usersId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `activity`
--
ALTER TABLE `activity`
  MODIFY `activityId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `clients`
--
ALTER TABLE `clients`
  MODIFY `clientsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `jobsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `usersId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
