This application is to share the expenses between friends,

Repo has two folder anugular code and nodejs code. Angular code folder has the all the components and services views related to front end. Nodejs code folder has all the stuff related to back end.

Steps to run the applications

Node JS
open command prompt and goto nodejs code folder. Type the command npm install.
Once after installation all dependent node modules. Change the mongo connection string in the following file nodejscode\app\config\config.js
Goto  nodejs code folder in command prompt Type the following commend to start the node server node app/app.js

Angular 
open command prompt and go to angular code folder. Type the command npm install.
Change the node server url go to following file angularcode\src\environments\environment.ts and change const API_URL variable
open command prompt and go to angular code folder and Type the commend ng serve
