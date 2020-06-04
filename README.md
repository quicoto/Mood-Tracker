# Mood Tracker

## To do

- [ ] [BE for PHP Authentication](https://phppot.com/php/php-login-script-with-session/)
- [ ] PHP Password encryption to DB, which method?
- [ ] Use a index.php to check for the server session and avoid ajax call on load.
- [ ] Add PWA features, so it can be installed.
- [ ] Documentation

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

### Mood Type table

## Other

### Build

`npm run build` create the production ready `dist` folder

### Icons

Made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
