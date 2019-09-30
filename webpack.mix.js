let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.setPublicPath('../html/pi_theater_2/')
   .js('resources/assets/js/app.js', 'js')
   .js('resources/assets/js/browse.js', 'js')
   .js('resources/assets/js/upload.js', 'js')
   .sass('resources/assets/sass/app.scss', 'css')
   .sass('resources/assets/sass/bootstrap_pi.scss', 'css');
