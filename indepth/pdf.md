---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# PDF HANDLING 

PDF is one of the most popular file types on the market which is why it is the only non-image file type `DWT` supports at present. Like other file types, `DWT` 'input' and 'output' PDFs.

## Environment

* [Desktop]({{site.getstarted}}platform.html#browsers-on-desktop-devices) and [Mobile]({{site.getstarted}}platform.html#browsers-on-mobile-devices).

* [Service mode]({{site.indepth}}initialize.html#service-mode) and [WASM mode]({{site.indepth}}initialize.html#wasm-mode).

## Include the PDF addon 

To include the PDF addon is to reference the necessary JavaScript file which is included in the [resources files]({{site.about}}faqs.html#what-are-the-resources-files).

> If you are using the [dwt package](https://www.npmjs.com/package/dwt), the barcode reader is already included in the main JavaScript file ( `dynamsoft.webtwain.min.js` or `dynamsoft.webtwain.min.mjs` ) which means you can skip this step.

``` html
< script src="dynamsoft.webtwain.addon.pdf.js">
    < /script>
```

## INPUT

When inputting PDF files, `DWT` tries to extract images from them. That's why `DWT` can handle pure image-based PDFs well. However, most existing PDF files contain much more than just images. In this case, we need to make use of the PDF Rasterizer ( `PDFR` for short) which is part of the PDF addon.

> How PDFR works: As the name suggests, `PDFR` rasterizes a PDF file page by page much like a scanner. You set a resolution and you get the resulting images in that resolution after the rasterization. 

The following code shows the basic usage

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

The method [ `SetConvertMode()` ]({{site.info}}api/Addon_PDF.html#setconvertmode) decides how `PDFR` works and [ `SetResolution()` ]({{site.info}}api/Addon_PDF.html#setresolution) specifies the resolution. These two methods configure and get `PDFR` ready to detect and, if necessary, rasterize any file that come thereafter.

### Questions

#### When shall I use PDFR

`PDFR` is only required for text-based PDFs, to find out whether a file is text-based. Use the method [ `IsTextBasedPDF()` ]({{site.info}}api/Addon_PDF.html#istextbasedpdf) .

#### When is it effective

Once `PDFR` has been configured, it will automatically detect if a file needs to be rasterized and if so, it will convert it to an image(s) with the set resolution. If no resolution is set, the default is 200. `PDFR` is only effective when you input a text-based PDF(s) into the viewer on your webpage. The **inputting** happens when you call any of the following methods

> `PDFR` also works when you drag and drop the file onto the viewer to load it

* [ `LoadImage()` ]({{site.info}}api/input.html#loadimage)
* [ `LoadImageEx()` ]({{site.info}}api/input.html#loadimageex)
* [ `LoadImageFromBase64Binary()` ]({{site.info}}api/input.html#loadimagefrombase64binary)
* [ `LoadImageFromBinary()` ]({{site.info}}api/input.html#loadimagefrombinary)
* [ `FTPDownload()` ]({{site.info}}api/input.html#ftpdownload)
* [ `FTPDownloadEx()` ]({{site.info}}api/input.html#ftpdownloadex)
* [ `HTTPDownload()` ]({{site.info}}api/input.html#httpdownload)
* [ `HTTPDownloadEx()` ]({{site.info}}api/input.html#httpdownloadex)
* [ `HTTPDownloadThroughPost()` ]({{site.info}}api/input.html#httpdownloadthroughpost)
* [ `HTTPDownloadDirectly()` ]({{site.info}}api/input.html#httpdownloaddirectly)

### Other methods

* [ `ConvertToImage()` ]({{site.info}}api/input.html#converttoimage): This method proactively converts a PDF into images.
* [ `GetConvertMode()` ]({{site.info}}api/input.html#getconvertmode): This method returns the current convert mode.
* [ `SetPassword()` ]({{site.info}}api/input.html#setpassword): This method sets a password which is used to open encrypted PDF file(s).

## OUTPUT

`DWT` can output one or multiple images in the buffer as PDF file(s). The resulting file(s) is pure image-based, therefore this feature is built into the core module and no addon is required as was covered in the [output]({{site.indepth}}output.html) section.

However, some advanced features are only possible with the help of the PDF addon. At present, that means configuring the resulting file(s) with the API [ `Write.Setup()` ]({{site.info}}api/input.html#writesetup) as shown below

``` javascript
DWObject.Addon.PDF.Write.Setup({
    author: "Dynamsoft-Support-Team",
    compression: Dynamsoft.EnumDWT_PDFCompressionType.PDF_JP2000,
    creator: "DWT",
    creationDate: "D:20200930",
    keyWords: "TWAIN, DWT, Dynamsoft",
    modifiedDate: "D:20200930",
    producer: "Dynamsoft Corporation",
    subject: "Demoing File",
    title: "Sample PDF Made by DWT",
    version: 1.5,
    quality: 80
});
DWObject.IfShowFileDialog = true;
DWObject.SaveAllAsPDF(' ', function() {}, function() {})
```
