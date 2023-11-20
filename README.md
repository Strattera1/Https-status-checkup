# MyApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.5.

# Focus of the project

The focus of the project is to check the HTTP status on websites. It will ask for the http status from websites and then display it on the app. 
Depending on the HTTP status, it will show either green or red. Green is for that the website is up and red is for when the website is down or that you can't connect to it (404 and 401 error as an exempel).
It wil check the status once a min and will show when it was latest check on the app. 
If it can't get the HTTP status from those websties in two min, the colour will turn to yellow. it applies when there are no network or the website in questions don't let the user to get the HTTP request. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
