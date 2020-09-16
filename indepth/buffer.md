---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# BUFFER

`DWT` collects all the input files and stores them in a buffer. This section of the guide will explore the different aspects of the buffer, including its features and abilities as well as its limits. First, let's explore the limits of the buffer and how to use the local cache:

## Memory Limits 

When `DWT` works in [service mode]({{site.indepth}}initialize.html#service-mode), it can run in 32bit and 64bit and the data is stored raw in **DIB** format. Before version 15.0, it’s 32-bit by default and that means it can utilize no more than 2 GB of physical memory. In version 15.0 onwards, 64-bit has been made the default option on a 64-bit OS and that means there is no limitation of how much memory it can use.

On the other hand, if `DWT` works in [wasm mode]({{site.indepth}}initialize.html#wasm-mode), it can utilize no more than 2 GB of memory as `WebAssembly` only supports 32-bit pointers at present. However, the data is stored in `JPG` format or (for Black & White images) `PNG` format.

In order to control the size of the data, `DWT` can limit the number of images allowed in buffer with the property [ `MaxImagesInBuffer` ]({{site.info}}api/WebTwain_Buffer.html#maximagesinbuffer).

## Disk Caching

> This section applies to [desktop browsers]({{site.getstarted}}platform.html#browsers-on-desktop-devices) running in [service mode]({{site.indepth}}initialize.html#service-mode).

The data `DWT` deals with are images which take up lots of space as they are stored raw in **DIB** format. For example, one A4 paper scanned in 300 DPI takes around 24MB in memory which means 2GB of physical memory can only store no more than 85 of these images. As more images are processed, more memory gets used which may pose a threat to other programs on the machine. In light of this, the disk-caching feature was added which, when enabled, caches most images temporarily on the disk while keeping a few active ones in the memory to maintain high performance.

The disk caching feature is enabled by default and can be disabled by setting [ `IfAllowLocalCache` ]({{site.info}}api/WebTwain_Buffer.html#ifallowlocalcache) to `false` .

You can also set how much memory `DWT` uses before images start to be cached. By default, **800MB** is used. You can change it using the property [ `BufferMemoryLimit` ]({{site.info}}api/WebTwain_Buffer.html#buffermemorylimit) . 

> NOTE: All cached data is encrypted and can only be accessed by `DWT` .

When `DWT` is unloaded (like when the browser tab refreshes or closes), the cached data is destroyed and removed from the disk automatically.

Although you can scan and load as many images as you like, you may want to handle them in smaller volumes when doing further processing. For example, when dealing with extremely large volumes, you should try not to upload or save the images all at once as that would be too time consuming and prone to errors.

## Rearranging the images within the buffer

`DWT` offers a number of methods to help you shift the images within the buffer should it be necessary. Before we dive into the individual methods, please note that the buffer also allows you to drag the images around in order to change their positions. Now for the API methods:

The main method for doing this is via the [ `MoveImage()` ]({{site.info}}api/WebTwain_Buffer.html#moveimage) method:

``` javascript
/* assuming there are 5 images in the buffer, the following moves image with index 0 to index 2, shifting the images before index 2 to the left. The array of indices will shift depending on how the input image moves. */
DWObject.MoveImage(0, 2);
```

If you are looking to simply switch two images in the buffer, we provide a method [ `SwitchImage()` ]({{site.info}}api/WebTwain_Buffer.html#switchimage) to directly do that

``` javascript
// switches the image in index 0 with the image in index 2
DWObject.SwitchImage(0, 2);
```

And lastly, if you would like to remove an image or multiple images from the buffer, we have the following methods:

``` javascript
// Removes a single image specified by index
DWObject.RemoveImage(1);
//Removes all images in the buffer
DWObject.RemoveAllImages();
// Removes the first 3 images from the buffer
DWObject.SelectImage([0, 1, 2]);
DWObject.RemoveAllSelectedImages();
```

## Tagging Images

`DWT` offers the ability to place a tag on an image which helps to classify groups of scanned images if necessary. In the context of our SDK, a tag is just a string that describes the corresponding grouping/classification. Now to demonstrate how to tage images:

``` javascript
/* tags the first two scanned images with the classification "title" to indicate that they belong to the title section of the book being scanned. The 3 images after the first two belong to chapter 1 of the book so they were tagged correspondingly */
DWObject.TagImages([0, 1], "title");
DWObject.TagImages([2, 3, 4], "chapter1")
```

If you are scanning in a new batch of documents and would like to tag them all with the same classification, you can so using the [ `SetDefaultTag()` ]({{site.info}}api/WebTwain_Buffer.html#setdefaulttag) method.

``` javascript
/* the next batch of documents are the medical records of patient123 so instead of tagging each document after they are scanned, tag them all as such. */
DWObject.SetDefaultTag("patient123");
DWObject.AcquireImage();
```

To filter the images in the buffer by tag after tagging them all, the [ `FilterImagesByTag()` ]({{site.info}}api/WebTwain_Buffer.html#filterimagesbytag) method comes in handy. And lastly, to clear the tags on a specific image, you can use the [ `ClearImageTags()` ]({{site.info}}api/WebTwain_Buffer.html#clearimagetags) method.

## Image Data

The buffer also provides access to a wide array of info for each image. Here is the full list of the info available via the buffer:

* Bit depth, which helps to identify the pixel type of the image. Can be retrieved using [ `GetImageBitDepth()` ]({{site.info}}api/WebTwain_Buffer.html#getimagebitdepth) .
* Height of the image in pixels, retrieved using [ `GetImageHeight()` ]({{site.info}}api/WebTwain_Buffer.html#getimageheight) .
* Width of the image in pixels, retrieved using [ `GetImageWidth()` ]({{site.info}}api/WebTwain_Buffer.html#getimagewidth) .
* Horizontal resolution of the specified image, used with [ `GetImageXResolution()` ]({{site.info}}api/WebTwain_Buffer.html#getimagexresolution) .
* Vertical resolution of the specified image, used with [ `GetImageYResolution()` ]({{site.info}}api/WebTwain_Buffer.html#getimageyresolution) .

The following is only supported in [desktop browsers]({{site.getstarted}}platform.html#browsers-on-desktop-devices) and in [service mode]({{site.indepth}}initialize.html#service-mode).

* Size in bytes of the specified image according to input dimensions. Used with [ `GetImageSize()` ]({{site.info}}api/WebTwain_Buffer.html#getimagesize) .
* Size, but this time you specify an image format and `DWT` calculates the size in bytes depending on that image format. Used with [ `GetImageSizeWithSpecifiedType()` ]({{site.info}}api/WebTwain_Buffer.html#getimagesizewithspecifiedtype) .
* Size in bytes of selected images according to input dimensions. Used with [ `GetSelectedImagesSize()` ]({{site.info}}api/WebTwain_Buffer.html#getselectedimagessize) .

## Status Reporting

Now that we've covered the general image info like the size and dimensions, let's address some of the less intuitive but still useful pieces of information that our buffer can offer:

* To get the total number of images in the buffer, use the [ `HowManyImagesInBuffer` ]({{site.info}}api/WebTwain_Buffer.html#howmanyimagesinbuffer) property.

* The index of the image currently selected in the buffer is represented via the [ `CurrentImageIndexInBuffer` ]({{site.info}}api/WebTwain_Buffer.html#currentimageindexinbuffer) property, which you can also use to **set** the currently selected image.

* In addition to each image having a unique index, each image also has a unique image ID. To find the image ID of an image at a certain index, please use the `IndexToImageID()` method and the `ImageIDToIndex()` method if vice-versa.

Image selection is a powerful tool that can be utilized if you want to carry out an action but only on specific images in the buffer. We will go over some of the methods used to set the selected images in the buffer:

* `SelectImages()` is the main method used here. All you need to do is feed it the array of image indices you want to select.
* `SelectAllImages()` simply selects all the images in the buffer.
* `SelectedImagesIndices` returns the indices of the selected images as an array

* If a scanned image comes out a bit skewed, and you are not able to put that specific page through the scanner again, one potential solution would be to rotate the image by how much it is skewed, which can be easily done using [ `GetSkewAngle()` ]({{site.info}}api/WebTwain_Buffer.html#getskewangle). 

The following is only supported in [desktop browsers]({{site.getstarted}}platform.html#browsers-on-desktop-devices) and in [service mode]({{site.indepth}}initialize.html#service-mode).

* The method [ `GetSkewAngleEx()` ]({{site.info}}api/WebTwain_Buffer.html#getskewangleex) is used to get the skew angle a specified rectangle on a specified image.

* Each image in the buffer also has an internal URL which you can use to reference that specific image, accessible via [ `GetImageURL()` ]({{site.info}}api/WebTwain_Buffer.html#getskewangleex) and [ `GetImagePartURL()` ]({{site.info}}api/WebTwain_Buffer.html#getskewangleex) . This could come in handy for certain situations, like retrieving and showing the images in your own viewer.

> Note that `GetImageURL()` returns a URL that has the normal scheme `http` or `https` while `GetImagePartURL()` returns an internal URL that has the scheme `dwt` . The latter can only be accessed by other `DWT` APIs.

## Blankness Detection

> Only supported in [desktop browsers]({{site.getstarted}}platform.html#browsers-on-desktop-devices) and in [service mode]({{site.indepth}}initialize.html#service-mode).

The buffer also comes with the ability to detect if a scanned image is blank or not. This is easily done using one of the two following methods: [ `IsBlankImage()` ]({{site.info}}api/WebTwain_Buffer.html#isblankimage) or [ `IsBlankImageExpress()` ]({{site.info}}api/WebTwain_Buffer.html#isblankimageexpress) , the earlier being slower but more accurate than the latter.

If you believe an image should be blank but `IsBlankImage()` or `IsBlankImageExpress()` is returning false , you can read [ `BlankImageCurrentStdDev` ]({{site.info}}api/WebTwain_Buffer.html#blankimagecurrentstddev) (a read-only property) for that image and then **set a bigger value** to [ `BlankImageMaxStdDev` ]({{site.info}}api/WebTwain_Buffer.html#blankimagemaxstddev) , which sets the "limit" at which the buffer considers the image blank.

## Buffer Event Callbacks

The buffer also provides various event callbacks that take place under specific conditions. You can use these callbacks to trigger a certain action once this event takes place. Here is an overview of the events and what each represents:

* [ `OnBitmapChanged` ]({{site.info}}api/WebTwain_Buffer.html#onbitmapchanged) This event is triggered when the data in the buffer changes. Specifically it fires when

  + New image(s) enters the buffer
  + Old image(s) gets removed
  + Existing image(s) gets edited

  <!-- Index change? -->

* [ `OnTopImageInTheViewChanged` ]({{site.info}}api/WebTwain_Buffer.html#ontopimageintheviewchanged) This event is triggered when the first **visible** image in the viewer changes.

* [ `OnIndexChangeDragDropDone` ]({{site.info}}api/WebTwain_Buffer.html#onindexchangedragdropdone) This event is triggered when you drag and drop images in the viewer to change their postions.

<!-- An event to fire when selection change -->
