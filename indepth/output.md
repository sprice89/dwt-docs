---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# OUTPUT

## A few different ways to output

 Dynamic WebTWAIN allows for you to output scanned images into a variety of formats to meet your development needs.<br><br>

- Print<br>
-You can print images loaded into DWT using either the [Print()](../info/api/WebTwain_IO.html#print) method, or using the pre-defined print button in the [image editor](../info/api/WebTwain_Edit.html#showimageeditor).<br><br>

- Convert to Base64<br>
-You can use the [ConvertToBase64() method ](../info/api/WebTwain_IO.html#converttobase64)<br><br>
- Convert to a BLOB<br> 
-You can use the [ConvertToBlob() method](../info/api/WebTwain_IO.html#ConvertToBlob)<br><br>
- Save locally
    - Show dialog to save<br>
        You can set the [IfShowFileDialog](../info/api/WebTwain_IO.html#ifshowfiledialog) property to true, which will show the open/save file dialog whenever you save an image within the DWT buffer<br>
    
    - Save to absolute path<br>
        -Dynamsoft offers several functions to save your images to an absolute file path. Depending on what your exact needs are, you can choose from any of the following functions:<br>
        - [SaveAllAsMultiPageTIFF()](../info/api/WebTwain_IO.html#saveallasmultipagetiff<br>
      
        - [SaveAllAsPDF()](../info/api/WebTwain_IO.html#saveallaspdf)<br>
        
        - [SaveAsBMP()](../info/api/WebTwain_IO.html#SaveAsBMP)<br>
        
        - [SaveAsJPEG()](../info/api/WebTwain_IO.html#SaveAsJPEG)<br>
         
        - [SaveAsPDF()](../info/api/WebTwain_IO.html#SaveAsPDF)<br>
        
        - [SaveAsPNG()](../info/api/WebTwain_IO.html#SaveAsPNG)	<br>
       
        - [SaveAsTIFF()](../info/api/WebTwain_IO.html#SaveAsTIFF)<br>
         
        - [SaveSelectedImagesAsMultiPagePDF()](../info/api/WebTwain_IO.html#SaveSelectedImagesAsMultiPagePDF)<br>
        
        - [SaveSelectedImagesAsMultiPageTIFF()](../info/api/WebTwain_IO.html#Saveselectedimagesasmultipagetiff)<br>
         
    - Open dialog to get a path, then save to that path without a dialog (multiple images) <br>
If you want to the user to choose a file path once and then save multiple images to that location, you can do so via the
OnGetFilePathDialog event.

It would look something like this:<br>
```javascript
//In your OnReady event, register OnGetFilePath
function Dynamsoft_OnReady() {
            DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer'); // Get the Dynamic Web TWAIN object that is embeded in the div with id 'dwtcontrolContainer'
            if (DWObject) {
			DWObject.RegisterEvent('OnGetFilePath',file_path_got);//the second parameter is a function that takes 5 arguments
                var count = DWObject.SourceCount;
                for (var i = 0; i < count; i++)
                    document.getElementById("source").options.add(new Option(DWObject.GetSourceNameItems(i), i));
            }
        }
//here is a simple sample function that will be called after the Save or Open file dialogs pop up and are closed.
//        
function file_path_got(bSave, count, index, path, name) {
    console.log(bSave, count, index, path, name);
    for(var i = 0; i < DWObject.HowManyImagesInBuffer; i++)
    DWObject.SaveAsJPEG(path +"\\"+ name+"-"i.toString(), i);
}

 ```   

https://developer.dynamsoft.com/dwt/kb/2140
https://developer.dynamsoft.com/dwt/kb/2532
- Upload to remote location via HTTP or FTP
    - HTTP
        - Set up the form
            - Set headers
To set an custom header to an HTTP POST request, you would use the SetHTTPHeader method.<br>

            - Set fields<br>
Dynamic Web TWAIN provides many methods for uploading images to the server through post. Sometimes you might want to send more information to the server together with the image data. In this case, you can use the method SetHTTPFormField which was added in version 5.0 of Dynamic Web TWAIN.<br>

To use this method, you should first clear all pre-defined form fields with the method ClearAllHTTPFormField. Also, please use SetHTTPFormField before you use any of the HTTPUploadThroughPost methods.<br>

Here is an example in JavaScript:<br>
```javascript
1 DWObject.ClearAllHTTPFormField();
2 DWObject.SetHTTPFormField("PDFFileName", "test.pdf");
3 //Get action page path
4 var CurrentPathName = unescape(location.pathname); 
5 var CurrentPath = CurrentPathName.substring(0, CurrentPathName.lastIndexOf("/") + 1);
6 var strActionPage = CurrentPath + "SaveToFile.aspx";
7 DWObject.HTTPUploadAllThroughPostAsMultiPageTIFF(
8 "www.dynamsoft.com",
9  strActionPage,
10 "test.tiff"
11 );
```

While uploading images, you may want to work with SSL. Dynamic WebTWAIN proivdes the [ifSSL](../info/api/WebTwain_IO.html#ifssl)
 property to assist with this.<br>
When set to true, this value will use HTTPS for uploading (as long as a secure port is also specified). For an example, look below:<br>
```javascript
1 function btnUpload_onclick()
2 {
3 if (window.location.protocol != "https:"){
4 DWObject.HTTPPort = 80;
5 DWObject.IfSSL = false; // if 80 is the port number of non-secure port
6 }
7 else{
8 DWObject.HTTPPort = 443;
9 DWObject.IfSSL = true; // if 443 is the port number of secure port
10 }
11 DWObject.HTTPUploadThroughPost("127.0.0.1", 0, "/SaveToFile.php", "imageData.jpg");
12 if (DWObject.ErrorCode != 0)
13 alert(DWObject.ErrorString);
14 else //succeded
15 alert("Successful");
16 }
```
   <br>
In the action page, you can access the uploaded fields with their names. For example, in C#, you can access it like this:
```c#
1 System.Web.HttpContext.Current.Request.Form["PDFFileName"];
        
```
<br>
- Set up the file filed name (HttpFieldNameOfUploadedImage)
<br>
    - FTP
    In addition to HTTP Post uploading, Dynamic WebTWAIN supports uploading via FTP.
Dynamic WebTWAIN supports the following methods for uploading via FTP:

[FTPUpload() ](../info/api/WebTwain_IO.html#FTPUpload)<br>
[FTPUploadEx()](../info/api/WebTwain_IO.html#FTPUploadEx)<br>
[FTPUploadAllAsPDF() ](../info/api/WebTwain_IO.html#FTPUploadAllAsPDF)<br>
[FTPUploadAsMultiPagePDF() ](../info/api/WebTwain_IO.html#FTPUploadAsMultiPagePDF)<br>
[FTPUploadAsMultiPageTIFF()](../info/api/WebTwain_IO.html#FTPUploadAsMultiPageTIFF)<br>
[FTPUploadAllAsMultiPageTIFF() ](../info/api/WebTwain_IO.html#FTPUploadAllAsMultiPageTIFF)

A simple example:
```javascript
DWObject.FTPUserName = 'test';
DWObject.FTPPort = 21;
DWObject.FTPPassword = 'test';
DWObject.FTPUploadAllAsPDF(
    '192.168.8.222',
    'test.pdf',
    OnFtpUploadSuccess,
    OnFtpUploadFailure
);
```

https://developer.dynamsoft.com/dwt/kb/2621
https://developer.dynamsoft.com/dwt/kb/2131
https://developer.dynamsoft.com/dwt/kb/2737
https://developer.dynamsoft.com/dwt/kb/2753
https://developer.dynamsoft.com/dwt/kb/2758
https://developer.dynamsoft.com/dwt/kb/2120
    - Use Uploader
    - Segmented upload
https://developer.dynamsoft.com/dwt/kb/2830
https://developer.dynamsoft.com/dwt/kb/2119
https://developer.dynamsoft.com/dwt/kb/2126
https://developer.dynamsoft.com/dwt/kb/2841
https://developer.dynamsoft.com/dwt/kb/develop-with-dynamic-web-twain/save-upload-load-images/dynamic-web-twain-failed-to-set-request-character-encoding-x-user-defined
https://developer.dynamsoft.com/dwt/kb/develop-with-dynamic-web-twain/save-upload-load-images/dynamic-web-twain-how-to-upload-multiple-files-at-a-time

## Related to output

- Add TIFF tags
- Set up PDF attributes
- Quality control
    - JPEGQuality
    - TIFF compression type
    - PDF compression type


https://developer.dynamsoft.com/dwt/kb/2026
https://developer.dynamsoft.com/dwt/kb/2170
https://developer.dynamsoft.com/dwt/kb/2123