/<script src="https://www.dynamsoft.com/assets/js/jquery.dynamsoft.header.js?showSearch=false&host=www.dynamsoft.com"></script>
# WebTwain.Addon.Webcam

| Methods | |
|:-|:-|
| [CaptureImage()](#captureimage) | [CloseSource()](#closesource) |
| [GetCameraControlPropertySetting()](#getcameracontrolpropertysetting) | [GetCameraControlPropertyMoreSetting()](#getcameracontrolpropertymoresetting) |
| [GetVideoPropertySetting()](#getvideopropertysetting) | [GetVideoPropertyMoreSetting()](#getvideopropertymoresetting) |
| [SetCameraControlPropertySetting()](#setcameracontrolpropertysetting) | [SetVideoPropertySetting()](#setvideopropertysetting) |
| [GetFrameRate()](#getframerate) | [SetFrameRate()](#setframerate) |
| [GetMediaType()](#getmediatype) | [SetMediaType()](#setmediatype) |
| [GetResolution()](#getresolution) | [SetResolution()](#setresolution) |
| [GetFramePartURL()](#getframeparturl) | [GetFrameURL()](#getframeurl) |
| [GetSourceList()](#) | [SelectSource()](#) |
| [PauseVideo()](#) | [PlayVideo()](#) |
| [SetVideoRotateMode()](#) | [StopVideo()](#) |

## CaptureImage

### Syntax

```javascript
/**
 * Capture an image from the current camera.
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument errorCode The error code.
 * @argument errorString The error String
 */
CaptureImage(
    successCallback: () => void,
    failureCallback: (
        errorCode: number,
        errorString: string
    ) => void
): void;
```

---

## GetSourceList
### Syntax

```javascript
/**
 * Return a list of all available cameras.
 */
GetSourceList(): string[];
```

---
## SelectSource
### Syntax
```javascript
/**
 * Select a camera to use.
 * @param name Specify the camera.
 */
SelectSource(name: string): boolean;
```

---
## CloseSource
### Syntax

```javascript
/**
 * Close the current camera.
 */
CloseSource(): boolean;
```

---
## GetSourceList
### Syntax

```javascript
/**
 * Return a list of all available cameras.
 */
GetSourceList(): string[];
```

---
## SelectSource
### Syntax

```javascript
/**
 * Select a camera to use.
 * @param name Specify the camera.
 */
SelectSource(name: string): boolean;
```

---
## CloseSource
### Syntax

```javascript
/**
 * Close the current camera.
 */
CloseSource(): boolean;
```

### Usage notes

When you close the camera, the video stream will stop at the last frame.

---

## PlayVideo

### Syntax

```javascript
/**
 * Start to play the video stream from the current camera.
 * @param DWObject Specify a WebTwain instance to show the video.
 * @param quality Specify the quality of the video.
 * @param frameDidShow A callback function that is triggered after each video frame is shown.
 */
PlayVideo(
    DWObject: WebTwain,
    quality: number,
    frameDidShow?: function () {}
): boolean;
```

---
## PauseVideo
### Syntax

```javascript
/**
 * Pause the video.
 */
PauseVideo(): boolean;
```

---
## StopVideo
### Syntax

```javascript
/**
 * Stop the video.
 */
StopVideo(): boolean;
```

### Usage notes

When you capture a frame, it's always the actual latest frame from the camera even if you have paused the video.

When you close the camera, the video stream will stop at the last frame.

---

## GetCameraControlPropertySetting
### Syntax

```javascript
/**
 * Return information about the specified camera property.
 * @param property Specify the property.
 */
GetCameraControlPropertySetting(
    property: EnumDWT_CameraControlProperty | number
): ICameraControlProperty;
```

---
## GetCameraControlPropertyMoreSetting
### Syntax

```javascript
/**
 * Return detailed information about the specified camera property.
 * @param property Specify the property.
 */
GetCameraControlPropertyMoreSetting(
    property: Dynamsoft.EnumDWT_CameraControlProperty | number
): ICameraControlPropertyExtra;
```

---
## SetCameraControlPropertySetting

### Syntax

```javascript
/**
 * Set the specified camera property.
 * @param property Specify the property.
 * @param value Specify the value.
 * @param auto Specify whether the propery should change automatically.
 */
SetCameraControlPropertySetting(
    property: Dynamsoft.EnumDWT_CameraControlProperty | number,
    value: number,
    auto: boolean
): boolean;

interface ICameraControlProperty {
    /**
     * Return the value of the property.
     */
    GetValue(): number;
    /**
     * Return whether the property is set autmatically or not.
     */
    GetIfAuto(): boolean;
}

interface ICameraControlPropertyExtra {
    /**
     * Return the minimum value of the property.
     */
    GetMinValue(): number;
    /**
     * Return the maximum value of the property.
     */
    GetMaxValue(): number;
    /**
     * Return the default value of the property.
     */
    GetDefaultValue(): number;
    /**
     * Return the smallest increment by which the property can change.
     */
    GetSteppingDelta(): number;    
    /**
     * Return whether the property is set autmatically or not.
     */
    GetIfAuto(): boolean;
}
```

### Usage notes

Check out [Dynamsoft.EnumDWT_CameraControlProperty](Dynamsoft.Enum.md#dynamsoftenumdwt_cameracontrolproperty).

---

## GetVideoPropertySetting

### Syntax

```javascript
/**
 * Return information about the specified video property.
 * @param property Specify the property.
 */
GetVideoPropertySetting(
    property: Dynamsoft.EnumDWT_VideoProperty | number
): IVideoControlProperty;
```

---
## GetVideoPropertyMoreSetting
### Syntax

```javascript
/**
 * Return detailed information about the specified video property.
 * @param property Specify the property.
 */
GetVideoPropertyMoreSetting(
    property: Dynamsoft.EnumDWT_VideoProperty | number
): IVideoControlPropertyExtra;
```

---
## SetVideoPropertySetting
### Syntax

```javascript
/**
 * Set the specified video property.
 * @param property Specify the property.
 * @param value Specify the value.
 * @param auto Specify whether the propery should change automatically.
 */
SetVideoPropertySetting(
    property: Dynamsoft.EnumDWT_VideoProperty | number,
    value: number,
    auto: boolean
): boolean;

interface IVideoControlProperty {
    /**
     * Return the value of the property.
     */
    GetValue(): number;
    /**
     * Return whether the property is set autmatically or not.
     */
    GetIfAuto(): boolean;
}

interface IVideoControlPropertyExtra {
    /**
     * Return the minimum value of the property.
     */
    GetMinValue(): number;
    /**
     * Return the maximum value of the property.
     */
    GetMaxValue(): number;
    /**
     * Return the default value of the property.
     */
    GetDefaultValue(): number;
    /**
     * Return the smallest increment by which the property can change.
     */
    GetSteppingDelta(): number;    
    /**
     * Return whether the property is set autmatically or not.
     */
    GetIfAuto(): boolean;
}
```

### Usage notes

Check out [Dynamsoft.EnumDWT_VideoProperty](Dynamsoft.Enum.md#dynamsoftenumdwt_videoproperty).

---

## GetFrameRate
### Syntax

```javascript
/**
 * Return the frame rates supported by the current camera.
 */
GetFrameRate(): IFrameRate;
```

---
## GetMediaType
### Syntax
```javascript
/**
 * Return the media types supported by the current camera.
 */
GetMediaType(): IMediaType;
```

---
## GetResolution
### Syntax

```javascript
/**
 * Return the resolutions supported by the current camera.
 */
GetResolution(): IResolution;
```

---
## SetFrameRate
### Syntax

```javascript
/**
 * Set the frame rate.
 * @param rate Specify the frame rate.
 */
SetFrameRate(rate: number): boolean;
```

---
## SetMediaType
### Syntax

```javascript
/**
 * Set the media type.
 * @param type Sepcify the media type.
 */
SetMediaType(type: string): boolean;
```

---
## SetResolution
### Syntax

```javascript
/**
 * Set the resolution.
 * @param resolution Specify the resolution.
 */
SetResolution(resolution: string): boolean;


interface IFrameRate {
    /**
     * Return the number of available frame rates.
     */
    GetCount(): number;
    /**
     * Return the specified frame rate.
     */
    Get(index: number): number;
    /**
     * Return the current frame rate.
     */
    GetCurrent(): number;
}

interface IMediaType {
    /**
     * Return the number of available media types.
     */
    GetCount(): number;
    /**
     * Return the specified media type.
     */
    Get(index: number): string;
    /**
     * Return the current media type.
     */
    GetCurrent(): string;
}

interface IResolution {
    /**
     * Return the number of available resolutions.
     */
    GetCount(): number;
    /**
     * Return the specified resolution.
     */
    Get(index: number): string;
    /**
     * Return the current resolution.
     */
    GetCurrent(): string;
}
```

---
## SetVideoRotateMode
### Syntax

```javascript
/**
 * Rotate the video.
 * @param mode Specify the rotate mode
 */
SetVideoRotateMode(
    mode: Dynamsoft.EnumDWT_VideoRotateMode | number
): boolean;
```

### Usage notes

Check out [Dynamsoft.EnumDWT_VideoRotateMode](Dynamsoft.Enum.md#dynamsoftenumdwt_videorotatemode).

---

## GetFrameURL

### Syntax

```javascript
/**
 * Return the URL (http(s)://) for the latest frame.
 */
GetFrameURL(): string;
```

---
## GetFramePartURL
### Syntax
```javascript
/**
 * Return the internal URL (dwt://) for the latest frame.
 */
GetFramePartURL(): string;
```

### Usage notes

`GetFrameURL()` returns a public URL that can be used to access the frame directly by any applicatoin capable of HTTP requests that runs on the same machine. For example: 'https://127.0.0.1:18623/dwt/dwt_16000428/img?id=853407158&index=-1&width=-1&height=-1&webcam=80&t=1590481406860'.

`GetFramePartURL()` returns an internal URL that only Dynamsoft libraries such as the Barcode Reader add-on can read. For example: `dwt://dwt_16000428/img?id=853407158&index=-1&width=-1&height=-1&webcam=80&t=1590481403659`.