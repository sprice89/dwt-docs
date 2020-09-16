---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# BUILD THE HELLO WORLD PAGE

> Before you start, please make sure you’ve downloaded and installed the latest version of Dynamic Web TWAIN. If you haven’t done so, you can get the 30-day free trial [here](https://www.dynamsoft.com/Downloads/WebTWAIN_Download.aspx).

The following steps show you how to create your first web-based scanning application in a few minutes!

## Start a Web Application

Create an `helloworld.html` anywhere and copy the `Resources` folder to the same location. You can typically find this folder in `C:\Program Files (x86)\Dynamsoft\Dynamic Web TWAIN SDK {Version Number}\`
* Resources

    ![Build-the-Hello-World-Scan-Page-1]({{site.assets}}imgs/Build-the-Hello-World-Scan-Page-1.png)

* The project

    ![Build-the-Hello-World-Scan-Page-2]({{site.assets}}imgs/Build-the-Hello-World-Scan-Page-2.png)

## Include the library

Embed the script of the library and an element on the page.

``` html
<script src="Resources/dynamsoft.webtwain.initiate.js"></script>
<script src="Resources/dynamsoft.webtwain.config.js"></script>
```

``` html
<div id="dwtcontrolContainer"></div>
```

> "dwtcontrolContainer" is the default id for the div. You can change it in the file `dynamsoft.webtwain.config.js` if necessary.

## Write code to scan

Add a scan button and the miminum code.

``` html
<input type="button" value="Scan" onclick="AcquireImage();" />
<script type="text/javascript">
    var DWObject;

    function Dynamsoft_OnReady() {
        DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
    }

    function AcquireImage() {
        if (DWObject) {
            DWObject.SelectSource(function() {
                    DWObject.OpenSource();
                    DWObject.AcquireImage();
                },
                function() {
                    console.log("SelectSource failed!");
                });
        }
    }
</script>
```

## (from version 16.1) Make sure the code works on mobile devices too

Change the function `AcquireImage()` like this

``` javascript
function AcquireImage() {
    if (DWObject) {
        if (Dynamsoft.Lib.env.bMobile) {
            DWObject.Viewer.showVideo()
                .then(
                    function() {
                        console.log('success');
                    },
                    function(error) {
                        alert(error);
                    }
                )
        } else {
            DWObject.SelectSource(function() {
                    DWObject.OpenSource();
                    DWObject.AcquireImage();
                },
                function() {
                    console.log("SelectSource failed!");
                }
            );
        }
    }
}
```

## Review the complete code

``` html
<html>

<head>
    <title>Hello World</title>
    <script src="Resources/dynamsoft.webtwain.initiate.js"> </script>
    <script src="Resources/dynamsoft.webtwain.config.js"> </script>
</head>

<body>
    <input type="button" value="Scan" onclick="AcquireImage();" />
    <div id="dwtcontrolContainer"></div>
    <script type="text/javascript">
        var DWObject;

        function Dynamsoft_OnReady() {
            DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
        }

        function AcquireImage() {
            if (DWObject) {
                if (Dynamsoft.Lib.env.bMobile) {
                    DWObject.Viewer.showVideo()
                        .then(
                            function() {
                                console.log('success');
                            },
                            function(error) {
                                alert(error);
                            }
                        )
                } else {
                    DWObject.SelectSource(function() {
                            DWObject.OpenSource();
                            DWObject.AcquireImage();
                        },
                        function() {
                            console.log("SelectSource failed!");
                        }
                    );
                }
            }
        }
    </script>
</body>

</html>
```

## See the scan page in action

* Open the page in your browser

    ![Build-the-Hello-World-Scan-Page-3]({{site.assets}}imgs/Build-the-Hello-World-Scan-Page-3.png)

    > If you see a license notice, please make sure you have a valid trial license. Contact [Dynamsoft Support]({{site.about}}getsupport.html) if you need help.

* Press the button

    ![Build-the-Hello-World-Scan-Page-4]({{site.assets}}imgs/Build-the-Hello-World-Scan-Page-4.png)

    > Only TWAIN / ICA / SANE compliant devices are listed in the Select Source dialog. If your connected scanner doesn't show up in the list, please make sure the proper driver is installed. If you are using Windows and don’t have a real scanner at hand, you can install the [Virtual Scanner](https://download.dynamsoft.com/TWAIN/twainds.win32.installer.2.1.3.msi) – a scanner simulator which is developed by the [TWAIN Working Group](https://www.twain.org/) for testing purposes.

* After scan

    The scanned documents will show up on the page

    ![Build-the-Hello-World-Scan-Page-5]({{site.assets}}imgs/Build-the-Hello-World-Scan-Page-5.png)

## Try it out on your mobile phone

In step 4 above, we added code for mobile-compliance. However, in order to try it out, the scan page needs to be hosted in a site that runs `HTTPS` . The reason for this is that on mobile devices, the mobile camera is used for image capturing and only a secure site can make use of the camera. The following shows how it works when it's properly deployed (iPhone X).

> By default, the size of the viewer is 270 in width and 350 in height, so it'll appear to be too small. Check out [how to customize the viewer]({{site.indepth}}view.html#customize-the-viewer) for more information.

![Build-the-Hello-World-Scan-Page-6]({{site.assets}}imgs/Build-the-Hello-World-Scan-Page-6.png)

> Important: Not all mobile browsers allow the use of cameras. Check out [browsers on mobile devices]({{site.getstarted}}platform.html#browsers-on-mobile-devices) for more information. If you are using an unsupported browser (for example, Chrome on iOS), you may receive the error `The current browser has not implemented the MediaDevices interface` .

## Upload the document as a pdf via HTTP Post

In almost all our user cases, the scanned documents need to be uploaded to a server. So as the last step in creating the hello world application, the following shows how to implment the upload feature.

> On the server side, any script language can be used (ASP. NET, JSP, PHP, etc.). Here we are using ASP. NET (C#) as an example.

``` html
<!-- Add a button -->
<input type="button" value="Upload" onclick="UploadAsPDF();" />
```

Use the method [HTTPUpload]({{site.info}}api/WebTwain. IO.html#httpupload) to do the upload.

``` javascript
function UploadAsPDF() {
    var url = Dynamsoft.Lib.detect.ssl ? "https://" : "http://";
    url += location.hostname;
    var path = location.pathname.substring(0, location.pathname.lastIndexOf("/") + 1);
    url += location.port === "" ? path : ":" + location.port + path;
    url += "saveUploadedPDF.aspx";
    var indices = [];
    if (DWObject) {
        if (DWObject.HowManyImagesInBuffer === 0) {
            console.log("There is no image to upload!");
            return;
        }
        DWObject.SelectAllImages();
        indices = DWObject.SelectedImagesIndices;
        DWObject.HTTPUpload(
            url,
            indices,
            Dynamsoft.EnumDWT_ImageType.IT_PDF,
            Dynamsoft.EnumDWT_UploadDataFormat.Binary,
            "HelloWorld.pdf",
            function() {
                //The server response is empty!
                console.log("Successfully uploaded!")
            },
            function(errCode, errString, response) {
                console.log(errString);
            }
        );
    }
}
```

## Write the script to receive and save the uploaded file

> `RemoteFile` is the default field name for the uploaded file. So we use it to extract the file from the Post Request. This field name can be changed with the API [HttpFieldNameOfUploadedImage]({{site.info}}api/WebTwain. IO.html#httpfieldnameofuploadedimage).

Create a `saveUploadedPDF.aspx` file in the same location of `helloworld.html` and write the following script in it.

``` asp
<%@ Page Language="C#" %>
<%
    try
    {
        String strImageName;
        HttpFileCollection files = HttpContext.Current.Request.Files;
        HttpPostedFile uploadfile = files["RemoteFile"];
        strImageName = uploadfile.FileName;
        uploadfile.SaveAs(Server.MapPath(".") + "\\" + strImageName);
    }
    catch
    {
    }
%>
```

Now we can use the page to scan or acquire, then upload the images as a PDF document!

## Review the complete code

``` html
<html>

<head>
    <title>Hello World</title>
    <script src="Resources/dynamsoft.webtwain.initiate.js"> </script>
    <script src="Resources/dynamsoft.webtwain.config.js"> </script>
</head>

<body>
    <input type="button" value="Scan" onclick="AcquireImage();" /><input type="button" value="Upload" onclick="UploadAsPDF();" />
    <div id="dwtcontrolContainer"></div>
    <script type="text/javascript">
        var DWObject;

        function Dynamsoft_OnReady() {
            DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
        }

        function AcquireImage() {
            if (DWObject) {
                if (Dynamsoft.Lib.env.bMobile) {
                    DWObject.Viewer.showVideo()
                        .then(
                            function() {
                                console.log('success');
                            },
                            function(error) {
                                alert(error);
                            }
                        );
                } else {
                    DWObject.SelectSource(function() {
                            DWObject.OpenSource();
                            DWObject.AcquireImage();
                        },
                        function() {
                            console.log("SelectSource failed!");
                        }
                    );
                }
            }
        }

        function UploadAsPDF() {
            var url = Dynamsoft.Lib.detect.ssl ? "https://" : "http://";
            url += location.hostname;
            var path = location.pathname.substring(0, location.pathname.lastIndexOf("/") + 1);
            url += location.port === "" ? path : ":" + location.port + path;
            url += "saveUploadedPDF.aspx";
            var indices = [];
            if (DWObject) {
                if (DWObject.HowManyImagesInBuffer === 0) {
                    console.log("There is no image to upload!");
                    return;
                }
                DWObject.SelectAllImages();
                indices = DWObject.SelectedImagesIndices;
                DWObject.HTTPUpload(
                    url,
                    indices,
                    Dynamsoft.EnumDWT_ImageType.IT_PDF,
                    Dynamsoft.EnumDWT_UploadDataFormat.Binary,
                    "HelloWorld.pdf",
                    function() {
                        //The server response is empty!
                        console.log("Successfully uploaded!")
                    },
                    function(errCode, errString, response) {
                        console.log(errString);
                    }
                );
            }
        }
    </script>
</body>

</html>
```