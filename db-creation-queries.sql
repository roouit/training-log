-- Table creation queries
CREATE TABLE `user` (
`id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
`username` VARCHAR(50) NOT NULL,
`first_name` VARCHAR(50),
`last_name` VARCHAR(50),
`email` VARCHAR(100)
);

CREATE TABLE `exercise` (
`id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
`exercise_name` VARCHAR(100) NOT NULL
);

CREATE TABLE `workout` (
`id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
`user_id` int(11) UNSIGNED NOT NULL,
`date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES user (`id`)
);

CREATE TABLE `workout_exercises` (
`id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
`workout_id` int(11) UNSIGNED NOT NULL,
`exercise_id` int(11) UNSIGNED NOT NULL,
`set_number` int(11) UNSIGNED NOT NULL,
`repetitions` int(11) UNSIGNED NOT NULL DEFAULT 0,
`load` int(11) UNSIGNED NOT NULL DEFAULT 0,
CONSTRAINT `fk_exercise_id` FOREIGN KEY (`exercise_id`) REFERENCES exercise (`id`),
CONSTRAINT `fk_workout_id` FOREIGN KEY (`workout_id`) REFERENCES workout (`id`)
);

-- Insert data to user-table
INSERT INTO `user` (`username`, `first_name`, `last_name`, `email`)
VALUES ("roouit", "Roope", "Uitto", "roope.uitto@tamk.fi");
INSERT INTO `user` (`username`)
VALUES ("testi");

-- Insert data to exercise-table
INSERT INTO `exercise` (`exercise_name`)
VALUES ("Back squat"), ("Front squat"), ("Deadlift"), ("Romanian deadlift"), ("Bench press"),
("Shoulder press"), ("Pull up"), ("Chin up"), ("Bent row"), ("Goblet squat"), ("Hip thrust");

-- Insert data to workout-table
INSERT INTO `workout` (`user_id`)
VALUES (1), (2);
INSERT INTO `workout` (`user_id`, `date`)
VALUES (1, "2021-12-10 12:00:00"), (2, "2021-12-09 18:30:00");

-- Insert data to workout_exercises-table
INSERT INTO `workout_exercises` (`workout_id`, `exercise_id`, `set_number`, `repetitions`, `load`)
VALUES (1, 1, 1, 8, 80), (1, 1, 2, 8, 90), (1, 1, 3, 7, 95),
(1, 3, 1, 10, 120), (1, 3, 2, 8, 140), (1, 3, 3, 6, 160),
(1, 7, 1, 3, 30), (1, 7, 2, 2, 40), (1, 7, 3, 1, 50), (1, 7, 4, 1, 55),
(1, 10, 1, 15, 32), (1, 10, 2, 23, 32);
INSERT INTO `workout_exercises` (`workout_id`, `exercise_id`, `set_number`, `repetitions`, `load`)
VALUES (2, 1, 1, 8, 60), (2, 1, 2, 10, 60), (2, 1, 3, 13, 60), (2, 1, 4, 15, 60),
(2, 4, 1, 10, 100), (2, 4, 2, 10, 105), (2, 4, 3, 9, 110);
INSERT INTO `workout_exercises` (`workout_id`, `exercise_id`, `set_number`, `repetitions`)
VALUES (4, 2, 1, 6);
INSERT INTO `workout_exercises` (`workout_id`, `exercise_id`, `set_number`)
VALUES (5, 8, 1);