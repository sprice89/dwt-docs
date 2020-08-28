---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# BUILD THE HELLO WORLD PAGE

> Before you start, please make sure you’ve downloaded and installed the latest version of Dynamic Web TWAIN. If you haven’t done so, you can get the 30-day free trial [here](https://www.dynamsoft.com/Downloads/WebTWAIN_Download.aspx).

The following steps show you how to create your first web-based scanning application in a few minutes!

## Step 1 Start a Web Application

Create an `helloworld.html` anywhere and copy the `Resources` folder to the same location. You can typically find this folder in `C:\Program Files (x86)\Dynamsoft\Dynamic Web TWAIN SDK {Version Number}\`

* Resources

![Build-the-Hello-World-Scan-Page-1]({{site.assets}}imgs/Build-the-Hello-World-Scan-Page-1.png)

* The project

![Build-the-Hello-World-Scan-Page-2]({{site.assets}}imgs/Build-the-Hello-World-Scan-Page-2.png)

## Step 2 Include the library

Embed the script of the library and an element on the page.

``` html
<script src="Resources/dynamsoft.webtwain.initiate.js"></script> 
<script src="Resources/dynamsoft.webtwain.config.js"></script>
```

``` html
<div id="dwtcontrolContainer"></div>
```

> "dwtcontrolContainer" is the default id for the div. You can change it in the file dynamsoft.webtwain.config.js if necessary.

## Step 3 Write code to scan

Add a scan button and the miminum code.

``` html
<input type="button" value="Scan" onclick="AcquireImage();" />
<script type="text/javascript">
    var DWObject;

    function Dynamsoft_OnReady() {
        DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
    }

    function AcquireImage() {
        if (DWObject) {
            DWObject.SelectSource(function() {
                    DWObject.OpenSource();
                    DWObject.AcquireImage();
                },
                function() {
                    console.log("SelectSource failed!");
                });
        }
    }
</script>
```

## Step 4 (from version 16.1) Make sure the code works on mobile devices too

Change the function `AcquireImage()` like this

``` javascript
function AcquireImage() {
    if (DWObject) {
        if (Dynamsoft.Lib.env.bMobile) {
            DWObject.Viewer.showVideo();
        } else {
            DWObject.SelectSource(function() {
                    DWObject.OpenSource();
                    DWObject.AcquireImage();
                },
                function() {
                    console.log("SelectSource failed!");
                }
            );
        }
    }
}
```

## Review the complete code

``` html
<html>

<head>
    <title>Hello World</title>
    <script src="Resources/dynamsoft.webtwain.initiate.js"> </script>
    <script src="Resources/dynamsoft.webtwain.config.js"> </script>
</head>

<body>
    <input type="button" value="Scan" onclick="AcquireImage();" />
    <div id="dwtcontrolContainer"></div>
    <script type="text/javascript">
        var DWObject;

        function Dynamsoft_OnReady() {
            DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
        }

        function AcquireImage() {
            if (DWObject) {
                if (Dynamsoft.Lib.env.bMobile) {
                    DWObject.Viewer.showVideo();
                } else {
                    DWObject.SelectSource(function() {
                            DWObject.OpenSource();
                            DWObject.AcquireImage();
                        },
                        function() {
                            console.log("SelectSource failed!");
                        }
                    );
                }
            }
        }
    </script>
</body>

</html>
```

## See the scan page in action

* Open the page in your browser

![Build-the-Hello-World-Scan-Page-3]({{site.assets}}imgs/Build-the-Hello-World-Scan-Page-3.png)

> If you see a license notice, please make sure you have a valid trial license. Contact [Dynamsoft Support]({{site.about}}resources.html#how-to-get-support) if you need help.

* Press the button

![Build-the-Hello-World-Scan-Page-4]({{site.assets}}imgs/Build-the-Hello-World-Scan-Page-4.png)

> Only TWAIN / ICA / SANE compliant devices are listed in the Select Source dialog. If your connected scanner doesn't show up in the list, please make sure the proper driver is installed. If you are using Windows and don’t have a real scanner at hand, you can install the [Virtual Scanner](https://download.dynamsoft.com/TWAIN/twainds.win32.installer.2.1.3.msi) – a scanner simulator which is developed by the [TWAIN Working Group](https://www.twain.org/) for testing purposes.

* After scan

The scanned documents will show up on the page

![Build-the-Hello-World-Scan-Page-5]({{site.assets}}imgs/Build-the-Hello-World-Scan-Page-5.png)

## Try it out on your mobile phone

In step 4 above, we added code for mobile-compliance. However, in order to try it out, the scan page needs to be hosted in a site that runs `HTTPS`. The reason for this is that on mobile devices, the mobile camera is used for image capturing and only a secure site can make use of the camera. The following shows how it works when it's properly deployed.

![Build-the-Hello-World-Scan-Page-6]({{site.assets}}imgs/Build-the-Hello-World-Scan-Page-6.png)

## Upload the scanned documents

blahblahblah....

A few tips

* Consider compliance for all platforms
    - like how to acquire images on mobile and ensure similar UE
* Add an upload feature as that's wanted by most.
* Steer clear of all deprecated APIs
