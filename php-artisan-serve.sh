#!/bin/bash

echo "Starting XAMPP"
/c/xampp/xampp-control.exe &

echo ""
echo "Running NPM watch"
git-bash.exe /c/xampp/htdocs/laravel/pi_theater_2/npm-run-watch.sh &

echo ""
echo "Starting PHP server"
php artisan serve
$SHELL