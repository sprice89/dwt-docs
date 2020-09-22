---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# INITIALIZATION

Initializing `DWT` takes a few simple steps, as you have seen in the ["Getting Started" guide]({{site.getstarted}}helloworld.html). The following guide will dive deeper into how `DWT` is intialized once the page is loaded.

## Usage Modes

Before we dive into the details of initialization, let's take a look at the two modes in which `DWT` can operate:

### Service Mode

#### What is Service Mode

Service mode means `DWT` operates through the **Dynamsoft Service** which is a quiet, background system service that handles the communication between the connected devices and the browser client as well as imaging processing, encoding, decoding, etc.

When using `DWT` on [desktop]({{site.getstarted}}platform.html#browsers-on-desktop-devices), the user by default goes with service mode (recommended). That means, the installation of the Dynamsoft Service is mandatory.

#### Installation of the Dynamsoft Service

If a user who hasn't installed the Dynamsoft Service accesses the web page (which has `DWT` ) for the first time, they will be prompted to install it. This is a built-in behavior of the library. The prompt will display the download link, and once the installer is downloaded, the installation process will take just a few seconds.

> The prompt comes up when you try to [create a `WebTwain` instance](#creating-the-webtwain-instance) in service mode.

![Initialization]({{site.assets}}imgs/Initialization-1.png)

#### About the Dynamsoft Service

The Dynamsoft Service uses the localhost connection to communicate with the browser client. The service uses ports **18622, 18625, 18623, and 18626** for connection. The latter two ports are used when there is an SSL encryption, and the earlier two when otherwise. These ports can be configured in the DSConfiguration.ini file of the service, located in:
`C:\Windows\SysWOW64\Dynamsoft\DynamsoftService(DynamsoftServicex64)\DSConfiguration.ini` (on Windows)

By default, there are always three Dynamsoft Service processes running. All of them are called `Dynamsoft Service` and use the same file `DynamsoftService.exe` . However they start under different arguments.

The main process starts without any argument as follows:
`"C:\Windows\SysWOW64\Dynamsoft\DynamsoftServicex64\DynamsoftService.exe"` .

Then there is a monitor process which is meant to monitor the main process and automatically start it in case it crashes
`'C:\Windows\SysWOW64\Dynamsoft\DynamsoftServicex64\DynamsoftService.exe -asmonitor Global\Dynamsoft_1.5.0_352325843_stop_service_event Global\Dynamsoft_1.5.0_352325828_certcheck_event'` .
 
The last always-running process is meant to support the SSL certificate for Firefox
`'"-scan" "\\.\pipe\dynamsoftscan_15.0_70056_60" "0" "Global\ss352604281_61_70056" "0" "C:\Windows\SysWOW64\Dynamsoft\DynamsoftServicex64\dwt_trial_15.0.0.0625.dll"'` .
 
Service mode *needs* to be used if you wish to [use a connected physical scanner]({{site.indepth}}input.html#scan-from-a-local-scanner). It is this Dynamsoft Service that handles all communication between the browser client and the scanner driver. As mentioned previously, Service mode is the default if the user is on [desktop]({{site.getstarted}}platform.html#browsers-on-desktop-devices).

> NOTE:
> * On Windows, the service runs in the "Local System" account
> * On macOS, the service runs in the "current user" account
> * On Linux, the service runs in the "root" account 

### WASM Mode

#### What is WASM Mode

WASM mode means `DWT` operates completely within the browser with the help of `Web Worker` and `WebAssembly` . It relieves users from manually installing anything but it does require advanced features that only modern [WASM browsers]({{site.getstarted}}platform.html#wasm-browsers) provide.

If a user decides to access the `DWT` application via [mobile]({{site.getstarted}}platform.html#browsers-on-mobile-devices) or they don't want to install anything on [desktop]({{site.getstarted}}platform.html#browsers-on-desktop-devices), they can choose the WASM mode.

#### Comparison of the two modes

A major difference between the Service mode and the WASM mode is that the latter can not access local devices which means [utilization of local scanners]({{site.indepth}}input.html#scan-from-a-local-scanner) is not possible.

Other than that, the performance and speed of the WASM mode is inferior as well because it is not able to gain as many resources as the service mode.

At Dynamsoft, we tried and are still trying to make these two modes to function as closely to each other as possible. Also check out [Expand your application to mobile platforms]({{site.indepth}}development/upgrade.html#expand-your-application-to-mobile-platforms).

#### How to use WASM mode on desktop

As mentioned previously, [desktop]({{site.getstarted}}platform.html#browsers-on-desktop-devices) users will by default go with service mode, while mobile and tablet users will default to WASM mode. However, if you would like desktop users to start in WASM mode and forego the need for a service, you can set [UseLocalService]({{site.info}}api/Dynamsoft_WebTwainEnv.html#uselocalservice) to false in the intialization code.

## Loading the Core JS Files

This is the first step of the initialization.

### Introduction to the core files

Inside the `Resources` directory that is included with the SDK installation, you will find the following files:

``` 
dynamsoft.webtwain.config.js
dynamsoft.webtwain.initiate.js
```

These two files are the main JavaScript files that define the configuration and operation of `DWT` . Let's break down each file's purpose:

* `dynamsoft.webtwain.initiate.js`
This file is the **core** of the `DWT` JavaScript Library. You're not supposed to change it without consulting the Dynamsoft Support Team. 

* `dynamsoft.webtwain.config.js`
This file is used to make basic configuration of `DWT` . Here is where you configure the product key, change the initial viewer size, and more.

### Questions

#### Does it matter which JavaScript file is referenced first

Generally, both `dynamsoft.webtwain.initiate.js` and `dynamsoft.webtwain.config.js` need to be referenced. In the former file, it detects whether the latter has been loaded, if not, it'll wait. Therefore, it doesn't matter which file comes first.

#### Why do I see `dynamsoft.webtwain.min.js` and `dynamsoft.webtwain.min.mjs` instead of the 3 files above

The two files are present in the official npm package `dwt` . For simplicity, in each of these files Dynamsoft has included all necessary JavaScript code which include both files mentioned above plus `dynamsoft.webtwain.install.js` and all extra add-ons components. The ".js" file is a simple combination of the code while the ".mjs" file is built as a ES Module that is used in applications based on `Angular` , `React` and `Vue` , etc.

In a regular application, referencing `dynamsoft.webtwain.min.js` alone would be more than enough than referencing `dynamsoft.webtwain.config.js` and `dynamsoft.webtwain.initiate.js` . 

## Loading Add-on JS files

`DWT` offers a number of add-ons, including a barcode reader, a PDF rasterizer, two webcam utilizers and two OCR engines. The files for these components reside in the `addon` subfolder in the `Resources` directory. Check out more [here]({{site.about}}faqs.html#what-are-the-resources-files).

Whether or not to include any of these components is as simple as referencing its respective JavaScript file. Once a JavaScript file is referenced, the member methods/properties of that component are made available in the [Dynamsoft Namespace](#the-dynamsoft-namespace) and can later be used by `WebTwain` instances.

> As mentioned above, if you use any of the `min` file from the `dwt` package, all add-on components are included by default.

## Loading the supporting files

Once the main JavaScript files are loaded in, the initialization process now moves to loading all the other supporting JS files as well as the CSS files. Depending on the mode `DWT` operates in, the supporting files vary.

### Service mode files

Service mode requires the following files found inside the `Resources` folder:

``` 
dynamsoft.webtwain.install.js
src/dynamsoft.viewer.js
src/dynamsoft.viewer.css
src/dynamsoft.webtwain.css
```

* `dynamsoft.webtwain.install.js`
This file is used to configure the dialogs which show up when the Dynamsoft Service or any of the `DWT` modules is not installed or needs to be upgraded. This file is automatically loaded in `dynamsoft.webtwain.initiate.js` , and therefore does not need to be referenced in the HTML page.

> As mentioned above, if you use any of the `min` file from the `dwt` package, this `install` file is already included.

* `dynamsoft.viewer.js` , `dynamsoft.viewer.css` and `dynamsoft.webtwain.css`
These three files are used to build the viewer component of `DWT` , as well as define the css of the other components of the library.

### WASM-specific files

Apart from the 4 files that the service mode requires, the WASM mode also needs the following files

``` 
dynamsoft.imageio.js
dynamsoft.imageio_wasm-<version number>.js
dynamsoft.imagecore-<version number>.wasm
dynamsoft.imageio-<version number>.wasm
dynamsoft.imageProc-<version number>.wasm

dynamsoft.pdfReader-<version number>.wasm
dynamsoft.pdfWriter-<version number>.wasm
```

The first five files in the above list contain functionalities for image input and output as well as decoding and encoding. The last two files contain functionalities for PDF reading & writing.

> These 7 files are loaded only when the first `WebTwain` instance in WASM mode is created.

#### Questions

##### Are all 7 files mentioned above used exclusivly in WASM mode?

No, the library will use the WASM files even in service mode when one of the following conditions is met

* The APIs for the [ `WebTwain.Addon.Camera` ](https://www.dynamsoft.com/docs/dwt/API/Addon.Camera.html) component are called. 
* The API [ `WebTwain.Viewer.showVideo()` ](https://www.dynamsoft.com/docs/dwt/API/WebTwain.Viewer.html#showvideo) or [ `WebTwain.Viewer.closeVideo()` ](https://www.dynamsoft.com/docs/dwt/API/WebTwain.Viewer.html#closevideo) is called.

## Creating the WebTwain instance

This is the last step of the initialization.

The leading player of `DWT` is the `WebTwain` "class". Almost all methods and properties are defined in this "class". As mentioned [previously](#installation-of-the-dynamsoft-service), creating a `WebTwain` instance in service mode requires the successful connection to the Dynamsoft Service. On the other hand, creating a `WebTwain` instance in WASM mode requires these [extra files](#wasm-specific-files).

Read on to learn the three methods to instantiate `DWT` .

### `Dynamsoft.WebTwainEnv.Load`

This is the default method to create `WebTwain` instances. 

#### Questions

##### Is it necessary to call `Dynamsoft.WebTwainEnv.Load` manually?

No. It needs to be called only if `Dynamsoft.WebTwainEnv.AutoLoad` is set to `false` . If `AutoLoad` is already `true` , `Load` will be called automatically as soon as the running environment is ready.

`Dynamsoft.WebTwainEnv.AutoLoad` is defined in the file `dynamsoft.webtwain.config.js` but can be called anywhere before the actual loading begins. It is set to `true` by default.

##### Where can I get the handler(s) of the instance(s)?

When `Load` is called, `DWT` tries to create the `WebTwain` instances. Once it's done, `DWT` triggers the built-in callback `Dynamsoft.WebTwainEnv.OnWebTwainReady` in which the method `Dynamsoft.WebTwainEnv.GetWebTwain` can be used to get handlers of the instances. For simplicity, the callback points to `Dynamsoft_OnReady` by default. So the following snippets are equivalent

Snippet one

``` javascript
Dynamsoft.WebTwainEnv.OnWebTwainReady = function() {
    DWObject = Dynamsoft.WebTwainEnv.GetWebTwain("dwtcontrolContainer");
}
```

Snippet two

``` javascript
function Dynamsoft_OnReady() {
    DWObject = Dynamsoft.WebTwainEnv.GetWebTwain("dwtcontrolContainer");
}
```

##### How to customize the instances

The instances are defined by this line in `dynamsoft.webtwain.config.js`

``` javascript
Dynamsoft.WebTwainEnv.Containers = [{
    ContainerId: 'dwtcontrolContainer',
    Width: '585px',
    Height: '513px'
}];
```

> Note that `Containers` is an array of the `Container` type

``` typescript
interface Container {
    WebTwainId?: string;
    ContainerId?: string;
    Width?: string | number;
    Height?: string | number;
}
```

`WebTwainId` and `ContainerId` are both optional but one must exist as the identifier for that `WebTwain` instance.

`Width` and `Height` determines the initial viewer size of the instance.

When instantiating with `Dynamsoft.WebTwainEnv.Load` , `ContainerId` , `Width` and `Height` are required. `DWT` will try to locate a HTML element with the id defined in `ContainerId` and use `Width` and `Height` as the viewer size.

To create multiple instances, simple provide multiple `Container` 's, for example, the following creates two `WebTwain` instances

``` javascript
Dynamsoft.WebTwainEnv.Containers = [{
    ContainerId: 'dwtcontrolContainer1',
    Width: '585px',
    Height: '513px'
}, {
    ContainerId: 'dwtcontrolContainer2',
    Width: '585px',
    Height: '513px'
}];
```

### `Dynamsoft.WebTwainEnv.CreateDWTObject`

This method manually creates a `WebTwain` instance with a default built-in viewer.

#### Questions

##### Can this method create a `WebTwain` instance that does not come with a default viewer?

No, only [ `CreateDWTObjectEx` ](#dynamsoftwebtwainenvcreatedwtobjectex) can do that.

##### Can this method be used alongside [Load](#dynamsoftwebtwainenvload)?

Yes, this method can create more `WebTwain` instances after  [Load](#dynamsoftwebtwainenvload) has created the initial one.

##### How do I use this method to create `WebTwain` instances without using [Load](#dynamsoftwebtwainenvload)?

As mentioned above, [Load](#dynamsoftwebtwainenvload) is called automatically if `Dynamsoft.WebTwainEnv.AutoLoad` is set to `true` . Therefore, in order to ignore [Load](#dynamsoftwebtwainenvload), `Dynamsoft.WebTwainEnv.AutoLoad` must be set to `true` first.

##### How does `CreateDWTObject` look like in code?

This method has the following syntax

``` javascript
/**
 * Create a WebTwain instance with UI.
 * @param ContainerId Specify the HTML element (typically of the type HTMLDivElement) to hold the UI.
 * @param host Specify the host.
 * @param port Specify the port.
 * @param portSSL Specify the SSL port.
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 */
CreateDWTObject(
    ContainerId: string,
    host ? : string,
    port ? : string | number,
    portSSL ? : string | number,
    successCallBack: (DWObject: WebTwain) => void,
    failureCallBack: (errorString: string) => void
): void;
```

The following would be equivalent to using [Load](#dynamsoftwebtwainenvload) with the configuration `Dynamsoft.WebTwainEnv.Containers = [{ContainerId: 'dwtcontrolContainer1', Width: '585px', Height: '513px'}`

``` javascript
Dynamsoft.WebTwainEnv.CreateDWTObject(
    'dwtcontrolContainer',
    function(obj) {
        obj.Width = 585;
        obj.Height = 513;
    },
    function(err) {
        console.log(err);
    }
);
```

The method can do more than [Load](#dynamsoftwebtwainenvload) though. The following code creates a `WebTwain` instance that connects to the Dynamsoft Service running on another machine with the IP 192.168.8.221 and ports 18622 and 18623 (SSL)

> NOTE that `Dynamsoft.WebTwainEnv.UseLocalService` must be `true` for this usage.

``` javascript
Dynamsoft.WebTwainEnv.UseLocalService = true;
Dynamsoft.WebTwainEnv.CreateDWTObject(
    'dwtcontrolContainer',
    "192.168.8.221",
    "18622", "18623"
    function(obj) {},
    function(err) {
        console.log(err);
    }
);
```

For more information, check out [how to enable remote scan]({{site.indepth}}input.html##how-to-enable-remote-scan).

### `Dynamsoft.WebTwainEnv.CreateDWTObjectEx`

This method manually creates a `WebTwain` instance without a default built-in viewer.

#### Questions

##### Can this method be used alongside [Load](#dynamsoftwebtwainenvload)?

Yes, same as  [ `CreateDWTObject` ](#dynamsoftwebtwainenvcreatedwtobject).

##### How do I use this method to create `WebTwain` instances without using [Load](#dynamsoftwebtwainenvload)?

Same as  [ `CreateDWTObject` ](#dynamsoftwebtwainenvcreatedwtobject).

##### How does `CreateDWTObjectEx` look like in code?

This method has the following syntax

``` typescript
/**
 * Create a WebTwain instance without UI.
 * @param WebTwainId Specify the Id of the instance.
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
*/
CreateDWTObjectEx(
    dwtInitialConfig: DWTInitialConfig,
    successCallBack: (DWObject: WebTwain) => void,
    failureCallBack: (errorString: string) => void
): void;
```

The following is the interface `DWTInitialConfig`

``` typescript
interface DWTInitialConfig {
    WebTwainId: string;
    Host?: string;
    Port?: string;
    SSLPort?: string;
}
```

Compared with [ `CreateDWTObject` ](#dynamsoftwebtwainenvcreatedwtobject), `CreateDWTObjectEx` requires a `WebTwainId` instead of a `ContainerId` .

The following would be equivalent to using [Load](#dynamsoftwebtwainenvload) with the configuration `Dynamsoft.WebTwainEnv.Containers = [{ContainerId: 'dwtcontrolContainer1', Width: '585px', Height: '513px'}`
> NOTE that the created instance doesn't have a built-in viewer but used the method [ `BindViewer()` ]({{site.info}}api/WebTwain_Viewer.html#bindviewer) to add a viewer

``` javascript
Dynamsoft.WebTwainEnv.CreateDWTObjectEx({
        WebTwainId: 'dwtcontrolContainer1'
    },
    function(obj) {
        obj.BindViewer('dwtcontrolContainer1', {
            Height: 513,
            Width: 585
        });
    },
    function(err) {
        console.log(err);
    }
);
```

Similarly to [ `CreateDWTObject` ](#dynamsoftwebtwainenvcreatedwtobject), `CreateDWTObjectEx` can also connect to the Dynamsoft Service running on another machine

> NOTE that `Dynamsoft.WebTwainEnv.UseLocalService` must be `true` for this usage.

``` javascript
Dynamsoft.WebTwainEnv.UseLocalService = true;
Dynamsoft.WebTwainEnv.CreateDWTObjectEx({
        WebTwainId: 'dwtcontrolContainer1',
        Host: "192.168.8.221",
        Port: "18622",
        SSLPort: "18623"
    },
    function(obj) {},
    function(err) {
        console.log(err);
    }
);
```

For more information, check out [how to enable remote scan]({{site.indepth}}input.html##how-to-enable-remote-scan).

## The Dynamsoft Namespace

`DWT` operates under the Dynamsoft namespace. We'll briefly introduce it.

`Dynamsoft` is the top-level namespace. `DWT` and other Dynamsoft libraries are all defined under `Dynamsoft` . For `DWT` , the major members of this namespace are

* `WebTwainEnv`
    Includes global methods, properties to help with `WebTwain` initialization and instantiation, etc. as shown in previous context.

* `Lib`
    Includes information like environment detection results ( `Dynamsoft.Lib.env` ) and global methods like `showMask()` , `hideMask()` , etc.

* `Enumerations`
    Example: `Dynamsoft.EnumDWT_PixelType`
