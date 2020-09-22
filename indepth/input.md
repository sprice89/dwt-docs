---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# INPUT

Different ways to get data into `DWT` buffer.

## Scan

### Scan from a local scanner

> Supported on [desktop]({{site.getstarted}}platform.html#browsers-on-desktop-devices) and only when `DWT` runs in the [service mode]({{site.indepth}}initialize.html#service-mode)

A local scanner refers to a scanner that is plugged in the same desktop via USB or one that is available on the local network and is accessible on the local desktop. The latter is normally known as a network scanner. Generally, a network scanner is connected to the LAN itself (cable or WI-FI) and is assigned a static IP. Then the scanner driver from the device vendor configures the IP to connect to the scanner.

> As far as `DWT` is concerned, a network scanner is just like a local scanner because its driver has taken care of the network connection underneath.

### Scan from a remote scanner

> Supported on [desktop]({{site.getstarted}}platform.html#browsers-on-desktop-devices) and [mobile]({{site.getstarted}}platform.html#browsers-on-mobile-devices).

A remote scanner refers to a scanner that is 

* Not connected to the device trying to scan
* Connected and accessible on a `Windows` desktop in the LAN (USB or network) where `DWT` must be installed

For more information, check out [how to enable remote scan](#how-to-enable-remote-scan).

### Scan from a TWAIN-Direct scanner

> Supported on [desktop]({{site.getstarted}}platform.html#browsers-on-desktop-devices) and [mobile]({{site.getstarted}}platform.html#browsers-on-mobile-devices).

A TWAIN-Direct scanner refers to a device that supports the next generation of the TWAIN protocal called [ `TWAIN-Direct` ](https://www.twaindirect.org/).

For more information, check [How to use a TWAIN-Direct scanner](#how-to-use-a-twain-direct-scanner).

### Questions

#### Configure the scan

* Basic settings (resolution, pixeltype, duplex, etc.)

#### How many images can be scanned

> Check out [Buffer Management]({{site.indepth}}buffer.html#memory-limits-and-disk-caching)

#### How to use Custom DataSource Data

> This feature is only for [TWAIN scanners]({{site.getstarted}}hardware.html#twain-scanners)

Custom DataSource Data (CDD for short) is a feature provided by TWAIN and implemented by TWAIN sources (drivers). The idea is to save all TWAIN-related configurations in a file or a base64 string and use it later to restore the same configurations on the same device or a device of the same model. This feature can be very useful in cases like sharing the same configurations across multiple devices, or presetting a device for scanning, etc. `DWT` provides 2 pairs of methods to enable this feature which are

* [ `GetCustomDSData()` ]({{site.info}}api/WebTwain_Acquire.html#getcustomdsdata) , [ `SetCustomDSData()` ]({{site.info}}api/WebTwain_Acquire.html#setcustomdsdata)
* [ `GetCustomDSDataEx()` ]({{site.info}}api/WebTwain_Acquire.html#getcustomdsdataex) , [ `SetCustomDSDataEx()` ]({{site.info}}api/WebTwain_Acquire.html#setcustomdsdataex)

  
The first pair saves or loads the data from a file and the second pair saves or loads the data from a base64 string.

The following shows how to use the 2nd pair in JavaScript

##### Save the data

``` javascript
  var cDD = "";
  DWObject.SelectSource(function() {
      DWObject.OpenSource();
      DWObject.AcquireImage(function() {
          cDD = DWObject.GetCustomDSDataEx();
      }, function(code, error) {
          console.log(error);
      });
  }, function(code, error) {
      console.log(error);
  });
```

##### Use the data

``` javascript
  DWObject.SelectSource(function() {
      DWObject.IfShowUI = false;
      DWObject.OpenSource();
      DWObject.SetCustomDSDataEx(cDD);
      DWObject.AcquireImage(function() {
          console.log('Success');
      }, function(code, error) {
          console.log(error);
      });
  }, function(code, error) {
      console.log(error);
  });
```

#### Use Capability Negotiation

> This feature is only for [TWAIN scanners]({{site.getstarted}}hardware.html#twain-scanners)

Capability Negotiation is the way a TWAIN application like `DWT` talk with a TWAIN source like a scanner. It goes like

* [DWT] Are you capable of ***?
* [Scanner] Yes and here is what I can do...
* [DWT] Great, here is what I want things done...
* [Scanner] Consider it done

`DWT` provides two methods `getCapabilities()` and `setCapabilities()` for the negotiation. The following shows how to ask for supported pagesizes and set it to A4 using the negotiation.

#### Use a standard capability

The following retrieve the capabilities and read the available page sizes

``` javascript
DWObject.getCapabilities(function(result) {
    for (var i = 0; i < result.length; i++) {
        if (result[i].capability.value === Dynamsoft.EnumDWT_Cap.ICAP_SUPPORTEDSIZES)
            sizes = result[i].values;
    }
    console.log(sizes);
}, function(error) {
    console.log(error);
});
```

The following sets page size to A4

``` javascript
DWObject.setCapabilities({
        exception: "ignore",
        capabilities: [{
            capability: Dynamsoft.EnumDWT_Cap.ICAP_SUPPORTEDSIZES,
            curValue: 1, // 1 means 'A4' in our case
            exception: "fail"
        }]
    },
    function(result) {
        console.log(result)
    },
    function(error) {
        console.log(error);
    }
);
```

#### Use a custom capability

The TWAIN specification defines more than 150 standard capabilities for TWAIN App & Source to choose from. However, some scanner vendors provide advanced and model-specific capabilities which are not included in the specification. We call them custom capabilities. The following steps show how to use them

* Install the [TWAIN sample application](http://www.dynamsoft.com/download/support/twainapp.win32.installer.msi)

* Use the TWAIN Sample App to open the source and then check what the hexadecimal value of the custom capability is.

![Indepth-input-1]({{site.assets}}imgs/Indepth-input-1.png)

* Double click and check the available values

![Indepth-input-2]({{site.assets}}imgs/Indepth-input-2.png)

* Use this custom capability

``` javascript
DWObject.SelectSource(function() {
        DWObject.OpenSource();
        DWObject.setCapabilities({
                exception: "ignore",
                capabilities: [{
                    capability: 0xA03D,
                    curValue: 3,
                    exception: "fail",
                }]
            },
            function(capabilities) {
                console.log(capabilities);
            },
            function(error) {
                console.error(error);
            });
    },
    function(code, error) {
        console.log(error);
    }
);
```

## Capture

### Use [DirectShow Cameras]({{site.getstarted}}hardware.html#directshow-cameras)

The following code snippet shows how to use a camera through `DirectShow`
  

``` javascript
function PlayVideo(bShow) {
    if (DWObject) {
        DWObject.Addon.Webcam.StopVideo();
        DWObject.Addon.Webcam.SelectSource("CAMERA-NAME");
        DWObject.Addon.Webcam.PlayVideo(DWObject, 80, function() {});
    }
}

function CaptureImage() {
    if (DWObject) {
        DWObject.Addon.Webcam.SelectSource("CAMERA-NAME");
        var funCaptureImage = function() {
            setTimeout(function() {
                DWObject.Addon.Webcam.StopVideo();
            }, 50);
        };
        DWObject.Addon.Webcam.CaptureImage(funCaptureImage, funCaptureImage);
    }
}
```

### Use [MediaDevices Cameras]({{site.getstarted}}hardware.html#mediadevices-cameras)

The following code snippet shows how to use a camera through `MediaDevices`

``` javascript
var videoPlaying = false;

function PlayVideo(bShow) {
    if (videoPlaying) return;
    if (DWObject) {
        DWObject.Addon.Camera.stop();
        videoPlaying = false;
        // DEVICE-ID must be correct
        // e.g.: "592bbc7c0f951657d8dc6dc3af8bdd76cde89b78184a8475f70eb012a4040a54"
        DWObject.Addon.Camera.selectSource("DEVICE-ID");
        DWObject.Addon.Camera.play()
            .then(function() {
                videoPlaying = true;
            });
    }
}

function CaptureImage() {
    if (DWObject) {
        PlayVideo();
        var startCapture = function() {
            setTimeout(function() {
                if (videoPlaying) {
                    DWObject.Addon.Camera.capture().then(function(blob) {
                        DWObject.Addon.Camera.stop();
                        videoPlaying = false;
                    });
                } else {
                    startCapture();
                }
            }, 50);
        };
        startCapture();
    }
}
```

## Load

To load means to open files which are accessible on the system. These files can be those residing on the local disk or those shared on the network.

> As a lightweight library, `DWT` only supports the following file types: BMP, JPG, TIF, PNG, PDF. And not all files of these types can be read correctly. If you come across a file that is of one of these types but fail to load, you can contact [Dynamsoft Support]({{site.about}}getsupport.html).

### [Recommended] Show the `Open File` dialog and select files to load.

> Supported on [desktop]({{site.getstarted}}platform.html#browsers-on-desktop-devices) and [mobile]({{site.getstarted}}platform.html#browsers-on-mobile-devices). 

The `Open File` dialog only works on [desktop]({{site.getstarted}}platform.html#browsers-on-desktop-devices). On mobile browsers, you get options to take a quick shot, open an existing picture on the device or open an existing file stored on the device. Example code is as follows

``` javascript
var onSuccess = function() {
    console.log("Loaded a file successfully!");
};
var onFailure = function(errorCode, errorString) {
    console.log(errorString);
};
DWObject.IfShowFileDialog = true;
// PDF Addon is used here to ensure PDF support
DWObject.Addon.PDF.SetResolution(200);
DWObject.Addon.PDF.SetConvertMode(Dynamsoft.EnumDWT_ConvertMode.CM_RENDERALL);
DWObject.LoadImageEx("", Dynamsoft.EnumDWT_ImageType.IT_ALL, onSuccess, onFailure);
```

### Open an existing file with its absolute path

> Only supported on [desktop]({{site.getstarted}}platform.html#browsers-on-desktop-devices) and only when `DWT` runs in the [service mode]({{site.indepth}}initialize.html#service-mode). Example code is as follows

``` javascript
var onSuccess = function() {
    console.log("Loaded a file successfully!");
};
var onFailure = function(errorCode, errorString) {
    console.log(errorString);
};
DWObject.IfShowFileDialog = false;
// PDF Addon is used here to ensure PDF support
DWObject.Addon.PDF.SetResolution(200);
DWObject.Addon.PDF.SetConvertMode(Dynamsoft.EnumDWT_ConvertMode.CM_RENDERALL);
/* "YOUR-FILE-PATH" - example path
 * Windows: 
 *   Local: "D:\\Files\\sample.pdf"
 *   LAN: "\\\\192.168.1.45\\sme\\sample.tif"
 * macOS: "/Applications/Images/sample.pdf"
 * Linux: "/home/userA/Files/sample.pdf"
 */
DWObject.LoadImage("YOUR-FILE-PATH", onSuccess, onFailure);
```

### Drag files onto the viewer area of a `WebTwain` instance and drop them

> Only supported on [desktop]({{site.getstarted}}platform.html#browsers-on-desktop-devices)

### Download

> `Download` is another type of `Load` . The only difference between a `Download` with what's written above is that the file to load needs to be transferred to the local device via the network first. `DWT` takes care of the whole process and supports both `HTTP` and `FTP` .

#### `HTTP` or `HTTPS`

> Supported on [desktop]({{site.getstarted}}platform.html#browsers-on-desktop-devices) and [mobile]({{site.getstarted}}platform.html#browsers-on-mobile-devices). For this option, a URL specifies the file to download. That URL either specifies the path of the file itself or points to a server-side script that eventually returns a file. Check out the code snippets below for both scenarios.

##### The URL specifies a file

``` javascript
/* The sample file path is: 
 * "http://localhost:300/files/sample.tif"
 */
var onSuccess = function() {
    console.log("Downloaded a file successfully!");
};
var onFailure = function(errorCode, errorString) {
    console.log(errorString);
};
DWObject.HTTPPort = 300;
DWObject.HTTPDownload("localhost", "/files/sample.tif", onSuccess, onFailure);
```

##### The URL points to a server-side script

> The method `HTTPDownloadEx` is used because the file type needs to be specified.

JavaScript

``` javascript
/* The sample file path is: 
 * "http://localhost:300/files/sample.tif"
 */
var onSuccess = function() {
    console.log("Downloaded a file successfully!");
};
var onFailure = function(errorCode, errorString) {
    console.log(errorString);
};
DWObject.HTTPPort = 300;
DWObject.HTTPDownloadEx("localhost", "/getFile.aspx", Dynamsoft.EnumDWT_ImageType.IT_TIF, onSuccess, onFailure);
```

Server-side script

> The server-side script can be written in any language and in any logic as long as it returns a file.

``` csharp
<%@ Page Language="C#"%>
<%
try
{
    String fileName = "sample.tif";
    String filePath = Server.MapPath(".") + "\\files\\" + fileName;
    System.IO.FileInfo fileInfo = new System.IO.FileInfo(filePath);
    Response.ClearContent();
    Response.ClearHeaders();
    Response.Clear();
    Response.Buffer = true;
    String fileNameEncode;
    fileNameEncode = HttpUtility.UrlEncode(fileName, System.Text.Encoding.UTF8);
    fileNameEncode = fileNameEncode.Replace("+", "%20");
    String appendedheader = "attachment;filename=" + fileNameEncode;
    Response.AppendHeader("Content-Disposition", appendedheader);
    Response.WriteFile(fileInfo.FullName);
    }
catch (Exception)
{	}
%>
```

#### `FTP`

> Supported on [desktop]({{site.getstarted}}platform.html#browsers-on-desktop-devices).

The following code shows how to download a file from FTP.

``` javascript
/* The sample file path is: 
 * "ftp://192.168.8.20/files/sample.pdf"
 */
var onSuccess = function() {
    console.log("Downloaded a file successfully!");
};
var onFailure = function(errorCode, errorString) {
    console.log(errorString);
};
DWObject.FTPPort = 21;
DWObject.FTPUserName = "FTPUser";
DWObject.FTPPassword = "SomePassword";
DWObject.FTPDownloadEx("192.168.8.20", "/files/sample.pdf", Dynamsoft.EnumDWT_ImageType.IT_PDF, onSuccess, onFailure);
```

### Load files in binary or base64 string format 

> Supported on [desktop]({{site.getstarted}}platform.html#browsers-on-desktop-devices) and [mobile]({{site.getstarted}}platform.html#browsers-on-mobile-devices).

`DWT` is capable of reading files in binary or base64 string format. The following shows how it's done

``` javascript
var onSuccess = function() {
    console.log("Loaded a file successfully!");
};
var onFailure = function(errorCode, errorString) {
    console.log(errorString);
};
/**
 * The following function loads a binary/blob. 
 * The method ConvertToBlob() is used to create
 * the Blob as an example but the actual Blob can 
 * come from anywhere.
 */
function loadFileFromBinary() {
    if (DWObject) {
        DWObject.ConvertToBlob(
            [0],
            Dynamsoft.EnumDWT_ImageType.IT_PDF,
            function(result) {
                DWObject.LoadImageFromBinary(
                    result, onSuccess, onFailure);
            }, onFailure);
    }
}
/**
 * The following function loads a base64 string. 
 * The method ConvertToBase64() is used to create
 * the string as an example but the string can 
 * come from anywhere.
 * NOTE: the prefix such as "data:image/png;base64,"
 * should NOT be included in the data to load.
 */
function loadFileFromBase64() {
    if (DWObject) {
        DWObject.ConvertToBase64(
            [0],
            Dynamsoft.EnumDWT_ImageType.IT_PDF,
            function(result) {
                DWObject.LoadImageFromBase64Binary(
                    result.getData(0, result.getLength()),
                    Dynamsoft.EnumDWT_ImageType.IT_PDF,
                    onSuccess, onFailure);
            }, onFailure);
    }
}
```

### Load files from the system clipboard

> Supported on [desktop]({{site.getstarted}}platform.html#browsers-on-desktop-devices) and only when `DWT` runs in the [service mode]({{site.indepth}}initialize.html#service-mode).

``` javascript
DWObject.LoadDibFromClipboard()
```

## Other Topics

### How to select a scanner by its name

`DWT` has a method `SelectSourceByIndex()` which allows you select a scanner by its index in the source list. In some cases, you may want to select a source by its name. Check out the following code on how to do it.

``` javascript
var sources = DWObject.GetSourceNames();
sources.find(function(name, index) {
    //"EPSON DS-530" is the name of the scanner
    if (name === "EPSON DS-530")
        DWObject.SelectSourceByIndex(index);
})
```

### How to enable remote scan

#### On the Windows desktop where the scanner is connected

* Install `Dynamsoft Service`
* Configure the Service
  + Find the file `DSConfiguration.ini`
  + Add the following line

    > Assume the IP of this desktop is `192.168.8.221`
    > `Server=192.168.8.221`
  + Find the service `Dynamsoft Service` in Windows services list and restart it.

#### Create a WebTwain instance to connect to that service

> Read more [here]({{site.indepth}}initialize.html#dynamsoftwebtwainenvcreatedwtobject))

``` javascript
Dynamsoft.WebTwainEnv.CreateDWTObject(
    "dwtcontrolContainer",
    "192.168.8.221", 18622, 18623,
    function(dwtObject) {
        DWObject = dwtObject;
    },
    function(errorString) {
        console.log(errorString);
    }
);
```

#### Use this WebTwain instance `DWObject` as usual to scan documents.

### How to use a TWAIN-Direct scanner

### How to scan only a selected region

There are a few available ways to achieve this

#### Set `PageSize`

``` javascript
DWObject.SelectSource(function() {
    DWObject.OpenSource();
    DWObject.IfShowUI = false;
    DWObject.PageSize = Dynamsoft.EnumDWT_CapSupportedSizes.TWSS_USLEGAL;
    DWObject.AcquireImage();
});
```

#### Set a layout with `SetImageLayout`

``` javascript
DWObject.SelectSource(function() {
    DWObject.OpenSource();
    DWObject.IfShowUI = false;
    DWObject.Unit = EnumDWT_UnitType.TWUN_INCHES;
    DWObject.SetImageLayout(0, 0, 5, 5);
    DWObject.AcquireImage();
});
```
