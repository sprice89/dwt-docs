---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# FREQUENTLY ASKED QUESTIONS

## For what purposes can I use Dynamic Web TWAIN?

Dynamic Web TWAIN can be used for controlling any work of scanners, digital cameras and any other devices that support the protocals/interfaces [TWAIN](https://www.twain.org/about/) / [ICA](https://developer.apple.com/documentation/imagecapturecore) / [SANE](http://www.sane-project.org/) / [DirectShow](https://docs.microsoft.com/en-us/windows/win32/directshow/introduction-to-directshow) / [MediaDevices](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices), etc. Please check out [hardware]({{site.getstarted}}hardware.html) for more details.

Dynamic Web TWAIN can open/decode files in the formats BMP / JPG / TIF / PNG / PDF or save the resulting images back to any of these formats.

Dynamic Web TWAIN can upload and download files through FTP or HTTP(s).

Dynamic Web TWAIN can read barcode or recognize characters on images or PDFs.

Check out more on [dwt features]({{site.about}}features.html).

## Does Dynamic Web TWAIN support all scanners?

Not all scanners follow the standard protocols, therefore not all scanners are supported. A known example is the ScanSnap series. Check out more [here](https://scansnapcommunity.net/why-doesnt-scansnap-have-twain-drivers/).

## Can I use Dynamic Web TWAIN for free?

Dynamic Web TWAIN is a commercial software. Generally, Dynamsoft allows it to be used free of charge for up to 60 days with automatically generated trial licenses after which a commercial license needs to be purchased.

## What can I do when my trial license expires?

Dynamic Web TWAIN comes with a 30-day free trial license from the day the software is installed with the [Official installer](https://www.dynamsoft.com/Downloads/WebTWAIN_Download.aspx). After that, a developer can extend the trial twice on [this page](https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx?product=dwt).

If more time is required for evaluation purposes, please contact [Dynamsoft Support]({{site.about}}resources.html#how-to-get-support).

## What if I want Dynamsoft help with the implementation?

Dynamsoft provides detailed documentation including multiple samples for the  Dynamic Web TWAIN library. However, if you don't want to do the development yourself, you can take advantage of the [Professional Service]({{site.info}}proservice.html).

## What are the most common issues when clients start to use your scan application?

* When end clients visit your scan page for the first time on a desktop, they will be automatically asked to download and manually install the Dynamsoft Service. Make sure the clients are aware of this.
* Dynamic Web TWAIN works with scanners via their own vendor-developed drivers. Make sure the proper driver is installed and the scanner itself already works on the system before attempting to use it with the library.


