---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# WebTwain.Addon.BarcodeReader

**Methods**

* [decode()](#decode)
* [getRuntimeSettings()](#getruntimesettings)
* [updateRuntimeSettings()](#updateruntimesettings)
* [resetRuntimeSettings()](#resetruntimesettings)
* [initRuntimeSettingsWithString()](#initruntimesettingswithstring)

---

## decode

**Syntax**

``` typescript
/**
 * Read an image in the buffer and try to locate and decode barcode(s) on it.
 * @param index Specify the image to decode.
 */
decode(index: number): Promise < ITextResults > ;

interface TextResults {
    [index: number]: TextResult;
    description ? : string;
    exception ? : number;
    imageid ? : number;
}
interface TextResult {
    /**
     * Barcode result content in a byte array.
     */
    barcodeBytes: number[];
    /**
     * The barcode format.
     */
    barcodeFormat: Dynamsoft.EnumBarcodeFormat | number;
    /**
     * Extra barcde formats.
     */
    barcodeFormat_2: Dynamsoft.EnumBarcodeFormat_2 | number;
    /**
     * Barcode formats as a string.
     */
    barcodeFormatString: string;
    /**
     * Extra barcode formats as a string.
     */
    barcodeFormatString_2: string;
    /**
     * The barcode result text.
     */
    barcodeText: string;
    /**
     * Detailed result information.
     */
    detailedResult: any | null;
    /**
     * The corresponding localization result.
     */
    localizationResult: LocalizationResult;
    /**
     * Other information
     */
    results: Result[];
}
interface LocalizationResult {
    /**
     * The angle of a barcode. Values range from 0 to 360.
     */
    angle: number;
    /**
     * The X coordinate of the left-most point.
     */
    x1: number;
    /**
     * The X coordinate of the second point in a clockwise direction.
     */
    x2: number;
    /**
     * The X coordinate of the third point in a clockwise direction.
     */
    x3: number;
    /**
     * The X coordinate of the fourth point in a clockwise direction.
     */
    x4: number;
    /**
     * The Y coordinate of the left-most point.
     */
    y1: number;
    /**
     * The Y coordinate of the second point in a clockwise direction.
     */
    y2: number;
    /**
     * The Y coordinate of the third point in a clockwise direction.
     */
    y3: number;
    /**
     * The Y coordinate of the fourth point in a clockwise direction.
     */
    y4: number;
    moduleSize: number;
    pageNumber: number;
    regionName: number;
    resultCoordinateType: number;
    terminatePhase: number;
}
interface Result {
    accompanyingTextBytes: number[];
    clarity: number;
    confidence: number;
    deformation: number;
    resultType: number;
}
```

---

## getRuntimeSettings

**Syntax**

``` typescript
/**
 * Get the current runtime settings.
 */
getRuntimeSettings(): Promise < RuntimeSettings > ;

interface RuntimeSettings {
    barcodeFormatIds: number;
    barcodeFormatIds_2: number;
    binarizationModes: number[];
    deblurLevel: number;
    expectedBarcodesCount: number;
    furtherModes: FurtherModes;
    intermediateResultSavingMode: number;
    intermediateResultTypes: number;
    localizationModes: number[];
    maxAlgorithmThreadCount: number;
    minBarcodeTextLength: number;
    minResultConfidence: number;
    pdfRasterDPI: number;
    pdfReadingMode: number;
    region: Region;
    resultCoordinateType: number;
    returnBarcodeZoneClarity: number;
    scaleDownThreshold: number;
    scaleUpModes: number[];
    terminatePhase: number;
    textResultOrderModes: number[];
    timeout: number;
}
interface FurtherModes {
    accompanyingTextRecognitionModes: number[];
    barcodeColourModes: number[];
    barcodeComplementModes: number[];
    colourClusteringModes: number[];
    colourConversionModes: number[];
    deformationResistingModes: number[];
    dpmCodeReadingModes: number[];
    grayscaleTransformationModes: number[];
    imagePreprocessingModes: number[];
    regionPredetectionModes: number[];
    textAssistedCorrectionMode: number;
    textFilterModes: number[];
    textureDetectionModes: number[];
}
interface Region {
    regionBottom: number;
    regionLeft: number;
    regionMeasuredByPercentage: number;
    regionRight: number;
    regionTop: number;
}
```

---

## updateRuntimeSettings

**Syntax**

``` typescript
/**
 * Update the runtime settings with a given object or use the string "speed", "balance", or "coverage" to use our preset settings. The default setting is "coverage".
 * @param settings Specify the runtime settings.
 */
updateRuntimeSettings(settings: RuntimeSettings): Promise < RuntimeSettings > ;
```

**Example**

``` javascript
DWObject.Addon.BarcodeReader.getRuntimeSettings('balance').then(function(settings) {
    settings.barcodeFormatIds = Dynamsoft.EnumBarcodeFormat.BF_ONED;
    return DWObject.Addon.BarcodeReader.updateRuntimeSettings(settings);
).then(function() {
    DWObject.Addon.BarcodeReader.decode(0).then(function(textResult) {
            console.log(textResult[0].barcodeText);
        },
        function(ex) {
            console.log(ex.message || ex);
        });
    });
});
```

---

## resetRuntimeSettings

**Syntax**

``` typescript
/**
 * Reset all runtime settings to default values.
 */
resetRuntimeSettings(): Promise < RuntimeSettings > ;
```

---

## initRuntimeSettingsWithString

**Syntax**

``` typescript
/**
 * Set up the barcode reader with advanced settings.
 * @param settings The runtime setting in the form of a string.
 */
initRuntimeSettingsWithString(
    settings: string
): Promise < RuntimeSettings > ;
```
