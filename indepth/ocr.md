---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# OCR

Dynamsoft has two offerings for OCR engines that can be used as addons for `DWT` : `OCR Basic` ( `OCRB` for short) and `OCR Professional` ( `OCRPro` for short).

`OCRB` is developed on top of the open source [Tesseract engine](https://github.com/tesseract-ocr/tesseract). `OCRPro` on the other hand was developed on top of Kofax's proprietary OCR engine. 

For simple OCR of relatively clear images, `OCRB` will suffice. It supports 27 languages including English, Arabic, Chinese, and Russian, etc. [Here is a full list of all the languages supported by OCRB](https://www.dynamsoft.com/Products/ocr-basic-languages.aspx).

As the name implies, `OCRPro` is fast, robust and comes with built-in image pre-processing. It currently supports 119 languages and is the recommended option for any large-scale enterprise grade solution. [Here is a full list of all the languages supported by OCRPro](https://www.dynamsoft.com/Products/ocr-pro-languages.aspx).

For a quick comparison, you can use [this sample application](https://www.dynamsoft.com/Downloads/WebTWAIN-Sample-Download.aspx?SampleID=210) to test the performance of both engines side by side.

OCR can be performed on the client side as well as the server side.

## Client side OCR

### Environment

Client side OCR only works in [browsers on Windows]({{site.getstarted}}platform.html#browsers-on-Windows) and [Mobile]({{site.getstarted}}platform.html#browsers-on-mobile-devices) and in [Service mode]({{site.indepth}}initialize.html#service-mode).

### Use OCRB

#### Step one - Include the addon

To include this addon is to reference the necessary JavaScript file `dynamsoft.webtwain.addon.ocr.js` which is **NOT** included in the [resources files]({{site.about}}faqs.html#what-are-the-resources-files). If you can't find this file, you can contact [Dynamsoft Support]({{site.about}}getsupport.html) or get it from [here](https://tst.dynamsoft.com/public/download/ocr/OCRBasicx64-v16.zip).

> If you are using the [dwt package](https://www.npmjs.com/package/dwt), the addon is already included in the main JavaScript file ( `dynamsoft.webtwain.min.js` or `dynamsoft.webtwain.min.mjs` ) which means you can skip this step.

``` html
<script src="dynamsoft.webtwain.addon.ocr.js"> </script>
```

#### Step two - Install the addon

`OCRB` is not included by default in the [service installation]({{site.indepth}}deployment/service.html#how-to-install-dwt). To use it, you need to download and install it with the APIs [ `Download()` ]({{site.info}}api/Addon_OCR.html#download) and [ `DownloadLangData()` ]({{site.info}}api/Addon_OCR.html#downloadlangdata).

> `OCRB` requires a dictionary / data when reading a specific language. The following code assumes the target language is "English".

``` javascript
function downloadOCRB(bDownloadDLL) {
    var strOCRPath = Dynamsoft.WebTwainEnv.ResourcesPath + '/addon/OCRx64.zip',
        strOCRLangPath = Dynamsoft.WebTwainEnv.ResourcesPath + '/addon/OCRBasicLanguages/English.zip';
    if (bDownloadDLL) {
        DWObject.Addon.OCR.Download(
            strOCRPath,
            function() {
                /*console.log('OCR dll is installed');*/
                downloadOCRB(false);
            },
            function(errorCode, errorString) {
                console.log(errorString);
            }
        );
    } else {
        DWObject.Addon.OCR.DownloadLangData(
            strOCRLangPath,
            function() {},
            function(errorCode, errorString) {
                console.log(errorString);
            });
    }
}
downloadOCRB(true);
```

The code asks `DWT` to download `OCRB` from the URL `Dynamsoft.WebTwainEnv.ResourcesPath + '/addon/OCRx64.zip'` and the language data from the URL `Dynamsoft.WebTwainEnv.ResourcesPath + '/addon/OCRBasicLanguages/English.zip'` . Both zip files need to be placed on the server where you placed the [resources files]({{site.about}}faqs.html#what-are-the-resources-files). As mentioned above, if you can't find these files, you can get them from [here](https://tst.dynamsoft.com/public/download/ocr/OCRBasicx64-v16.zip).

Once the installation is done, you should be able to find the following file and directory in `C:\Windows\SysWOW64\Dynamsoft\DynamsoftServicex64_16\DynamicOCR` .

* `DynamicOCRx64_10.0.0.0618.dll` : The version number may vary.
* `DynamicOCR\eng.traineddata` : This is for English, other language(s) may have different name(s).

#### Step three - Perform OCR

Once installed, you can start using the addon. Check out the following code snippet which makes use of the methods [ `SetLanguage()` ]({{site.info}}api/Addon_OCR.html#setlanguage), [ `SetOutputFormat()` ]({{site.info}}api/Addon_OCR.html#setoutputformat) and [ `Recognize()` ]({{site.info}}api/Addon_OCR.html#recognize).

``` javascript
function DoOCR() {
    if (DWObject) {
        if (DWObject.HowManyImagesInBuffer == 0) {
            alert("Please scan or load an image first.");
            return;
        }
        if (Dynamsoft.EnumDWT_OCROutputFormat === undefined)
            Dynamsoft.EnumDWT_OCROutputFormat = EnumDWT_OCROutputFormat;
        DWObject.Addon.OCR.SetLanguage('eng');
        DWObject.Addon.OCR.SetOutputFormat(Dynamsoft.EnumDWT_OCROutputFormat.OCROF_TEXT);
        DWObject.Addon.OCR.Recognize(
            DWObject.CurrentImageIndexInBuffer,
            function(sImageIndex, result) {
                if (result == null)
                    return null;
                var _textResult = (Dynamsoft.Lib.base64.decode(result.Get())).split(/\r?\n/g);
                console.log(_textResult.join(" "));
            },
            function(errorcode, errorstring, result) {
                alert(errorstring);
            }
        );
    }
}
```

##### Other methods for OCR

* [ `RecognizeFile()` ]({{site.info}}api/Addon_OCR.html#recognizefile): This method reads a specified local file.
* [ `RecognizeRect()` ]({{site.info}}api/Addon_OCR.html#recognizerect): This method reads a specified rectangular area on an image.
* [ `RecognizeSelectedImages()` ]({{site.info}}api/Addon_OCR.html#recognizeselectedimages): This method reads multiple images at a time.

##### Online demo

[Simple Client-Side OCR Basic Sample App](https://www.dynamsoft.com/Downloads/WebTWAIN-Sample-Download.aspx?SampleID=133)

### Optimize Recognition

There are several ways to improve the OCR accuracy, they involve either adjusting the scanner settings, choosing high-quality source files or using two built-in methods.

#### Better Input

* Adjust resolution -- 300DPI is usually recommended; 
* Adjust color of scanned document - greyscale is recommended; 
* Adjust brightness settings. You would use the [Brightness]({{site.info}}api/WebTwain_Acquire.html#brightness) property for this. A 50% brightness is usually suitable; 
* Adjust file type and compression - Lossless compression types would be the best option (i.e. `TIFF` or `PNG` but not `JPEG` )

> For more elaboration, please see our [blog post](https://www.dynamsoft.com/blog/insights/scan-settings-for-best-ocr-accuracy/) on the matter.

#### The built-in methods

The two methods [ `GetMinFontSizeforMoreAccurateResult()` ]({{site.info}}api/Addon_OCR.html#getminfontsizeformoreaccurateresult) &[ `SetMinFontSizeforMoreAccurateResult()` ]({{site.info}}api/Addon_OCR.html#setminfontsizeformoreaccurateresult) get or set the font size for a regional OCR operation. The idea is that if the engine finds a certain area on the input image to have a font size smaller than what is set, it will try to read that area one more time to get a better result.

### Other methods

* [ `SetPageSetMode()` ]({{site.info}}api/Addon_OCR.html#setpagesetmode): Configures how OCR is done.

The following four methods are only effective when the output format is PDF.

* [ `GetIfUseDetectedFont()` ]({{site.info}}api/Addon_OCR.html#getifusedetectedfont) & [ `SetIfUseDetectedFont()` ]({{site.info}}api/Addon_OCR.html#setifusedetectedfont): Whether to use detected fonts in the resulting PDF.
* [ `GetUnicodeFontName()` ]({{site.info}}api/Addon_OCR.html#getunicodefontname) & [ `SetUnicodeFontName()` ](({{site.info}}api/Addon_OCR.html#setunicodefontname)): Returns or sets the font to use.

### Use OCRPro

#### Step one - Include the addon

To include this addon is to reference the necessary JavaScript file `dynamsoft.webtwain.addon.ocrpro.js` which is **NOT** included in the [resources files]({{site.about}}faqs.html#what-are-the-resources-files). If you can't find this file, you can contact [Dynamsoft Support]({{site.about}}getsupport.html) or get it from [here](https://tst.dynamsoft.com/public/download/ocr/OCRProx64-v16.zip).

> If you are using the [dwt package](https://www.npmjs.com/package/dwt), the addon is already included in the main JavaScript file ( `dynamsoft.webtwain.min.js` or `dynamsoft.webtwain.min.mjs` ) which means you can skip this step.

``` html
<script src="dynamsoft.webtwain.addon.ocrpro.js"> </script>
```

#### Step two - Install the addon

`OCRPro` is not included by default in the [service installation]({{site.indepth}}deployment/service.html#how-to-install-dwt). To use it, you need to download and install it with the APIs [ `Download()` ]({{site.info}}api/Addon_OCRPro.html#download).

> NOTE: The `OCRPro` engine is huge (over 150MB), so it'll take quite a bit of time to download. The good news is that it only needs to be done once.

``` javascript
function downloadOCRPro() {
    var strOCRPath = Dynamsoft.WebTwainEnv.ResourcesPath + '/addon/OCRProx64.zip';
    DWObject.Addon.OCRPro.Download(
        strOCRPath,
        function() {},
        function(errorCode, errorString) {
            console.log(errorString);
        }
    );
}
downloadOCRPro();
```

The code asks `DWT` to download `OCRPro` from the URL `Dynamsoft.WebTwainEnv.ResourcesPath + '/addon/OCRProx64.zip'` . This zip file needs to be placed on the server where you placed the [resources files]({{site.about}}faqs.html#what-are-the-resources-files). As mentioned above, if you can't find these files, you can get them from [here](https://tst.dynamsoft.com/public/download/ocr/OCRProx64-v16.zip).

Once the installation is done, you should be able to find the following under `C:\Windows\SysWOW64\Dynamsoft\DynamsoftServicex64_16`
* `DynamicOCRProx64_1.2.0.0806.dll` : The version number may vary.
* `OCRProResource\{hundreds of files}` : There are a few hundred files under this directory `OCRProResource` .

#### Step three - Perform OCR

Once installed, you can start using the addon. Check out the following code snippet which sets up the operation with [ `Settings` ]({{site.info}}api/Addon_OCRPro.html#settings) and then starts reading with [ `Recognize()` ]({{site.info}}api/Addon_OCRPro.html#recognize).

``` javascript
function DoOCR() {
    if (DWObject) {
        if (DWObject.HowManyImagesInBuffer == 0) {
            alert("Please scan or load an image first.");
            return;
        }
        var settings = Dynamsoft.WebTwain.Addon.OCRPro.NewSettings();
        settings.Languages = "eng";
        settings.OutputFormat = "TXTS";
        //settings.LicenseChecker = "LicenseChecker.aspx";
        DWObject.Addon.OCRPro.Recognize(
            DWObject.CurrentImageIndexInBuffer,
            function(sImageIndex, result) {
                if (result == null)
                    return null;
                var bRet = "",
                    pageCount = result.GetPageCount();
                if (pageCount == 0) {
                    alert("OCR result is Null.");
                    return;
                } else {
                    for (var i = 0; i < pageCount; i++) {
                        var page = result.GetPageContent(i);
                        var letterCount = page.GetLettersCount();
                        for (var n = 0; n < letterCount; n++) {
                            var letter = page.GetLetterContent(n);
                            bRet += letter.GetText();
                        }
                    }
                    console.log(bRet);
                }
            },
            function(errorcode, errorstring, result) {
                if (errorcode != -2600 && errorcode != -2601) {
                    //-2600:LicenseChecker cannot be empty.  
                    //-2601:Cannot connect to the LicenseChecker, please check and make sure it's set correctly.
                    alert(errorstring);
                }
                var strErrorDetail = "";
                var aryErrorDetailList = result.GetErrorDetailList();
                for (var i = 0; i < aryErrorDetailList.length; i++) {
                    if (i > 0)
                        strErrorDetail += ";";
                    strErrorDetail += aryErrorDetailList[i].GetMessage();
                }
                if (strErrorDetail.length > 0 && errorstring != strErrorDetail)
                    alert(strErrorDetail);
            });
    }
}
```

##### About Settings

`OCRPro` is configured though `Settings` , the following shows all the configurable parameters.

Languages: "eng"
LicenseChecker: ""
OutputFormat: ""
PDFAVersion: ""
PDFVersion: ""
RecognitionModule: ""
Redaction: b
FindText: ""
FindTextAction: 2
FindTextFlags: 1

``` javascript
var settings = Dynamsoft.WebTwain.Addon.OCRPro.NewSettings();
settings.RecognitionModule = OCRRecognitionModule[document.getElementById("ddlOCRRecognitionModule").selectedIndex].val;
settings.Languages = OCRLanguages[document.getElementById("ddlLanguages").selectedIndex].val;
settings.OutputFormat = OCROutputFormat[document.getElementById("ddlOCROutputFormat").selectedIndex].val;
```

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> >

##### Other methods for OCR

* [ `RecognizeFile()` ]({{site.info}}api/Addon_OCRPro.html#recognizefile): This method reads a specified local file.
* [ `RecognizeRect()` ]({{site.info}}api/Addon_OCRPro.html#recognizerect): This method reads one or multiple rectangular area(s) on an image.
* [ `RecognizeSelectedImages()` ]({{site.info}}api/Addon_OCRPro.html#recognizeselectedimages): This method reads multiple images at a time.

##### Online demo

[Simple Client-Side OCR Basic Sample App](https://www.dynamsoft.com/Downloads/WebTWAIN-Sample-Download.aspx?SampleID=133)

### Optimize Recognition

There are several ways to improve the OCR accuracy, they involve either adjusting the scanner settings, choosing high-quality source files or using two built-in methods.

#### Better Input

* Adjust resolution -- 300DPI is usually recommended; 
* Adjust color of scanned document - greyscale is recommended; 
* Adjust brightness settings. You would use the [Brightness]({{site.info}}api/WebTwain_Acquire.html#brightness) property for this. A 50% brightness is usually suitable; 
* Adjust file type and compression - Lossless compression types would be the best option (i.e. `TIFF` or `PNG` but not `JPEG` )

> For more elaboration, please see our [blog post](https://www.dynamsoft.com/blog/insights/scan-settings-for-best-ocr-accuracy/) on the matter.

#### The built-in methods

The two methods [ `GetMinFontSizeforMoreAccurateResult()` ]({{site.info}}api/Addon_OCR.html#getminfontsizeformoreaccurateresult) &[ `SetMinFontSizeforMoreAccurateResult()` ]({{site.info}}api/Addon_OCR.html#setminfontsizeformoreaccurateresult) get or set the font size for a regional OCR operation. The idea is that if the engine finds a certain area on the input image to have a font size smaller than what is set, it will try to read that area one more time to get a better result.

### Other methods

* [ `SetPageSetMode()` ]({{site.info}}api/Addon_OCR.html#setpagesetmode): Configures how OCR is done.

The following four methods are only effective when the output format is PDF.

* [ `GetIfUseDetectedFont()` ]({{site.info}}api/Addon_OCR.html#getifusedetectedfont) & [ `SetIfUseDetectedFont()` ]({{site.info}}api/Addon_OCR.html#setifusedetectedfont): Whether to use detected fonts in the resulting PDF.
* [ `GetUnicodeFontName()` ]({{site.info}}api/Addon_OCR.html#getunicodefontname) & [ `SetUnicodeFontName()` ](({{site.info}}api/Addon_OCR.html#setunicodefontname)): Returns or sets the font to use.

# Reference Samples and Further Info

* 

* [Zonal OCR which compares both OCR Basic and OCR Pro](https://www.dynamsoft.com/Downloads/WebTWAIN-Sample-Download.aspx?SampleID=210)
* [OCR Basic vs OCR Pro Comparison](https://developer.dynamsoft.com/dwt/kb/develop-with-dynamic-web-twain/dynamic-web-twain-ocr-basic-vs-ocr-pro)

## How to enable `OCRPro`

For specifics including code samples and overall steps, please see the [OCR Pro developer's guide](https://download2.dynamsoft.com//Support/Developer's%20Guide_OCR_Pro.pdf)

# Licensing

* OCR Pro

Due to the fact that Kofax is the creator of the OCR pro engine, they have implemented a license tracking mechanism that will consider both time (annual license) as well as the usage ( the number of pages that have OCR peformed). This mechanism is mandatory and will need to be implemented for your OCR solution to function properly. For a detailed guide on setting up/ configuring this mechansim, please consult [this guide](https://developer.dynamsoft.com/dwt/kb/develop-with-dynamic-web-twain/dynamic-web-twain-ocr-pro-add-on-license-tracking-mechanism)    

* OCR Basic

OCR Basic on the other hand can be purchased either annually or perpetually and there is no limit on the number of scans that can be performed. Your license key will simply allow for the use of the OCR APIs for the length of time of your contract.

https://developer.dynamsoft.com/dwt/kb/installation-and-upgrade/how-to-upgrade-the-ocr-pro-module-from-trial-to-full

server side
client side
