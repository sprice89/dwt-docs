---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# PDF Rasterizer 


* Why PDFR & how it works<br><br>

PDF is one of the most popular file formats on the market. In many cases, PDF files contain text content internally. However, these text based PDFs are not supported by Dynamic Web TWAIN. To load them into the buffer, you must first convert the file to an image. This is where the PDF Rasterizer comes in.<br><br>




* How to enable PDFR<br><br>


To enable the PDF Rasterizer in your webpage or application, you must reference the file `dynamsoft.webtwain.addon.pdf.js`, along with the  other core DWT javascript files,  `dynamsoft.webtwain.initiate.js` and `dynamsoft.webtwain.config.js` See an example below:<br><br>

Unsure if you are dealing with image based or text based PDFs? No worries. One of the features of the PDF Rasterizer is the method `IsTextBasedPDF()`.You can use this method with our 30-day free trial or online demo to test your PDF files and confirm whether the PDF rasterizer is needed.<br><br>

```html
<script type="text/javascript" src="../dist/dynamsoft.webtwain.initiate.js"></script>
<script type="text/javascript" src="../dist/dynamsoft.webtwain.config.js"></script>
<script type="text/javascript" src="../dist/addon/dynamsoft.webtwain.addon.pdf.js"></script>
```
<br><br>


* When it is effective (which APIs, etc.)<br><br>

As mentioned above, PDF rasterizer is most effective when you want to load a text-based PDF into the viewer on your webpage.<br>
Once the PDF rasterizer has been loaded into the page, it will automatically detect if a file needs to be rasterized and if so, <br>
it will convert it to an image with a resolution of 200. That being said, you can always specify your own resolution like in the simple sample below.
<br><br>
```javascript
//check if the addon has been loaded into the page and if so, turn it on.
if (DWObject.Addon.PDF.IsModuleInstalled) {
    DWObject.Addon.PDF.SetResolution(300);
}

//load image
DWObject.LoadImageEx('', Dynamsoft.EnumDWT_ImageType.IT_ALL,//Opens up file selection dialog, specifying to show all supported file formats( BMP, JPEG, PNG, TIFF and PDF)
    function () {console.log('successful');},//optional callback function for when an image has succesfully been loaded
    function (errorCode, errorString) {alert('Load Image:' + errorString);}//optional callback function for when image loading fails.
);
```




## point to a sample (all platforms compliant)


* Set up PDF attributes