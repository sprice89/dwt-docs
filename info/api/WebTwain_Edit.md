---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# WebTwain Edit

## Methods

* [Crop()](#crop) 
* [CropToClipboard()](#croptoclipboard)
* [CutFrameToClipboard()](#cutframetoclipboard) 
* [CutToClipboard()](#cuttoclipboard)
* [CopyToClipboard()](#copytoclipboard) 
* [Erase()](#erase)
* [Flip()](#flip)
<!--* [FlipAsync()](#flipasync)-->
* [Mirror()](#mirror)
<!--* [MirrorAsync()](#mirrorasync)-->
* [Rotate()](#rotate) 
<!--* [RotateAsync()](#rotate) -->
* [RotateEx()](#rotateex)
* [RotateLeft()](#rotateleft) 
<!--* [RotateLeftAsync()](#rotateleft) -->
* [RotateRight()](#rotateright)
<!--* [RotateRightAsync()](#rotateright)-->
* [ChangeBitDepth()](#changebitdepth) 
* [SetDPI()](#setdpe)
* [ConvertToBW()](#converttobw) 
* [ConvertToGrayScale()](#converttograyscale)
<!--* [ConvertToGrayScaleAsync()](#converttograyscaleasync)-->
* [ChangeImageSize()](#changeimagesize) 
* [Invert()](#invert)
* [SetImageWidth()](#setimagewidth) 
* [ShowImageEditor()](#showimageeditor)

**Properties**

* [BackgroundFillColor](#backgroundfillcolor)

> [Deprecation] The following APIs are deprecated.
>
> [Alternative] Annotation feature to be added in a later version.

## Methods

* [AddText()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Basic-Edit.html#AddText) 
* [CreateTextFont()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Basic-Edit.html#CreateTextFont)
* [OverlayRectangle()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Basic-Edit.html#OverlayRectangle)

---

## ShowImageEditor

**Syntax**

``` typescript
/**
 * Show the built-in image editor. If called without any arguments while the editor is open, it'll close the editor.
 * @param divId Specify a div element to hold the editor.
 * @param width Specify the width of the editor.
 * @param height Specify the height of the editor.
 */
ShowImageEditor(
    divId?: string,
    width?: number,
    height?: number
): boolean;
```

**Usage notes**

If you call the method without any parameter, the editor will take up the full screen. If you'd like to show the editor in a div element, you need to specify all 3 parameters.

If you call the method again, the editor will be closed.

---

## ChangeBitDepth

**Syntax**

``` typescript
/**
 * Change the bit depth of the specified image.
 * @param index Specify the image.
 * @param bitDepth Specify the bit depth.
 * @param highQuality Whether to keep high quality.
 */
ChangeBitDepth(
    index: number,
    bitDepth: number,
    highQuality: boolean,
): boolean;
```

**Usage notes**

The allowed bit depths are 1, 4, 8, 24.

---

## ChangeImageSize

**Syntax**

``` typescript
/**
 * Change the size of the specified image.
 * @param index Specify the image.
 * @param width Specify the new width.
 * @param height Specify the new height.
 * @param method Specify the algorithm for the change.
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument errorCode The error code.
 * @argument errorString The error string.
 */
ChangeImageSize(
    index: number,
    width: number,
    height: number,
    method: Dynamsoft.EnumDWT_InterpolationMethod | number,
    successCallback?: () => void,
    failureCallback?: (
        errorCode: number,
        errorString: string
    ) => void
): void | boolean;
```

---

## SetDPI

**Syntax**

``` typescript
/**
 * Change the DPI (dots per inch) of the specified image.
 * @param index Specify the image.
 * @param xResolution Specify the horizontal DPI.
 * @param yResolution Specify the vertical DPI.
 * @param resample Whether to resample the image.
 * @param method Specify the algorithm for the change.
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument errorCode The error code.
 * @argument errorString The error string.
 */
SetDPI(
    index: number,
    xResolution: number,
    yResolution: number,
    resample: boolean,
    method: Dynamsoft.EnumDWT_InterpolationMethod | number,
    successCallback?: () => void,
    failureCallback?: (
        errorCode: number,
        errorString: string
    ) => void
): void | boolean;
```

**Usage notes**

Check out [`Dynamsoft.EnumDWT_InterpolationMethod`]({{site.info}}api/Dynamsoft_Enum.html#dynamsoftenumdwt_interpolationmethod).

---

## ConvertToBW

**Syntax**

``` typescript
/**
 * Convert the specified image to black & white.
 * @param index Specify the image.
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument errorCode The error code.
 * @argument errorString The error string.
 */
ConvertToBW(
    index: number,
    successCallback?: () => void,
    failureCallback?: (
        errorCode: number,
        errorString: string
    ) => void
): void | boolean;
```

---

## ConvertToGrayScale

**Syntax**

``` typescript
/**
 * Convert the specified image to grayscale.
 * @param index Specify the image.
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument errorCode The error code.
 * @argument errorString The error string.
 */
ConvertToGrayScale(
    index: number,
    successCallback?: () => void,
    failureCallback?: (
        errorCode: number,
        errorString: string
    ) => void
): void | boolean;
```

---
<!--
## ConvertToGrayScaleAsync

**Syntax**

``` typescript
/**
 * Convert the specified image to grayscale.
 * @param index Specify the image.
 */
ConvertToGrayScaleAsync(
    index: number
): Promise<boolean>;
```

----->

## Invert

**Syntax**

``` typescript
/**
 * Invert the colour of the pixels on the specified image.
 * @param index Specify the image.
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument errorCode The error code.
 * @argument errorString The error string.
 */
Invert(
    index: number,
    successCallback?: () => void,
    failureCallback?: (
        errorCode: number,
        errorString: string
    ) => void
): void | boolean;
```

---

## SetImageWidth

**Syntax**

``` typescript
/**
 * Change the width of the specified image by adding a margin or removing part of the image.
 * @param index Specify the image.
 * @param width Specify the new width.
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument errorCode The error code.
 * @argument errorString The error string.
 */
SetImageWidth(
    index: number,
    width: number,
    successCallback?: () => void,
    failureCallback?: (
        errorCode: number,
        errorString: string
    ) => void
): void | boolean;
```

---

## Flip

**Syntax**

``` typescript
/**
 * Flip the specified image.
 * @param index Specify the image.
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument errorCode The error code.
 * @argument errorString The error string.
 */
Flip(
    index: number,
    successCallback?: () => void,
    failureCallback?: (
        errorCode: number,
        errorString: string
    ) => void
): void | boolean;
```

---
<!--
## FlipAsync

**Syntax**

``` typescript
/**
 * Flip the specified image.
 * @param index Specify the image.
 */
FlipAsync(
    index: number
): Promise<boolean>;
```

--->

## Mirror

**Syntax**

``` typescript
/**
 * Mirror the specified image.
 * @param index Specify the image.
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument errorCode The error code.
 * @argument errorString The error string.
 */
Mirror(
    index: number,
    successCallback?: () => void,
    failureCallback?: (
        errorCode: number,
        errorString: string
    ) => void
): void | boolean;
```

---
<!--
## MirrorAsync

**Syntax**

``` typescript
/**
 * Mirror the specified image.
 */
MirrorAsync(
    index: number
): Promise<boolean>;
```

--->

## RotateLeft

**Syntax**

``` typescript
/**
 * Rotate the specified image 90 degrees counterclockwise.
 * @param index Specify the image.
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument errorCode The error code.
 * @argument errorString The error string.
 */
RotateLeft(
    index: number,
    successCallback?: () => void,
    failureCallback?: (
        errorCode: number,
        errorString: string
    ) => void
): void | boolean;
```

---
<!--
## RotateLeftAsync

**Syntax**

``` typescript
/**
 * Rotate the specified image 90 degrees counterclockwise.
 * @param index Specify the image.
 */
RotateLeftAsync(
    index: number
): Promise<boolean>;
```

--->

## RotateRight

**Syntax**

``` typescript
/**
 * Rotate the specified image 90 degrees clockwise.
 * @param index Specify the image.
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument errorCode The error code.
 * @argument errorString The error string.
 */
RotateRight(
    index: number,
    successCallback?: () => void,
    failureCallback?: (
        errorCode: number,
        errorString: string
    ) => void
): void | boolean;
```

---
<!--
## RotateRightAsync

**Syntax**

``` typescript
/**
 * Rotate the specified image 90 degrees clockwise.
 */
RotateRightAsync(
    index: number
): Promise<boolean>;
```

--->

## Rotate

**Syntax**

``` typescript
/**
 * Rotate the specified image by the specified angle.
 * @param index Specify the image.
 * @param angle Specify the angle.
 * @param keepSize Whether to keep the original size.
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument errorCode The error code.
 * @argument errorString The error string.
 */
Rotate(
    index: number,
    angle: number,
    keepSize: boolean,
    successCallback?: () => void,
    failureCallback?: (
        errorCode: number,
        errorString: string
    ) => void
): void | boolean;
```

---
<!--
## RotateAsync

**Syntax**

``` typescript
/**
 * Rotate the specified image by the specified angle.
 * @param index Specify the image.
 * @param angle Specify the angle.
 * @param keepSize Whether to keep the original size.
 */
RotateAsync(
    index: number,
    angle: number,
    keepSize: boolean
): Promise<boolean>;
```

--->

## RotateEx

**Syntax**

``` typescript
/**
 * Rotate the specified image by the specified angle.
 * @param index Specify the image.
 * @param angle Specify the angle.
 * @param keepSize Whether to keep the original size.
 * @param method Specify the algorithm for the change.
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument errorCode The error code.
 * @argument errorString The error string.
 */
RotateEx(
    index: number,
    angle: number,
    keepSize: boolean,
    method: Dynamsoft.EnumDWT_InterpolationMethod | number,
    successCallback?: () => void,
    failureCallback?: (
        errorCode: number,
        errorString: string
    ) => void
): void | boolean;
```

**Usage notes**

Check out [`Dynamsoft.EnumDWT_InterpolationMethod`]({{site.info}}api/Dynamsoft_Enum.html#dynamsoftenumdwt_interpolationmethod).

---

## Crop

**Syntax**

``` typescript
/**
 * Crop the specified image using the specified coordinates.
 * @param index Specify the image.
 * @param left Specify the rectangle (leftmost coordinate).
 * @param top Specify the rectangle (topmost coordinate).
 * @param right Specify the rectangle (rightmost coordinate).
 * @param bottom Specify the rectangle (bottommost coordinate).
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument errorCode The error code.
 * @argument errorString The error string.
 */
Crop(
    index: number,
    left: number,
    top: number,
    right: number,
    bottom: number,
    successCallback?: () => void,
    failureCallback?: (
        errorCode: number,
        errorString: string
    ) => void
): void | boolean;
```

---

## Erase

**Syntax**

``` typescript
/**
 * Erase a rectangular area from the specified image.
 * @param index Specify the image.
 * @param left Specify the rectangle (leftmost coordinate).
 * @param top Specify the rectangle (topmost coordinate).
 * @param right Specify the rectangle (rightmost coordinate).
 * @param bottom Specify the rectangle (bottommost coordinate).
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument errorCode The error code.
 * @argument errorString The error string.
 */
Erase(
    index: number,
    left: number,
    top: number,
    right: number,
    bottom: number,
    successCallback?: () => void,
    failureCallback?: (
        errorCode: number,
        errorString: string
    ) => void
): void | boolean;
```

---

## CopyToClipboard

**Syntax**

``` typescript
/**
 * Copy the specified image to the clipboard of the operating system.
 * @param index Specify the image.
 */
CopyToClipboard(index: number): boolean;
```

---
<!--
## CopyToClipboardAsync

**Syntax**

``` typescript
/**
 * Copy the specified image to the clipboard of the operating system.
 * @param index Specify the image.
 */
CopyToClipboardAsync(index: number): Promise<boolean>;
```

--->

## CutToClipboard

**Syntax**

``` typescript
/**
 * Cut the specified image to the clipboard of the operating system.
 * @param index Specify the image.
 */
CutToClipboard(index: number): boolean;
```

---

## CropToClipboard

**Syntax**

``` typescript
/**
 * Crop a rectangular area from the specified image to the clipboard of the operating system.
 * @param index Specify the image.
 * @param left Specify the rectangle (leftmost coordinate).
 * @param top Specify the rectangle (topmost coordinate).
 * @param right Specify the rectangle (rightmost coordinate).
 * @param bottom Specify the rectangle (bottommost coordinate).
 */
CropToClipboard(
    index: number,
    left: number,
    top: number,
    right: number,
    bottom: number
): boolean;
```

---

## CutFrameToClipboard

**Syntax**

``` typescript
/**
 * Cut a rectangular area from the specified image to the clipboard of the operating system.
 * @param index Specify the image.
 * @param left Specify the rectangle (leftmost coordinate).
 * @param top Specify the rectangle (topmost coordinate).
 * @param right Specify the rectangle (rightmost coordinate).
 * @param bottom Specify the rectangle (bottommost coordinate).
 */
CutFrameToClipboard(
    index: number,
    left: number,
    top: number,
    right: number,
    bottom: number
): boolean;
```

**Usage notes**

The empty area resulted from the crop/erase/cut will be filled with the colour set with [BackgroundFillColor](#backgroundfillcolor).

---

## BackgroundFillColor

**Syntax**

``` typescript
/**
 * Return or set the fill colour for the empty area on an image that has been cut/cropped/erased.
 */
BackgroundFillColor: number;
```

**Usage notes**

By default the colour is white (0xffffff). The byte-ordering of the 24-bit RGB value is **RRGGBB**. RR represents red, GG represents green and BB represents blue.
