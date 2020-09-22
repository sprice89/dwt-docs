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

### Use OCRB on the Client Side

#### Step one - Include OCRB

To include this addon is to reference the necessary JavaScript file `dynamsoft.webtwain.addon.ocr.js` which is **NOT** included in the [resources files]({{site.about}}faqs.html#what-are-the-resources-files). If you can't find this file, you can contact [Dynamsoft Support]({{site.about}}getsupport.html) or get it from [here](https://tst.dynamsoft.com/public/download/ocr/OCRBasicx64-v16.zip).

> If you are using the [dwt package](https://www.npmjs.com/package/dwt), the addon is already included in the main JavaScript file ( `dynamsoft.webtwain.min.js` or `dynamsoft.webtwain.min.mjs` ) which means you can skip this step.

``` html
<script src="dynamsoft.webtwain.addon.ocr.js"> </script>
```

#### Step two - Install OCRB

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

#### Step three - Perform OCR with OCRB

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

##### Other methods for OCRB

* [ `RecognizeFile()` ]({{site.info}}api/Addon_OCR.html#recognizefile): This method reads a specified local file.
* [ `RecognizeRect()` ]({{site.info}}api/Addon_OCR.html#recognizerect): This method reads a specified rectangular area on an image.
* [ `RecognizeSelectedImages()` ]({{site.info}}api/Addon_OCR.html#recognizeselectedimages): This method reads multiple images at a time.
* [ `GetMinFontSizeforMoreAccurateResult()` ]({{site.info}}api/Addon_OCR.html#getminfontsizeformoreaccurateresult) &[ `SetMinFontSizeforMoreAccurateResult()` ]({{site.info}}api/Addon_OCR.html#setminfontsizeformoreaccurateresult): Gets or sets the font size for a regional OCR operation. The idea is that if the engine finds a certain area on the input image to have a font size smaller than what is set, it will try to read that area one more time to get a better result.
* [ `SetPageSetMode()` ]({{site.info}}api/Addon_OCR.html#setpagesetmode): Configures how OCR is done.

> The following four methods are only effective when the output format is PDF.

* [ `GetIfUseDetectedFont()` ]({{site.info}}api/Addon_OCR.html#getifusedetectedfont) & [ `SetIfUseDetectedFont()` ]({{site.info}}api/Addon_OCR.html#setifusedetectedfont): Whether to use detected fonts in the resulting PDF.
* [ `GetUnicodeFontName()` ]({{site.info}}api/Addon_OCR.html#getunicodefontname) & [ `SetUnicodeFontName()` ](({{site.info}}api/Addon_OCR.html#setunicodefontname)): Returns or sets the font to use.

##### Online demo for OCRB

[Scan-Documents-and-Do-Client-side-OCR-Basic](https://www.dynamsoft.com/Downloads/WebTWAIN-Sample-Download.aspx?SampleID=133)

### Use OCRPro on the Client Side

#### Step one - Include OCRPro

To include this addon is to reference the necessary JavaScript file `dynamsoft.webtwain.addon.ocrpro.js` which is **NOT** included in the [resources files]({{site.about}}faqs.html#what-are-the-resources-files). If you can't find this file, you can contact [Dynamsoft Support]({{site.about}}getsupport.html) or get it from [here](https://tst.dynamsoft.com/public/download/ocr/OCRProx64-v16.zip).

> If you are using the [dwt package](https://www.npmjs.com/package/dwt), the addon is already included in the main JavaScript file ( `dynamsoft.webtwain.min.js` or `dynamsoft.webtwain.min.mjs` ) which means you can skip this step.

``` html
<script src="dynamsoft.webtwain.addon.ocrpro.js"> </script>
```

#### Step two - Install OCRPro

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

#### Step three - Perform OCR with OCRPro

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

#### About Settings

`OCRPro` is configured through `Settings` , the following shows all the configurable parameters. Check out more details [here]({{site.info}}api/Addon_OCRPro.html#settings). The following shows how to OCR and create a PDF file that has the keyword 'TWAIN' stricken out.

``` javascript
var settings = Dynamsoft.WebTwain.Addon.OCRPro.NewSettings();
settings.Languages = "eng";
settings.LicenseChecker = "LicenseChecker.aspx";
settings.OutputFormat = Dynamsoft.EnumDWT_OCRProOutputFormat.OCRPFT_IOTPDF;
settings.PDFAVersion = Dynamsoft.EnumDWT_OCRProPDFAVersion.OCRPPDFAV_1A;
settings.PDFVersion = Dynamsoft.EnumDWT_OCRProPDFVersion.OCRPPDFV_5;
settings.RecognitionModule = Dynamsoft.EnumDWT_OCRProRecognitionModule.OCRPM_FASTEST;
settings.Redaction.FindText = "TWAIN";
settings.Redaction.FindTextFlags = Dynamsoft.EnumDWT_OCRFindTextFlags.OCRFT_WHOLEWORD;
settings.Redaction.FindTextAction = Dynamsoft.EnumDWT_OCRFindTextAction.OCRFT_STRIKEOUT;
```

##### Other methods for OCRPro

* [ `RecognizeFile()` ]({{site.info}}api/Addon_OCRPro.html#recognizefile): This method reads a specified local file.
* [ `RecognizeRect()` ]({{site.info}}api/Addon_OCRPro.html#recognizerect): This method reads one or multiple rectangular area(s) on an image.
* [ `RecognizeSelectedImages()` ]({{site.info}}api/Addon_OCRPro.html#recognizeselectedimages): This method reads multiple images at a time.

##### Online demo for OCRPro

[Scan-Documents-and-Do-Client-side-OCR-Pro](https://www.dynamsoft.com/Downloads/WebTWAIN-Sample-Download.aspx?SampleID=149)

### Questions

#### Can I OCR multiple languages at the same time

Yes, but only with [OCRPro](use-ocrpro). The code is like

``` javascript
// Reads both English and Arabic
settings.Languages = "eng,arabic"
```

#### Can I OCR multiple zones at the same time

Yes, but only with [OCRPro](use-ocrpro). The code is like

``` javascript
var aryRects = [{
        left: 213,
        top: 105,
        right: 419,
        bottom: 166
    },
    {
        left: 112,
        top: 256,
        right: 303,
        bottom: 325
    }
];
DWObject.Addon.OCRPro.RecognizeRect(
    0, aryRects,
    function(sImageIndex, aryRects, result) {
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
    }
);
```

#### What is a LicenseChecker

The `LicenseChecker` is a server-side script that tracks the usage of the license. It's required by [OCRPro](use-ocrpro). For more info, please check out [OCRPro License Tracking Mechanism](https://tst.dynamsoft.com/public/docs/ocr/OCRPRO-LICENSE-TRACKING-MECHANISM.pdf).

Also check out [License Checker for OCRPro]({{server.indepth}}development/serverscript.md#license-checker-for-ocrpro) on how to write the server side script.

#### Comparsion between OCRB and OCRPro

Check out the comparison sheet [here](https://www.dynamsoft.com/Documents/ocr-basic-versus-ocr-pro.pdf).

#### How to optimize Recognition

There are several ways to improve the OCR accuracy, they involve either adjusting the scanner settings or choosing high-quality source files.

* Adjust resolution -- 300DPI is usually recommended; 
* Adjust color of scanned document - greyscale is recommended; 
* Adjust brightness settings. You would use the [Brightness]({{site.info}}api/WebTwain_Acquire.html#brightness) property for this. A 50% brightness is usually suitable; 
* File type and compression - Lossless compression types would be the better option (i.e. `TIFF` or `PNG` but not `JPEG` )

> For more elaboration, please see our [blog post](https://www.dynamsoft.com/blog/insights/scan-settings-for-best-ocr-accuracy/) on the matter.

## Server side OCR

### Environment

Server side OCR has no restriction on what OS or application is running on the client side. It receives an OCR request via HTTP from a client, carries out the OCR operation and returns the results to the client. While both `OCRB` and `OCRPro` can work on the server side, we generally recommend the use of `OCRPro` in this scenario.

For `OCRPro` , only Windows can be used as the server OS. For `OCRB` , the server can run either `Windows` or `Linux` .

### Use OCRPro on the Server Side

The following shows how to set up the environment for server-side `OCRPro` .

#### Download the resources

The resources of `OCRPro` can be downloaded [here](https://tst.dynamsoft.com/public/download/ocr/OCRProx64-v16-Server.zip).

#### Install OCRPro on the Server

`OCRPro` must be used with `Dynamsoft Service` . If the service is not installed yet, install it first. Check out [How to install Dynamsoft Service]({{site.indepth}}deployment/service.html#how-to-install-dwt). Once the service is installed, unzip the resources downloaded in the previous step and put all the files in the service directory which is typically located at `C:\Windows\SysWOW64\Dynamsoft\DynamsoftServicex64_16` .

#### Use OCRPro on the Server

`OCRPro` runs as a service on the server, it receives an OCR request and process it before returning the results. But there are lots of other things to be considered which are listed below. 

> For more informaiton on how it works, check out [the demos](#online-demo-for-ocrpro-on-the-server-side)

##### What the client needs to do

* Choose one or multiple source file(s) for OCRing
* Specify how the OCR should be done
* Upload both the file(s) and the configuration via an HTTP request
* Wait to receive the results

##### What the server needs to do

* Receive the HTTP request and parse it
* Save the uploaded file(s) to a temporary location
* Fill in the missing pieces in the configuration which includes but is not limited to the source file location, the output location, etc.
* Send a request to the `OCRPro` service and wait for the results
* Send the results back to the client

The following code shows how the 2nd last step (the step where `OCRPro` is involved) works (sample in CSharp)

``` csharp
using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.Net;

namespace OCRProServer
{
    public class DoOCRPro
    {
        private bool m_bFinsh = false;
        private string m_strResponse = "";
        public event UploadStringCompletedEventHandler UploadStringCompleted;
        public string DoOCR(string strRequestBody)
        {
            try
            {
                System.ComponentModel.AsyncOperationManager.SynchronizationContext = new System.Threading.SynchronizationContext();
                m_bFinsh = false;
                m_strResponse = "";
                using (System.Net.WebClient client = new System.Net.WebClient())
                {
                    client.Headers.Set("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.7 Safari/537.36");
                    client.UploadStringCompleted += new UploadStringCompletedEventHandler(UploadStringCallback);
                    Uri objUrl = new Uri("http://127.0.0.1:18622/dwt/dwt_16100728/OCRPro");
                    client.UploadStringAsync(objUrl, strRequestBody);
                    while (1 > 0)
                    {
                        if (m_bFinsh == true)
                            break;
                        System.Threading.Thread.Sleep(1000);
                    }
                    return m_strResponse;
                }
            }
            catch (Exception ex)
            {
                string _ex = ex.Message;
                return _ex;
            }
        }
        private void UploadStringCallback(object sender, UploadStringCompletedEventArgs e)
        {
            m_bFinsh = true;
            m_strResponse = e.Result;   
        }
    }   
}
```

In the above code, `strRequestBody` is the request string from the client, the following is an example

``` javascript
'{\"productKey\": \"t0068UwAAAKFJIfMK40K5w7fZAGnZGT66NwT7b0knh9Zk64FmR5uh3zBxP2VJVVQfjoOjmRJEBdrSu/8S1OPmkefKBxBZYH0=\",\"inputFile\":[\"E:\\Temp\\Sample\\UploadedImages\\original\\20200921_111323_411_803sample.tif\"],\"settings\": {\"recognitionModule\": \"AUTO\",\"languages\": \"eng\",\"recognitionMethod\": \"Page\",\"threadCount\": \"2\",\"outputFormat\": \"TXTS\"},\"zones\": [],\"outputFile\": \"E:\\Temp\\Sample\\UploadedImages\\results\\30f5a4f0g3kwvy3zlb5lus55\\20200921_111323_441_803.txt\"}'
```

To make it readable, the following shows the same request as a JSON object, you can see that it basically tells `OCRPro` where to find the source file, how to perform OCR and where to save the resulting file.

``` JavaScript
{
    "productKey": "t0068UwAAAKFJIfMK40K5w7fZAGnZGT66NwT7b0knh9Zk64FmR5uh3zBxP2VJVVQfjoOjmRJEBdrSu/8S1OPmkefKBxBZYH0=",
    "inputFile": ["E:\\Temp\\Sample\\UploadedImages\\original\\20200921_111323_411_803sample.tif"],
    "settings": {
        "recognitionModule": "AUTO",
        "languages": "eng",
        "recognitionMethod": "Page",
        "threadCount": "2",
        "outputFormat": "TXTS"
    },
    "zones": [],
    "outputFile": "E:\\Temp\\Sample\\UploadedImages\\results\\30f5a4f0g3kwvy3zlb5lus55\\20200921_111323_441_803.txt"
}
```

For more information on the configuration, check out [OCRPro Request]({{site.info}}api/Addon_OCRPro.html#ocrproserversiderequest).

The result from `OCRPro` is also a string

``` javascript
'{"request":{"productKey": "t0068MgAAAKk5nzw7Ecl1QTHojmUi0rirfoEXce8SHEAPsDYLF5LYej1qeka3+1fJIrvOQvize+9ZvzdxpqHpbk29eqrGR8g=","inputFile":["E:\\\\Temp\\\\Sample\\\\UploadedImages\\\\original\\\\20200921_130743_710_538sample.tif"],"settings": {"recognitionModule": "AUTO","languages": "eng","recognitionMethod": "Page","threadCount": "2","outputFormat": "TXTS"},"zones": [],"outputFile": "E:\\\\Temp\\\\Sample\\\\UploadedImages\\\\results\\\\30f5a4f0g3kwvy3zlb5lus55\\\\20200921_130743_711_538.txt"},"code":0,"message":"Recognize succeeded.","alreadyOCRCount":1,"ocrTotalCount":10000,"resultFile":"\","resultDetail":[[{"letter":"W","boundary":[120,126,137,140]},{"letter":"s","boundary":[831,1253,839,1265]}...]],"resultZoneDetail":[[]],"errorList":[]}'
```

In JSON, it is like this

``` javascript
{
    "request": {
        "productKey": "t0068MgAAAKk5nzw7Ecl1QTHojmUi0rirfoEXce8SHEAPsDYLF5LYej1qeka3+1fJIrvOQvize+9ZvzdxpqHpbk29eqrGR8g=",
        "inputFile": ["E:\\\\Temp\\\\Sample\\\\UploadedImages\\\\original\\\\20200921_130743_710_538sample.tif"],
        "settings": {
            "recognitionModule": "AUTO",
            "languages": "eng",
            "recognitionMethod": "Page",
            "threadCount": "2",
            "outputFormat": "TXTS"
        },
        "zones": [],
        "outputFile": "E:\\\\Temp\\\\Sample\\\\UploadedImages\\\\results\\\\30f5a4f0g3kwvy3zlb5lus55\\\\20200921_130743_711_538.txt"
    },
    "code": 0,
    "message": "Recognize succeeded.",
    "alreadyOCRCount": 1,
    "ocrTotalCount": 10000,
    "resultFile": "\\",
    "resultDetail": [
        [{
            "letter": "W",
            "boundary": [120, 126, 137, 140]
        }, {
            "letter": "s",
            "boundary": [831, 1253, 839, 1265]
        }, ...]
    ],
    "resultZoneDetail": [
        []
    ],
    "errorList": []
}
```

For more information on the resulting object, check out [OCRPro Response]({{site.info}}api/Addon_OCRPro.html#ocrproserversideresponse).

##### Online demo for OCRPro on the Server side

* CSharp: [Scan-Documents-and-Do-Server-side-OCR-Pro](https://www.dynamsoft.com/Downloads/WebTWAIN-Sample-Download.aspx?SampleID=148)
* Java: [Scan-Documents-and-Do-Server-side-OCR-Pro-Java](https://www.dynamsoft.com/Downloads/WebTWAIN-Sample-Download.aspx?SampleID=213)

### Use OCRB on the Server Side

As mentioned above, using OCRB on the server side is not recommended by Dynamsoft unless

* You need to read a language not supported by `OCRPro` like Chinese. [Languages List](https://www.dynamsoft.com/Products/ocr-pro-languages.aspx)
* You need to do OCR on Linux

The following shows how to get `OCRB` set up, the environment is

* OS: Windows 10
* JRE: 1.8.0_221
* Web Server: Tomcat 9.0.24 (64bit)
* Eclipse: Oxygen.3a Release (4.7.3a)

> If you'd like to use other environments, please first contact [Dynamsoft Support]({{site.about}}getsupport.html).

#### Download OCRB resources

The resources of `OCRB` for the specified environment can be downloaded [here](https://tst.dynamsoft.com/public/download/ocr/OCRBasicx64-v16-Server.zip).

#### Deploy OCRB resources

Unzip what's downloaded in the previous step, copy the entire folder `WebContent` and paste it to Tomcat. In our case, the folder goes to `C:\Program Files\Apache Software Foundation\Tomcat 9.0\webapps` .

#### Use OCRB

##### Upload the file and the configuration

The following code shows how to upload the file to be read using `DWT` and the configuration for the reading

> NOTE: you can upload the file and the configuration in other ways too, it's not required to use `DWT` .

``` javascript
function DoOCR(index) {
    if (DWObject) {
        // `url` is the target URL to receive the HTTP request.
        var url = CurrentPath + "upload";
        DWObject.ClearAllHTTPFormField();
        DWObject.SetHTTPFormField("ProductKey", DWObject.ProductKey);
        DWObject.SetHTTPFormField("OutputFormat", OCROutputFormat[document.getElementById("ddlOCROutputFormat").selectedIndex].val);
        DWObject.SetHTTPFormField("InputLanguage", OCRLanguages[document.getElementById("ddlLanguages").selectedIndex].val);
        DWObject.HTTPUpload(
            url,
            [index],
            Dynamsoft.EnumDWT_ImageType.IT_PDF,
            Dynamsoft.EnumDWT_UploadDataFormat.Binary,
            "sampleFile.pdf",
            function() {
                console.log('upload success with no returned info');
            },
            // `OnOCRResultReturned` processes the returend OCR result
            OnOCRResultReturned
        );
    }
}
```

##### Receive and save the uploaded file

Open the file `CRBasicx64-v16-Server\src\com\dynamsoft\demo\FileLoadServlet.java` to see how it works. The core function in there is called `service()` . We'll break it down below

``` java
DiskFileItemFactory factory = new DiskFileItemFactory();
String path = this.getServletContext().getRealPath("/uploadTemp");
factory.setRepository(new File(path));
factory.setSizeThreshold(1024 * 1024);
ServletFileUpload upload = new ServletFileUpload(factory);
List<FileItem> list;
try {
    list = (List<FileItem>)upload.parseRequest(request);
    for (FileItem item: list) {
        String name = item.getFieldName();
        if (item.isFormField()) {} else {
            String value = item.getName();
            int start = value.lastIndexOf("\\");
            String filename = value.substring(start + 1);
            request.setAttribute(name, filename);
            InputStream inputStream = null;
            OutputStream out = null;
            try {
                inputStream = item.getInputStream();
                byte[] aryImageBuffer = FileLoadServlet.readBytes(inputStream);
                out = new FileOutputStream(new File(path, filename));
                out.write(aryImageBuffer, 0, aryImageBuffer.length);
            } catch (IOException e) {
            } finally {
                inputStream.close();
                out.close();
            }
        }
    }
} catch (FileUploadException e1) {
    e1.printStackTrace();
}
```

The above code (extracted from `service()` ) is used for receiving and saving the uploaded file, it's not really necessary as OCR happens at the same time.

##### Perform OCR and return the results

``` java
// Define the paths of the OCRB Engine and the language data path
String strDllPath = this.getServletContext().getRealPath("/") + "WEB-INF\\lib";
String strTessDataPath = this.getServletContext().getRealPath("/") + "WEB-INF\\lib\\tessdata";
// Define the response header
response.setContentType("text/html;charset=utf-8");
request.setCharacterEncoding("utf-8"); 
String fileExtention = ".txt";
// Create an OCRB instance
DynamsoftOCRBasic ocr = new DynamsoftOCRBasic();
ocr.setOCRDllPath(strDllPath);
ocr.setOCRTessDataPath(strTessDataPath);
// Do OCR
byte[] result = ocr.ocrImage(aryImageBuffer, refaryRetResultDetails);
if(result.length > 0) {
	if(fileExtention == ".pdf"){
		response.getWriter().write("|#|" + strOCRResultFileName);
	} else {
		response.reset(); 
		response.setContentType("text/plain");
		response.setHeader("Content-disposition", "attachment; filename=\"" + strOCRResultFileName + "\"");
		// Write file to response.
		OutputStream output = response.getOutputStream();
		output.write(result);
		output.close();
	}
}
// Write the result on the server too (not necessary, just for future reference)
outResult = new FileOutputStream(new File(path, strOCRResultFileName));
outResult.write(result, 0, result.length);
outResult.close();
```

As shown in the above code, `OCRB` is represented by the class `DynamsoftOCRBasic` and the key method is `ocrImage()` . Check out the [full list of the OCRB server-side methods]({{server.info}}api/Addon_OCR.html#server-side).

##### Online demo for OCRB on the Server side

[Scan-Documents-and-Do-Server-side-OCR-Basic-Java](https://www.dynamsoft.com/Downloads/WebTWAIN-Sample-Download.aspx?SampleID=212)
