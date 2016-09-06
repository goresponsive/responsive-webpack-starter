# responsive-webpack-starter
A boilerplate for running a Backbone.js Webpack workflow in Node express

#Presentation PDF link
Download the presentation Keynote 

[PDF Download](https://drive.google.com/a/responsive.co.za/file/d/0B9JSGsla8tsCVWgxSEU5Vi1IRFk)

Inspired by [this project](https://github.com/vesparny/react-kickstart) and the evolving of [react-transform](https://github.com/gaearon/react-transform-boilerplate) and [CSS Modules]((http://glenmaddern.com/articles/css-modules)).

**NOTE!** Use the latest version of Node, 5.x.x.

## Install and Running
`https://github.com/zackskeeter/responsive-webpack-starter.git`

1. cd responsive-webpack-starter
2. npm install
3. npm express
4. navigate to http://localhost:3200 in your browser of choice. (you can change the port in `package.json` if needed)

## Building Static Production Files

1. cd responsive-webpack-starter
2. npm run build
3. npm run static

You can then look in the root of the directory for a `dist` folder. The contents can be run on any server as it will be html and JS
Running `static` allows you to check the dist file on Express and see if everything built correctly in production mode. 

## Overview

### CSS Modules
CSS files loaded into components are locally scoped and you can point to class names with javascript. You can also compose classes together, also from other files. These are also hot loaded. Read more about them [here](http://glenmaddern.com/articles/css-modules).

To turn off CSS Modules remove it from the `webpack.config.js` file.

### Babel and Linting
Both Node server and frontend code runs with Babel. And all of it is linted. Linting is built right into the webpack build, as you develop it will lint your javascript

SCSS linting configurations are in place but you can enforce that on your IDE rather than on the build. 

### Beautify
With a beautify package installed in your editor it will also do that
