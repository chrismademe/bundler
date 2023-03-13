# Fascio

A basic asset bundler/task runner for your frontend assets.

## Todo

-   [ ] Add better handling of errors and warnings from `fs-extra`
-   [x] Make the `write` methods of SCSS and JS compilers behave consistenty with how they treat file paths.
-   [ ] Add support for more compilers (possibly PostCSS, Babel etc.)
-   [ ] Look into why `sass` needs to be installed locally in the project even though it's a Fascio dependency
-   [x] Improve performance, move `scss` compiler to `esbuild`
