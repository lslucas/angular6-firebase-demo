# Angular Firebase Demo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

It is a simple project that uses Angular 6, Firebase and Boostrap for a templating.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

You can use Docker, for that check the instructions bellow.

## Docker

Assuming you have docker and git installed:

```bash
$ git clone git@github.com:lslucas/angular6-firebase-demo.git
$ cd angular6-firebase-demo
$ docker build -t angular6-firebase-demo .
$ docker run -it \
-v $(pwd)/:/www \
-v /www/node_modules \
-p 4200:4200 \
--rm \
angular6-firebase-demo
```
