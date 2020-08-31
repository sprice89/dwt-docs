---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# HARDWARE

A major feature of the Dynamic Web TWAIN library is to interact with imaging devices like scanners, cameras, etc. The following shows the devices that are supported.

## TWAIN scanners
![Hardware-Scanners-Cameras-1]({{site.assets}}imgs/Hardware-Scanners-Cameras-1.png)

`TWAIN Scanners` refer to image scanners which have drivers that follow the TWAIN standard.

* Facts about TWAIN


  - TWAIN is an application programming interfaces (API) and communication protocol that regulate communication between software and digital imaging devices, such as image scanners and digital cameras. 

  - TWAIN is supported on Microsoft Windows, Linux and macOS X. However, based on our experience and the experience of many of our customers, TWAIN only works well on Windows. On Linux, [`SANE`](#sane-scanners) is the better and preferred alternative; on macOS, [`ICA`](#ica-scanners) is the better and preferred alternative.

  - TWAIN is being actively maintained by the non-profit [TWAIN Working Group](https://www.twain.org/). Members of the group include many scanner vendors and imaging software vendors including FUJITSU, Panasonic, Epson, HP, ExactCODE, LEADTOOLS, and of course Dynamsoft.

  - TWAIN is [the most commonly used protocol](https://www.twain.org/why-twain/) for image capturing and processing. Almost all scanners on the market come with a TWAIN driver and are supported by TWAIN Applications like our DWT library.

## ICA Scanners
![Hardware-Scanners-Cameras-2]({{site.assets}}imgs/Hardware-Scanners-Cameras-2.png)

`ICA Scanners` refer to image scanners which have drivers that have been designed in accordance with the [ImageCaptureCore Framework](https://developer.apple.com/documentation/imagecapturecore).

* Facts about ICA


  - ICA is a framework from Apple which is designed to "Browse for media devices and control them programmatically from your app."

  - ICA is supported on macOS X.

## SANE Scanners
![Hardware-Scanners-Cameras-3]({{site.assets}}imgs/Hardware-Scanners-Cameras-3.png)

`SANE Scanners` refer to image scanners which have drivers that have been designed in accordance with the [SANE API](http://www.sane-project.org/).

* Facts about SANE


  - SANE stands for "Scanner Access Now Easy" and is an application programming interface (API) that provides standardized access to any raster image scanner hardware.

  - SANE is supported on multiple Linux distributions.

## DirectShow Cameras
![Hardware-Scanners-Cameras-4]({{site.assets}}imgs/Hardware-Scanners-Cameras-4.png)

`DirectShow Cameras` refer to the cameras which can be accessed via the [Microsoft DirectShow architecture ](https://docs.microsoft.com/en-us/windows/win32/directshow/introduction-to-directshow). These cameras are either built into desktops / laptops or connected via USB.

## MediaDevices Cameras

`MediaDevices Cameras` refer to the cameras which can be accessed via the [MediaDevices interface](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices). These cameras are either built into desktops / laptops / mobile devices (phones, pads, etc.) or connected vai USB.

> `DirectShow Cameras` and `MediaDevices Cameras` could refer to the same devices which can be accessed either way.


> Try to include info like


https://developer.dynamsoft.com/dwt/kb/2001
https://developer.dynamsoft.com/dwt/kb/2739
https://developer.dynamsoft.com/dwt/kb/2777
https://developer.dynamsoft.com/dwt/kb/2673
https://developer.dynamsoft.com/dwt/kb/2880
https://www.dynamsoft.com/docs/dwt/KB/TroubleShooting.html#ismydevicesupported
https://developer.dynamsoft.com/dwt/kb/develop-with-dynamic-web-twain/work-with-data-source/does-dynamic-web-twain-sdk-support-fingerprint-device
https://developer.dynamsoft.com/dwt/kb/develop-with-dynamic-web-twain/customize-your-scan/dynamic-web-twain-how-to-support-both-twain-and-ica-scanners-on-macos
https://developer.dynamsoft.com/dwt/kb/2885
https://developer.dynamsoft.com/dwt/kb/2881
https://developer.dynamsoft.com/dwt/kb/2659
https://developer.dynamsoft.com/dwt/kb/trouble-shooting-for-end-users/how-to-check-if-your-scanner-is-sane-compatible
https://developer.dynamsoft.com/dwt/kb/trouble-shooting-for-end-users/how-to-find-a-compatible-scanner
https://developer.dynamsoft.com/dwt/kb/trouble-shooting-for-end-users/how-to-test-if-your-scanner-supports-native-scanning-on-mac-os-x
https://developer.dynamsoft.com/dwt/kb/2644
https://developer.dynamsoft.com/dwt/kb/2642
https://developer.dynamsoft.com/dwt/kb/2146
https://developer.dynamsoft.com/dwt/kb/2541
https://developer.dynamsoft.com/dwt/kb/trouble-shooting-for-end-users/why-isnt-my-scanner-working-on-macos

&nbsp

## [Troubleshotting Scanner Hardware Issues](/indepth/troubleshooting/scanners-hardware.md)