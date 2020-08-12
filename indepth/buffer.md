---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# BUFFER

The Web TWAIN buffer collects all of the images and stores them in a buffer. This section of the guide will explore the different aspects of the buffer, including its features and abilities as well as its limits. First, let's explore the limits of the buffer and how to use the local cache:

## Memory Limits and Disk Caching
Dynamic Web TWAIN can run both in 32bit and 64bit. Before version 15.0, it’s 32-bit by default and that means it can utilize no more than 2 GB of physical memory. In version 15.0 onwards, 64-bit has been made the default option on a 64-bit OS and that means there is no limitation of how much memory it can use.

The data the SDK deals with are images which take up lots of space. For example, one A4 paper scanned in 300 DPI takes around 24MB in memory (DIB). If you are running the SDK in 32bit, 2GB of memory can store no more than 85 of these images. If you run the 64bit SDK, you might want to limit how much memory the SDK actually uses so that it doesn't affect other running programs on the machine. In light of this, the disk-caching feature was added to the SDK which, when enabled, caches most images temporarily on the disk while keeping a few active ones in the memory to maintain high performance.

The disk caching feature is enabled by default and can be disabled by setting `IfAllowLocalCache` to false.

You can also set how much memory the SDK uses before images start to be cached. By default, 800MB is used. You can change it using the property `BufferMemoryLimit`. Please note that all cached data is encrypted and can only be accessed by Dynamic Web TWAIN

For ActiveX Edition: the cached data is stored in C:\Users\{User Name}\AppData\LocalLow\Dynamsoft\cache
For HTML5 Edition: it is stored in C:\Windows\SysWOW64 {or system32}\Dynamsoft\DynamsoftService\cache

When the SDK is unloaded (like when the browser tab refreshes or closes), the cached data is destroyed and removed from the disk automatically.

Although you can scan and load as many images as you like, you may want to handle them in smaller volumes when doing further processing. For example, when dealing with extremely large volumes, you should try not to upload or save the images synchronously as that would be too time consuming and prone to errors.

## Rearranging the images within the buffer
Dynamic Web TWAIN offers a number of methods to help you shift the images within the buffer should it be necessary.

The main method for doing this is via the `MoveImage` method:
```
/* assuming there are 5 images in the buffer, the following moves image with index 0 to index 2, shifting the images before index 2 to the left. The array of indices will shift depending on how the input image moves. */
DWObject.MoveImage(0,2);
```
If you are looking to simply switch two images in the buffer, we provide a method to directly do that
```
// switches the image in index 0 with the image in index 2
DWObject.SwitchImage(0,2);
```
And lastly, if you would like to remove an image or multiple images from the buffer, we have the following methods:
```
// Removes a single image specified by index
DWObject.RemoveImage(1);
//Removes all images in the buffer
DWObject.RemoveAllImages();
// Removes the first 3 images from the buffer
DWObject.SelectImage([0-2]);
DWObject.RemoveAllSelectedImages();
```
## Tagging Images
Dynamic Web TWAIN offers the ability to place a tag on an image which helps to classify groups of scanned images if necessary. In the context of our SDK, a tag is just a string that describes the corresponding grouping/classification. Now to demonstrate how to tage images:
```
/* tags the first two scanned images with the classification "title" to indicate that they belong to the title section of the book being scanned. The 3 images after the first two belong to chapter 1 of the book so they were tagged correspondingly */
DWObject.TagImages([0,1], "title");
DWObject.TagImages([2,3,4], "chapter1")
```
If you are scanning in a new batch of documents and would like to tag them all with the same classification, you can so using the `SetDefaultTag` method. 
```
/* the next batch of documents are the medical records of patient123 so instead of tagging each document after they are scanned, tag them all as such. */
DWObject.SetDefaultTag("patient123");
...
DWObject.AcquireImage();
```
To filter the images in the buffer by tag after tagging them all, the `FilterImagesByTag` method comes in handy. And lastly, to clear the tags on a specific image, you can use the `ClearImageTags` method.

## Image Data
The buffer also provides access to a wide array of info for each image. Here is the full list of the info available via the buffer:

- Bit depth, which helps to identify the pixel type of the image. Can be retrieved using `GetImageBitDepth()`.
- Size, get the size in bytes of the specified image according to input dimensions. Used with `GetImageSize()`.

    - count, current, bitdepth, size, width, height, url, resolution, skew angle, index, image id, selection status
    - [Future] annotation data
- Blankness detection
    - Set threshold, max deviation
    - Read current deviation
    - Determine the blankness
- Status reporting
    - bitmap changed (reflecting image edit,index change,remove, etc.)
    - image selection
    - dragdrop down


https://developer.dynamsoft.com/dwt/kb/2586
https://developer.dynamsoft.com/dwt/kb/2643
https://developer.dynamsoft.com/dwt/kb/2147
https://developer.dynamsoft.com/dwt/kb/2142
https://developer.dynamsoft.com/dwt/kb/2633
