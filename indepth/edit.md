# EDIT

Dynamic Web TWAIN offers a variety image editing features to help give you the final result that you are looking for. In this guide, we will explore those features and demonstrate how to use them.

## Edit options

### Rotating, Flipping, and Mirroring
The SDK gives you methods to rotate an image right or left by the angle that you specify as an input parameter. Here is an overview of the rotate methods that we have available:
```
Rotate()  // rotates the specified image by the specified angle (up to 360 degrees)
RotateEx() // similar to Rotate(), but uses the specified interpolation method to do the rotation
RotateLeft() // rotates the specified image 90 degrees counterclockwise
RotateRight() // rotates the specified image 90 degrees clockwise
Flip() // flips the specified image vertically
Mirror() // mirrors the specified image horizontally
```
### Cutting, Cropping, and Copying
Web TWAIN can cut and copy images, where they will be saved to the clipboard to be used later. It also has the ability to crop the image directly or save the cropped edit in the clipboard. Here is an overview of the methods:
```
Crop() // Crops a rectangular area from the specified image using the specified coordinates.
CropToClipboard() // Crops a rectangular area from the specified image using the input coordinates and saves to the clipboard 
CutFrameToClipboard() // Cuts a rectangular area from the specified image using the specified coordinates to the clipboard of the operating system.
CutToClipboard() // Cuts the specified image to the clipboard of the operating system.
CopyToClipboard() // Copies the specified image to the clipboard of the operating system.
Erase() // Erases a rectangular area from the specified image using the input coordinates
```
Several of these methods require input coordinates to define the frame in question. Our SDK provides a way in which you can visually define those coordinates to make the process as easy for the user as possible. Feel free to check out in this [article](https://developer.dynamsoft.com/dwt/kb/2780).
### Resizing an image
Web TWAIN also gives you the ability to resize an image that was just scanned in. Here is the overview of the available methods:
```
ChangeImageSize() // changes the size of the specified image by altering the height and width
SetImageWidth() // Changes the width of the specified image by adding a margin or removing part of the image.
```
### Working with pixels and bit depth
Once an image is scanned, you can change its colour and resolution by altering its pixel type, bit depth, or DPI. The SDK offers a number of methods to achieve this:
```
ChangeBitDepth() // Changes the pixel type of the image by altering the bit depth
SetDPI() // Changes the DPI (dots per inch) of the specified image depending on the input resolution parameters
ConvertToBW() // Converts the specified image to a black-and-white image.
ConvertToGrayScale() // Converts the specified image to a grayscale image.
Invert() // Inverts the colour of the pixels on the specified image.
```

## Using the built-in Image Editor
Dynamic Web TWAIN comes with a built-in GUI image editor that offers the user a more visual way to edit scanned images.

Accessing the image editor is simple, all you need to do is call the ShowImageEditor() method.

Calling the method by default will have the image editor occupy the entire image. However, you can customize that by assigning the image editor a specific 'div' element in code, specified by the input parameter(s).
```
DWObject.ShowImageEditor(); // displays image editor in full screen
DWObject.ShowImageEditor("divID", <width in px>, <height in px>); // limit the image editor to a section of the page
```
