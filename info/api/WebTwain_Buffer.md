<script src="https://www.dynamsoft.com/assets/js/jquery.dynamsoft.header.js?showSearch=false&host=www.dynamsoft.com"></script>
# WebTwain Buffer Manage

| 	Methods	 | 	 |
|:-|:-|
| [ClearImageTags()](#clearimagetags) | [FilterImagesByTag()](#filterimagesbytag) |
| [SetDefaultTag()](#setdefaulttag) | [TagImages()](#tagimages) |
| [GetImageBitDepth()](#getimagebitdepth) | [GetImageSize()](#getimagesize) |
| [GetImageSizeWithSpecifiedType()](#getimagesizewithspecifiedtype) | [GetSelectedImagesSize()](#getselectedimagessize) |
| [GetImageHeight()](#getimageheight) | [GetImageWidth()](#getimagewidth) |
| [GetImagePartURL()](#getimageparturl) | [GetImageURL()](#getimageurl) |
| [GetImageXResolution()](#getimagexresolution) | [GetImageYResolution()](#getimageyresolution) |
| [GetSkewAngle()](#getskewangle) | [GetSkewAngleEx()](#getskewangleex) |
| [ImageIDToIndex()](#imageidtoindex) | [IndexToImageID()](#indextoimageid) |
| [IsBlankImage()](#isblankimage) | [IsBlankImageExpress()](#isblankimageexpress) |
| [SelectAllImages()](#selectallimages) | [SelectImages](#selectimages) |
| [MoveImage()](#moveimage) | [SwitchImage()](#switchimage) |
| [RemoveImage()](#removeimage) | [RemoveAllImages()](#removeallimages) |
| [RemoveAllSelectedImages()](#removeallselectedimages) |  |

| 	Properties	 | 		 |
|:-|:-|
| [BlankImageCurrentStdDev](#blanimagecurrentstddev) |[BlankImageMaxStdDev](#blankimagemaxstddev) |
| [BlankImageThreshold](#blankimagethreshold) | [BufferMemoryLimit](#buffermemorylimit) |
| [CurrentImageIndexInBuffer](#currentimageindexinbuffer) | [HowManyImagesInBuffer](#howmanyimagesinbuffer) |
|[IfAllowLocalCache](#ifallowlocalcache) | [SelectedImagesIndices](#selectedimagesindices)|
| [SelectionRectAspectRatio](#selectionrectaspectratio) | [MaxImagesInBuffer](#maximagesinbuffer) |

| Event |
|:-|
| [OnBitmapChanged](#onbitmapchanged) |
| [OnImageAreaSelected](#onimageareaselected) |
| [OnImageAreaDeSelected](#onimageareadeselected) |
| [OnIndexChangeDragDropDone](#onindexchangedragdropdone) |
| [OnTopImageInTheViewChanged](#ontopimageintheviewchanged) |

> [Deprecation] The following APIs are deprecated.

| Methods | |
|:-|:-|
| [GetSelectedImageIndex()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Runtime-Info.html#GetSelectedImageIndex) | [SetSelectedImageIndex](https://www.dynamsoft.com/docs/dwt15.3.1/API/Basic-Edit.html#SetSelectedImageIndex) |

| Property |
|:-|
| [SelectedImagesCount](https://www.dynamsoft.com/docs/dwt15.3.1/API/Runtime-Info.html#SelectedImagesCount) |

---

## IndexToImageID

### Syntax

```javascript
/**
 * Return the imageId of an image specified by the index.
 * @param index The index of the image.
 */
IndexToImageID(index: number): number;
```

---

## ImageIDToIndex

### Syntax

```javascript
/**
 * Return the index of an image specified by the imageId.
 * @param imageId The imageId of the image.
 */
ImageIDToIndex(imageId: number): number;
```

### Usage notes

An `imageId` is unique and won't change as long as the Dynamsoft Service process is running. It's a better way to keep track of an image than the `index` which changes easily.

## ClearImageTags

### Syntax

```javascript
/**
 * Remove all tags from the specified image.
 * @param index Specify the image.
 */
ClearImageTags(index: number): boolean;
```

---

## FilterImagesByTag
### Syntax

```javascript
/**
 * Filter images by the specified tag.
 * @param tag The tag used as the filter.
 */
FilterImagesByTag(tag: string): boolean;
```

---

## SetDefaultTag
### Syntax

```javascript
/**
 * Set a default tag for newlay acquired images.
 * @param tag Specifies the tag.
 */
SetDefaultTag(tag: string): boolean;
```

---

## TagImages
### Syntax

```javascript
/**
 * Add a tag to specified images.
 * @param indices Specifies images to be tagged.
 * @param tag Specify the tag.
 */
TagImages(indices: number[], tag: string): boolean;
```

## GetImageBitDepth
### Syntax

```javascript
/**
 * Return the pixel bit depth of the specified image.
 * @param index Specify the image.
 */
GetImageBitDepth(index: number): number;
```

---

## GetImageHeight
### Syntax

```javascript
/**
 * Return the height (in pixels) of the specified image.
 * @param index Specify the image.
 */
GetImageHeight(index: number): number;
```

---

## GetImageWidth
### Syntax

```javascript
/**
 * Return the width (in pixels) of the specified image.
 * @param index Specify the image.
 */
GetImageWidth(index: number): number;
```

---

## GetImageXResolution
### Syntax

```javascript
/**
 * Return the horizontal resolution of the specified image.
 * @param index Specify the image.
 */
GetImageXResolution(index: number): number;
```

---

## GetImageYResolution
### Syntax

```javascript
/**
 * Return the vertical resolution of the specified image.
 * @param index Specify the image.
 */
GetImageYResolution(index: number): number;
```

---

## GetSkewAngle
### Syntax

```javascript
/**
 * Return the skew angle of the specified image.
 * @param index Specify the image.
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument angle The skew angle.
 * @argument errorCode The error code.
 * @argument errorString The error string.
 */
GetSkewAngle(
    index: number,
    successCallback?: (
        angle: number) => void,
    failureCallback?: (
        errorCode: number, 
        errorString: string) => void
): number | void;
```

---

## GetSkewAngleEx
### Syntax

```javascript
/**
 * Return the skew angle of the specified rectangle on the specified image.
 * @param index Specify the image.
 * @param left The x-coordinate of the upper-left corner of the rectangle.
 * @param top The y-coordinate of the upper-left corner of the rectangle.
 * @param right The x-coordinate of the lower-right corner of the rectangle.
 * @param bottom The y-coordinate of the lower-right corner of the rectangle.
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument angle The skew angle.
 * @argument errorCode The error code.
 * @argument errorString The error string.
 */
GetSkewAngleEx(
    index: number,
    left: number,
    top: number,
    right: number,
    bottom: number,
    successCallback?: (
        angle: number) => void,
    failureCallback?: (
        errorCode: number, 
        errorString: string) => void
): number | void;
```

## Usage notes

After you get the skew angle of an image, you can rotate it with the method [Rotate](#WebTwain.Edit.md#rotate) to perform deskewing.

---

## GetImageSize
### Syntax

```javascript
/**
 * Calculate the size in bytes of the specified image assuming it's resized to the given dimensions.
 * @param index Specify the image.
 * @param width Specify the width.
 * @param height Specify the height.
 */ 
GetImageSize(index: number, width: number, height: number): number;
```

---
## GetImageSizeWithSpecifiedType
### Syntax

```javascript
/**
 * Calculate the size in bytes of the specified image assuming an expected file type.
 * @param index Specify the image.
 * @param type Sepcify the expected file type.
 */ 
GetImageSizeWithSpecifiedType(index: number, type: Dynamsoft.EnumDWT_ImageType | number): number;
```

---
## GetSelectedImagesSize
### Syntax

```javascript
/**
 * Calculate the size in bytes of all selected images assuming an expected file type.
 * @param type Sepcify the expected file type.
 */
GetSelectedImagesSize(type: Dynamsoft.EnumDWT_ImageType | number): number;
```

### Usage notes

If the calculation fails, -1 is returned.

---

## GetImagePartURL
### Syntax

```javascript
/**
 * Return the internal URL of the specified image. 
 * @param index Specify the image.
 * @param width The width of the image (>150).
 * @param height The height of the image (>150).
 */
GetImagePartURL(index: number, width?: number, height?: number): string;
```

### Usage notes

If width and height are not specified, you get the original image, otherwise you get the image with specified width or height while keeping the same aspect ratio. The returned string is like this 'dwt://dwt_trial_13000404/img?id=306159652&index=0&t=1502184632022'.

---

## GetImageURL
### Syntax

```javascript
/**
 * Return the direct URL of the specified image. 
 * @param index Specify the image.
 * @param width The width of the image (>150).
 * @param height The height of the image (>150).
 */
GetImageURL(index: number, width?: number, height?: number): string;
```

### Usage notes

If width or height is set to -1, you get the original image, otherwise you get the image with specified width or height while keeping the same aspect ratio.

---

## CurrentImageIndexInBuffer
### Syntax

```javascript
/**
 * Return the index of the current image in the buffer or 
 * Set the image specified by index as the current image.
 */
CurrentImageIndexInBuffer: number;
```

---
## HowManyImagesInBuffer
### Syntax

```javascript
/**
 * Return how many images are held in the buffer
 */
readonly HowManyImagesInBuffer: number;
```

---
## MaxImagesInBuffer
### Syntax

```javascript
/**
 * Return or set how many images can be held in the buffer.
 */ 
MaxImagesInBuffer: number;
```

### Usage notes

When acquiring images and the number of images goes beyond the value set to `MaxImagesInBuffer`, new images will replace old images starting from the 1st one.

---
## SelectedImagesIndices
### Syntax

```javascript
/**
 * Return the indices of the selected images.
 */
readonly SelectedImagesIndices: number[];
```

---
## SelectAllImages
### Syntax

```javascript
/**
 * Select all images and return the indices.
 */
SelectAllImages(): number[];
```

---
## SelectImages

### Syntax

```javascript

/**
 * Select the specified images.
 * @param indices Specify one or multiple images.
 */
SelectImages(indices: number[]): boolean;
```

---

## SelectionRectAspectRatio

### Syntax

```javascript
/**
 * Change the position of an image in the buffer.
 * @param from Specify the original position by index.
 * @param to Specify the target position by index.
 */
SelectionRectAspectRatio: number;
```

---

## MoveImage
### Syntax

```javascript
/**
 * Change the position of an image in the buffer.
 * @param from Specify the original position by index.
 * @param to Specify the target position by index.
 */
MoveImage(from: number, to: number): boolean;
```

---

## SwitchImage

### Syntax

```javascript
/**
 * Exchange the positions of two images.
 * @param index1 Specify the 1st image.
 * @param index2 Specify the 2nd image.
 */
SwitchImage(index1: number, index2: number): boolean;
```

---

## RemoveImage

### Syntax

```javascript
/**
* Remove the specified image.
* @param index Specify the image.
*/
RemoveImage(index: number): boolean;
```

---
## RemoveAllImages

### Syntax

```javascript
/**
 * Remove all images.
 */
RemoveAllImages(): boolean;
```

---
## RemoveAllSelectedImages

### Syntax

```javascript
/**
 * Remove all selected images.
 */
RemoveAllSelectedImages(): boolean;
```

---

## SelectionRectAspectRatio

### Syntax

```javascript
/**
 * Specify a aspect ratio to be used when selecting a rectangle on an image.
 */
SelectionRectAspectRatio: number; 
```

---

## BlankImageCurrentStdDev

### Syntax

```javascript
/**
 * Return the deviation of the pixels in the current image.
 */
readonly BlankImageCurrentStdDev: number;
```

---

## BlankImageMaxStdDev

### Syntax

```javascript
/**
 * Return or set the maximum deviation of the pixels in an image which is used to determine whether the image is blank.
 */
BlankImageMaxStdDev: number;
```

---

## BlankImageThreshold

### Syntax

```javascript
/**
 * Retrun or set the dividing line between black and white.
 */
BlankImageThreshold: number;
```

---

## IsBlankImage

### Syntax

```javascript
/** 
 * Check whether the specified image is blank.
 * @param index Specify the image.
 */ 
IsBlankImage(index: number): boolean;
```

---

## IsBlankImageExpress

### Syntax

```javascript
/** 
 * Check whether the specified image is blank.
 * @param index Specify the image.
 */
IsBlankImageExpress(index: number): boolean;
```

### Usage notes

`IsBlankImage` is more accurate than `IsBlankImageExpress` but it works slower.

`BlankImageCurrentStdDev` should be read after either `IsBlankImage()` or `IsBlankImageExpress`.

If you believe an image should be blank but `IsBlankImage()` or `IsBlankImageExpress` is returning `false`, you can read `BlankImageCurrentStdDev` for that image and then set a bigger value to `BlankImageMaxStdDev`.

Both `BlankImageCurrentStdDev` and `BlankImageMaxStdDev` range from 0 to 100.

`BlankImageThreshold` ranges from 0 to 255 and is 128 by default. The bigger the value is, the more likely an image may be regarded as blank.

---

## IfAllowLocalCache 

### Syntax

```javascript
/**
 * Return or set whether the feature of disk caching is enabled.
 */
IfAllowLocalCache: boolean;
```

---

## OnBitmapChanged

### Syntax

```javascript
/**
 * A built-in callback triggered when a change occurs in the buffer.
 * @argument indexString A string of the changed index(indices).
 * @argument type Operation type.
 * @argument index Index of the current image.
 */
RegisterEvent('OnBitmapChanged',
    function (indexString: string,
        type: number,
        index: number
    ) {}
): boolean; 
```

### Usage notes

Operation types include 

1: new image(s) were added at the tail
2: new image(s) were inserted before the current index
3: image(s) are deleted
4: image(s) are modified
5: indices of images changed

---

## OnTopImageInTheViewChanged

### Syntax

```javascript
/**
 * A built-in callback triggered when the top image currently displayed in the viewer changes.
 * @argument index Index of the current image.
 */
RegisterEvent('OnTopImageInTheViewChanged',
    function (index: number) {}
): boolean; 
```

---

## OnImageAreaSelected

### Syntax

```javascript
/**
 * A built-in callback triggered when a rectangle is selected on an image in the buffer.
 * @argument index Specify the image.
 * @argument left, top, right, bottom: Return the coordinates of the rectangle.
 * @argument rectangleIndex The index of the rectangle
 */
RegisterEvent('OnImageAreaSelected',
    function (index: number,
        left: number, top: number,
        right: number, bottom: number,
        rectangleIndex: number
    ) {}
): boolean;
```

---
## OnImageAreaDeSelected

### Syntax

```javascript
/**
 * A built-in callback triggered when selected rectangles are cleared.
 * @argument index Specify the image.
 */
RegisterEvent('OnImageAreaDeSelected',
    function (index: number) {}
): boolean; 
```

---

## OnIndexChangeDragDropDone

### Syntax

```javascript
/**
 * A built-in callback triggered when images in the buffer are dragged to new positions.
 * @argument indexPairs The list of index changes.
 */
RegisterEvent('OnIndexChangeDragDropDone',
    function (indexPairs: Pair[]) {}
): boolean; 

Pair: [from: number, to: number];
```
