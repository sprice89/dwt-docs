---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# Use `DWT` with React

[React](https://reactjs.org/) is a JavaScript library specifically meant for creating interactive UIs. Check out the following on how to implement `DWT` into a React application.

## Preparation

Make sure you have [node](https://nodejs.org/) and [yarn](https://yarnpkg.com/cli/install) installed. `node 14.4.0` and `yarn 1.22.4` are used in the example below.

## Create the sample project

### Create an bootstrapped raw React application

``` cmd
npx create-react-app dwt-react
```

### CD to the root directory of the application and install the `dwt` and `ncp` package

``` cmd
yarn add dwt
```

``` cmd
yarn add ncp
```

> `ncp` is used to copy static resources files.

## Configure the project

Open `package.json` and change `scripts` like this.

``` json
"scripts": {
    "start": "ncp node_modules/dwt/dist public/dwt-resources && react-scripts start",
    "build": "react-scripts build && ncp node_modules/dwt/dist build/dwt-resources",
    "test": "ncp node_modules/dwt/dist public/dwt-resources && react-scripts test",
    "eject": "react-scripts eject"
},
```

> The change ensures the static files required to run `DWT` are copied over to the built resulting project.

## Start to implement

### Generate a component

Under `/src/` , create a new JavaScript file and name it `dwt.js` .

### Edit the component

* Copy the following to `dwt.js` .

``` typescript
import React from 'react';
import Dynamsoft from 'dwt';

export default class DWT extends React.Component {
    constructor(props) {
        super(props);
    }
    DWObject = null;
    containerId = 'dwtcontrolContainer';
    componentDidMount() {
        Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', () => {
            this.Dynamsoft_OnReady()
        });
        Dynamsoft.WebTwainEnv.ProductKey = 'YOUR-PRODUCT-KEY';
        Dynamsoft.WebTwainEnv.ResourcesPath = "dwt-resources";
        Dynamsoft.WebTwainEnv.Containers = [{
            WebTwainId: 'dwtObject',
            ContainerId: this.containerId,
            Width: '300px',
            Height: '400px'
        }];
        Dynamsoft.WebTwainEnv.Load();
    }
    Dynamsoft_OnReady() {
        this.DWObject = Dynamsoft.WebTwainEnv.GetWebTwain(this.containerId);
    }
    acquireImage() {
        this.DWObject.AcquireImage();
    }
    render() {
        return (<>
            <button onClick = {() => this.acquireImage()} > Scan </button> 
            <div id = {this.containerId}> </div> 
            </>
        );
    }
}
```

> Note:
> * `containerId` specifies the DIV to create `DWT` viewer in which is defined in the template.
> * `OnWebTwainReady` is the callback triggered when the initialization succeeds.
> * `ProductKey` must be set to a valid trial or full key.
> * `ResourcesPath` is set to the location of the static files mentioned in [Configure the project](#configure-the-project).

### Add the component to `App.js`

``` javascript
import React from 'react';
import './App.css';
import DWT from './dwt';

function App() {
    return ( <
        DWT / >
    );
}

export default App;
```

### Try running the project

``` cmd
yarn start
```

> If you have installed `DWT` and have configured a valid `ProductKey` . You will have a working page to scan documents from your scanner now. Otherwise, you should see instructions on the page that guide you to install the library. [More info>>]({{site.indepth}}initialize.html#installation-of-the-dynamsoft-service).

## Official Samples

Check out the following two sample projects:

* [dwt-react-simple](https://github.com/dynamsoft-dwt/dwt-react-simple)

* [dwt-react-advanced](https://github.com/dynamsoft-dwt/dwt-react-advanced)
