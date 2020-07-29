# Barcode Reader SDK Add-on

With the increasing use of barcode reading in document management systems, the Barcode Reader SDK add-on of Web TWAIN presents an easy and seamless way of integrating one of the indutry's best barcode reading components into your document management systrem.
In this guide, we will show you how to get started with the add-on and demonstrate how it can be used as a batch document classifier and separator.

## Environment
Windows, macOS, Linux, mobile.
Supports all mainstream browsers.

## Initializing the Barcode Reader addon

The first step to integrating this addon is to reference the necessary JavaScript files. Here is a demo of the two references that you will need to make:
```
<head>
...
<script src="https://tst.dynamsoft.com/libs/dbr/7.3/dynamsoft.barcodereader.config.js"> </script>
<script src="https://tst.dynamsoft.com/libs/dbr/7.3/dynamsoft.barcodereader.initiate.js"></script>
...
<head>
```
Now that the library has been referenced, here is how to use the component in code:
```
<script type="text/javascript">
var dbrObject, DWObject, result;
Dynamsoft.WebTwainEnv.ProductKey = 'YOUR_VALID_TRIAL_KEY';
Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', Dynamsoft_OnReady);

function Dynamsoft_OnReady() {
    DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
}
function acquireImage(){
    /* image acquisition code, see previous sections on how to use the DWT core component */
}
function readBarcodes() {
    if (DWObject) {
        let result = await DWObject.Addon.BarcodeReader.decode(imageIndex); // stores barcode text result
        console.log(result);
    } else {
        console.log('DWObject not initialized');
    }
}
</script>
```
## Runtime Settings

Most of the time, you simply need to use the default decode method to read most of the barcode images out there. However, you may encounter some barcodes that are not being read by default or a situation where you would like to customize which barcode types your reader should pick up, and more.

The runtime settings of the Barcode Reader SDK give you access to a wide array fo customizable parameters, all of which you can check out [here](https://www.dynamsoft.com/docs/dwt/API/Addon.BarcodeReader.html#getruntimesettings). Now to demonstrate a few typical customization scenarios:

* **Specify which Barcode Type(s) to Read**
By default, the SDK will read all the supported barcode formats from the image. (See the product overview [page](https://www.dynamsoft.com/Products/Dynamic-Barcode-Reader.aspx) for the full supported barcode formats list.)
If your full license only covers a subset of the full list, you can use the barcodeFormatIds and barcodeFormatIds2 parameters to specify the barcode format(s). For example, to enable only 1D barcode reading, you can use the following code snippet:
```
let runtimeSettings = await DWObject.Addon.BarcodeReader.getRuntimeSettings();
runtimeSettings.barcodeFormatIds = Dynamsoft.EnumBarcodeFormat.BF_ONED;
await DWObject.Addon.BarcodeReader.updateRuntimeSettings(runtimeSettings);
```
* **Specify maximum barcode count**
By default, the SDK will read as many barcodes as it can. To increase the recognition efficiency, you can use the expectedBarcodesCount parameter to specify the maximum number of barcodes to recognize according to your scenario.
```
let runtimeSettings = await DWObject.Addon.BarcodeReader.getRuntimeSettings();
runtimeSettings.expectedBarcodesCount = 1; // only expecting one barcode on the image
await DWObject.Addon.BarcodeReader.updateRuntimeSettings(runtimeSettings);
```
* **Specify a Scan Region**
By default, the barcode reader will search the whole image for barcodes. This can lead to poor performance especially when dealing with high-resolution images. You can speed up the recognition process by restricting the scanning region. To specify a region, you will need to define an area. The following code shows how to create a template string and define the region.
```
let runtimeSettings = await DWObject.Addon.BarcodeReader.getRuntimeSettings();
// setting region to the bottom half of the image
runtimeSettings.region.regionBottom = 100;
runtimeSettings.region.regionLeft = 0;
runtimeSettings.region.regionRight = 50;
runtimeSettings.region.regionTop = 0;
runtimeSettings.region.regionMeasuredByPercentage = 1; //The region is determined by percentageawait DWObject.Addon.BarcodeReader.updateRuntimeSettings(runtimeSettings);
```

### Setting the runtime settings using JSON

So far, we edited the values of specific runtime settings vy accessing each individual setting and adjusting its value. However, the SDK also provides the developer the ability to initialize the Barcode Reader instance with its own custom set of runtime settings using a JSON string.

Here is a JSON template that you can use with the initRuntimeSettingsWithString method:
```
{
   "ImageParameter" : {
      "BarcodeFormatIds" : [ "BF_ALL" ],
      "BinarizationModes" : [
         {
            "BlockSizeX" : 0,
            "BlockSizeY" : 0,
            "EnableFillBinaryVacancy" : 1,
            "ImagePreprocessingModesIndex" : -1,
            "Mode" : "BM_LOCAL_BLOCK",
            "ThreshValueCoefficient" : 10
         }
      ],
      "DeblurLevel" : 9,
      "Description" : "",
      "ExpectedBarcodesCount" : 0,
      "GrayscaleTransformationModes" : [
         {
            "Mode" : "GTM_ORIGINAL"
         }
      ],
      "ImagePreprocessingModes" : [
         {
            "Mode" : "IPM_GENERAL"
         }
      ],
      "IntermediateResultSavingMode" : {
         "Mode" : "IRSM_MEMORY"
      },
      "IntermediateResultTypes" : [ "IRT_NO_RESULT" ],
      "MaxAlgorithmThreadCount" : 4,
      "Name" : "runtimesettings",
      "PDFRasterDPI" : 300,
      "Pages" : "",
      "RegionDefinitionNameArray" : null,
      "RegionPredetectionModes" : [
         {
            "Mode" : "RPM_GENERAL"
         }
      ],
      "ResultCoordinateType" : "RCT_PIXEL",
      "ScaleDownThreshold" : 2300,
      "TerminatePhase" : "TP_BARCODE_RECOGNIZED",
      "TextFilterModes" : [
         {
            "MinImageDimension" : 65536,
            "Mode" : "TFM_GENERAL_CONTOUR",
            "Sensitivity" : 0
         }
      ],
      "TextResultOrderModes" : [
         {
            "Mode" : "TROM_CONFIDENCE"
         },
         {
            "Mode" : "TROM_POSITION"
         },
         {
            "Mode" : "TROM_FORMAT"
         }
      ],
      "TextureDetectionModes" : [
         {
            "Mode" : "TDM_GENERAL_WIDTH_CONCENTRATION",
            "Sensitivity" : 5
         }
      ],
      "Timeout" : 10000
   },
   "Version" : "3.0"
}
```

To initalize the settings using this JSON string, here is the following code snippet:
```
await DWObject.Addon.BarcodeReader.initRuntimeSettingsWithString(JSONString);
```
https://developer.dynamsoft.com/dwt/kb/2588