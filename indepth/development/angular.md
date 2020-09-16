---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# Use Dynamic Web TWAIN with Angular

[Angular](https://angular.io/) is one of the most popular and mature JavaScript frameworks. Check out the following on how to implement Dynamic Web TWAIN into an Angular application.

## Preparation

* Make sure you have [node](https://nodejs.org/) and [Angular CLI](https://cli.angular.io/) installed. `node 14.4.0` and `Angular CLI 9.1.12` are used in the example below.

## Create the sample project

* Create an out-of-the-box raw Angular application

``` 
ng new dwt-angular
```

* CD to the root directory of the application and install the dependencies

```
// version 16.1 + recommended
npm install dwt
```

``` 
npm install @types/dwt
```

## Configure the project

Open `angular.json` and add the following lines to `"build"/"options"/"assets"` .

> These lines will copy the static files necessary to run Dynamic Web TWAIN to the resulting project.

``` 
{
    "glob": "**/*",
    "input": "./node_modules/dwt/dist",
    "output": "assets/dwt-resources"
}
```

## Start to implement

* Generate a component

``` 
ng generate component dwt
```

* Edit the component

    - In `dwt.component.html`, add a button and a DIV to hold Dynamic Web TWAIN viewer

    ``` html
    <button (click)="acquireImage()">Acquire Images</button>
    <div id="dwtcontrolContainer"></div>
    ```

    - In `dwt.component.ts`, add code to initialize Dynamic Web TWAIN
    
    ``` typescript
    import Dynamsoft from 'dwt';
    ```

    ``` typescript
    containerId = "dwtcontrolContainer";
    ngOnInit(): void {
        Dynamsoft.WebTwainEnv.Containers = [{ WebTwainId: 'dwtObject', ContainerId: this.containerId, Width: '300px', Height: '400px' }];
        Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', () => { this.Dynamsoft_OnReady(); });
        Dynamsoft.WebTwainEnv.ProductKey = 'YOUR-PRODUCT-KEY';
        Dynamsoft.WebTwainEnv.ResourcesPath = 'assets/dwt-resources';
        Dynamsoft.WebTwainEnv.Load();
    }
    ```
    > Note:
    > * `containerId` specifies the DIV to create Dynamic Web TWAIN viewer in. It is defined in `dwt.component.html`.
    > * `Dynamsoft_OnReady` is the callback function triggered when the initialization succeeds.
    > * `ProductKey` must be set to a valid trial or full key.
    > * `ResourcesPath` is set to the location of the static files mentioned in [Configure the project](#configure-the-project).

    - Get a handler of the `WebTwain` instance

    ``` typescript
    import { WebTwain } from 'dwt/WebTwain';
    ```

    ``` typescript
    DWObject: WebTwain = null;
    Dynamsoft_OnReady() {
        this.DWObject = Dynamsoft.WebTwainEnv.GetWebTwain(this.containerId);
    }
    ```

    - Define the function `acquireImage()`

    ``` typescript
    acquireImage() {
        this.DWObject.AcquireImage();
    }
    ```

* Add the component to `app.component.html`
Edit the file `app.component.html` to contain nothing but the following

``` html
<app-dwt></app-dwt>
```

* Try running the project

```
ng serve -o
```

> If you have installed Dynamic Web TWAIN and have configured a valid `ProductKey`. You will have a working page to scan documents from your scanner now. Otherwise, you should see instructions on the page that guide you to install the library.

Check out the following two sample projects:

[dwt-angular-simple](https://github.com/dynamsoft-dwt/dwt-angular-simple)

[dwt-angular-advanced](https://github.com/dynamsoft-dwt/dwt-angular-advanced)