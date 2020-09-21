---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# SERVER-SCRIPTING

* How to receive uploaded files
    - Mention multiple languages

* How to get extra info uploaded

* How to save to database
    - multiple languages and db combinations

https://developer.dynamsoft.com/dwt/kb/2071
https://developer.dynamsoft.com/dwt/kb/2898

https://developer.dynamsoft.com/dwt/kb/2641
https://developer.dynamsoft.com/dwt/kb/2148

https://developer.dynamsoft.com/dwt/kb/2830

https://developer.dynamsoft.com/dwt/kb/2758 (email an upload)

### License Checker for OCRPro

### Receive segmented upload

``` csharp
<%@ Page Language="C#" %>

<%@ Import Namespace="System.IO" %>
<%
    try
    {
        String filename = Request["filename"];
        String range = Request.Headers["Content-Range"];
        String md5 = Request.Headers["dwt-md5"];
        if (range != null)
        {
            string[] ary = range.Replace("bytes ", "").Replace("-", "/").Split('/');
            int start, end, size;
            start = Convert.ToInt32(ary[0]);
            end = Convert.ToInt32(ary[1]);
            size = Convert.ToInt32(ary[2]);
            String strImageName = "";
            HttpFileCollection files = HttpContext.Current.Request.Files;
            HttpPostedFile uploadfile = files["RemoteFile"];
                if (!Directory.Exists(Server.MapPath(".") + "\\Images"))
                    Directory.CreateDirectory(Server.MapPath(".") + "\\Images");
            if (filename == null || filename == "")
            {
                filename = uploadfile.FileName;
            }
            if (uploadfile != null)
            {
                if (!Directory.Exists(Server.MapPath(".") + "\\Images"))
                    Directory.CreateDirectory(Server.MapPath(".") + "\\Images");
                strImageName = Server.MapPath(".") + "\\Images\\" + filename;
                Stream ifs = uploadfile.InputStream;

                byte[] bytes = null;

                bytes = new byte[ifs.Length];
                ifs.Read(bytes, 0, (int)ifs.Length);
                FileStream fs;
                if (File.Exists(strImageName))
                {
                    fs = new FileStream(strImageName, FileMode.Open, FileAccess.Write, FileShare.ReadWrite);
                }
                else
                {
                    fs = new FileStream(strImageName, FileMode.Create, FileAccess.Write, FileShare.ReadWrite);
                }
                if (start > fs.Length)
                {
                    fs.Seek(0, SeekOrigin.End);

                    for (long i = 0; i < (fs.Length - start); i++)
                        fs.WriteByte(0);
                }
                fs.Seek(start, SeekOrigin.Begin);
                fs.Write(bytes, 0, bytes.Length);
                fs.Flush();
                fs.Close();
            }
        }
        else
        {
            HttpFileCollection files = HttpContext.Current.Request.Files;
            HttpPostedFile uploadfile = files["RemoteFile"];
            if (filename == null || filename == "")
            {
                filename = uploadfile.FileName;
            }
            uploadfile.SaveAs(Server.MapPath(".") + "\\Images\\" + filename);
        }
    } catch (Exception e)
    {
        Response.Write(e.Message);
    }
%>
```
