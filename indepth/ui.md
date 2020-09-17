---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# UI Elements

In this section, we'll explore the UI Elements that are built in the `DWT` library for user interactions.

## Installation Dialog

![UI 1]({{site.assets}}imgs/UI-1.png)

This dialog comes up when running `DWT` in [service mode]({{site.indepth}}initialize.html#service-mode) under one of the following conditions

* The Dynamsoft Service is not installed
* The Dynamsoft Service is not running
* Fail to connect to the Dynamsoft Service

### How to customize

This dialog is opened by one of the following functions

* `OnWebTwainNotFoundOnWindowsCallback`
> For [Windows clients]({{site.getstarted}}platform.html#browsers-on-windows) 

* `OnWebTwainNotFoundOnLinuxCallback`
> For [Linux clients]({{site.getstarted}}platform.html#browsers-on-linux) 

* `OnWebTwainNotFoundOnMacCallback`
> For [macOS clients]({{site.getstarted}}platform.html#browsers-on-macos) 

* `OnRemoteWebTwainNotFoundCallback`
> For any client that [connect to a remote Dynamsoft Service] ({{site.indepth}}input.html##how-to-enable-remote-scan)

All four of these functions eventually calls the global API `Dynamsoft.WebTwainEnv.ShowDialog()` to show the installation dialog. You can use your own method to show the necessary information so that your users know how to proceed.

The last function is just a warning message and it returns the `IP` of the remote Dynamsoft Service so that the user can locate the machine. A simple customization is like this

``` javascript
function OnRemoteWebTwainNotFoundCallback(ProductName, ip, port, bSSL) {
    alert("The Dynamsoft Service is not installed or not running on the machine with IP" + ip);
}
```

The first three functions all return a URL to download the Dynamsoft Service, in your customization, you should find a way to let the user download and install it. For example

``` javascript
function OnWebTwainNotFoundOnWindowsCallback(ProductName, InstallerUrl, bHTML5, bIE, bSafari, bSSL, strIEVersion) {
    alert(ProductName + " is not installed, please download and install it from " + InstallerUrl);
}
```

#### When and where to override these functions

If you are not using `dynamsoft.webtwain.min.js` or `dynamsoft.webtwain.min.mjs` . you can simply make the changes in the file `dynamsoft.webtwain.install.js` .

If you are using `dynamsoft.webtwain.min.js` or `dynamsoft.webtwain.min.mjs` , the file `dynamsoft.webtwain.install.js` doesn't exist. In this case, you must make the change before you [create a WebTwain instance]({{site.indepth}}initialize.html#creating-the-webtwain-instance) . For example

``` javascript
window.OnWebTwainNotFoundOnWindowsCallback = function(ProductName, InstallerUrl, bHTML5, bIE, bSafari, bSSL, strIEVersion) {
    alert(ProductName + " is not installed, please download and install it from " + InstallerUrl);
}
Dynamsoft.WebTwainEnv.Load();
```

## Indicators

### Loader bar and backdrop

![UI 2]({{site.assets}}imgs/UI-2.png)

This loader bar and backrop shows up when creating a `WebTwain` instance or when you try to scan. The functions `Dynamsoft.WebTwainEnv.OnWebTwainPreExecute()` and `Dynamsoft.WebTwainEnv.OnWebTwainPostExecute()` are called before and after the process. You can customize the behavior like this

``` javascript
Dynamsoft.WebTwainEnv.OnWebTwainPreExecute = function() {
    // Show your own progress indicator
    console.log('An operation starts!');
};
Dynamsoft.WebTwainEnv.OnWebTwainPostExecute = function() {
    // Hide the progress indicator
    console.log('An operation ends!');
};
```

On the other hand, you can also call the functions `Dynamsoft.WebTwainEnv.OnWebTwainPreExecute()` and `Dynamsoft.WebTwainEnv.OnWebTwainPostExecute()` to show and hide the loader bar and backdrop when you need it in your own workflow.

If you just want to change the loader bar, you can use the method `Dynamsoft.WebTwainEnv.SetLoaderBar()` .

#### Change the bar

If you just feel like changing the look of the bar, you can 

### Progress bar

When `DWT` performs a time-consuming task, it'll show a progress bar. This progress bar is either like this

![UI-3]({{site.assets}}imgs/UI-3.png)

or like this (with a `Cancel` button)

![UI-4]({{site.assets}}imgs/UI-4.png)

The 1st bar shows up when saving, loading or converting and can be hidden by setting [ `IfShowProgressBar` ]({{site.info}}api/WebTwain_IO.html#ifshowprogressbar) to `false` .

Both bars show up when uploading or downloading and can be hidden by setting  [ `IfShowCancelDialogWhenImageTransfer` ]({{site.info}}api/WebTwain_IO.html#ifshowcanceldialogwhenimagetransfer) to `false` .

For uploading or downloading, you can also build your own progress bar with the help of the built-in event [ `OnInternetTransferPercentage` ]({{site.info}}api/WebTwain_IO.html#oninternettransferpercentage). 

``` javascript
DWObject.RegisterEvent('OnInternetTransferPercentage',
    function(percentage) {
        console.log(percentage);
        // Use the percentage to build your own progress bar
    }
);
```

## Language

### Security Dialog

If you have enabled the security dialogs, you may see the following dialog when you try to scan

![UI-5]({{site.assets}}imgs/UI-5.png)

You can change the language with the method [ `SetLanguage()` ]({{site.info}}api/WebTwain_Util.html#setlanguage). The following sets the language to Spanish

``` javascript
DWObject.SetLanguage(Dynamsoft.EnumDWT_Language.Spanish);
```

![UI-6]({{site.assets}}imgs/UI-6.png)

### Error Messages

`DWT` has many built-in error messages as shown [here]({{site.info}}api/Dynamsoft_Enum.html#error-list). Each `ErrorString` has its own `ErrorCode` . To change the language of the message, you can read the `ErrorCode` and output the error string you have customized. For example

``` javascript
if (DWObject.ErrorCode === -2359) {
    // ErrorString "The index is out of range."
    // To Spanish
    console.log("El índice está fuera de rango.")
}
```
