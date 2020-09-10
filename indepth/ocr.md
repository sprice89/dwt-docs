---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# OCR Overview
Dynamsoft has two offerings for OCR engines that can be used as addons for Dynamic WebTWAIN. OCR Basic and OCR Professional.<br><br>

OCR Basic is developed on top of the open source Tesseract engine. OCR Pro on the other hand was developed on top of Kofax's proprietary OCR engine. <br><br>

For simple OCR of relatively clear images, OCR basic will meet most needs. It supports 27 languages including English, Arabic, Chinese, and Russian. [Here is a full list of all the languages supported by OCR Basic](https://www.dynamsoft.com/Products/ocr-basic-languages.aspx)<br><br>

As the name implies, OCR Pro is fast, robust and comes with built-in image pre-processing. It currently supports 119 languages and is the recommended option for any large-scale enterprise grade solution. [Here is a full list of all the languages supported by OCR Pro](https://www.dynamsoft.com/Products/ocr-pro-languages.aspx)<br><br>

For a quick side-by-side comparison, you can use [this sample application](https://www.dynamsoft.com/Downloads/WebTWAIN-Sample-Download.aspx?SampleID=210) to test the performance of both engines side by side.<br><br>

# How to enable OCR pro

For specifics including code samples and overall steps, please see the [OCR Pro developer's guide](https://download2.dynamsoft.com//Support/Developer's%20Guide_OCR_Pro.pdf)<br><br>

# How to enable OCR Basic<br><br>

Step 1: Include the file: dynamsoft.webtwain.addon.ocr.js in your html. This will give you access to library.  It can be found in the downloaded SDK directory - Dynamic Web TWAIN SDK 16.0\Resources\addon. <br><br>

Step 2: In your application code, you must use the DWObject.Addon.OCR.Download API so that the OCR DLL resources are downloaded and accessible on the client side. When this API is called for the first time, it will generate a pop-up which requires the user to accept and download the files.<br><br>

Step 3: Install the language pack with DWObject.Addon.OCR.DownloadLangData API. NOTE - By default, only the english dictionary is installed. If you need to support other OCR  Basic languages, you can point to a different ZIP file in the OCR Basic Languages folder. To support the OCR of multiple languages within your application, you can refer to [this article](https://developer.dynamsoft.com/dwt/kb/develop-with-dynamic-web-twain/how-to-add-other-languages-support-in-client-side-ocr-basic-sample)<br><br>

For a simple snippet on how to use the above APIs, see below:<br><br>

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

Once installed, you can use the addon as shown below. <br><br>

```javascript
function DoOCR() {
    if (DWObject) {
        if (DWObject.HowManyImagesInBuffer == 0) {
            alert("Please scan or load an image first.");
            return;
        }
        DWObject.Addon.OCR.SetLanguage('eng');
        DWObject.Addon.OCR.SetOutputFormat(Dynamsoft.EnumDWT_OCROutputFormat.OCROF_TEXT);
        DWObject.Addon.OCR.Recognize(
            DWObject.CurrentImageIndexInBuffer,
            function (sImageIndex, result) {
                if (result == null)
                    return null;
                var _textResult = (Dynamsoft.Lib.base64.decode(result.Get())).split(/\r?\n/g), _resultToShow = [];
                for (var i = 0; i < _textResult.length; i++) {
                    if (i == 0 && _textResult[i].trim() == "")
                        continue;
                    _resultToShow.push(_textResult[i] + '<br />');
                }
                _resultToShow.splice(0, 0, '<p style="padding:5px; margin:0;">');
                _resultToShow.push('</p>');
                document.getElementById('divNoteMessage').innerHTML = _resultToShow.join('');
            },
            function (errorcode, errorstring, result) {
                alert(errorstring);
            }
        );
    }
}
```


The most important methods used in the above sample are the following three:

```javascript
DWObject.Addon.OCR.SetLanguage('eng'); //Set the language to be recognized
DWObject.Addon.OCR.SetOutputFormat(Dynamsoft.EnumDWT_OCROutputFormat.OCROF_TEXT); //Set the output format
DWObject.Addon.OCR.Recognize(... //Start Recognizing
```

# Optimizing Recognition<br>
There are several ways to improve the OCR accuracy, they all involve either adjusting the scanner settings or changing the image quality.<br><br>
1)Adjust resolution -- 300DPI is usually recommended<br><br>
2)Adjust color of scanned document - greyscale is recommended<br><br>
3)Adjust file type and compression - Lossless compression types would be the best option (ie- TIFF or PNG but not JPEG)<br><br>
4)Adjust brightness settings. You would use the [brightness](../info/api/WebTwain_Acquire.html#brightness) API for this. A 50% brightness is usually suitable<br><br>

For more elaboration, please see our [blog post](https://www.dynamsoft.com/blog/insights/scan-settings-for-best-ocr-accuracy/) on the matter.


# Methods for performing OCR <br>

* 4 methods provided for performing OCR<br>
1.[Recognize()](../info/api/Addon_OCR.html#recognize)<br>
2.[RecognizeFile()](../info/api/Addon_OCR.html#recognizefile)<br>
3.[RecognizeRect()](../info/api/Addon_OCR.html#recognizerect)<br>
4.[RecognizeSelectedImages()](../info/api/Addon_OCR.html#recognizeselectedimages)

# Reference Samples and Further Info


- [Simple Client-Side OCR Basic Sample App](https://www.dynamsoft.com/Downloads/WebTWAIN-Sample-Download.aspx?SampleID=133)
- [Zonal OCR which compares both OCR Basic and OCR Pro](https://www.dynamsoft.com/Downloads/WebTWAIN-Sample-Download.aspx?SampleID=210)
- [OCR Basic vs OCR Pro Comparison](https://developer.dynamsoft.com/dwt/kb/develop-with-dynamic-web-twain/dynamic-web-twain-ocr-basic-vs-ocr-pro)


# Licensing<br>
* OCR Pro<br><br>
Due to the fact that Kofax is the creator of the OCR pro engine, they have implemented a license tracking mechanism that will consider both time (annual license) as well as the usage ( the number of pages that have OCR peformed). This mechanism is mandatory and will need to be implemented for your OCR solution to function properly. For a detailed guide on setting up/ configuring this mechansim, please consult [this guide](https://developer.dynamsoft.com/dwt/kb/develop-with-dynamic-web-twain/dynamic-web-twain-ocr-pro-add-on-license-tracking-mechanism)<br><br>    

* OCR Basic<br><br>
OCR Basic on the other hand can be purchased either annually or perpetually and there is no limit on the number of scans that can be performed. Your license key will simply allow for the use of the OCR APIs for the length of time of your contract.<br><br>



