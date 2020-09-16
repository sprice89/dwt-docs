---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# FREQUENTLY ASKED QUESTIONS

## For what purposes can I use DWT

DWT can be used for controlling any work of scanners, digital cameras and any other devices that support the protocals/interfaces [TWAIN](https://www.twain.org/about/) / [ICA](https://developer.apple.com/documentation/imagecapturecore) / [SANE](http://www.sane-project.org/) / [DirectShow](https://docs.microsoft.com/en-us/windows/win32/directshow/introduction-to-directshow) / [MediaDevices](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices), etc. Please check out [hardware]({{site.getstarted}}hardware.html) for more details.

DWT can open/decode files in the formats BMP / JPG / TIF / PNG / PDF or save the resulting images back to any of these formats.

DWT can upload and download files through FTP or HTTP(s).

DWT can read barcode or recognize characters on images or PDFs.

Check out more on [dwt features]({{site.about}}features.html).

## Does DWT support all scanners

Not all scanners follow the standard protocols, therefore not all scanners are supported. A known example is the ScanSnap series. Check out more [here](https://scansnapcommunity.net/why-doesnt-scansnap-have-twain-drivers/).

## Are all scanners in the source list available

No. Although some smart scanner drivers will hide themselves when the scanners are unplugged, most scanner drivers still show up even if the scanners are no longer hooked. This is something DWT can not control. Therefore, please make sure a device is connected before you try to use it.

## Can I use DWT for free

DWT is a commercial software. Generally, Dynamsoft allows it to be used free of charge for up to 60 days with automatically generated trial licenses after which a commercial license needs to be purchased.

## What can I do when my trial license expires

DWT comes with a 30-day free trial license from the day the software is installed with the [Official installer](https://www.dynamsoft.com/Downloads/WebTWAIN_Download.aspx). After that, a developer can extend the trial twice on [this page](https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx?product=dwt).

If more time is required for evaluation purposes, you can contact [Dynamsoft Support]({{site.about}}getsupport.html).

## What if I want Dynamsoft help with the implementation

Dynamsoft provides detailed documentation including multiple samples for the DWT library. However, if you don't want to do the development yourself, you can take advantage of the [Professional Service]({{site.info}}proservice.html).

## What are the most common issues when clients start to use my scan application

* When end clients visit your scan page for the first time on a desktop, they will be automatically asked to download and manually install the Dynamsoft Service. Make sure the clients are aware of this.
* DWT works with scanners via their own vendor-developed drivers. Make sure the proper driver is installed and the scanner itself already works on the system before attempting to use it with the library.

## What are the Resources files

Resources files help you include DWT in your application. The following shows the purpose of these files

- Resources (the folder name can be customized)
  - dynamsoft.webtwain.config.js
  > This file is used to make basic configuration of the Dynamic Web TWAIN library. It's where you enter the product key for the product and to change the initial viewer size, etc.
  - dynamsoft.webtwain.initiate.js
  > This file is the core of the Dynamic Web TWAIN library. 
  - dynamsoft.webtwain.install.js
  > This file is used to configure the dialogs which are shown when the Dynamic Web TWAIN library is not installed or needs to be upgraded. This file is already referenced inside the dynamsoft.webtwain.initiate.js
  - Readme.txt
  - addon
    - dynamsoft.upload.js
    > This file contains the functionalities of the Dynamsoft Upload Module. 
    - dynamsoft.webtwain.addon.barcodereader.js
    > This file contains the functionalities of the Barcode addon. 
    - dynamsoft.webtwain.addon.camera.js
    > This file contains the functionalities of the Camera addon. 
    - dynamsoft.webtwain.addon.ocr.js
    > This file contains the functionalities of the OCR Basic addon. 
    - dynamsoft.webtwain.addon.ocrpro.js
    > This file contains the functionalities of the OCR Professional addon. 
    - dynamsoft.webtwain.addon.pdf.js
    > This file contains the functionalities of the PDF Rasterizer addon. 
    - dynamsoft.webtwain.addon.webcam.js
    > This file contains the functionalities of the Webcam addon. 
    - dbrjs
    > These files are meant for the barcode reader addon under wasm mode.
      - dbr.js
      - dbr-7.4.0.1.full.wasm
      - dbr-7.4.0.1.full.wasm.js
      - dbr-7.4.0.1.worker.js
    - dist
    > Under this directory are the installers for the Dynamsoft Service which needs to be manually installed on each client machine that uses the Dynamic Web TWAIN library as a service.
      - DynamsoftServiceSetup.deb
      > For Linux
      - DynamsoftServiceSetup.msi
      > For Windows
      - DynamsoftServiceSetup.pkg
      > For macOS
      - DynamsoftServiceSetup.rpm
      > For Linux
      - LICENSE
    - src
    > These files contain the following functionalities for the [WASM-mode]({{site.indepth}}initialize.html#wasm-mode)
    > - image input & output
    > - decode & encode
    > - PDF read & write
    > - Viewer & UI
      - dynamsoft.imageio.js
      - dynamsoft.imageio_wasm-<version number>.js
      - dynamsoft.imagecore-<version number>.wasm
      - dynamsoft.imageio-<version number>.wasm
      - dynamsoft.imageProc-<version number>.wasm
      - dynamsoft.pdfReader-<version number>.wasm
      - dynamsoft.pdfWriter-<version number>.wasm
      - dynamsoft.viewer.css
      - dynamsoft.viewer.js
      - dynamsoft.webtwain.css