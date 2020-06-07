# Mood Tracker

![Screenshot](https://cldup.com/oHSwdVGpPn.png)

## Push Notifications

Using the Notifications Api the app, if open, pushes you a nice reminder every day around the 21h.

## Code structure

To make this work on your webserver it should look like this.

`/connection.php` This file is not in the repo
`/dist` The application build folder

### connection.php

This is the content of the `connection.php` you should manually create in your web server.

Amend the host, user, and password to match your configuration.

```
$host = "localhost";
$user = "user";
$password = "password";
$database = "mood_tracker";

// Connect
$mysqli = new mysqli($host, $user, $password, $database);

// Handle error
if (mysqli_connect_error()) {
  http_response_code(500);
  die('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
}
```

## Database

MySQL

### User table

```
CREATE TABLE `users` (
  `id` int(8) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;
```

### Moods table

```
CREATE TABLE `moods` (
  `id` int(8) NOT NULL,
  `type` int(8) NOT NULL,
  `user` int(8) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `moods`
  ADD PRIMARY KEY (`id`);
```

### Mood Type table

```
CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
  COMMIT;
```

## Other

### Build

`npm run build` create the production ready `dist` folder

### Icons

Made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
