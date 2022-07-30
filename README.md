# InstaFeed Bulma CSS
Instagram feed template similar looks using html, js, scss or less and Bulma CSS Framework.

Demo site: https://instafeed-bulma.netlify.app

## Features
- Light / Dark mode theme.
- Material Icons (https://fonts.google.com/icons).
- Using [fetch](https://javascript.info/fetch) to display json data.
- Emoji Button (https://emoji-button.js.org/)
- Option to style with scss or less format.


## Setup for Local Development

**Requirements**
- [Browsersync](https://browsersync.io/)
  ```
  npm install -g browser-sync
  ```
- [Sass](https://sass-lang.com/) 
  ```
  npm install -g sass
  ```
- or [Less.js](https://lesscss.org/)
  ```
  npm install -g less
  npm install -g less-watch-compiler
  npm install -g less-plugin-clean-css
  ```

1. Run the development mode
  ```
  browser-sync start --server --files "./"
  ```
2. Watch .scss file
  ```
  sass --watch .\assets\css\styles.scss .\assets\css\styles.css
  ```
3. Compile and minified .sccss to .css
  ```
  sass .\assets\css\styles.scss .\assets\css\styles.css --style compressed
  ```
4. Watch .less file
  ```
  less-watch-compiler .\assets\css .\assets\css\ styles.less
  ```
5. Compile and minified .less to .css
  ```
  lessc .\assets\css\styles.less .\assets\css\styles.css --clean-css="--s1 --advanced --compatibility=ie8"
  ```



## Screenshot
![](/instafeed-bulma-dark-ss.jpg)
![](/instafeed-bulma-ss.jpg)

## Reference Links
- https://bulma.io/
- https://www.instagram.com/
- https://browsersync.io/
- https://fonts.google.com/icons
- https://emoji-button.js.org/
- https://sass-lang.com/
- https://lesscss.org/
