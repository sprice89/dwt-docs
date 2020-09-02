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
 
  - How to use custom DataSource Data
  > TWAIN only
Scenario
Sometimes you might need to

Change multiple pre-scan settings at once
Make sure all clients with the same scanners are scanning documents with the same settings
In such cases, the custom DS data (CDD) can be very useful. Basically, CDD can be seen as the summary of all the settings for a data source (scanner driver) and it can be saved and passed around. To use this useful feature, we have two methods: SetCustomDSDataEx and GetCustomDSDataEx.

To use this feature, the typical steps are

Show the scanner's User Interface and change all the settings necessary
Perform a scan and remember the CDD in the callback of the event OnPostAllTransfers
As the CDD saved by the method GetCustomDSDataEx is a base64-encoded string, you can save it somewhere (the database on the server, for instance), or pass it around to other users.
In the future, when you or any other user who need to scan with the same settings on the same device, you can hide its own Interface and simply use the method SetCustomDSDataEx to pass the CDD to the device.

  - Use Capability negotiation
    - Use latest APIs get/setCapabilities
    - Find custom capabilities
      - Install the [TWAIN sample application](http://www.dynamsoft.com/download/support/twainapp.win32.installer.msi)
      - Use the TWAIN Sample App to open the source and then check what the hexadecimal value of the capability is.
      ![Indepth-input-1]({{site.assets}}imgs/Indepth-input-1.png)
      ![Indepth-input-2]({{site.assets}}imgs/Indepth-input-2.png)
      - Use this custom capability
      
      ```javascript
      //code
      ```

- Capture
    - Use (DirectShow)[{{site.getstarted}}hardware.html#directshow-cameras]
          
    ```javascript
    //code
    ```
    - Use (MediaDevices)[{{site.getstarted}}hardware.html#MediaDevices-cameras]
        
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