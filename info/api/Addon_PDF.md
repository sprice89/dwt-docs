---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# WebTwain.Addon.PDF

**Methods**

* [ConvertToImage](#converttoimage)
* [GetConvertMode](#getconvertmode)
* [IsModuleInstalled](#ismoduleinstalled)
* [IsTextBasedPDF()](#istextbasedpdf)
* [SetConvertMode()](#setconvertmode)
* [SetPassword()](#setpassword)
* [SetResolution()](#setresolution)
* [Write.Setup()](#writesetup)

---
## ConvertToImage
**Syntax**
``` typescript
/**
 * Convert the specified PDF file to image(s).
 * @param path The path of the PDF file.
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument errorCode The error code.
 * @argument errorString The error string.
 */
ConvertToImage(
    path: string,
    resolution: number,
    successCallback: () => void,
    failureCallback: (
        errorCode: number,
        errorString: string
    ) => void
): void;
```

---
## GetConvertMode
**Syntax**
``` typescript
/**
 * Return the convert mode.
 */
GetConvertMode(): number;
```

---
## IsModuleInstalled
**Syntax**
``` typescript
/**
* Return whether the PDF module has been installed.
*/
IsModuleInstalled(): boolean;
```

---
## IsTextBasedPDF
**Syntax**

``` typescript
/**
 * Detect whether a local PDF file is text based or not.
 * @path Specify the path of the PDF file.
 */
IsTextBasedPDF(path: string): boolean;
```

---
## SetConvertMode
**Syntax**

``` typescript
/**
 * Set the convert mode.
 * @param mode Specify the mode.
 */
SetConvertMode(mode: Dynamsoft.EnumDWT_ConvertMode | number): boolean;
```

---
## SetPassword
**Syntax**

``` typescript
/**
 * Set the password for reading encrypted PDF files.
 * @param password Specify the password.
 */
SetPassword(password: string): boolean;
```

---
## SetResolution
**Syntax**

``` typescript
/**
 * Set the resolution for rasterizing.
 * @param resolution Specify the resolution.
 */
SetResolution(resolution: number): boolean;
```

**Usage notes**

There are three conversion modes

- CM_RENDERALL (1): All the content in the target PDF file will be rasterized.
- CM_IMAGEONLY (2): The PDF Rasterizer is turned off. This is the default mode.
- CM_AUTO (3): The library automatically detect whether a file needs to be rasterized or not and then process the file accordingly.

The default resolution for the conversion is 200. We recommend that you set a value smaller than 300, otherwise it might slow down the program or cause the process to fail. 

---

## Write.Setup()
**Syntax**

``` typescript
/**
 * Set up the PDF writing engine.
 * @param settings Configures how the PDF is generated.
 */
Write.Setup(settings: PDFWSettings): void;

interface PDFWSettings {
    /**
     * Specify the author.
     */
    author: string;
    /**
     * Specify the compression type.
     */
    compression: Dynamsoft.EnumDWT_PDFCompressionType | number;
    /**
     * Specify the creator.
     */
    creator: string;
    /**
     * Specify the creation date.
     * Note that the argument should start with 'D:' like 'D:20181231'.
     */
    creationDate: string;
    /**
     * Specify the key words.
     */
    keyWords: string;
    /**
     * Specify the modified date.
     * Note that the argument should start with 'D:' like 'D:20181231'.
     */
    modifiedDate: string;
    /**
     * Specify the producer.
     */
    producer: string;
    /**
     * Specify the subject.
     */
    subject: string;
    /**
     * Specify the title.
     */
    title: string;
    /**
     * Specify the PDF version. For example, 1.5. The allowed values are 1.1 ~ 1.7.
     * NOTE: If the compression type is PDF_JBig2, the lowerest version is 1.4
     * If the compression type is PDF_JP2000, the lowerest version is 1.5
     */
    version: number;
    /**
     * Specify the quality of the images in the file.
     * The value ranges from 0 to 100.
     * Only valid when the {compression} is 'JPEG' or 'JPEG2000'.
     */
    quality: number;
}
```

**Usage notes**

Use this method before you create a PDF with methods such as `HTTPUpload()` and `SaveAsPDF()`;