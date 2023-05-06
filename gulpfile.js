const gulp = require("gulp");
const gulpIf = require("gulp-if");
const plumber = require("gulp-plumber");
const sass = require("gulp-dart-sass");
const cssnano = require("cssnano");
const strip = require("gulp-strip-banner");
const webp = require("gulp-webp");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const eslint = require("gulp-eslint");
const imagemin = require("gulp-imagemin");
const { spawn } = require("child_process");
const jsdoc = require("gulp-jsdoc3");
const sassdoc = require("gulp-sassdoc");
const realFavicon = require("gulp-real-favicon");
const FAVICON_DATA_FILE = "faviconData.json";
const htmlmin = require("gulp-htmlmin");
const sitemap = require("gulp-sitemap");
const browserSyncServer = require("browser-sync").create();
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");

const isProduction = process.env.NODE_ENV === "production";

const paths = {
    styles: {
        src: "./src/assets/sass/**/*.scss",
        dest: "./dist/assets/css/",
    },
    scripts: {
        src: "./src/assets/js/**/*.js",
        dest: "./dist/assets/js/",
    },
    html: {
        src: "./src/*.html",
        dest: "./dist/",
    },
    fonts: {
        src: [
            "./src/assets/fonts/**/*.ttf",
            "./src/assets/fonts/**/*.woff",
            "./src/assets/fonts/**/*.woff2",
        ],
        dest: "./dist/assets/fonts/",
    },
    images: {
        src: [
            "./src/assets/images/**/*.svg",
            "./src/assets/images/**/*.jpg",
            "./src/assets/images/**/*.png",
            "./src/assets/images/**/*.gif",
        ],
        dest: "./dist/assets/images/",
    },
};

// Compile SCSS to CSS, autoprefix and create sourcemaps
const css = () => {
    return (
        gulp
            .src(paths.styles.src)
            .pipe(plumber())
            // Initialize sourcemaps for development only
            .pipe(gulpIf(!isProduction, sourcemaps.init()))
            .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
            .pipe(
                postcss([
                    autoprefixer({
                        overrideBrowserslist: ["last 2 versions", "ie >= 10"],
                    }),
                    cssnano(),
                ]),
            )
            .pipe(strip())
            // Write sourcemaps for development only
            .pipe(gulpIf(!isProduction, sourcemaps.write("./")))
            .pipe(gulp.dest(paths.styles.dest))
            .pipe(browserSyncServer.stream())
    );
};

// Lint, transpile, concatenate and minify JavaScript, create sourcemaps
const javascript = () => {
    const b = browserify({
        entries: "./src/assets/js/main.js",
        debug: true,
        transform: [["babelify", { presets: ["@babel/preset-env"] }]],
    });

    return b
        .bundle()
        .pipe(source("main.min.js"))
        .pipe(buffer())
        .pipe(plumber())
        .pipe(gulpIf(!isProduction, sourcemaps.init({ loadMaps: true })))
        .pipe(eslint())
        .pipe(strip())
        .pipe(uglify())
        .on("error", console.error) // Remplacez 'log.error' par 'console.error'
        .pipe(gulpIf(!isProduction, sourcemaps.write("./")))
        .pipe(gulp.dest("./dist/assets/js/"));
};

// Copy HTML files
const html = () => {
    return gulp
        .src(paths.html.src)
        .pipe(
            htmlmin({
                collapseWhitespace: true,
                removeComments: true,
            }),
        )
        .pipe(gulp.dest(paths.html.dest));
};

// Copy php files
const phpFiles = () => {
    return gulp.src("./src/**/*.php").pipe(gulp.dest("./dist/"));
};
// Copy php files templates
const phpFilesTemplates = () => {
    return gulp.src("./src/templates/**/*.php").pipe(gulp.dest("./dist/templates/"));
};

// Php
function php(done) {
    const phpServer = spawn("php", ["-S", "127.0.0.1:8000", "-t", "dist"]);

    phpServer.stdout.on("data", (data) => {
        console.log(`PHP Server: ${data}`);
    });

    phpServer.stderr.on("data", (data) => {
        console.error(`PHP Server: ${data}`);
    });

    phpServer.on("close", (code) => {
        console.log(`PHP server exited with code ${code}`);
    });

    done();
}

// Génération de la documentation JavaScript
const generateJsdoc = () => {
    return gulp
        .src(["README.md", "./src/assets/js/**/*.js"], { read: false })
        .pipe(jsdoc());
};

// Génération de la documentation Sass
const generateSassdoc = () => {
    return gulp.src(paths.styles.src).pipe(sassdoc({ dest: "docs/sassdoc" }));
};

// generate favicon
const generateFavicon = (done) => {
    realFavicon.generateFavicon(
        {
            masterPicture: "./src/assets/favicon/master_favicon.png", // Chemin vers l'image source
            dest: "./dist/assets/favicon/",
            iconsPath: "/assets/favicon/",
            design: {
                // Configurations pour les différentes plateformes
            },
            settings: {
                scalingAlgorithm: "Mitchell",
                errorOnImageTooSmall: false,
            },
            markupFile: FAVICON_DATA_FILE,
        },
        done,
    );
};

const generateSitemap = () => {
    return gulp
        .src(paths.html.src, {
            read: false,
        })
        .pipe(
            sitemap({
                siteUrl: "http://example.com", // Remplacez par l'URL de votre site
            }),
        )
        .pipe(gulp.dest(paths.html.dest));
};

// Copy font files
const fonts = () => {
    return gulp
        .src([
            "./src/assets/fonts/**/*.ttf",
            "./src/assets/fonts/**/*.woff",
            "./src/assets/fonts/**/*.woff2",
        ])
        .pipe(gulp.dest("./dist/assets/fonts/"));
};

// Watch files for changes
const watchFiles = () => {
    gulp.watch(paths.styles.src, css);
    gulp.watch(paths.scripts.src, javascript);
    gulp.watch(paths.fonts.src, fonts);
    gulp.watch(paths.images.src, gulp.series(webpImages, compressImages));
    gulp.watch(paths.html.src, gulp.series(html, browserReload));
    gulp.watch("./src/**/*.php", gulp.series(phpFiles, phpFilesTemplates, browserReload));
};

// Initialize BrowserSync server
const browserSync = (done) => {
    browserSyncServer.init({
        proxy: "127.0.0.1:8000", // Changez ceci
        port: 3000,
        open: true,
        notify: false,
        logLevel: "debug",
        logPrefix: "Browsersync",
    });
    done();
};

// Reload BrowserSync
const browserReload = (done) => {
    browserSyncServer.reload();
    done();
};

// Convert images to WebP format
const webpImages = () => {
    return gulp
        .src(paths.images.src)
        .pipe(webp())
        .pipe(gulp.dest("./src/assets/images/"));
};

// Compress images
const compressImages = () => {
    return gulp
        .src([...paths.images.src, "./src/assets/images/**/*.webp"])
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
            }),
        )
        .pipe(gulp.dest(paths.images.dest));
};

const build = gulp.series(
    html,
    css,
    javascript,
    webpImages,
    compressImages,
    fonts,
    phpFiles,
    phpFilesTemplates,
);
const watch = gulp.series(build, php, gulp.parallel(watchFiles, browserSync));
const compress = gulp.series(compressImages);

exports.watch = watch;
exports.compress = compress;
exports.default = build;
