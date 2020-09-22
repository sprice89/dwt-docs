---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# READ BARCODE

With the increasing use of barcode reading in document management systems, the Barcode Reader SDK add-on of `DWT` presents an easy and seamless way of integrating one of the indutry's best barcode reading components into your document management systrem. In this section, we will show you how to get started with the add-on and demonstrate how it can be used as a batch document classifier and separator.

> NOTE: Barcode reading can be performed on the client side as well as the server side. For `DWT` , we only consider client-side reading. If you are interested in reading on the server side, you can contact [Dynamsoft Support]({{site.about}}getsupport.html).

## Environment

* [Desktop]({{site.getstarted}}platform.html#browsers-on-desktop-devices) and [Mobile]({{site.getstarted}}platform.html#browsers-on-mobile-devices).

* [Service mode]({{site.indepth}}initialize.html#service-mode) and [WASM mode]({{site.indepth}}initialize.html#wasm-mode).

## How to use

### Step one - Include the addon

To include this addon is to reference the necessary JavaScript file which is included in the [resources files]({{site.about}}faqs.html#what-are-the-resources-files).

> If you are using the [dwt package](https://www.npmjs.com/package/dwt), the barcode reader is already included in the main JavaScript file ( `dynamsoft.webtwain.min.js` or `dynamsoft.webtwain.min.mjs` ) which means you can skip this step.

``` html
<script src="dynamsoft.webtwain.addon.barcodereader.js"> </script>
```

### Step two - Start the reading

Now that the addon has been referenced, we can call [ `decode()` ]({{website.info}}api/Addon_BarcodeReader.html#initruntimesettingswithstring) to start reading barcode(s).

``` javascript
function readBarcodes(imageIndex) {
    if (DWObject) {
        DWObject.Addon.BarcodeReader.decode(imageIndex)
            .then(function(textResults) {
                console.log(textResults)
            }, function(error) {
                console.log(error)
            });
    } else {
        console.log('DWObject is not initialized yet');
    }
}
```

Note that the barcode reading does take a bit of time, so it'll help to add an indicator as mentioned in [Loader Bar and Backdrop]({{website.indepth}}ui.html#loader-bar-and-backdrop)

``` javascript
function readBarcodes(imageIndex) {
    if (DWObject) {
        // Add an indicator
        Dynamsoft.WebTwainEnv.OnWebTwainPreExecute();
        DWObject.Addon.BarcodeReader.decode(imageIndex)
            .then(function(textResults) {
                // Remove the indicator
                Dynamsoft.WebTwainEnv.OnWebTwainPostExecute();
                console.log(textResults)
            }, function(error) {
                // Remove the indicator
                Dynamsoft.WebTwainEnv.OnWebTwainPostExecute();
                console.log(error)
            });
    } else {
        console.log('DWObject is not initialized yet');
    }
}
```

### Step three - Check the result

Check the structure of the resulting object [here]({{website.info}}api/Addon_BarcodeReader.html#decode). The following code prints out the text contained in the barcode(s)

``` javascript
Dynamsoft.WebTwainEnv.OnWebTwainPreExecute();
DWObject.Addon.BarcodeReader.decode(imageIndex)
    .then(function(textResults) {
        // Remove the indicator
        Dynamsoft.WebTwainEnv.OnWebTwainPostExecute();
        for (var i = 0; i < textResults.length; i++) {
            console.log(textResults[i].BarcodeText);
        }
    }, function(error) {
        // Remove the indicator
        Dynamsoft.WebTwainEnv.OnWebTwainPostExecute();
        console.log(error)
    });
```

## Runtime Settings

Most of the time, you simply need to use the default decode method to read most of the barcode images out there. However, you may encounter some barcodes that are not being read by default or a situation where you would like to customize which barcode types your reader should pick up, and more.

The runtime settings of the addon give you access to a wide array fo customizable parameters, all of which you can check out with the method [ `getRuntimeSettings()` ]({{website.info}}api/Addon_BarcodeReader.html#getruntimesettings) and change with the method [ `updateRuntimeSettings()` ]({{website.info}}api/Addon_BarcodeReader.html#updateruntimesettings). Now to demonstrate a few typical customization scenarios:

### Specify the Barcode Type(s) to Read

By default, the addon will read all the supported barcode types from the image. (See the `Supported Symbologies` in the [overview page](https://www.dynamsoft.com/Products/Dynamic-Barcode-Reader.aspx) for the full list.)

If your license only covers a subset of the full list or you want to read specific barcoe types, you can use the `barcodeFormatIds` and `barcodeFormatIds2` parameters to specify the barcode format(s). For example, to enable only 1D barcode reading, you can use the following code snippet:

``` javascript
DWObject.Addon.BarcodeReader.getRuntimeSettings()
    .then(function(runtimeSettings) {
        runtimeSettings.barcodeFormatIds = Dynamsoft.EnumBarcodeFormat.BF_ONED;
        return DWObject.Addon.BarcodeReader.updateRuntimeSettings(runtimeSettings);
    }, function(error) {
        console.log(error);
    })
    .then(function(runtimeSettings) {
        // Add an indicator
        Dynamsoft.WebTwainEnv.OnWebTwainPreExecute();
        return DWObject.Addon.BarcodeReader.decode(imageIndex);
    }, function(error) {
        console.log(error);
    })
    .then(function(textResults) {
        // Remove the indicator
        Dynamsoft.WebTwainEnv.OnWebTwainPostExecute();
        for (var i = 0; i < textResults.length; i++) {
            console.log(textResults[i].BarcodeText);
        }
    }, function(error) {
        // Remove the indicator
        Dynamsoft.WebTwainEnv.OnWebTwainPostExecute();
        console.log(error)
    });
```

### Specify maximum barcode count

By default, the addon will read as many barcodes as it can. To increase the recognition efficiency, you can use the `expectedBarcodesCount` parameter to specify the maximum number of barcodes to recognize according to your scenario.

``` javascript
// No matter how many barcodes are on the image, stop reading as soon as one barcode is found
runtimeSettings.expectedBarcodesCount = 1;
```

### Specify a scan Region

By default, the addon will search the whole image for barcodes. This can lead to poor performance especially when dealing with high-resolution images. You can speed up the recognition process by restricting the scanning region. To specify a region, you will need to define an area. The following code shows how to define the region.

``` javascript
// The following reads the center of the image (50% vertically and horizontally)
runtimeSettings.region.regionTop = 25;
runtimeSettings.region.regionBottom = 75;
runtimeSettings.region.regionLeft = 25;
runtimeSettings.region.regionRight = 75;
runtimeSettings.region.regionMeasuredByPercentage = 1;
```

### Set the runtime settings using JSON

So far, we edited the values of specific runtime settings via accessing each individual setting and adjusting its value. However, the addon also provides the developer the ability to set everything at once using a JSON string. The method is called [ `initRuntimeSettingsWithString()` ]({{website.info}}api/Addon_BarcodeReader.html#initruntimesettingswithstring).

> Some advanced features such as dedicate configuration of a binarization mode is only possible when using the method `initRuntimeSettingsWithString()` .

Here is a JSON template that you can use:

``` javascript
var settings = {
    "ImageParameter": {
        "BarcodeFormatIds": ["BF_ALL"],
        "BinarizationModes": [{
            "BlockSizeX": 0,
            "BlockSizeY": 0,
            "EnableFillBinaryVacancy": 1,
            "ImagePreprocessingModesIndex": -1,
            "Mode": "BM_LOCAL_BLOCK",
            "ThreshValueCoefficient": 10
        }],
        "DeblurLevel": 9,
        "Description": "",
        "ExpectedBarcodesCount": 0,
        "GrayscaleTransformationModes": [{
            "Mode": "GTM_ORIGINAL"
        }],
        "ImagePreprocessingModes": [{
            "Mode": "IPM_GENERAL"
        }],
        "IntermediateResultSavingMode": {
            "Mode": "IRSM_MEMORY"
        },
        "IntermediateResultTypes": ["IRT_NO_RESULT"],
        "MaxAlgorithmThreadCount": 4,
        "Name": "runtimesettings",
        "PDFRasterDPI": 300,
        "Pages": "",
        "RegionDefinitionNameArray": null,
        "RegionPredetectionModes": [{
            "Mode": "RPM_GENERAL"
        }],
        "ResultCoordinateType": "RCT_PIXEL",
        "ScaleDownThreshold": 2300,
        "TerminatePhase": "TP_BARCODE_RECOGNIZED",
        "TextFilterModes": [{
            "MinImageDimension": 65536,
            "Mode": "TFM_GENERAL_CONTOUR",
            "Sensitivity": 0
        }],
        "TextResultOrderModes": [{
                "Mode": "TROM_CONFIDENCE"
            },
            {
                "Mode": "TROM_POSITION"
            },
            {
                "Mode": "TROM_FORMAT"
            }
        ],
        "TextureDetectionModes": [{
            "Mode": "TDM_GENERAL_WIDTH_CONCENTRATION",
            "Sensitivity": 5
        }],
        "Timeout": 10000
    },
    "Version": "3.0"
};
```

For a JSON object like `settings` above, you should make it a string first as shown in the code below

``` javascript
var JSONString = JSON.stringify(settings);
DWObject.Addon.BarcodeReader.initRuntimeSettingsWithString(JSONString).then( /*...*/ );
```

### Built-in modes

If you are not sure how to change the `RuntimSettings` , the addon also comes with three built-in modes for you to choose from

* `speed` : fast but may miss some codes
* `coverage` : slow but cover most codes
* `balance` : between `speed` and `coverage`
The following shows their differences

| Parameter | `speed` | `balance` | `coverage` | `default` |
| :-: | :-: | :-: | :-: | :-: |
| `deblurLevel` |  `3` 	|  `5` 	|  `9` | `9` |
| `barcodeFormatIds_2` |  `32505858` 	|  `32505858` 	|  `32505858` | `0` |
| `expectedBarcodesCount` |  `512` 	|  `512` 	|  `512` | `0` |
| `grayscaleTransformationModes` | `[2, 0, 0, 0, 0, 0, 0, 0]` 	| `[2, 0, 0, 0, 0, 0, 0, 0]` 	 | `[2, 1, 0, 0, 0, 0, 0, 0]` | `[2, 0, 0, 0, 0, 0, 0, 0]` |
| `textFilterModes` | `[0, 0, 0, 0, 0, 0, 0, 0]` 	 | `[2, 0, 0, 0, 0, 0, 0, 0]` 	 | `[2, 0, 0, 0, 0, 0, 0, 0]` | `[2, 0, 0, 0, 0, 0, 0, 0]` |
| `localizationModes` | `[2, 32, 64, 0, 0, 0, 0, 0]` 	 | `[2, 4, 32, 64, 0, 0, 0, 0]` 	 | `[2, 16, 4, 8, 32, 64, 0, 0]` | `[2, 16, 4, 8, 0, 0, 0, 0]` |
| `scaleDownThreshold` | `2300` 	| `2300` 	| `214748347` | `2300` |

To use one of these modes, simply call `updateRuntimeSettings()`

``` javascript
DWObject.Addon.BarcodeReader.updateRuntimeSettings('coverage').then( /*---*/ );
```

[Try](https://demo.dynamsoft.com/Samples/dwt/Scan-Documents-and-Read-Barcode/ReadBarcode.html) or [download](https://www.dynamsoft.com/handle-sample?demoSampleId=66&type=2&productId=1000001&link=https%3a%2f%2fdownload2.dynamsoft.com%2fSamples%2fDWT%2fScan-Documents-and-Read-Barcode.zip) an official demo.

### Reset settings

You can always go back to the default settings with the method [ `resetRuntimeSettings()` ]({{website.info}}api/Addon_BarcodeReader.html#resetruntimesettings).

## Use barcode to classify and separate documents

Using pages with barcodes as document separators and classify images with the barcode on it are two popular usage scenarios.

### As document separators

The following code reads all images and use those with barcodes to separate images into different documents.

``` javascript
// `aryIndices` consists of multiple arrays each of which represents a document
var aryIndices = [],
    bBarcodeFound = false,
    ProcssedImagesCount = 0;
j;

function ReadBarcode(index) {
    DWObject.Addon.BarcodeReader.decode(index)
        .then(function(results) {
                ProcssedImagesCount++;
                if (results.length === 0) {
                    console.log('no barcode found on image index ' + index);
                    if (bBarcodeFound === true) {
                        // If a barcode was found earlier, this image belongs to the current document
                        bBarcodeFound = false;
                        if (aryIndices.length === 0)
                            aryIndices.push([index]);
                        else
                            aryIndices[aryIndices.length - 1].push(index);
                    } else {
                        // If no barcode has been found yet, this image belongs to the first document
                        if (aryIndices.length === 0)
                            aryIndices.push([index]);
                        else
                            aryIndices[aryIndices.length - 1].push(index);
                    }
                } else {
                    console.log('barcode found on image index ' + index);
                    if (ProcssedImagesCount === DWObject.HowManyImagesInBuffer) {
                        //If it is the last image, no need to set this flag to true nor create a new document
                        bBarcodeFound = false;
                    } else {
                        bBarcodeFound = true;
                        // Found a barcode, create a new one
                        if (aryIndices.length === 0)
                            aryIndices.push([]);
                        else if (aryIndices[aryIndices.length - 1].length != 0)
                            aryIndices.push([]);
                    }
                }
                if (ProcssedImagesCount === DWObject.HowManyImagesInBuffer) {
                    // Print out the indice arrays, each array represents a document
                    console.log(aryIndices);
                    aryIndices = [];
                } else
                    /*
                     * Read the next image
                     */
                    ReadBarcode(index + 1);
            },
            function(errorMsg) {
                console.log(errorMsg);
            }
        );
}
ReadBarcode(0);
```

### As document classifier

The following code reads all barcodes from all images and put images which have the same barcode into one document. Images without any barcode are put into one document as well.

``` javascript
// `aryIndices` consists of multiple arrays each of which represents a document
var aryIndices = {
        'noBarcode': []
    },
    ProcssedImagesCount = 0;

function ReadBarcode(index) {
    var j,
        bBarcodeFound = false;
    DWObject.Addon.BarcodeReader.decode(index).then(function(results) {
            ProcssedImagesCount++;
            if (results.length === 0) {
                console.log('no barcode found on image index ' + index);
                aryIndices.noBarcode.push(index);
            } else {
                console.log('barcode found on image index ' + index);
                var barcodeOnThisImage = [],
                    allKeys = [];
                for (j = 0; j < results.length; j++) {
                    var result = results[j];
                    var barcodeText = result.barcodeText;
                    // Record all barcodes found on this image
                    if (barcodeOnThisImage.indexOf(barcodeText) === -1)
                        barcodeOnThisImage.push(barcodeText);
                }

                Dynamsoft.Lib.each(aryIndices, function(value, key) {
                    allKeys.push(key);
                });

                for (j = 0; j < allKeys.length; j++) {
                    var oKey = allKeys[j];
                    if (barcodeOnThisImage.indexOf(oKey) != -1) {
                        barcodeOnThisImage.splice(barcodeOnThisImage.indexOf(oKey), 1);
                        var _value = aryIndices[oKey];
                        if (_value.indexOf(index) === -1) {
                            _value.push(index);
                            aryIndices[oKey] = _value;
                        }
                    }
                }
                for (j = 0; j < barcodeOnThisImage.length; j++) {
                    aryIndices[barcodeOnThisImage[j]] = [index];
                }
            }
            if (ProcssedImagesCount === DWObject.HowManyImagesInBuffer) {
                ProcssedImagesCount = 0;
                var aryTemp = [];
                Dynamsoft.Lib.each(aryIndices, function(value, key) {
                    aryTemp.push(value);
                });
                aryIndices = aryTemp;
                console.log(aryIndices);
                aryIndices = {
                    'noBarcode': []
                };
            } else
                /*
                 * Read the next image
                 */
                ReadBarcode(index + 1);

        },
        function(errorMsg) {
            console.log(errorMsg);
        }
    );
}
ReadBarcode(0);
```

[Try](https://demo.dynamsoft.com/Samples/dwt/Scan-Documents-and-Separate-them-by-Barcode/Scan-Separate-Barcode.html) or [download](https://www.dynamsoft.com/handle-sample?demoSampleId=102&type=2&productId=1000001&link=https%3a%2f%2fdownload2.dynamsoft.com%2fSamples%2fDWT%2fScan-Documents-and-Separate-them-by-Barcode.zip) an official demo.
