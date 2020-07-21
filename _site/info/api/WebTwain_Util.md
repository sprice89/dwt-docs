<script src="https://www.dynamsoft.com/assets/js/jquery.dynamsoft.header.js?showSearch=false&host=www.dynamsoft.com"></script>
# WebTwain Util

| Methods |      |
|:-|:-|
| [RegisterEvent()](#registerevent) | [UnregisterEvent()](#unregisterevent) |
| [SetLanguage()](#setlanguage) | [GenerateURLForUploadData()](#generateurlforuploaddata) |

| Properties | |
|:-|:-|
| [ErrorCode](#errorcode) | [ErrorString](#errorstring) |
| [LogLevel](#loglevel) | [Manufacturer](#manufacturer) |
| [ProductFamily](#productfamily) | [ProductName](#productname) |
| [VersionInfo](#versioninfo) | [ProductKey](#productkey) |

---

## RegisterEvent

### Syntax

```javascript
/**
 * Specify an event listener for the specified built-in event.
 * @param name Specify the event
 * @param callback The event listener
 */
RegisterEvent(name: string, callback: () => void): boolean;
```

---
## UnregisterEvent

### Syntax

```javascript
/**
 * Remove an event listener from the specified built-in event.
 * @param name Specify the event
 * @param callback The event listener
 */
UnregisterEvent(name: string, callback: () => void): boolean;
```

### Usage notes

There can only be one listener for each built-in event. If you call `RegisterEvent` on the same event again, the new callback will replace the old one.

---

## SetLanguage

### Syntax

```javascript
/**
 * Set the language for the authorization dialogs.
 * @param language Specify the language.
 */
SetLanguage(
    language: Dynamsoft.EnumDWT_Language | number
): boolean;
```

### Usage notes

The language set with this method is only for the built-in security dialogs which show up when the user tries to access a scanner, a camera or a local file.

---

## GenerateURLForUploadData

### Syntax

```javascript
/**
 * Generate a URL to be used by a FileUpoader instance to fetch the data to upload.
 * @param indices Specify the images to upload.
 * @param type Specify the file type.
 * @param successCallback A callback function that is executed if the request succeeds.
 * @param failureCallback A callback function that is executed if the request fails.
 * @argument resultURL The generated URL.
 * @argument indices The indices of the images.
 * @argument type The file type.
 */
GenerateURLForUploadData(
    indices: number[],
    type: Dynamsoft.EnumDWT_ImageType | number,
    successCallback: (
        resultURL: string,
        indices: number[],
        type: Dynamsoft.EnumDWT_ImageType | number
    ) => void,
    failureCallback: (
        errorCode: number,
        errorString: string
    ) => void
): void;
```

### Usage notes

The language set with this method is only for the built-in security dialogs which show up when the user tries to access a scanner, a camera or a local file.

---

## ErrorCode

### Syntax

```javascript
/**
 * Return the error code.
 */
readonly ErrorCode: number;
```

### Usage notes

The `ErrorCode` and `ErrorString` always reflect the result of the last API call. So make sure you read them in time.

---

## ErrorString

### Syntax

```javascript
/**
 * Return the error string.
 */
readonly ErrorString: string;
```

### Usage notes

The `ErrorCode` and `ErrorString` always reflect the result of the last API call. So make sure you read them in time.

---

## LogLevel

### Syntax

```javascript
/**
 * Return or set the log level for debugging.
 */
LogLevel: number;
```

### Usage notes

The logs for the Dynamic Web TWAIN library are saved in the directory `C:\Windows\SysWOW64\Dynamsoft\DynamsoftServicex64\log\`. By default, `LogLevel` is 0 and nothing is recorded. When it is set to 1, all debugging information is recorded.

Setting `LogLevel` to 1/0 is equivalent to setting `LogLevel` to 14/1 in the file `C:\Windows\SysWOW64\Dynamsoft\DynamsoftServicex64\DSConfiguration.ini`.

---

## Manufacturer

### Syntax

```javascript
/**
 * Manufacturer in the identity string of the Dynamic Web TWAIN library.
 */ 
readonly Manufacturer: string;
```

## Usage notes

`Manufacturer`, `ProductFamily`, `ProductName` and `VersionInfo` together form the identity string of the Dynamic Web TWAIN library.

---

## ProductFamily

### Syntax

```javascript
/**
 * ProductFamily in the identity string of the Dynamic Web TWAIN library.
 */
readonly ProductFamily: string;
```

## Usage notes

`Manufacturer`, `ProductFamily`, `ProductName` and `VersionInfo` together form the identity string of the Dynamic Web TWAIN library.

---

## ProductName

### Syntax

```javascript
/**
 * ProductName in the identity string of the Dynamic Web TWAIN library.
 */
readonly ProductName: string;
```

## Usage notes

`Manufacturer`, `ProductFamily`, `ProductName` and `VersionInfo` together form the identity string of the Dynamic Web TWAIN library.

---

## VersionInfo

### Syntax

```javascript
/**
 * VersionInfo in the identity string of the Dynamic Web TWAIN library.
 */
readonly VersionInfo: string;
```

## Usage notes

`Manufacturer`, `ProductFamily`, `ProductName` and `VersionInfo` together form the identity string of the Dynamic Web TWAIN library.

---

## ProductKey

### Syntax

```javascript
/**
 * Return or set the ProductKey.
 */
ProductKey: string;
```

### Usage notes

The ProductKey contains the license to use the Dynamic Web TWAIN library.