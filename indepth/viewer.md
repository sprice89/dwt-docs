---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# VIEWER

`DWT` comes with a `Viewer` component to help visualize the data in the buffer. To make things easy, the `Viewer` has within itself a built-in `Image Editor` UI.

## Bind the Viewer

As mentioned in [creating the WebTwain instance]({{site.indepth}}initialize.html#creating-the-webtwain-instance), a new `WebTwain` instance (or a new `DWT` object) usually comes with a ready-bound viewer which is an instance of the `Viewer` component. Only when you use [ `Dynamsoft.WebTwainEnv.CreateDWTObjectEx` ]({{site.indepth}}initialize.html#dynamsoftwebtwainenvcreatedwtobjectex) for the instantiation will you be able to get a `WebTwain` instance that doesn't have a viewer. In this case, you can still call the method [ `BindViewer()` ]({{site.info}}api/WebTwain_Viewer.html#bindviewer) to create and bind a `Viewer` instance.

## Customize the Viewer

The viewer is created inside a given `HTMLDivElement` specified by its `id` . If a `WebTwain` instance is created with a built-in viewer, you can specify the initial size of the viewer during the creation. For example, the following configuration specifies a *585px by 513px* viewer to be created in the `HTMLDivElement` with the `id` 'dwtcontrolContainer1'.

``` javascript
Dynamsoft.WebTwainEnv.Containers = [{
    ContainerId: 'dwtcontrolContainer1',
    Width: '585px',
    Height: '513px'
}]
```

If the viewer is bound after the creation of the `WebTwain` instance, the following does the same thing

``` javascript
DWObject.BindViewer('dwtcontrolContainer1', {
    Height: 513,
    Width: 585
});
```

After the initial binding, you can still call the method [ `UpdateViewer()` ]({{site.info}}api/WebTwain_Viewer.html#updateviewer) to customize the viewer. For example, the following changes the size of the viewer and enables dual-viewer mode at the same time

``` javascript
DWObject.UpdateViewer({
    Height: "500px",
    Width: "700px",
    view: {
        // Show the 2nd viewer
        bShow: true,
        // The 2nd viewer takes up 80% of the viewer width
        Width: "80%"
    }
});
```

### Questions

#### Can I change the language used on the viewer

Yes. >>>>>>>>>>>

#### Can I change the colors of the viewer

Yes, you can use the following to change the colors of the viewer.

## Use the Viewer

You can use the `Viewer` in the following ways

### Navigate through all images
### Show one or multiple images in one view
### Fit one image to the view
### Show the image in its actual size
### Zoom in to see more details of an image
  * How to use Ctrl + Wheel to do this
### Highlight a specified region on the image (OverlayRectangle) -- deprecated, can ignore this one?
### Select an area

## Unbind the Viewer

You can call the method [ `UnbindViewer()` ]({{site.info}}api/WebTwain_Viewer.html#unbindviewer) on a `WebTwain` instance to unbind and destroy its viewer.

## The Image Editor

The Image Editor is 

### How to show or hide the Image Editor

### Questions

#### Is the editor compatible across all platforms

#### Can I change the language of the Editor

#### Can I remove or add buttons on the toolbar of the Editor

#### Can I specify where and how big the Editor is

#### Can I change the colors of the Editor

## Using the built-in Image Editor

`DWT` comes with a built-in GUI image editor that offers the user a more visual way to edit scanned images.

Accessing the image editor is simple, all you need to do is call the ShowImageEditor() method.

Calling the method by default will have the image editor occupy the entire image. However, you can customize that by assigning the image editor a specific 'div' element in code, specified by the input parameter(s).

``` 
DWObject.ShowImageEditor(); // displays image editor in full screen
DWObject.ShowImageEditor("divID", <width in px>, <height in px>); // limit the image editor to a section of the page
```
