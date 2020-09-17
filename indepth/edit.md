---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# EDIT

`DWT` offers a variety image editing features to help give you the final result that you are looking for. In this section, we will explore those features and demonstrate how to use them.

> All the methods on this page can be found [here]({{site.info}}api/WebTwain_Edit.html)

## Edit options

### Rotating, Flipping, and Mirroring

`DWT` gives you methods to rotate an image right or left by 90 degrees or by the angle that you specify as an input parameter. Here is an overview of the rotate methods that we have available:

``` javascript
DWObject.Rotate() // rotates the specified image by the specified angle (up to 360 degrees)
DWObject.RotateEx() // similar to Rotate(), but uses the specified interpolation method to do the rotation
DWObject.RotateLeft() // rotates the specified image 90 degrees counterclockwise
DWObject.RotateRight() // rotates the specified image 90 degrees clockwise
DWObject.Flip() // flips the specified image vertically
DWObject.Mirror() // mirrors the specified image horizontally
```

### Cutting, Cropping, and Copying

`DWT` can cut and copy images, where they will be saved to the clipboard to be used later. It also has the ability to crop the image directly or save the cropped edit in the clipboard. Here is an overview of the methods:

``` javascript
DWObject.Crop() // Crops a rectangular area from the specified image using the specified coordinates.
DWObject.CropToClipboard() // Crops a rectangular area from the specified image using the input coordinates and saves to the clipboard 
DWObject.CutFrameToClipboard() // Cuts a rectangular area from the specified image using the specified coordinates to the clipboard of the operating system.
DWObject.CutToClipboard() // Cuts the specified image to the clipboard of the operating system.
DWObject.CopyToClipboard() // Copies the specified image to the clipboard of the operating system.
DWObject.Erase() // Erases a rectangular area from the specified image using the input coordinates
```

Several of these methods require input coordinates to define the frame in question. `DWT` provides a way in which you can visually define those coordinates to make the process as easy for the user as possible. Feel free to check out [select an area]({{site.indepth}}viewer.html#select-an-area).

### Resizing an image

`DWT` also gives you the ability to resize an image in the buffer. Here is the overview of the available methods:

``` javascript
DWObject.ChangeImageSize() // changes the size of the specified image by altering the height and width
DWObject.SetImageWidth() // Changes the width of the specified image by adding a margin or removing part of the image.
```

### Working with pixels and bit depth

You can also change the colour and resolution of an image by altering its pixel type, bit depth, or DPI. `DWT` offers a number of methods to achieve this:

``` javascript
DWObject.ChangeBitDepth() // Changes the pixel type of the image by altering the bit depth
DWObject.SetDPI() // Changes the DPI (dots per inch) of the specified image depending on the input resolution parameters
DWObject.ConvertToBW() // Converts the specified image to a black-and-white image.
DWObject.ConvertToGrayScale() // Converts the specified image to a grayscale image.
DWObject.Invert() // Inverts the colour of the pixels on the specified image.
```
