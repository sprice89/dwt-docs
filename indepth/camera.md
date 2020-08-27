---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---
<!--
* Description on this addon
* how to webcam capture
* how to set up webcam
    - Specific scenarios?
-->
    
# Webcam Capture Addon
This is for the current (16.0+) camera addon, if you are using the older webcam addon, please see [this page](webcam.md).

[API Reference](https://www.dynamsoft.com/docs/dwt/API/Addon.Webcam.html)


## Requirements
### Licensing
* Mobile - Included with Core
* Windows/Mac/Linux - Addon

### Resource dependencies
- Resources/addon/dynamsoft.webtwain.camera.js

Note: On iOS, this will only be supported in Safari due to how iOS treats navigator permissions. <!---Need verification--->

## Implementing the Webcam addon

```javascript
var DWObject;
var webCamStartingIndex = 0; //This is used to separate scanners and webcams
var isVideoOn = true;

function Dynamsoft_OnReady() {
    DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer'); // Get the Dynamic Web TWAIN object that is embeded in the div with id 'dwtcontrolContainer'
    if (DWObject) {
        var count = DWObject.SourceCount; // Get how many sources are installed in the system
        for (var i = 0; i < count; i++) {
            document.getElementById("source").options.add(new Option(DWObject.GetSourceNameItems(i), i)); // Add the sources in a drop-down list
            webCamStartingIndex = i + 1;
        }
        populateCams();
        // The event OnPostTransfer fires after each image is scanned and transferred
        DWObject.RegisterEvent("OnPostTransfer", function() {
            setTimeout(updatePageInfo, 20);
        });
        // The event OnPostLoad fires after the images from a local directory have been loaded into the control
        DWObject.RegisterEvent("OnPostLoad", function() {
            setTimeout(updatePageInfo, 20);
        });
        // The event OnMouseClick fires when the mouse clicks on an image on Dynamic Web TWAIN viewer
        DWObject.RegisterEvent("OnMouseClick", function() {
            updatePageInfo();
        });
        // The event OnTopImageInTheViewChanged fires when the top image currently displayed in the viewer changes
        DWObject.RegisterEvent("OnTopImageInTheViewChanged", function(index) {
            DWObject.CurrentImageIndexInBuffer = index;
            updatePageInfo();
        });
    }
}

async function populateCams() {
    let camList = await DWObject.Addon.Camera.getSourceList();
    console.log(camList.length);
    for (var i = 0; i < camList.length; i++) document.getElementById("source").options.add(new Option(camList[i].label, camList[i].deviceId), webCamStartingIndex + i);
    isCamera();
}
async function isCamera() {
    if ((document.getElementById('source').selectedIndex < webCamStartingIndex) && (DWObject.SourceCount > 0)) {
        if (camList.length > 0) await DWObject.Addon.Camera.stop();
        isVideoOn = false;
    } else {
        await DWObject.Addon.Camera.selectSource(document.getElementById("source").options[document.getElementById("source").selectedIndex].value);
        DWObject.Addon.Camera.play();
        isVideoOn = true;
    }
}

function AcquireImage() {
    if (isVideoOn) {
        DWObject.Addon.Camera.capture();
    } else {
        if (DWObject) {
            var OnAcquireImageSuccess, OnAcquireImageFailure;
            OnAcquireImageSuccess = OnAcquireImageFailure = function() {
                DWObject.CloseSource();
            };
            DWObject.SelectSourceByIndex(document.getElementById("source").selectedIndex);
            DWObject.OpenSource();
            DWObject.IfDisableSourceAfterAcquire = true; // Scanner source will be disabled/closed automatically after the scan.
            DWObject.AcquireImage(OnAcquireImageSuccess, OnAcquireImageFailure);
        }
    }
}
```