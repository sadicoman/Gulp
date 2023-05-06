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
