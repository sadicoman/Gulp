# Gulp Starter

Toutes les dépendances sont configurées dans le fichier package.json.  
Exécutez `npm install` ou installez manuellement les modules suivants.

## Installation des packages de base

```
npm init
npm install --save-dev gulp
npm install --save-dev gulp-sass
```

### Gulp

Gulp est un outil d'automatisation des tâches pour optimiser et améliorer le flux de travail du développement.

### gulp-dart-sass

Ce package permet de compiler les fichiers SCSS en fichiers CSS.

## Packages pour SASS et CSS

```
npm install --save-dev gulp-sourcemaps
npm install --save-dev gulp-postcss
npm install --save-dev autoprefixer
npm install --save-dev cssnano
```

### gulp-sourcemaps

Ce package permet de générer des sourcemaps pour les fichiers CSS et JavaScript.

### gulp-postcss

Ce package permet de transformer les fichiers CSS avec des plugins PostCSS.

### autoprefixer

Ce package ajoute automatiquement les préfixes de fournisseurs aux règles CSS.

### cssnano

Ce package permet de minifier les fichiers CSS.

## Packages pour JavaScript

```
npm install --save-dev gulp-babel
npm install --save-dev @babel/preset-env
npm install --save-dev gulp-concat
npm install --save-dev gulp-uglify
```

### gulp-babel

Ce package permet de transpiler le code JavaScript ES6 en ES5.

### gulp-concat

Ce package permet de concaténer plusieurs fichiers JavaScript en un seul fichier.

### gulp-uglify

Ce package permet de minifier les fichiers JavaScript.

## Installation de BrowserSync

```
npm install --save-dev browser-sync
```

### browser-sync

Ce package permet de synchroniser les modifications apportées aux fichiers avec le navigateur en temps réel.

## Installation d'Imagemin

```
npm install --save-dev gulp-imagemin
npm install --save-dev gulp-webp
npm install --save-dev gulp-strip-banner
```

### gulp-imagemin

Ce package permet d'optimiser et de compresser les images.

### gulp-webp

Ce package permet de convertir les images au format WebP.

### gulp-strip-banner

Ce package permet de supprimer les en-têtes de licence et les commentaires des fichiers CSS et JavaScript.

## Installation d'Eslint

```
npm install --save-dev gulp-eslint
./node_modules/.bin/eslint --init
```

### gulp-eslint

Ce package permet de vérifier la qualité et le respect des conventions du code JavaScript.

## Browserify

Browserify permet de gérer les dépendances entre les fichiers JavaScript et d'utiliser le système de modules CommonJS dans le navigateur.

```
npm install --save-dev browserify
```

## vinyl-buffer

Vinyl-buffer permet de convertir des flux en tampons pour une meilleure compatibilité entre les plugins Gulp.

```
npm install --save-dev vinyl-buffer
```

## vinyl-source-stream

Vinyl-source-stream permet de convertir des flux de texte en flux vinyl pour une meilleure compatibilité entre les plugins Gulp.

```
npm install --save-dev vinyl-source-stream
```

## babelify

Babelify est un transformateur Browserify pour Babel, permettant de transpiler le code JavaScript ES6 en ES5 lors de l'utilisation de Browserify.

```
npm install --save-dev babelify
```

## Gulp-Util

Gulp-util est une collection d'utilitaires pour aider à travailler avec Gulp.

```
npm install --save-dev gulp-util
```

## Vinyl-Buffer et Vinyl-Source-Stream

Vinyl est un format de métadonnées très flexible qui décrit les fichiers. Vinyl-Buffer et Vinyl-Source-Stream sont des modules qui facilitent le travail avec les flux de fichiers Vinyl dans Gulp.

```
npm install --save-dev vinyl-buffer vinyl-source-stream
```

## Webpack

Webpack est un module de bundler populaire pour JavaScript. Il vous permet de lier tous vos modules JavaScript ensemble dans un ou plusieurs fichiers de sortie, tout en tenant compte des dépendances.

```
npm install --save-dev webpack webpack-stream
```

## TerserWebpackPlugin

Terser est une minificateur JavaScript populaire qui est capable de parcourir et de transformer votre code afin de le rendre aussi petit que possible. Ce plugin est le minificateur par défaut utilisé par Webpack lorsqu'il est en mode production. Il supprime les espaces blancs inutiles, les commentaires, renomme les variables et les fonctions avec des noms plus courts, et effectue d'autres optimisations pour réduire la taille de votre code.

Pour l'installer :

```
npm install terser-webpack-plugin --save-dev
```

## Tree Shaking avec Webpack

C'est une fonctionnalité fournie par Webpack qui permet d'éliminer le code mort de vos bundles. Le code mort est le code qui est inclus dans votre bundle mais qui n'est jamais utilisé. Par exemple, vous pouvez avoir des fonctions ou des modules qui sont importés mais jamais utilisés. Avec le Tree Shaking, Webpack est capable de détecter et de supprimer ce code inutilisé, ce qui permet de réduire la taille de votre bundle.

Pour l'activer, il suffit de mettre mode: 'production' dans votre fichier webpack.config.js.

## Modification du script JavaScript

Avec l'ajout de Webpack et Terser, le script pour le JavaScript est modifié. Il va intégrer Webpack et son minificateur Terser :

```
const javascript = () => {
    return gulp
        .src(paths.scripts.src)
        .pipe(plumber())
        .pipe(gulpIf(!isProduction, sourcemaps.init()))
        .pipe(webpack(webpackConfig))
        .pipe(strip())
        .pipe(gulpIf(!isProduction, sourcemaps.write("./")))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSyncServer.stream());
};

```

Et assurez-vous que le mode de production est activé dans votre fichier webpack.config.js pour activer le Tree Shaking et Terser :

```
// webpack.config.js
module.exports = {
    mode: process.env.NODE_ENV || "production",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
    resolve: {
        modules: ["node_modules"],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
    },
};

```

Dans ce script, nous utilisons Webpack pour effectuer le bundle de notre JavaScript, qui sera ensuite minifié par Terser si nous sommes en mode production.
