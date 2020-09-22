---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# OUTPUT

Different ways to export data from the `DWT` buffer.

## Upload

The most common usage of `DWT` is to scan documents and upload them to the server via `HTTP` and `FTP` . The library has quite a few APIs to make this happen. Read on to learn more.

### HTTP with Built-in APIs

For HTTP uploading, Dynamsoft recommends the method [ `HTTPUpload()` ]({{site.info}}api/WebTwain_IO.html#httpupload). Check out the following code snippet

``` javascript
/**
 * Upload the images specified by their indices in the specified file type.
 * @param indices Specify the images
 * @param type Specify the file type
 */
function upload(indices, type) {
    var protocol = Dynamsoft.Lib.detect.ssl ? "https://" : "http://",
        port = window.location.port === "" ? 80 : window.location.port,
        actionPage = "/upload.aspx";
    // path to the server-side script
    var url = protocol + window.location.hostname + ":" + port + actionPage;
    var fileName = "SampleFile" + getExtension(type);
    if (DWObject) {
        DWObject.HTTPUpload(
            url,
            indices,
            type,
            Dynamsoft.EnumDWT_UploadDataFormat.Binary,
            fileName,
            function() {
                console.log('Success');
            },
            function(errCode, errString, responseStr) {
                console.log(errString);
            }
        );
    }
}
/**
 * Return the extention string of the specified image type.
 * @param type The image type (number).
 */
function getExtension(type) {
    switch (type) {
        case 0:
            return ".bmp";
        case 1:
            return ".jpg";
        case 2:
        case 8:
            return ".tif";
        case 3:
            return ".png";
        case 4:
        case 7:
            return ".pdf";
        default:
            return ".unknown";
    }
}
```

#### Questions

##### How is the upload done

`DWT` does the uploading in a few steps

* Grab the image(s) specified by `indices` ; 

* Encode the image(s) in the specified type which results in a binary file; 
* [Optional] Convert the file into a base64 string; 
* Create an HTTP Form and perform an asynchronous HTTP (Ajax) request to send the form to the specified `url` ; 
* Wait for the confirmation from the server.

The server-side script specified by `url` is very important, check out [Server-side Scripting]({{site.indepth}}development/serverScript.html) for more information.

##### Is SSL supported

Yes, as shown in the following line, you just need to make sure the correct protocol is used

``` javascript
var protocol = Dynamsoft.Lib.detect.ssl ? "https://" : "http://"
```

##### What file types are supported

As shown in the above function `getExtension()` , `DWT` supports `BMP` , `JPG` , `TIF` , `PNG` and `PDF` .

##### Can I upload multiple images as one file

Yes, the file types `TIF` and `PDF` support multi-page. Make sure you use these two types when trying to upload multiple images as one file.

##### Can I upload multiple images as separate files in one go

By design, the method `HTTPUpload()` only contains one file. But as it essentially sends an HTTP form to the server, you can attach multiple files in that form using the methods [ `ConvertToBlob()` ]({{site.info}}api/WebTwain_IO.html#converttoblob) and [ `SetHTTPFormField()` ]({{site.info}}api/WebTwain_IO.html#sethttpformfield).

Check out the following snippet on how it is done. NOTE that the method `HTTPUpload()` only has 3 parameters as it doesn't need to specify a file anymore.

``` javascript
/**
 * Upload the images specified by their indices in the specified file type as separate files.
 * @param indices Specify the images
 * @param type Specify the file type
 */
function uploadSeparateFiles(indices, type) {
    var protocol = Dynamsoft.Lib.detect.ssl ? "https://" : "http://",
        port = window.location.port === "" ? 80 : window.location.port,
        actionPage = "/upload.aspx";
    // path to the server-side script
    var url = protocol + window.location.hostname + ":" + port + actionPage;
    if (DWObject) {
        var done = 0,
            count = indices.length;
        var toBlob = function(index) {
            var fieldName = "SampleFile_" + index;
            var fileName = fieldName + getExtension(type);
            DWObject.ConvertToBlob(
                [index],
                type,
                function(result, _indices, type) {
                    DWObject.SetHTTPFormField(
                        fieldName,
                        result,
                        fileName
                    );
                    done++;
                    if (done === count) {
                        DWObject.HTTPUpload(
                            url,
                            function() {
                                console.log('Success');
                            },
                            function(errCode, errString, responseStr) {
                                console.log(errString);
                            }
                        );
                    } else {
                        toBlob(indices[done]);
                    }
                },
                function(errorCode, errorString) {
                    console.log(errorString);
                }
            );
        }
        toBlob(indices[done]);
    }
}
```

##### Can I upload the file as a base64 string

Yes, the 4th parameter of the method `HTTPUpload()` is `dataFormat` and it has two allowed values which are `Dynamsoft.EnumDWT_UploadDataFormat.Binary` and `Dynamsoft.EnumDWT_UploadDataFormat.Base64` . The code snippet uses the former but you can feel free to use the latter to upload the file as a base64 string.

##### How to specify the images to upload

Use the 2nd parameter `indices` to specify the images by their indices. Note that even if you upload just one file, you still needs to supply an array of it's index. For example: `[0]` .

##### Can I change the header of the HTTP form

Yes, you can use the method [ `SetHTTPHeader()` ]({{site.info}}api/WebTwain_IO.html#sethttpheader) to add or change the header(s). It's recommended that you don't change the default fields including but not limited to `Accept` , `Connection` , `Cookie` , etc.

##### Can I change the fields of the HTTP form

Yes, you can use the method [ `SetHTTPFormField()` ]({{site.info}}api/WebTwain_IO.html#sethttpformfield) to add extra fields to the field. In a [previous question](#can-i-upload-multiple-images-as-separate-files-in-one-go), the method is used to add files to the form. But you can also use the method to add extra text information to the form as shown below

``` javascript
// Clear old fields before adding new ones
DWObject.ClearAllHTTPFormField();
DWObject.SetHTTPFormField("FileType", "Insurance Doc");
```

##### Can I change the default field name of the file

Yes, you can use the API [ `HttpFieldNameOfUploadedImage` ]({{site.info}}api/WebTwain_IO.html#httpfieldnameofuploadedimage) to change the default field name "RemoteFile".

##### Can I show my own upgrade progress bar

Yes, please check out [customize the progress bar]({{site.indepth}}ui.html#progress-bar).

#### How do I know whether the upload succeeded

Every HTTP upload method has two callbacks with signatures like this

``` typescript
onEmptyResponse: () => void,
onServerReturnedSomething: (
    errorCode: number,
    errorString: string,
    response: string) => void
```

The 1st callback `onEmptyResponse` is triggered when the server returns nothing. Generally, if errors occurred on the server, the server would return some information to indicate what went wrong. Therefore, if nothing is returned, you can treat it as a successful upload.

Of course, in your own server-side script to accept and process the HTTP Post request, you know whether the upload is successful and can make it more obvious by returning some custom information to indicate that. In this case, the 2nd callback `onServerReturnedSomething` is triggered on purpose and you can read the argument `response` which contains what is returned by the server.

`DWT` also provides an API called [ `HTTPPostResponseString` ]({{site.info}}api/WebTwain_IO.html#httppostresponsestring) which contains `response` but can be read outside of the upload method.

##### Can I limit the size of the uploaded file

Yes, you can set the limit (in bytes) using the API [ `MaxUploadImageSize` ]({{site.info}}api/WebTwain_IO.html#maxuploadimagesize). After that, `DWT` will refuse to perform an upload should the size of the file exceeds the limit.

> NOTE: the API `MaxUploadImageSize` doesn't limit other fields of the upload. Therefore, if you append a very big string as a field or perhaps a few big Blobs as fiels, they can not be limited.

##### Can I upload a big file in segments

Yes, when the file to upload is huge, you can use the method [ `SetUploadSegment()` ]({{site.info}}api/WebTwain_IO.html#setuploadsegment) to configure a segmented upload operation

``` javascript
// For a file bigger than 1 MB, upload it in 500-KB segments 
DWObject.SetUploadSegment(1, 500);
```

For segmented upload, the server-side script is quite different. Check out how it is done in C# [here]({{site.indepth}}development/serverscript.html#segmented-upload).

##### What are all the APIs `DWT` provides for HTTP upload

Apart from the recommended `HTTPUpload()` method and those already mentioned above, `DWT` provides 8 more methods and a few other properties for making a HTTP upload. They are listed below

* [ `HTTPUploadThroughPutEx()` ]({{site.info}}api/WebTwain_IO.html#httpuploadthroughputex)
* [ `HTTPUploadThroughPost()` ]({{site.info}}api/WebTwain_IO.html#httpuploadthroughpost)
* [ `HTTPUploadThroughPostEx()` ]({{site.info}}api/WebTwain_IO.html#httpuploadthroughpostex)
* [ `HTTPUploadAllThroughPostAsMultiPageTIFF()` ]({{site.info}}api/WebTwain_IO.html#httpuploadallthroughpostasmultipagetiff)
* [ `HTTPUploadAllThroughPostAsPDF()` ]({{site.info}}api/WebTwain_IO.html#httpuploadallthroughpostaspdf)
* [ `HTTPUploadThroughPostAsMultiPagePDF()` ]({{site.info}}api/WebTwain_IO.html#httpuploadthroughpostasmultipagepdf)
* [ `HTTPUploadThroughPostAsMultiPageTIFF()` ]({{site.info}}api/WebTwain_IO.html#httpuploadthroughpostasmultipagetiff)
* [ `HTTPUploadThroughPostDirectly()` ]({{site.info}}api/WebTwain_IO.html#httpuploadthroughpostdirectly)
* [ `HTTPPassword` ]({{site.info}}api/WebTwain_IO.html#httppassword)
* [ `HTTPUserName` ]({{site.info}}api/WebTwain_IO.html#httpusername)
* [ `HTTPPort` ]({{site.info}}api/WebTwain_IO.html#httpport)
* [ `IfSSL` ]({{site.info}}api/WebTwain_IO.html#ifssl)

### HTTP with the File Uploader

The file uploader is an independent component that is dedicated to file uploading. It can be used seamlessly with `DWT` . 

#### How is upload done with the File Uploader

* `DWT` prepares the file to upload with the method [ `GenerateURLForUploadData()` ]({{site.info}}api/WebTwain_Util.html#generateurlforuploaddata); 
* Create a File Uploader instance with the method [ `Init()` ]({{site.info}}api/Dynamsoft_FileUploader.html#init); 
* Create an upload job with [ `Init()` ]({{site.info}}api/Dynamsoft_FileUploader.html#createjob); 
  + Define the target URL ( `ServerUrl` ); 
  + Define the upload content ( `SourceValue` ); 
  + [Optional] Define callback functions ( `OnUploadTransferPercentage` , `OnRunSuccess` , `OnRunFailure` ); 
* Run the job; 
* Wait for the confirmation from the server.

Check out [Server-side Scripting]({{site.indepth}}development/serverScript.html) for more information on the target URL.

``` html
<div id="processbar" style="width:0%;"></div>
```

``` javascript
// Create a File Uploader instance
Dynamsoft.FileUploader.Init('', function(obj) {
        dsUploadManager = obj;
    },
    function(errCode, errStr) {
        console.log(errStr);
    }
);

function useUploader(indices, type) {
    if (DWObject) {
        DWObject.GenerateURLForUploadData(indices, type, function(url, indices, iImageType) {
            // Create a Job
            var job = dsUploadManager.CreateJob();
            // Configure the Job
            job.ServerUrl = "https://YOUR-SITE:PORT/PATH/TO/SCRIPT.aspx";
            var fileName = "SampleFile" + getExtension(type);
            job.SourceValue.Add(url, fileName);
            job.OnUploadTransferPercentage = function(obj, percentage) {
                var processbar = document.getElementById("processbar");
                processbar.style.width = a + "%";
            };
            job.OnRunSuccess = function() {};
            job.OnRunFailure = function() {};
            // Run the Job
            dsUploadManager.Run(job);
        }, function() {});
    }
}
```

### HTTP with existing upload logic

In some cases, you might already have an upload logic in your application and just want to upload the data in the `DWT` buffer with the same logic. The following code assumes the existing logic is pure `AJAX` which expects the [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData)

``` javascript
function uploadThroughAJAX(indices, type) {
    DWObject.ConvertToBlob(
        indices,
        type,
        function(result, _indices, type) {
            var url = "https://YOUR-SITE:PORT/PATH/TO/SCRIPT.aspx";
            var fileName = "SampleFile" + getExtension(type);
            var formData = new FormData();
            formData.append('RemoteFile', result, fileName);
            makeRequest(url, formData, false);
        },
        function(errorCode, errorString) {
            console.log(errorString);
        }
    );
}

function makeRequest(url, formData, flg) {
    // Set up the request
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("MSXML2.XMLHTTP.3.0");
            } catch (ex) {
                alert(ex);
            }
        }
    }
    if (xhr) {
        if (flg) {
            // Open the connection
            xhr.open("GET", url, true);
            xhr.onreadystatechange = requestresult;
            xhr.setRequestHeader("If-Modified-Since", "0");
            xhr.send(null);
        } else {
            // Send the Data via POST
            xhr.open("POST", url, false);
            if (formData != null) {
                xhr.send(formData);
            } else {
                xhr.send(null);
            }
        }
    } else {
        alert("Sorry, but I couldn't create an XMLHttpRequest! ");
    }
}

function requestresult() {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            // File(s) uploaded
            var outMsg;
            if (xhr.responseXML && xhr.responseXML.documentElement) {
                outMsg = xhr.responseXML;
                alert(xhr.responseText);
            }
        }
    }
}
```

### FTP

FTP is a lot simpler than HTTP. A simple example:

``` javascript
DWObject.FTPUserName = 'test';
DWObject.FTPPort = 21;
DWObject.FTPPassword = 'test';
DWObject.FTPUpload(
    '192.168.8.222', //The FTP Host
    0, // The index of the image
    'test.pdf', // The path & name of the file 
    OnFtpUploadSuccess, // Callback in case of success
    OnFtpUploadFailure // Callback in case of failure
);
```

`DWT` provides quite a few APIs for FTP upload too

* [ `FTPUpload()` ]({{site.info}}api/WebTwain_IO.html#ftpupload)
* [ `FTPUploadEx()` ]({{site.info}}api/WebTwain_IO.html#ftpuploadex)
* [ `FTPUploadAllAsMultiPageTIFF()` ]({{site.info}}api/WebTwain_IO.html#ftpuploadallasmultipagetiff)
* [ `FTPUploadAllAsPDF()` ]({{site.info}}api/WebTwain_IO.html#ftpuploadallaspdf)
* [ `FTPUploadAsMultiPagePDF()` ]({{site.info}}api/WebTwain_IO.html#ftpuploadasmultipagepdf)
* [ `FTPUploadAsMultiPageTIFF()` ]({{site.info}}api/WebTwain_IO.html#ftpuploadasmultipagetiff)
* [ `FTPPassword` ]({{site.info}}api/WebTwain_IO.html#ftppassword)
* [ `FTPPort` ]({{site.info}}api/WebTwain_IO.html#ftpport)
* [ `FTPUserName` ]({{site.info}}api/WebTwain_IO.html#ftpusername)
* [ `IfPASVMode` ]({{site.info}}api/WebTwain_IO.html#ifpasvmode)

## Save

Dynamsoft offers several methods to save your images to an absolute file path. Depending on what your exact needs are, you can choose from any of the following methods:

* [ `SaveAsBMP()` ]({{site.info}}api/WebTwain_IO.html#SaveAsBMP)
* [ `SaveAsJPEG()` ]({{site.info}}api/WebTwain_IO.html#SaveAsJPEG)
* [ `SaveAsPDF()` ]({{site.info}}api/WebTwain_IO.html#SaveAsPDF)
* [ `SaveAsPNG()` ]({{site.info}}api/WebTwain_IO.html#SaveAsPNG)	
* [ `SaveAsTIFF()` ]({{site.info}}api/WebTwain_IO.html#SaveAsTIFF)
* [ `SaveSelectedImagesAsMultiPagePDF()` ]({{site.info}}api/WebTwain_IO.html#SaveSelectedImagesAsMultiPagePDF)
* [ `SaveSelectedImagesAsMultiPageTIFF()` ]({{site.info}}api/WebTwain_IO.html#Saveselectedimagesasmultipagetiff)
* [ `SaveAllAsPDF()` ]({{site.info}}api/WebTwain_IO.html#saveallaspdf)
* [ `SaveAllAsMultiPageTIFF()` ]({{site.info}}api/WebTwain_IO.html#saveallasmultipagetiff)

### Show dialog to save

> Supported on [desktop]({{site.getstarted}}platform.html#browsers-on-desktop-devices).

You can set the [ `IfShowFileDialog` ]({{site.info}}api/WebTwain_IO.html#ifshowfiledialog) property to `true` , which will show the open/save file dialog whenever you save an image(s) within the `DWT` buffer

``` javascript
DWObject.IfShowFileDialog = true;
// The path is selected in the dialog, therefore we only need the file name
DWObject.SaveAllAsPDF("Sample.pdf",
    function() {
        console.log('Successful!');
    },
    function(errCode, errString) {
        console.log(errString);
    }
);
```

### Save to an absolute path

> Supported on [desktop]({{site.getstarted}}platform.html#browsers-on-desktop-devices).

If you don't want to show any dialog and you know for sure where you want the files saved, you can save with absolute paths while setting [ `IfShowFileDialog` ]({{site.info}}api/WebTwain_IO.html#ifshowfiledialog) to `false` .

> When using an absolute path, you must make sure the current user has the proper permission to save to that path. Otherwise it'll fail.

``` javascript
DWObject.IfShowFileDialog = false;
DWObject.SaveAllAsPDF("D:\\Sample.pdf",
    function() {
        console.log('Successful!');
    },
    function(errCode, errString) {
        console.log(errString);
    }
);
```

### Save as a download

> Supported on [WASM browsers]({{site.getstarted}}platform.html#wasm-browsers).

On [WASM browsers]({{site.getstarted}}platform.html#wasm-browsers), `DWT` runs its entire operations within the browser. So saving locally becomses downloading and [ `IfShowFileDialog` ]({{site.info}}api/WebTwain_IO.html#ifshowfiledialog) is not effective.

``` javascript
// The following line only works on desktop but it 
// doesn't throw errors on WASM browsers either 
DWObject.IfShowFileDialog = false;
// The following line specifies an absolute path but 
// only the name 'Sample.pdf' is used on WASM browsers
DWObject.SaveAllAsPDF("D:\\Sample.pdf",
    function() {
        console.log('Successful!');
    },
    function(errCode, errString) {
        console.log(errString);
    }
);
```

### Save multiple files to the same loation

If you want to the user to choose a file path once and then save multiple images to that location, you can do so via the [ `OnGetFilePath` ]({{site.info}}api/WebTwain_IO.html#ongetfilepath) event.

``` javascript
DWObject.RegisterEvent("OnGetFilePath", (isSave, filesCount, index, directory, _fn) => {
    if (directory === "" && _fn === "") {
        console.log("User cancelled the operation.")
    } else {
        var path = directory + "\\" + _fn.substr(0, _fn.lastIndexOf("."));
        DWObject.IfShowFileDialog = false;
        for (var i = 1; i < DWObject.HowManyImagesInBuffer; i++) {
            DWObject.SaveAsJPEG(path + "-" + i.toString() + ".jpg", i,
                function() {
                    console.log('Successful!');
                },
                function(errCode, errString) {
                    console.log(errString);
                }
            );
        }
    }
});
DWObject.IfShowFileDialog = true;
DWObject.SaveAsJPEG("Sample.jpg", 0,
    function() {
        console.log('Successful!');
    },
    function(errCode, errString) {
        console.log(errString);
    }
);
```

## Convert 

In some cases, you want to process the data yourself and want to extract it from the `DWT` buffer. `DWT` offers two approaches.

### Convert to a Blob

To do this, use the method [ `ConvertToBlob()` ]({{site.info}}api/WebTwain_IO.html#ConvertToBlob) which has been mentioned several times above. The following is a simple example

``` javascript
DWObject.ConvertToBlob(
    [0, 1, 2],
    Dynamsoft.EnumDWT_ImageType.IT_PDF,
    function(result, indices, type) {
        console.log(result.size);
    },
    function(errorCode, errorString) {
        console.log(errorString);
    }
);
```

### Convert to Base64

To do this, use the method [ `ConvertToBase64()` ]({{site.info}}api/WebTwain_IO.html#converttobase64)

``` javascript
DWObject.ConvertToBase64(
    [0, 1, 2],
    Dynamsoft.EnumDWT_ImageType.IT_PDF,
    function(result, indices, type) {
        console.log(result.getData(0, result.getLength()));
    },
    function(errorCode, errorString) {
        console.log(errorString);
    }
);
```

## Print

`DWT` supports printing with the method [ `Print()` ]({{site.info}}api/WebTwain_IO.html#print).

## Other Questions

### How to reduce the size of a resulting file

There are a few things that you can try to reduce the size of a resulting file

* Scan in grayscale or black & white instead of RGB; 
* Convert the images to grayscale or black & white before the output, read more [here](#how-to-convert); 
* Scan in a lower resolution; 
* Convert the images to a lower resolution, read more [here](#how-to-set-dpi); 
* [Optional] If the resulting file is in the JPEG format (.jpg) or is a TIF or PDF that is encoded by the JPEG standard, you can set [ `JPEGQuality` ]({{site.info}}api/WebTwain_IO.html#jpegquality) to a lower value.

### How can I customize a resulting TIFF file

* Change its compression type with [ `TIFFCompressionType` ]({{site.info}}api/WebTwain_IO.html#tiffcompressiontype); 
* Specify whether it is multi-page or single-page with [ `IfTiffMultiPage` ]({{site.info}}api/WebTwain_IO.html#iftiffmultipage); 
* Set TIFF tags with [ `ClearTiffCustomTag()` ]({{site.info}}api/WebTwain_IO.html#cleartiffcustomtag) and [ `SetTiffCustomTag()` ]({{site.info}}api/WebTwain_IO.html#settiffcustomtag); 

### Can I hide the progress bar

Yes, check out [hide the progress bar]({{site.indepth}}ui.html#progress-bar) for more information.
