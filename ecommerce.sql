-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 03, 2025 at 08:30 PM
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
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `items` text DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `items`, `total`, `address`, `phone`, `created_at`) VALUES
(3, 1, '[{\"id\":13,\"name\":\"Orange juice\",\"price\":\"1.80\",\"description\":\"Natural juice without sugar\",\"image_url\":\"https://cdn.gardengrocer.com/attachments/photos/high_res/6515.jpeg?9528\",\"stock\":0},{\"id\":12,\"name\":\"Bread\",\"price\":\"1.10\",\"description\":\"Fresh white bread\",\"image_url\":\"https://www.besplatnadostava.rs/wp-content/uploads/2020/02/hleb-beli.png\",\"stock\":0}]', 1.80, 'Address11', '+125352252', '2025-09-03 18:27:48');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `stock` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `image_url`, `stock`) VALUES
(8, 'Apple', 0.50, 'Fresh red apple', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg', 0),
(9, 'Banana', 0.40, 'Sweet and ripe banana', 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg', 0),
(10, 'Biscuit', 1.20, 'Chocolate chip cookie', 'https://cdn.craft.cloud/224393fa-1975-4d80-9067-ada3cb5948ca/assets/Soft-and-Chewy-Chocolate-Chip-Cookie-Recipe-450x300_2022.jpg', 0),
(11, 'Milk', 1.00, 'Fresh cows milk 1L', 'https://www.shutterstock.com/image-vector/tall-glass-milk-carton-box-600nw-2017090295.jpg', 0),
(12, 'Bread', 1.10, 'Fresh white bread', 'https://www.besplatnadostava.rs/wp-content/uploads/2020/02/hleb-beli.png', 0),
(13, 'Orange juice', 1.80, 'Natural juice without sugar', 'https://cdn.gardengrocer.com/attachments/photos/high_res/6515.jpeg?9528', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `cart` text DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `cart`, `phone`, `address`) VALUES
(1, 'Vladimir', '$2b$10$MuGsc0jtLg9Xf59P0y8lw.WL6fLpROFVqUDZBjkZw0w0EesMje8Ba', '[{\"id\":13,\"name\":\"Orange juice\",\"price\":\"1.80\",\"description\":\"Natural juice without sugar\",\"image_url\":\"https://cdn.gardengrocer.com/attachments/photos/high_res/6515.jpeg?9528\",\"stock\":0},{\"id\":12,\"name\":\"Bread\",\"price\":\"1.10\",\"description\":\"Fresh white bread\",\"image_url\":\"https://www.besplatnadostava.rs/wp-content/uploads/2020/02/hleb-beli.png\",\"stock\":0}]', '22222', 'sssss');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
