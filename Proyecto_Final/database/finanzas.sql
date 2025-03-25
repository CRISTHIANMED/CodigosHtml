-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 25, 2025 at 02:56 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `finanzas`
--

-- --------------------------------------------------------

--
-- Table structure for table `movimientos`
--

CREATE TABLE `movimientos` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `tipo` enum('Ingreso','Gasto') NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `person_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movimientos`
--

INSERT INTO `movimientos` (`id`, `descripcion`, `monto`, `tipo`, `fecha`, `person_id`) VALUES
(1, 'Sueldo', 2000000.00, 'Ingreso', '2025-03-23 06:21:33', 1),
(2, 'arrendo', 500000.00, 'Gasto', '2025-03-23 06:36:55', 1),
(8, 'sueldo', 2500000.00, 'Ingreso', '2025-03-23 18:52:25', 2),
(9, 'sueldo', 2000000.00, 'Ingreso', '2025-03-23 18:52:25', 2),
(10, 'comida', 500000.00, 'Gasto', '2025-03-23 19:06:03', 2),
(11, 'comida', 50000.00, 'Gasto', '2025-03-23 19:10:03', 2),
(14, 'Sueldo', 500000.00, 'Ingreso', '2025-03-23 22:40:21', 1),
(15, 'Sueldo', 25000000.00, 'Ingreso', '2025-03-24 23:47:01', 3),
(16, 'Arrendo', 5500000.00, 'Gasto', '2025-03-24 23:47:54', 3);

-- --------------------------------------------------------

--
-- Table structure for table `persona`
--

CREATE TABLE `persona` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `persona`
--

INSERT INTO `persona` (`id`, `nombre`, `apellido`, `email`, `password`) VALUES
(1, 'Cristhian', 'Medina', 'cristhian.medina.or@hotmail.com', '$2b$10$fKi2x7FQeEQWLYDbHFXWNOkQ/lQgFNye.naSO9tr7rwDmcRirWsrK'),
(2, 'Esteban', 'Ortega', 'cristhianmedina@udenar.edu.co', '$2b$10$Qm8pd1mJF5Skd88sB8c/R.fG59oiBQM6EPLQWs1HMhjO/DziqDJlq'),
(3, 'Juan', 'Medina', 'cajatumaco@sure.com.co', '$2b$10$EYwYL/oeQAufLU5O9uGXTuQz/7u0fxF34.Ds.RRJHprRLggUAAYzC');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `movimientos`
--
ALTER TABLE `movimientos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_movimientos_persona` (`person_id`);

--
-- Indexes for table `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `movimientos`
--
ALTER TABLE `movimientos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `persona`
--
ALTER TABLE `persona`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `movimientos`
--
ALTER TABLE `movimientos`
  ADD CONSTRAINT `fk_movimientos_persona` FOREIGN KEY (`person_id`) REFERENCES `persona` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
