---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# WebTwain.Addon.OCR

For Server Side OCR, check out [Server-Side OCR](#server-side).

**Methods**

* [Download()](#download) 
* [DownloadLangData()](#downloadlangdata)
* [IsModuleInstalled()](#ismoduleinstalled) 
* [SetLanguage()](#setlanguage)
* [SetOutputFormat()](#setoutputformat) 
* [SetPageSetMode()](#setpagesetmode)
* [GetIfUseDetectedFont()](#getifusedetectedfont) 
* [SetIfUseDetectedFont()](#setifusedetectedfont)
* [GetUnicodeFontName()](#getunicodefontname) 
* [SetUnicodeFontName()](#setunicodefontname)
* [GetMinFontSizeforMoreAccurateResult()](#getminfontsizeformoreaccurateresult) 
* [SetMinFontSizeforMoreAccurateResult()](#setminfontsizeformoreaccurateresult)
* [Recognize()](#recognize) 
* [RecognizeFile()](#recognizefile)
* [RecognizeRect()](#recognizerect) 
* [RecognizeSelectedImages()](#recognizeselectedimages)

---

## Download

**Syntax**

``` typescript
/**
 * Download and install the OCR add-on on the local system.
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
 * Return whether the OCR engine has been installed.
 */
IsModuleInstalled(): boolean;
```

**Usage notes**

This method will attempt to download and install the dll from the server if the dll doesn't exist already or the exising one is of a different version. You can also call `IsModuleInstalled()` first to determine whether it is necessary to call `Download()`.

---

## DownloadLangData

**Syntax**

``` typescript
/**
 * Download and install an OCR language package.
 * @param path The URL to download the package (typically a ZIP file).
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument errorCode The error code.
 * @argument errorString The error string.
 */
DownloadLangData(
    path: string,
    successCallback: () => void,
    failureCallback: (
        errorCode: number,
        errorString: string
    ) => void
): void;
```

---

## GetIfUseDetectedFont

**Syntax**

``` typescript
/**
 * Return whether the output uses the fonts detected by the OCR system or the default/provided ones. Only valid when the result format is PDF.
 */
GetIfUseDetectedFont(): boolean;
```

---
## SetIfUseDetectedFont

**Syntax**

``` typescript
/**
 * Set whether the output uses the fonts detected by the OCR system or the default/provided ones. Only valid when the result format is PDF.
 * @param value Whether to use or not the detected font.
 */
SetIfUseDetectedFont(value: boolean): boolean;
```


## GetMinFontSizeforMoreAccurateResult

**Syntax**

``` typescript
/**
 * Return the font size base to apply higher-level regional accurate OCR.
 */
GetMinFontSizeforMoreAccurateResult(): number;
```

---
## SetMinFontSizeforMoreAccurateResult

**Syntax**

``` typescript
/**
 * Set the font size base to apply higher-level regional accurate OCR.
 * @param size Specify the size.
 */
SetMinFontSizeforMoreAccurateResult(size: number): number;
```

**Usage notes**

If the font size is set to 0, it indicates no regional accurate OCR will be performed.

---

## GetUnicodeFontName

**Syntax**

``` typescript
/**
 * Return the font name for OCR. Only valid when the output format is PDF.
 */
GetUnicodeFontName(): string;
```

---
## SetUnicodeFontName

**Syntax**

``` typescript
/**
 * Set the font name for OCR. Only valid when the output format is PDF.
 * @param name Specify a font to be used for the OCR.
 */
SetUnicodeFontName(name: string): boolean;
```

**Usage notes**

The `name` parameter in `SetUnicodeFontName()` should be the name (without the `.font` extension) of an existing Windows font in the directory (`C:\Windows\Fonts`).

The definition of a "unicode" font is loose. Any font can be provided here, however it needs to support the characters of the language to be used. Some fonts may support only some languages, but certain fonts such as `ArialUni` supports all common languages.

The font set with `SetUnicodeFontName()` is only used when `SetIfUseDetectedFont()` was called with `false` as the argument for `value`. In other words, the set font will only be used if the engine doesn't use the detected fonts.

---

## SetLanguage

**Syntax**

``` typescript
/**
 * Configure the OCR operation.
 * @param language Specify the target language.
 */
SetLanguage(language: Dynamsoft.EnumDWT_OCRLanguage | number): boolean;
```

---
## SetOutputFormat

**Syntax**

``` typescript
/**
 * Configure the OCR operation.
 * @param format Specify the output format.
 */
SetOutputFormat(format: Dynamsoft.EnumDWT_OCROutputFormat | number): boolean;
```

---
## SetPageSetMode

**Syntax**

``` typescript
/**
 * Configure the OCR operation.
 * @param mode Specify the OCR page layout analysis mode.
 */
SetPageSetMode(mode: Dynamsoft.EnumDWT_OCRPageSetMode | number): boolean;
```

**Usage notes**

The default `language` is `eng` which indicates English. To use a certain language, you must first have its language data locally, if it's not available yet, you can download it using the method [DownloadLangData()](#downloadlangdata).

The default `format` is `OCROF_PDFIMAGEOVERTEXT` which indicats an Image-over-Text PDF.

The default `mode` is `PSM_AUTO` which indicates automatic page segmentation.

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
        result: OCRResult
    ) => void,
    failureCallback: (
        errorCode: number,
        errorString: string
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
        result: OCRResult
    ) => void,
    failureCallback: (
        errorCode: number,
        errorString: string
    ) => void
): void;
```

---
## RecognizeRect

**Syntax**

``` typescript
/**
 * Perform OCR on the specified rectangular area on the image.
 * @param index Specify the image.
 * @param left Specify the rectangle (leftmost coordinate).
 * @param top Specify the rectangle (topmost coordinate).
 * @param right Specify the rectangle (rightmost coordinate).
 * @param bottom Specify the rectangle (bottommost coordinate).
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument imageId The imageId of the image which can be used to find the index.
 * @argument result The OCR result.
 * @argument errorCode The error code.
 * @argument errorString The error string.
 */
RecognizeRect(
    index: number,
    left: number,
    top: number,
    right: number,
    bottom: number,
    successCallback: (
        imageId: number,
        left: number,
        top: number,
        right: number,
        bottom: number,
        result: OCRResult
    ) => void,
    failureCallback: (
        errorCode: number,
        errorString: string
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
        result: OCRResult
    ) => void,
    failureCallback: (
        errorCode: number,
        errorString: string
    ) => void
): void;
```

**Usage notes**

``` typescript
interface OCRResult {
    /**
     * Return a base64 string that contains the result of the OCR.
     * Newlines are represented by the newline character: '\n'.
     */
    Get(): string;
    /**
     * Return the error code.
     */
    GetErrorCode(): number;
    /**
     * Return the error string.
     */
    GetErrorString(): string;
    /**
     * Return the output format.
     */
    GetFormat(): number;
    /**
     * Return the source information. It could be the index of the OCR'd image or the path of the OCR'd file.
     */
    GetInput(): number | string;
    /**
     * Save the OCR result as a file.
     * @param path The path to save the file.
     */
    Save(path: string): boolean;
    /**
     * Return the number of pagesets in the OCR result.
     */
    GetPageSetCount(): number;
    /**
     * Return the content of a pageset.
     * @param index Specify the pageset
     */
    GetPageSetContent(index: number): PageSet;
}
interface PageSet {
    /**
     * Return the number of pages in the pageset.
     */
    GetPageCount(): number;
    /**
     * Return the content of the specified page.
     * @index Specify the page.
     */
    GetPageContent(index: number): Page;
}
interface Page {
    /**
     * Return the number of lines in the page.
     */
    GetLineCount(): number;
    /**
     * Return the content of the specified line.
     * @index Specify the line.
     */
    GetLineContent(index: number): Line;
}
interface Line {
    /**
     * Return the number of words in the line.
     */
    GetWordCount(): number;
    /**
     * Return the coordinates for the rectangle that contains the specified line. The coordinates are in the sequence of "left,top,right,bottom" like "121,125,892,143".
     */
    GetLineRect(): string;
    /**
     * Return the content of the specified word.
     * @index Specify the word.
     */
    GetWordContent(index: number): Word;
}
interface Word {
    /**
     * Return the font name/size of the word.
     */
    GetFontName(): string;
    GetFontSize(): number;
    /**
     * Return the text of the word.
     */
    GetText(): string;
    /**
     * Return the coordinates for the rectangle that contains the specified word. The coordinates are in the sequence of "left,top,right,bottom" like "121,126,157,139".
     * @index Specify the word.
     */
    GetWordRect(index: number): string;
}
```

----

## Server-Side

The following are the `JAVA APIs` of the server-side OCR engine.

|API	|Description	|
|:-|:-|
|`void`	**`setProductKey(String strProductKey)`**	|Set the ProductKey of the OCR engine.	|
|`String`	**`getOCRDllPath()`**	|Return the path of the OCR engine.	|
|`void`	**`setOCRDllPath(String strOCRDllPath)`**	|Set the path of the OCR engine.	|
|`String`	**`getOCRLanguage()`**	|Return the target language.	|
|`void`	**`setOCRLanguage(String strOCRLanguage)`**	|Set the target language for the OCR.	|
|`int`	**`getOCRMinFontSizeDoMoreOCR()`**		|Return the font size which determines whether the engine should perform OCR again on areas with bigger font size.	|
|`void`	**`setOCRMinFontSizeDoMoreOCR(int iMinFontSizeDoMoreOCR)`**	|The engine will perform OCR again on areas where the font size is bigger than what's set by this API.	|
|`int`	**`getOCRPageSetMode()`**		|Return the mode used to analyze the OCR input.	|
|`void`	**`setOCRPageSetMode(int iOCRPageSetMode)`**	|Set how pages are determined when analyzing the OCR input.	|
|`int`	**`getOCRPdfFontSize()`**		|Return the font size for the output PDF file.	|
|`void`	**`setOCRPdfFontSize(int iPdfFontSize)`**	|Set the font size for the output PDF file.	|
|`int`	**`getOCRResultFormat()`**		|Return the result format for the OCR.	|
|`void`	**`setOCRResultFormat(int iOCRResultFormat)`**	|Set the result format for the OCR.	|
|`String`	**`getOCRTessDataPath()`**		|Return the path of the language packages.	|
|`void`	**`setOCRTessDataPath(String strOCRTessDataPath)`**	|Set the path of the language packages.	|
|`String`	**`getOCRUnicodeFontName()`**		|Return the detected OCR font name.	|
|`void`	**`setOCRUnicodeFontName(String strOCRUnicodeFontName)`**	|Set a font to be used by OCR when `isOCRUseDetectedFont` returns `false`.	|
|`boolean`	**`isOCRNumbericOnly()`**		|Return whether the OCR engine only OCR's numbers.	|
|`void`	**`setOCRIsNumbericOnly(boolean bNumbericOnly)`**	| Set whether the OCR engine should only OCR numbers. |
|`boolean`	**`isOCRUseDetectedFont()`**		|Return whether the PDF output uses the font detected by the OCR engine.	|
|`void`	**`setOCRUseDetectedFont(boolean bUseDetectedFont)`**	|Set whether the PDF output uses the font detected by the OCR engine or the default/provided one.	|
|`byte` `array`	**`ocrFile(String strImagePath, out byte array aryOCRResult)`**	|Start to OCR an image on the disk.  `aryOCRResult` returns details of the OCR result which you can get by calling `getValue()` on it.	|
|`byte` `array`	**`ocrImage(byte array aryImageBuffer, out byte array aryOCRResult)`**	|Start to OCR an image in the buffer.  `aryOCRResult` returns details of the OCR result which you can get by calling `getValue()` on it.	|