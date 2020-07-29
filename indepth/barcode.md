# Barcode Reader SDK Add-on

* Description on this addon and our main dbr sdk
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
runtimeSettings.barcodeFormatIds = Dynamsoft.EnumBarcodeFormat.BF_ONED;
await DWObject.Addon.BarcodeReader.updateRuntimeSettings(runtimeSettings);
```
## A case: how to use barcode reader for separating docs.


https://developer.dynamsoft.com/dwt/kb/2588