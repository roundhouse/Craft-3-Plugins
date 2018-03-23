let mix = require('laravel-mix');

const sourcePath = 'development';
const distPath = 'release/src/assets';

mix.js(sourcePath + '/js/emailbuilder.js', distPath + '/js/')
    .sass(sourcePath + '/scss/emailbuilder.scss', distPath + '/css/')
        .options({
            processCssUrls: false
        })
    .sourceMaps();