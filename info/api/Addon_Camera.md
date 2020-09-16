---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# WebTwain.Addon.Camera

> Dynamsoft provides a built-in feature to handle camera capturing, prospective adjusting, etc. Check out the APIs [showVideo()]({{site.info}}api/WebTwain_Viewer.html#showvideo) and [closeVideo()]({{site.info}}api/WebTwain_Viewer.html#closevideo).

**Methods**

* [getSourceList()](#getsourcelist) 
* [selectSource()](#selectsource)
* [getCurrentSource()](#getcurrentsource)
* [closeSource()](#closesource)
* [getResolution()](#getresolution)
* [setResolution()](#setresolution)
* [getCurrentResolution()](#getcurrentresolution)
* [play()](#play)
* [pause()](#pause)
* [resume()](#resume)
* [stop()](#stop)
* [getStatus()](#getstatus)
* [capture()](#capture)

---

## getSourceList

**Syntax**

``` typescript
/**
 * Return a list of all available cameras.
 */
getSourceList(): Promise<DeviceInfo[]>;

interface DeviceInfo{
    deviceId: string;
    label: string;
}
```

---

## selectSource

**Syntax**

``` typescript
/**
 * Select a camera to use.
 * @param deviceId Specify the camera with its deviceId.
 */
selectSource(deviceId: string): Promise<DeviceInfo>;
```

---

## getCurrentSource

**Syntax**

``` typescript
/**
 * Return the info about the current camera.
 */
getCurrentSource():DeviceInfo;
```

---

## closeSource

**Syntax**

``` typescript
/**
 * Close the current camera.
 */
closeSource(): Promise<DeviceInfo>;
```

---

## getResolution

**Syntax**

``` typescript
/**
 * Return the resolutions supported by the current camera.
 */
getResolution(): Promise<Resolution[]>

interface Resolution{
    width: number;
    height: number;
}
```

---

## setResolution

**Syntax**

``` typescript
/**
 * Set the resolution for the current camera.
 * @param resolution Specify the resolution.
 */
setResolution(resolution: Resolution): Promise<Resolution>;
```

---

## getCurrentResolution

**Syntax**

``` typescript
/**
 * Return the resolution of the current camera.
 */
getCurrentResolution(): Promise<Resolution>;
```

**Usage notes**

If the camera is playing, the actual resolution is returned. If the camera is not playing, the last set resolution or null is returned.

---

## play

**Syntax**

``` typescript
/**
 * Start streaming video from the current camera.
 * @param element Specify an HTML element to put the video stream in.
 * @param resolution Specify the initial resolution.
 */
play(element?: HTMLElement,
    resolution?: Resolution
): Promise<Resolution>;
```

**Usage notes**

If no camera is chosen, the default camera is used. 

If the method is called without arguments or `null` is passed to `element`, the video will show in the main viewer.

---

## pause

**Syntax**

``` typescript
/**
 * Pause the video stream.
 */
pause(): void;
```

---

## resume

**Syntax**

``` typescript
/**
 * Resume the video stream.
 */
resume(): void;
```

---

## stop

**Syntax**

``` typescript
/**
 * Stop the video stream.
 */
stop(): void;
```

---

## getStatus

**Syntax**

``` typescript
/**
 * Return the status of the current camera.
 */
getStatus(): string;
```

**Usage notes**

The status string is either empty or one of the following: "playing", "paused", "stopped". An empty string means no camera is open.

---

## capture

**Syntax**

``` typescript
/**
 * Capture a frame from the video stream.
 */
capture(): Promise<Blob>;
```
