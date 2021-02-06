# Tatvasoft Practical

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## How to Use

- After Serving the project you might need to create users after you shall be able to login and observe its functionalities
- For that go to `login.component.ts > ngOnInit()` method
- There resides 2 functions, these functions will create users for you
    - `createAdminUser` for creating Admin Users
    - `createClientUser` for creating Client Users
- Becoz' we're using IndexDB as main storage after creating record you might need to refresh page to let App read updated IndexDB
- After creating Users of your choice you shall be able to login 
