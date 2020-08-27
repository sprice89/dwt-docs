---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# (Legacy) Webcam Capture Addon

This is for the legacy webcam addon. For the current implementation please see the [camera addon](camera.md)

[API Reference](https://www.dynamsoft.com/docs/dwt/API/Addon.Webcam.html)

# WEBCAM

### Introduction
The desktop camera is one of the must-have accessories for every PC. Real-time chat, remote assistance, and many other desktop applications can use the camera directly. However, in the current technology boom of moving desktops to the cloud, integrating cameras directly into the browser is also in high demand. Similar practical scenarios may include

* Take a picture when filling out some online application forms
* Read the QR code directly in the video stream with a camera of slightly better quality
* In a bank or hospital and other institutions, use a good-quality camera to achieve scanner-level image acquisition

This article shows how to quickly use the local scanner and camera to get images on the same web page.

## Environments
* Windows

### Installation requirements
Resources/addon/dynamsoft.webtwain.webcam.js

## Implementing the Webcam addon

```javascript
Dynamsoft.WebTwainEnv.AutoLoad = false;
Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', Dynamsoft_OnReady); // Register OnWebTwainReady event. This event fires as soon as Dynamic Web TWAIN is initialized and ready to be used
var webCamStartingIndex; //This is used to separate scanners and webcams
var DWObject;
var isVideoOn = true;

function Dynamsoft_OnReady() {
    DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer'); // Get the Dynamic Web TWAIN object that is embeded in the div with id 'dwtcontrolContainer'
    if (DWObject) {
        DWObject.Width = 504;
        DWObject.Height = 600;
        document.getElementById('source').options.length = 0;
        var count = DWObject.SourceCount;
        for (var i = 0; i < count; i++) {
            document.getElementById('source').options.add(new Option(DWObject.GetSourceNameItems(i), i));
        }
        webCamStartingIndex = i;
        var arySource = DWObject.Addon.Webcam.GetSourceList();
        for (var i = 0; i < arySource.length; i++) document.getElementById("source").options.add(new Option(arySource[i], arySource[i]), i + webCamStartingIndex); // Get Webcam Source names and put them in a drop-down box
    }
    document.getElementById('source').onchange = function() {
        if (document.getElementById('source').selectedIndex < webCamStartingIndex) {
            if (arySource.length > 0) DWObject.Addon.Webcam.StopVideo();
            isVideoOn = false;
            document.getElementById("btn-grab").style.backgroundColor = "";
            document.getElementById('btn-grab').value = 'Acquire From a Scanner';
            document.getElementById("btn-switch").style.display = 'none';
        } else {
            DWObject.Addon.Webcam.SelectSource(document.getElementById("source").options[document.getElementById("source").selectedIndex].value);
            SetIfWebcamPlayVideo(true);
            document.getElementById('btn-grab').value = 'Acquire From a Webcam';
            document.getElementById("btn-switch").style.display = '';
        }
        document.getElementById("btn-grab").disabled = "";
    }
    document.getElementById('source').onchange();
}

function SetIfWebcamPlayVideo(bShow) {
    if (bShow) {
        DWObject.Addon.Webcam.StopVideo();
        DWObject.Addon.Webcam.PlayVideo(DWObject, 80, function() {});
        isVideoOn = true;
        document.getElementById("btn-grab").style.backgroundColor = "";
        document.getElementById("btn-grab").disabled = "";
        document.getElementById("btn-switch").value = "Hide Video";
    } else {
        DWObject.Addon.Webcam.StopVideo();
        isVideoOn = false;
        document.getElementById("btn-grab").style.backgroundColor = "#aaa";
        document.getElementById("btn-grab").disabled = "disabled";
        document.getElementById("btn-switch").value = "Show Video";
    }
}

function SwitchViews() {
    if (isVideoOn == false) {
        // continue the video
        SetIfWebcamPlayVideo(true);
    } else {
        // stop the video
        SetIfWebcamPlayVideo(false);
    }
}

function CaptureImage() {
    if (DWObject) {
        if (document.getElementById('source').selectedIndex < webCamStartingIndex) {
            DWObject.IfShowUI = true;
            DWObject.IfDisableSourceAfterAcquire = true;
            DWObject.SelectSourceByIndex(document.getElementById('source').selectedIndex);
            DWObject.CloseSource();
            DWObject.OpenSource();
            DWObject.AcquireImage();
        } else {
            var funCaptureImage = function() {
                SetIfWebcamPlayVideo(false);
            };
            DWObject.Addon.Webcam.CaptureImage(funCaptureImage, funCaptureImage);
        }
    }
}
```

## Demo links
[Capture images and video streams in browsers](https://demo.dynamsoft.com/DWT/Webcam/online_demo_scan_Webcam.aspx)
[Acquire Images from Scanners and Webcam](https://www.dynamsoft.com/Downloads/WebTWAIN-Sample-Download.aspx?SampleID=87)
[Read Barcode from a Webcam](https://www.dynamsoft.com/Downloads/WebTWAIN-Sample-Download.aspx?SampleID=223)

## A case: how to use webcam
