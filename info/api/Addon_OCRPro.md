---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# WebTwain.Addon.OCRPro

For Server Side OCR, check out [Server-Side OCR](#server-side)


**Methods**

* [Download()](#download) 
* [IsModuleInstalled()](#ismoduleinstalled)
* [Recognize()](#recognize) 
* [RecognizeFile()](#recognizefile)
* [RecognizeRect()](#recognizerect) 
* [RecognizeSelectedImages()](#recognizeselectedimages)

**Properties**

* [Settings](#settings)

---

## Download

**Syntax**

``` typescript
/**
 * Download and install the OCR Professional add-on on the local system.
 * @param path The URL to download the add-on (typically a ZIP file).
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument errorCode The error code.
 * @argument errorString The error string.
 */
Download(
    path: string,
    successCallback: () => void,
    failureCallback: (
        errorCode: number,
        errorString: string
    ) => void
): void;
```

---
## IsModuleInstalled

**Syntax**

``` typescript
/**
 * Return whether the OCR Professional engine has been installed.
 */
IsModuleInstalled(): boolean;
```

**Usage notes**

This method will attempt to download and install the dll from the server if the dll doesn't exist already or the exising one is of a different version. You can also call `IsModuleInstalled()` first to determine whether it is necessary to call `Download()`.

---

## Recognize

**Syntax**

``` typescript
/**
 * Perform OCR on the specified image in the buffer.
 * @param index Specify the image.
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument imageId The imageId of the image which can be used to find the index.
 * @argument result The OCR result.
 * @argument errorCode The error code.
 * @argument errorString The error string.
 */
Recognize(
    index: number,
    successCallback: (
        imageId: number,
        result: OCRProResult
    ) => void,
    failureCallback: (
        errorCode: number,
        errorString: string,
        result: OCRProResult
    ) => void
): void;
```

---

## RecognizeFile

**Syntax**

``` typescript
/**
 * Perform OCR on the specified local file.
 * @param path Specify a local file.
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument path The file path.
 * @argument result The OCR result.
 * @argument errorCode The error code.
 * @argument errorString The error string.
 */
RecognizeFile(path: string,
    successCallback: (
        path: string,
        result: OCRProResult
    ) => void,
    failureCallback: (
        errorCode: number,
        errorString: string,
        result: OCRProResult
    ) => void
): void;
```

---

## RecognizeRect

**Syntax**

``` typescript
/**
 * Perform OCR on the specified rectangular area(s) on the image.
 * @param index Specify the image.
 * @param aryRects Specify the rectangle(s).
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument imageId The imageId of the image which can be used to find the index.
 * @argument result The OCR result.
 * @argument errorCode The error code.
 * @argument errorString The error string.
 */
RecognizeRect(
    index: number,
    aryRects: Rect[],
    successCallback: (
        imageId: number,
        aryRects: Rect[],
        result: OCRProResult
    ) => void,
    failureCallback: (
        errorCode: number,
        errorString: string,
        result: OCRProResult
    ) => void
): void;
```

---

## RecognizeSelectedImages

**Syntax**

``` typescript
/**
 * Perform OCR on the selected images in the buffer.
 * @param index Specify the image.
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument result The OCR result.
 * @argument errorCode The error code.
 * @argument errorString The error string.
 */
RecognizeSelectedImages(
    successCallback: (
        result: OCRProResult
    ) => void,
    failureCallback: (
        errorCode: number,
        errorString: string,
        result: OCRProResult
    ) => void
): void;
```

**Usage notes**

``` typescript

interface Rect {
    left: number;
    right: number;
    top: number;
    bottom: number;
}
interface OCRProResult {
    /**
     * Return a base64 string that contains the result of the OCR.
     */
    Get(): string;
    /**
     * Return the error code.
     */
    GetErrorCode(): number;
    /**
     * Return an array which contains detailed error information for each page that was OCR'd
     */
    GetErrorDetailList(): Error[];
    /**
     * Return the error string.
     */
    GetErrorString(): string;
    /**
     * Return the source information. It could be the index of the OCR'd image or the path of the OCR'd file.
     */
    GetInput(): number | string;
    /**
     * Return the number of pages already OCR'd on the machine.
     */
    GetAlreadyOCRCount(): string;
    /**
     * Return the number of pages allowed by the current license.
     */
    GetOCRTotalCount(): string;
    /**
     * Return the number of pages in the OCR result.
     */
    GetPageCount(): string;
    /**
     * Return the content of a page.
     * @param index Specify the page
     */
    GetPageContent(index: number): Page;
    /**
     * Save the OCR result as a file.
     * @param path The path to save the file.
     */
    Save(path: string): boolean;
}
interface Error {
    /**
     * Return the index of the image or path of the file.
     */
    GetInput(): number | string;
    /**
     * Return the error message.
     */
    GetMessage(): string;
    /**
     * Return the number of the page on which the error was thrown.
     * If the input is a file, this returns the index of the page in that file.
     * If the input is an image in the buffer, this always returns 0.
     */
    GetPage(): number;
}
interface Page {
    /**
     * Return the number of letters in the page.
     */
    GetLetterCount(): number;
    /**
     * Return the content of the specified letter.
     * @index Specify the letter.
     */
    GetLetterContent(index: number): Letter;
    /**
     * Return the number of recognized rectangles in the page.
     */
    GetZoneCount(): number;
    /**
     * Return the base64-encoded content of the specified rectangle.
     * @index Specify the line.
     */
    GetZoneContent(index: number): string;
}
interface Letter {
    /**
     * Return the text of the letter.
     */
    GetText(): number;
    /**
     * Return the coordinates for the rectangle that contains the specified letter. The coordinates are in the sequence of "left,top,right,bottom" like "121,125,123,143".
     */
    GetLetterRect(): string;
}
```

---

## Settings

**Syntax**

``` typescript
/**
 * Return or set the current settings of the OCR engine.
 */
Settings: Settings | boolean | null;

interface Settings {
    /**
     * Specify the target language.
     */
    Languages: string;
    /**
     * Specify the URL for the license checker.
     */
    LicenseChecker: string;
    /**
     * Specify the output format.
     */
    OutputFormat: Dynamsoft.EnumDWT_OCRProOutputFormat | string;
    /**
     * Specify the PDF/A version.
     */
    PDFAVersion: Dynamsoft.EnumDWT_OCRProPDFAVersion | string;
    /**
     * Specify the PDF version.
     */
    PDFVersion: Dynamsoft.EnumDWT_OCRProPDFVersion | string;
    /**
     * Specify the recognition module.
     */
    RecognitionModule: Dynamsoft.EnumDWT_OCRProRecognitionModule | string;
    /**
     * Configure the redaction.
     */
    Redaction: Redaction;
}
interface Redaction {
    /**
     * Specify the text to redact.
     */
    FindText: string;
    /**
     * Specify how the text is found.
     */
    FindTextFlags: Dynamsoft.EnumDWT_OCRFindTextFlags | number;
    /**
     * Specify how redaction is done.
     */
    FindTextAction: Dynamsoft.EnumDWT_OCRFindTextAction | number;
}
```

**Usage notes**

A Settings object can be created with the following method.
``` typescript
/**
 * Create a new "Settings" object.
 */ 
Dynamsoft.WebTwain.Addon.OCRPro.NewSettings: Settings;
```

----

## Server-Side

The OCR Professional engine runs as a service. The workflow is like this

1. The image(s) is uploaded to the server and saved on the disk.
2. The path(s) of the saved image(s) is sent to the OCR pro service as part of the [OCRPro.ServerSide.Request](#ocrproserversiderequest).
3. The service returns the OCR result in a HTTP Response.

The following demonstrates the structures of the OCR Request and the Response.

### OCRPro.ServerSide.Request

```javascript
{
    productKey: "***",
    inputFile: ["d:\\input\\test.tif"],
    outputFile: " d:\\temp\\ocrresult.pdf",
    zones: [[100, 100, 200, 300]],    
    settings:
    {
        recognitionModule: "auto", /*optional*/
        languages: "eng,arabic",
        recognitionMethod: "File",
        threadCount: "2", /*optional*/
        outputFormat: "IOTPDF",
        pdfVersion: "1.7", /*optional*/
        pdfAVersion: "pdf/a-2a", /*optional*/
        redaction:
            {
            "findText": "TWAIN",
            "findTextFlags": 1,
            "findTextAction": 0
            }
    }
}
```

| API | Description |
|:-|:-|
| **productKey** | The product key which is generated from an OCR license. |
| **inputFile**	| Specify the files to be OCR'd. This is an array of strings which are absolute paths of the files. The supported formats are BMP, JPG, TIF, PDF, PNG, JBIG2, JPEG2000, PCX, etc. Please note the use of '\\\\' instead of just '\\'. |
| **outputFile** | Specify where the output file is saved. If the input includes more than one file, all of them will be merged into one file. Otherwise, the result will only be returned in the [OCRPro.ServerSide.Response](#ocrproserversideresponse). |
| **zones** | Specify which zones are to be OCR'd on an image. There can be multiple zones but it works only when the  `recognitionMethod` is `Page`. The coordinates are in the sequence of `[[left, top, right, bottom]]`.|
| **settings** | Configure the OCR. |
| **.recognitionModule** | Specify which module is to be used for this OCR. Allowed values are: `mostaccurate`, `fastest`, `balanced` and `auto`. `auto` is the default value which means the library will choose one of the 3 modules automatically. |
| **.languages** |Specify the language for this OCR. For example, English: "eng", Arabic :"arabic". You can also set multiple languages like this "eng,arabic". |
| **.recognitionMethod** | Specify how the OCR is done. There are two methods: `Page` is the default value and it means the OCR is performed per page, the other method is `File` which means the OCR is performed per file. The method `File` is faster and it supports multiple threads. But only the method `Page` supports zonal OCR and returning detailed. |
| **.threadCount** | Specify the maximum number of threads to be used OCRing. The default value is -1 which means all possible threads will be used. This setting is only valid when `recognitionMethod` is set to `File`. |
| **.outputFormat** | Specify the output format. Allowed values are `TXTS`, `TXTCSV`, `TXTF`, `XML`, `IOTPDF`, `IOTPDF_MRC` |
| **.pdfVersion** | Specify the version of the PDF file if the `outputFormat` is set to either `IOTPDF` or `IOTPDF_MRC`. The version number allowed ranges from 1.0 to 1.7 and by default it is 1.5. |
| **.pdfAVersion** | Specify the version of the PDF/A file if the `outputFormat` is set to either `IOTPDF` or `IOTPDF_MRC`. The version number allowed are `pdf/a-1a`, `pdf/a-1b`, `pdf/a-2a`, `pdf/a-2b`, `pdf/a-2u`, `pdf/a-3a `, `pdf/a-3b`, `pdf/a-3u`.	|
| **.redaction** | Specify how the redaction is done. |
| **..findText** | A string to specify what to find. |
| **..findTextFlags** | Specify how the text is found. The allowed values are 1 (WHOLEWORD), 2 (MATCHCASE) amd 4 (FUZZYMATCH). |
| **..findTextAction** | Specify how redaction is done. The allowed values are 0 (HIGHLIGHT), 1 (STRIKEOUT) and 2 (MARKFORREDACT). |


### OCRPro.ServerSide.Response

```javascript
{
    "Request": {
        inputFile: ["d:\\input\\test.tif"],
        settings: {...},
        outputFile: ...
    }
    ocrTotalCount: 300000,
    alreadyOCRCount: 80,
    code: 0,
    message: "Recognize succeeded.",
    errorList: 
        [
            {
                "input": "d:\\input\\test.tif",
                "message": "Image file format error.",
                "page": "1"
            }
        ]
    resultFile: "***", 
    resultZoneDetail : 
        [
            ["zone1 words", "zone2 words", "zone3 words"], // page 1
            ["zone1 words", "zone2 words"], // page 2
            ["zone1 words", "zone2 words"] // page 3
        ],
    resultDetail:
        [
            [//page 0
                {//letter 0
                    "letter": "Aa",
                    "boundary": [0,0,18,18]
                },
                {//letter 1
                    ...
                },
                ...
            ],
            [//page 1
                ...
            ],
            ...    
        ]  
}  
```

|API	|Description	|
|:-|:-|
|**inputFile**	|Check out [OCRPro.ServerSide.Request](#ocrproserversiderequest) for more info.|
|**settings**		|Check out [OCRPro.ServerSide.Request](#ocrproserversiderequest) for more info.|
|**outputFile**	|Check out [OCRPro.ServerSide.Request](#ocrproserversiderequest) for more info.|
|**ocrTotalCount**|Return  the number of pages allowed to be OCR'd by the current license.|
|**alreadyOCRCount**		|Return the number of pages already OCR'd.|
|**code**		|Return the error code for the OCR. If it's not `0`, check `errorList` for more details.|
|**message**		|Return the overall error message.|
|**errorList**|Return the detailed error messages for each of the OCR'd files.|
|**resultFile**|Return the result file encoded as a base64 string. It only works when [OCRPro.ServerSide.Request](#ocrproserversiderequest) doesn't specify an output file path.|
|**resultDetail**|Return detailed OCR result down to each found letter in JSON format. This is only valid when the `recognitionMethod` is set to `Page`.|