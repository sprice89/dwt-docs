---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# OUTPUT

## A few different ways to output

 Dynamic WebTWAIN allows for you to output scanned images into a variety of formats to meet your development needs.<br>

- Print <br>

You can print images loaded into DWT using either the [DWObject.Print()](../info/api/WebTwain_IO.html#print) method, or using the pre-defined print button in the [image editor](../info/api/WebTwain_Edit.html#showimageeditor).

- Convert to Base64<br>
You can use the [ConvertToBase64() method ](../info/api/WebTwain_IO.html#converttobase64)
- Convert to a BLOB<br> 
You can use the [ConvertToBlob() method](../info/api/WebTwain_IO.html#ConvertToBlob)
- Save locally
    - Show dialog to save<br>
        You can set the [IfShowFileDialog](../info/api/WebTwain_IO.html#ifshowfiledialog) property to true, which will show the open/save file dialog whenever you save an image within the DWT buffer
    
    - Save to absolute path<br>
        -Dynamsoft offers several functions to save your images to an absolute file path. Depending on what your exact needs are, you can choose from any of the following functions:<br>
        - SaveAllAsMultiPageTIFF()<br>
      
        - SaveAllAsPDF()	<br>
        
        - SaveAsBMP()<br>
        
        - SaveAsJPEG()	<br>
         
        - SaveAsPDF()<br>
        
        - SaveAsPNG()	<br>
       
        - SaveAsTIFF()<br>
         
        - SaveSelectedImagesAsMultiPagePDF()<br>
        
        - SaveSelectedImagesAsMultiPageTIFF()<br>
         

    - Open dialog to get a path, then save to that path without a dialog (multiple images) <br>

    
https://developer.dynamsoft.com/dwt/kb/2122
https://developer.dynamsoft.com/dwt/kb/2140
https://developer.dynamsoft.com/dwt/kb/2532
- Upload to remote location
    - HTTP
        - Set up the form
            - Set headers
To set an custom header to an HTTP POST request, you would use the SetHTTPHeader method.

            - Set fields
Dynamic Web TWAIN provides many methods for uploading images to the server through post. Sometimes you might want to send more information to the server together with the image data. In this case, you can use the method SetHTTPFormField which was added in version 5.0 of Dynamic Web TWAIN.

To use this method, you should first clear all pre-defined form fields with the method ClearAllHTTPFormField. Also, please use SetHTTPFormField before you use any of the HTTPUpload***ThroughPost*** methods.

Here is an example in JavaScript:
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
 property to assist with this.
When set to true, this value will use HTTPS for uploading (as long as a secure port is also specified). For an example, look below:
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


   
   


   
   
   
   
   
      
   
      


In the action page, you can access the uploaded fields with their names. For example, in C#, you can access it like this:
```c#
1 System.Web.HttpContext.Current.Request.Form["PDFFileName"];
        - Set up the file filed name (HttpFieldNameOfUploadedImage)
```
    - FTP
    In addition to HTTP Post uploading, Dynamic WebTWAIN supports uploading via FTP.
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