---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# OCR

* Descriptions on OCR basic & OCR Pro

Dynamsoft has two offerings for OCR engines. OCR Basic and OCR Professional.

OCR Basic is developed on top of the open source Tesseract engine. OCR Pro on the other hand was developed on top of Kofax's proprietary OCR engine. 

For simple OCR of relatively clear images, OCR basic will meet most needs. It supports 27 languages including English, Arabic, Chinese, and Russian. [Here is a full list of all the languages supported by OCR Basic](https://www.dynamsoft.com/Products/ocr-basic-languages.aspx)

As the name implies, OCR Pro is fast, robust and comes with built-in image pre-processing. It currently supports 119 languages and is the recommended option for any large-scale enterprise grade solution. [Here is a full list of all the languages supported by OCR Pro](https://www.dynamsoft.com/Products/ocr-pro-languages.aspx)

For a quick side-by-side comparison, you can use [this sample application](https://www.dynamsoft.com/Downloads/WebTWAIN-Sample-Download.aspx?SampleID=210) to test the performance of both engines side by side.


* Licensing

Due to the fact that Kofax is the creator of the OCR pro engine, they have implemented a license tracking mechanism that will consider both time (annual license) as well as the usage ( the number of pages that have OCR peformed). This mechanism is mandatory and will need to be implemented for your OCR solution to function properly. For a detailed guide on setting up/ configuring this mechansim, please consult [this guide](https://developer.dynamsoft.com/dwt/kb/develop-with-dynamic-web-twain/dynamic-web-twain-ocr-pro-add-on-license-tracking-mechanism)

OCR Basic on the other hand can be purchased either annually or perpetually and there is no limit on the number of scans that can be performed. Your license key will simply allow for the use of the OCR APIs for the length of time of your contract.

* How to enable OCR Basic

    - Step 1: Include the file: dynamsoft.webtwain.addon.ocr.js in your html. This will give you access to library.  It can be found in the downloaded SDK directory - Dynamic Web TWAIN SDK 16.0\Resources\addon. 

    - Step 2: In your application code, you must use the DWObject.Addon.OCR.Download API so that the OCR DLL resources are downloaded and accessible on the client side. When this API is called for the first time, it will generate a pop-up which requires the user to accept and download the files.

    - Step 3: Install the language pack with DWObject.Addon.OCR.DownloadLangData API. NOTE - By default, only the english dictionary is installed. If you need to support other OCR  Basic languages, you can point to a different ZIP file in the OCR Basic Languages folder. To support the OCR of multiple languages within your application, you can refer to [this article](https://developer.dynamsoft.com/dwt/kb/develop-with-dynamic-web-twain/how-to-add-other-languages-support-in-client-side-ocr-basic-sample)

For a simple snippet on how to use the above APIs, see below:

```javascript
function downloadOCRBasic(bDownloadDLL) {
    var strOCRPath = Dynamsoft.WebTwainEnv.ResourcesPath + "/OCRResources/OCR.zip",//This is the 32bit OCR resources. Of course if your clients are 64bit, you would want to point to that zip.
        strOCRLangPath = Dynamsoft.WebTwainEnv.ResourcesPath + '/OCRResources/OCRBasicLanguages/English.zip';

    if (bDownloadDLL) {
        DWObject.Addon.OCR.Download(
            strOCRPath,
            function () {/*console.log('OCR dll is installed');*/
                downloadOCRBasic(false);
            },
            function (errorCode, errorString) {
                console.log(errorString);
            }
        );
    } else {
        DWObject.Addon.OCR.DownloadLangData(
            strOCRLangPath,
            function () {
            }, function (errorCode, errorString) {
                console.log(errorString);
            });
    }
}
```


* How to set up OCR
    - Language, etc.
    - Topic on how to optimize the recognition
* How to perform OCR

    # 4 methods provided for performing OCR
    - [Recognize()](https://www.dynamsoft.com/docs/dwt/API/Addon.OCR.html#recognize)
    - [RecognizeFile()](https://www.dynamsoft.com/docs/dwt/API/Addon.OCR.html#recognizefile)
    - [RecognizeRect()](https://www.dynamsoft.com/docs/dwt/API/Addon.OCR.html#recognizerect)
    - [RecognizeSelectedImages()](https://www.dynamsoft.com/docs/dwt/API/Addon.OCR.html#recognizeselectedimages)

## Link to samples


- [Simple Client-Side OCR Basic Sample App](https://www.dynamsoft.com/Downloads/WebTWAIN-Sample-Download.aspx?SampleID=133)
- [Zonal OCR which compares both OCR Basic and OCR Pro](https://www.dynamsoft.com/Downloads/WebTWAIN-Sample-Download.aspx?SampleID=210)


https://developer.dynamsoft.com/dwt/kb/develop-with-dynamic-web-twain/dynamic-web-twain-ocr-basic-vs-ocr-pro


https://developer.dynamsoft.com/dwt/kb/develop-with-dynamic-web-twain/dynamic-web-twain-ocr-pro-add-on-license-tracking-mechanism

