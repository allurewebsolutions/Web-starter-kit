## Git Workflow
Please go to agency wiki for more detail. [link](https://gitlab.com/creatella/knowledge-base/wikis/how-to-use-git)
=======

## Working with the repo
Create your own branch when working on any feature of the site and commit your changes to that branch (ideally each feature will have its own branch). After pushing your commits to Gitlab open a merge request with the **Develop** branch. The merging will be done by the respective Team Leaders. **DO NOT** push your commits directly to the Develop or Master branch. Try to divide your work into small features and commit often.

If you already made changes in protected branch, use `git checkout -b <new-branch>` to move all your changes to a new branch.

## Front End
All code is located in the "public" folder. This will contain the "src" sub-folder that will be used to hold all the source html, scss/css, js and image files. After running the build task through Gulp all production ready files will be placed inside the "dist" sub-folder.

### Style Guide
For the JavaScript coding we will follow this Style Guide - https://github.com/eschafer/javascript-style-guide .
Any variations to this style guide for our own purposes will be noted here.

### EditorConfig
Please install the relevant [EditorConfig](http://editorconfig.org) plugin for your code editor so that there is a  consistent coding style across all team members based on the rules defined in `.editorconfig`.

### Admin template
The following template is being used for the admin area - https://almsaeedstudio.com/

### Bootstrap
The Bootstrap framework is being used for this project. The Bootstrap css and js files have been built based on the most essential features and will be modified as and when required as the project progresses.

### HTML Partials
Code for the various html pages is divided into separate modules. The modules (like header, footer etc.) that are to be loaded in all pages have to be placed inside /public/src/partials. These modules will then be inserted into the main html file by gulp during the build process through this plugin - https://www.npmjs.com/package/gulp-file-include. Please refer to the documentation of this plugin and also see the code of `news.html` in order to understand how to include html modules.

### Build Process
For compiling scss files, minifying js files, and all other relevant build tasks we will be using [Gulp](http://gulpjs.com/). The various Gulp tasks that will be employed will be noted here. All terminal commands need to be executed from the root of the project directory.

* Use `npm install` from your terminal to install all necessary node modules required for the build process. This process needs to be repeated whenever any changes to package.json are made.

* To start the process of watching all frontend files and doing the necessary compiling and linting type `gulp` in your terminal.

* To only perform the build process without watching for changes execute `gulp build`. This task will place all the relevant files in /public/build.

* To only compile scss files execute `gulp sass` in the terminal.

* To only lint the js files execute `gulp eslint` in the terminal.

* To concatenate the source js files and lint them, execute `gulp js`.

* In order to create html files for each page execute `gulp joinhtml`.


## Staging server
Server URL: https://finmates.staging.createl.la
Please go to agency wiki for more detail. [Link](https://gitlab.com/creatella/knowledge-base/wikis/how-to-use-staging-server)

## API Documentation
Visit [https://finmates.readme.io](https://finmates.readme.io) for more detail.
