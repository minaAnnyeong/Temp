DROP TABLE IF EXISTS `member_category` CASCADE;
DROP TABLE IF EXISTS `member_payment` CASCADE;
DROP TABLE IF EXISTS `member` CASCADE;
DROP TABLE IF EXISTS `category` CASCADE;
DROP TABLE IF EXISTS `payment` CASCADE;


CREATE TABLE `member` (
                          `member_id` bigint NOT NULL AUTO_INCREMENT,
                          `member_name` varchar(50) NOT NULL,
                          `member_email` varchar(50) NOT NULL,
                          `password` varchar(50) NOT NULL,
                          PRIMARY KEY (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `category` (
                            `category_id` bigint NOT NULL AUTO_INCREMENT,
                            `category_name` varchar(50) DEFAULT NULL,
                            `category_type` varchar(50) DEFAULT NULL,
                            PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- join table : member <> category
CREATE TABLE  `member_category` (
                                    `member_id` bigint NOT NULL,
                                    `category_id` bigint NOT NULL,
                                    PRIMARY KEY (`member_id`, `category_id`),
                                    FOREIGN KEY (`member_id`) REFERENCES `member`(`member_id`) ON DELETE CASCADE,
                                    FOREIGN KEY (`category_id`) REFERENCES `category`(`category_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `payment` (
                           `payment_id` bigint NOT NULL AUTO_INCREMENT,
                           `payment_name` varchar(50) DEFAULT NULL,
                           `payment_type` varchar(50) DEFAULT NULL,
                           PRIMARY KEY (`payment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- join table : member <> payment
CREATE TABLE  `member_payment` (
                                   `member_id` bigint NOT NULL,
                                   `payment_id` bigint NOT NULL,
                                   PRIMARY KEY (`member_id`, `payment_id`),
                                   FOREIGN KEY (`member_id`) REFERENCES `member`(`member_id`) ON DELETE CASCADE,
                                   FOREIGN KEY (`payment_id`) REFERENCES `payment`(`payment_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
