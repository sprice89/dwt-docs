---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# ABOUT ACTIVEX

**ActiveX** is a software framework created by Microsoft which goes back to the year 1996. It was used extensively in Internet Explorer before `HTML5` stole its light. The technology is now considered deprecated as Microsoft has announced the deprecation plan of the legacy browser altogether.

## DWT & ActiveX

Although `DWT` is now built upon modern technologies like `WebSocket` , `HTML5` , `WebAssemby` , we have nothing but gratitude towards the ActiveX framework because when `DWT` was first released in 2003, it was one of many ActiveX controls and this ActiveX edition of `DWT` continued to dominate for the next 11 years. Even today, the ActiveX edition is still part of `DWT` although it is used just by a small number of customers who want to stick with Internet Explorer 8 or 9.

## The future of ActiveX

Microsoft officially announed that support had ended on `January, 12th, 2016` for Internet Explorer (IE) 10 and older. While IE 11 continues to be supported on Windows 7, 8.1, and 10 right now, Microsoft is gradually deprecating it too as more and more Microsoft products stop working on it.

That said, due to the fact that many enterprise applications still and will continue to rely on IE 11 for some time yet, the browser will continue receiving security updates and technical support for the lifecycle of the version of Windows on which it is installed. Windows 10 is among these versions of Windows on which IE 11 is installed and there is no evidence that Microsoft is going to release a newer version of Windows soon, therfore, it is safe to assume that IE 11 will continue to exist for quite some time. Read more [here](https://docs.microsoft.com/en-us/lifecycle/faq/internet-explorer-microsoft-edge).

The fate of the ActiveX framework depends on the fate of IE 11. As long as IE 11 is still hanging around, ActiveX will continue to be supported.

> Microsoft Edge offers so-called **Internet Explorer mode** but ActiveX is not supported on Edge even when it runs in this mode.

## The future of the ActiveX Edition of DWT

Dynamsoft has a very large customer base and their benefits are our biggest concern. While most of our customers have opted to use the modern browsers like Chrome, Firefox or Safari, a few of them are bound by the requirments of their enterprise applications and have to make use of IE 8 or 9 (mostly emulated by IE 11) in which case only the ActiveX edition of `DWT` can be used. Because of this, Dynamsoft has kept its support of the ActiveX edition as part of the Windows edition until now and will continue to do so as long as Internet Explorer continues to be supported by Microsoft.

At the same time, the ActiveX edition of `DWT` is also being slowly phased out by Dynamsoft just like IE by Microsoft. Apart from the fact that IE is reaching its end of life, the other major reason is the incompatibility of the outdated technologies towards the newer web standards which is obstructing the progress of `DWT` .

If you check out our [release notes]({{site.info}}releases/released.html), you can find that most of our development has been done to the HTML5-based edtions of `DWT` . For ActiveX, the strategy is

* It'll continue to be part of the Windows edition; 
* No new features will be added to it; 
* If a major bug is found, Dynamsoft will fix it; 
* If there is a major feature conflict between two editions, the preference is to change the ActiveX; 

We encourage customers who are still using the ActiveX edition of `DWT` to consider moving to another edition as soon as possible.
