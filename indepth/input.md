---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# INPUT

## Different ways to get data into DWT buffer

- Scan
    - Scan from a local scanner

    > Supported platforms: [Windows]({{site.getstarted}}platform.html#browsers-on-windows), [macOS]({{site.getstarted}}platform.html#browsers-on-windows) & [Linux]({{site.getstarted}}platform.html#browsers-on-linux)

    A local scanner refers to a scanner that is plugged in the same desktop via USB or one that is available on the local network and is accessible on the local desktop. The latter is normally known as a network scanner. Generally, a network scanner is connected to the LAN itself (cable or WI-FI) and is assigned a static IP. Then the scanner driver from the device vendor configures the IP to connect to the scanner.
    
    > As far as `DWT` is concerned, a network scanner is just like a local scanner because its driver has taken care of the network connection underneath.

    - Scan from a remote scanner

    > Supported platforms: [Windows]({{site.getstarted}}platform.html#browsers-on-windows), [macOS]({{site.getstarted}}platform.html#browsers-on-windows), [Linux]({{site.getstarted}}platform.html#browsers-on-linux), [iOS & iPadOS]({{site.getstarted}}platform.html#browsers-on-ios--ipados), [Android]({{site.getstarted}}platform.html#browsers-on-android)

    A remote scanner refers to a scanner that is 
      - Not connected to the device trying to scan
      - Connected and accessible on a Windows desktop in the LAN (USB or network)
        - `DWT` must be installed on this Windows desktop
    
    For more information, check out [how to enable remote scan](#how-to-enable-remote-scan).

  - Scan from a TWAIN-Direct scanner

  A TWAIN-Direct scanner refers to a device that supports the next generation of the TWAIN protocal called [`TWAIN-Direct`](https://www.twaindirect.org/).

  For more information, check [How to use a TWAIN-Direct scanner](#how-to-use-a-twain-direct-scanner).

  - Configure the scan
    - Basic settings (resolution, pixeltype, duplex, etc.)

  - How many images can be scanned

  > Check out [Buffer Management]({{site.indepth}}buffer.html#memory-limits-and-disk-caching)
 
  - How to use Custom DataSource Data

  > This feature is only for `TWAIN scanners`

  Custom DataSource Data (CDD for short) is a feature provided by TWAIN and implemented by TWAIN sources (drivers). The idea is to save all TWAIN-related configurations in a file or a base64 string and use it later to restore the same configurations on the same device or a device of the same model. This feature can be very useful in cases like sharing the same configurations across multiple devices, or presetting a device for scanning, etc.
  
  `DWT` provides 2 pairs of methods to enable this feature which are
    - `GetCustomDSData()`, `SetCustomDSData()`
    - `GetCustomDSDataEx()`, `SetCustomDSDataEx()`
  
  The first pair saves or loads the data from a file and the second pair saves or loads the data from a base64 string.

  The following shows how to use the 2nd pair in JavaScript

  ```javascript

  ```

  - Use Capability Negotiation

  > This feature is only for `TWAIN scanners`

  Capability Negotiation is the way a TWAIN application like `DWT` talk with a TWAIN source like a scanner. It goes like

  - [DWT] Are you capable of ***?
  - [Scanner] Yes and here is what I can do...
  - [DWT] Great, here is what I want things done...
  - [Scanner] Consider it done

  `DWT` provides two methods `getCapabilities()` and `setCapabilities()` for the negotiation. The following shows how to ask for supported pagesizes and set it to A4 using the negotiation.

  ```javascript
  // Retrieve the capabilities and read the available page sizes
  DWObject.getCapabilities(function(result) {
      for(var i = 0; i < result.length; i++) {
          if(result[i].capability.value === Dynamsoft.EnumDWT_Cap.ICAP_SUPPORTEDSIZES)
            sizes = result[i].values;
      }
      console.log(sizes);
    }, function(error) {
      console.log(error);
    }
  );
  ```

  ```javascript
  // Set page size to A4
  DWObject.setCapabilities({
      exception: "ignore",
      capabilities: [
        {
          capability: Dynamsoft.EnumDWT_Cap.ICAP_SUPPORTEDSIZES,
          curValue: 1, // 1 means 'A4' in our case
          exception : "fail"
        }
      ]
    },
    function(result){
      console.log(result)
    },
    function(error){
      console.log(error);
    }
  );
  ```

  > The TWAIN specification defines more than 150 standard capabilities for TWAIN App | Source to choose from. However, some scanner vendors provide advanced and model-specific capabilities which are not included in the specification. We call them custom capabilities. The following steps show how to use them

    - Find custom capabilities
      - Install the [TWAIN sample application](http://www.dynamsoft.com/download/support/twainapp.win32.installer.msi)
      - Use the TWAIN Sample App to open the source and then check what the hexadecimal value of the capability is.

      ![Indepth-input-1]({{site.assets}}imgs/Indepth-input-1.png)

      - Double click and check the available values

      ![Indepth-input-2]({{site.assets}}imgs/Indepth-input-2.png)

      - Use this custom capability
      
      ```javascript
      DWObject.SelectSource();
      DWObject.OpenSource();
      DWObject.setCapabilities({
          exception:"ignore",
          capabilities:
              [
                  {
                      capability:0xA03D,
                      curValue: 3,
                      exception:"fail",
                  }
              ]
        },
        function(capabilities){
          console.log(capabilities);
        },
        function(error){
          console.error(error);
        }
      );
      ```

- Capture
    - Use [DirectShow Cameras]({{site.getstarted}}hardware.html#directshow-cameras)
    
    The following code snippet shows how to use a camera through `DirectShow`

    ```javascript
    function PlayVideo(bShow) {
      if (DWObject) {
        DWObject.Addon.Webcam.SelectSource("CAMERA-NAME");
        DWObject.Addon.Webcam.StopVideo();
        DWObject.Addon.Webcam.PlayVideo(DWObject, 80, function () { });
      }
    }

    function CaptureImage() {
      if (DWObject) {
        DWObject.Addon.Webcam.SelectSource("CAMERA-NAME");
        var funCaptureImage = function () {
          setTimeout(function () {
            DWObject.Addon.Webcam.StopVideo();
          }, 50);
        };
        DWObject.Addon.Webcam.CaptureImage(funCaptureImage, funCaptureImage);
      }
    }
    ```

    - Use [MediaDevices Cameras]({{site.getstarted}}hardware.html#MediaDevices-cameras)
        
    ```javascript
    //code
    ```
    
- Load local files
    - Show dialog
    - Absolute path
    - Drag & drop
    - (mobile) Load from image storage 
    - (android) Load from local directory?
https://developer.dynamsoft.com/dwt/kb/2139
https://developer.dynamsoft.com/dwt/kb/2544
https://developer.dynamsoft.com/dwt/kb/2612
https://developer.dynamsoft.com/dwt/kb/2761
https://developer.dynamsoft.com/dwt/kb/2774

- Download from a remote server
    - HTTP
        - File
        - Stream
    - FTP
https://developer.dynamsoft.com/dwt/kb/2764

## How to achieve automation

- Event-driving workflow
- Next-gen API like `startScan`

### How to select a scanner by its name

DWT has a method `SelectSourceByIndex()` which allows you select a scanner by its index in the source list. In some cases, you may want to select a source by its name. Check out the following code on how to do it.

```javascript
var sources = DWObject.GetSourceNames();
sources.find(function(name,index){
    //"EPSON DS-530" is the name of the scanner
    if(name === "EPSON DS-530")
        DWObject.SelectSourceByIndex(index);
    }
)
```

### How to enable remote scan

- On the Windows desktop where the scanner is connected
  - Install `Dynamsoft Service`
  - Configure the Service
    - Find the file `DSConfiguration.ini` 
    - Add the following line
    > Assume the IP of this desktop is `192.168.8.221`
    
    ```cmd
    Server=192.168.8.221
    ```
    - Find the service `Dynamsoft Service` in Windows services list and restart it.
- In your code, create a WebTwain instance like this

```javascript
Dynamsoft.WebTwainEnv.CreateDWTObject( 
  "dwtcontrolContainer", 
  "192.168.8.221", 18622, 18623,
  function(dwtObject){ 
    DWObject = dwtObject;
    }, 
  function(errorString){ 
    console.log(errorString); 
  } 
); 
```

- Use this WebTwain instance `DWObject` as usual to scan documents.

### How to use a TWAIN-Direct scanner

### How to scan only a selected region

There are a few available ways to achieve this

- Set `PageSize`

```javascript
DWObject.SelectSource(function(){
    DWObject.OpenSource();
    DWObject.IfShowUI = false;
    DWObject.PageSize = Dynamsoft.EnumDWT_CapSupportedSizes.TWSS_USLEGAL;
    DWObject.AcquireImage();
});
```

- Set a layout with `SetImageLayout`

```javascript
DWObject.SelectSource(function(){
    DWObject.OpenSource();
    DWObject.IfShowUI = false;
    DWObject.Unit = EnumDWT_UnitType.TWUN_INCHES;
    DWObject.SetImageLayout(0, 0, 5, 5);
    DWObject.AcquireImage();
});
```