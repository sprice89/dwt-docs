---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# SERVER SIDE SCRIPTING

`DWT` is a 100% client-side library. However, it does need to interact with the server when doing operations like **Upgrade**, **Download**, **Server-side OCR**, etc. While the scripts are scattered in the documentation, we'll try to cover some important ones in this article.

## How to process uploaded files

As mentioned in [how to upload]({{site.indepth}}output.html#upload), `DWT` sends an HTTP POST request to the server when doing an upload. The file in the POST Form has the name `RemoteFile` by default. If you wish to change that, you can use [ `HttpFieldNameOfUploadedImage` ]({{site.info}}api/WebTwain_IO.html#httpfieldnameofuploadedimage). 

The following assumes the default `RemoteFile` is used and that [extra Form fields]({{site.indepth}}output.html#can-i-change-the-fields-of-the-http-form)) might accompany the file.

### Upload via CSharp

#### Regular upload

``` csharp
string strImageName, strImageSize;
HttpFileCollection files = HttpContext.Current.Request.Files;
/**
 * Writes the file to the disk
 */
HttpPostedFile uploadfile = files["RemoteFile"];
strImageName = uploadfile.FileName;
string strImageSavePath = Server.MapPath(".") + "\\Dynamsoft_Upload\\";
if (!System.IO.Directory.Exists(strImageSavePath))
{
    System.IO.Directory.CreateDirectory(strImageSavePath);
}
String strInputFile = strImageSavePath + strImageName;
uploadfile.SaveAs(strInputFile);
/**
 * The following writes the fields to a file
 */
string path = strInputFile.Substring(0, strInputFile.Length - 4) + "_1.txt";
int fieldsCount = HttpContext.Current.Request.Form.Count;
if(fieldsCount > 0){
    if (!System.IO.File.Exists(path))
    {
        using (System.IO.FileStream fs = new System.IO.FileStream(path, System.IO.FileMode.Create, System.IO.FileAccess.Write))
        {
            using (System.IO.StreamWriter sw = new System.IO.StreamWriter(fs, Encoding.UTF8))
            {
                for (int i = 0; i < fieldsCount; i++)
                {
                    // Create a file to write to.
                    sw.WriteLine(HttpContext.Current.Request.Form.Keys[i] + " :  " + HttpContext.Current.Request.Form[HttpContext.Current.Request.Form.Keys[i]] + Environment.NewLine);
                }
            }
        }
    }
}
```

#### Segmented upload

``` csharp
String filename = Request["filename"];
String range = Request.Headers["Content-Range"];
String md5 = Request.Headers["dwt-md5"];
if (range != null)
{
    /**
     * The header "Content-Range" signals that it's segmented
     * The following stitches the segments together.
     */
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
        filename = uploadfile.FileName;
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
    // Compatible with regular uploads
    HttpFileCollection files = HttpContext.Current.Request.Files;
    HttpPostedFile uploadfile = files["RemoteFile"];
    if (filename == null || filename == "")
    {
        filename = uploadfile.FileName;
    }
    uploadfile.SaveAs(Server.MapPath(".") + "\\Images\\" + filename);
}
```

#### Save to MS SQL

``` csharp
//Connect to SQL
String serverName = "YOUR-SERVER-NAME";
String userName = "test";
String password = "Aa000000";
String dbName = "dwtsample";
String tableName = "uploadedimages";
System.Data.SqlClient.SqlConnection tmpConn = new System.Data.SqlClient.SqlConnection("Data Source = " + serverName + ";User ID = " + userName + ";Pwd = " + password + ";");
String sqlCreateDBQuery = string.Format("SELECT database_id FROM sys.databases WHERE Name = '{0}'", dbName);
using (tmpConn)
{
    using (System.Data.SqlClient.SqlCommand sqlCmd = new System.Data.SqlClient.SqlCommand(sqlCreateDBQuery, tmpConn))
    {
        tmpConn.Open();
        object resultObj = sqlCmd.ExecuteScalar();
        int databaseID = 0;
        if (resultObj != null)
        {
            int.TryParse(resultObj.ToString(), out databaseID);
        }
        // Database doesn't exist, create one
        if (databaseID == 0)
        {
            String sql_newdb = "CREATE DATABASE " + dbName;
            using (System.Data.SqlClient.SqlCommand sqlcmd_newdb = new System.Data.SqlClient.SqlCommand(sql_newdb, tmpConn))
            {
                sqlcmd_newdb.ExecuteScalar();
            }
        }
    }
    tmpConn.Close();
}
System.Data.SqlClient.SqlConnection Connection = new System.Data.SqlClient.SqlConnection("Data Source = " + serverName + ";User ID = " + userName + ";Pwd = " + password + ";Initial Catalog =" + dbName + ";");
using (Connection)
{
    Connection.Open();
    String sql_checkTable = @"IF EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME='" + tableName + "') SELECT 1 ELSE SELECT 0";
    using (System.Data.SqlClient.SqlCommand sqlcmd_checkTable = new System.Data.SqlClient.SqlCommand(sql_checkTable, Connection))
    {
        object result_obj = sqlcmd_checkTable.ExecuteScalar();
        int table_exists = 0;
        if (result_obj != null)
        {
            int.TryParse(result_obj.ToString(), out table_exists);
        }
        // Table doesn't exist, create one
        if (table_exists == 0)
        {
            String sql_newTable = @"CREATE TABLE " + tableName + " (id int NOT NULL IDENTITY (1, 1), document_name varchar(255) NOT NULL, document_data image NOT NULL) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]";
            using (System.Data.SqlClient.SqlCommand sqlcmd_newTable = new System.Data.SqlClient.SqlCommand(sql_newTable, Connection))
            {
                sqlcmd_newTable.ExecuteScalar();
            }
        }
    }
    /**
     * Convert the uploaded file to a byte array
     */
    int iFileLength;
    HttpFileCollection files = HttpContext.Current.Request.Files;
    HttpPostedFile uploadfile = files["RemoteFile"];
    String strImageName = uploadfile.FileName;
    iFileLength = uploadfile.ContentLength;
    Byte[] inputBuffer = new Byte[iFileLength];
    System.IO.Stream inputStream;
    inputStream = uploadfile.InputStream;
    inputStream.Read(inputBuffer, 0, iFileLength);
    inputStream.Close();
    /**
     * Save the byte array to the database
     */
    String sql_insertData = "INSERT INTO " + tableName + " (document_name, document_data) VALUES (@document_name, @document_data)";
    using (System.Data.SqlClient.SqlCommand sqlcmd_insertData = new System.Data.SqlClient.SqlCommand(sql_insertData, Connection))
    {
        sqlcmd_insertData.Parameters.Add("@document_data", System.Data.SqlDbType.Binary, iFileLength).Value = inputBuffer;
        sqlcmd_insertData.Parameters.Add("@document_name", System.Data.SqlDbType.VarChar, 255).Value = strImageName;
        sqlcmd_insertData.ExecuteScalar();
    }
    Connection.Close();
}
```

### Upload via PHP

#### Upload and save to the disk

``` php
$fileTempName = $_FILES['RemoteFile']['tmp_name'];
$fileSize = $_FILES['RemoteFile']['size'];
$fileName = "Dynamsoft_Upload\\" . $_FILES['RemoteFile']['name'];
$fileName = iconv("UTF-8", "gb2312", $fileName);
$count = count($_POST);
if ($count > 0) {
    $_fieldsTXT = fopen(substr($fileName, 0, strlen($fileName) - 4) . "_1.txt", "w");
    $_fields = "";
    foreach ($_POST as $key => $value) {
        $_fields = "FieldsTrue:";
        fwrite($_fieldsTXT, $key . " :  " . $value . PHP_EOL);
    }
}

if (file_exists($fileName)) {
    $fWriteHandle = fopen($fileName, 'w');
} else {
    $fWriteHandle = fopen($fileName, 'w');
}

$fReadHandle = fopen($fileTempName, 'rb');
$fileContent = fread($fReadHandle, $fileSize);
fwrite($fWriteHandle, $fileContent);
fclose($fWriteHandle);
```

#### Save to MySQL

``` php
// Interacting with MySQL
$servername = "127.0.0.1";
$username = "root";
$password = "awesome";
$dbname = "dwtsample";
$tablename = "uploadedimages";
// Create connection
$conn = new mysqli($servername, $username, $password);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    // Check Database Existance
    $db_selected = mysqli_select_db($conn, $dbname);
    if(!$db_selected) {
        // Create database
        $sql_newDB = "CREATE DATABASE ".$dbname;
        if ($conn->query($sql_newDB) === TRUE) {
            // echo "Database created successfully";
        } else {
            die("Error creating database: " . $conn->error);
        }			
    }
    mysqli_select_db($conn, $dbname);
    // Check Table Existance
    $sql_showtable = "SHOW TABLES LIKE '".$tablename."'";
    $rowcount = mysqli_num_rows($conn->query($sql_showtable));
    if ($rowcount > 0) {
        // echo "the table exists";
    } else {
        // sql to create table
        $sql_newtable = "CREATE TABLE ".$tablename." (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
        document_name VARCHAR(30) NOT NULL,
        document_data longblob NOT NULL,
        reg_date TIMESTAMP
        )";
        if ($conn->query($sql_newtable) === TRUE) {
        // echo "Table ".$tablename." created successfully";
        } else {
            die("Error creating table: " . $conn->error);
        }
    }
    $fileTempName = $_FILES['RemoteFile']['tmp_name'];	
    $fileSize = $_FILES['RemoteFile']['size'];
    $fileName = $_FILES['RemoteFile']['name'];
    $fReadHandle = fopen($fileTempName, 'rb');
    $fileContent = fread($fReadHandle, $fileSize);
    fclose($fReadHandle);
    $sql_insertdata = "INSERT INTO ".$tablename." (document_name,document_data) VALUES ('".$fileName."','".addslashes($fileContent)."')";
    if ($conn->query($sql_insertdata) === TRUE) {
        // echo "File saved in db successfully.";
    } else {
        die("Error saving file: " . $conn->error);
    }
    $conn->close();
}
```

### Upload via JSP

#### Use JSP packages to save the uploaded file

The following packages are required

``` jsp
<%@  page language="java" import="java.io.*,java.util.*,org.apache.commons.fileupload.*,org.apache.commons.fileupload.disk.*,org.apache.commons.fileupload.servlet.*"%>
```

The code to save file to the disk

``` java
// Create a factory for disk-based file items
DiskFileItemFactory factory = new DiskFileItemFactory();
// Configure a repository (to ensure a secure temp location is used)
ServletContext servletContext = this.getServletConfig().getServletContext();
File repository = (File) servletContext.getAttribute("javax.servlet.context.tempdir");
// Set factory constraints
factory.setRepository(repository);
// Sets the threshold beyond which files are written to disk
factory.setSizeThreshold(1000000000);
// Create a new file upload handler
ServletFileUpload upload = new ServletFileUpload(factory);
// Set overall request size constraint
upload.setSizeMax(-1);
// Parse the request
List<FileItem> items = upload.parseRequest(request);
// Process the uploaded items
Iterator<FileItem> iter = items.iterator();
String _fields = "";
String fileName = "";
long sizeInBytes = 0;
String _temp_Name = application.getRealPath("/Dynamsoft_Upload");
File _fieldsTXT = new File(_temp_Name);
if(!_fieldsTXT.exists())
{
    boolean result = _fieldsTXT.createNewFile();
    System.out.println("File create result:"+result);
}
Writer objWriter = new BufferedWriter(new FileWriter(_fieldsTXT));
while (iter.hasNext()) {
    FileItem item = iter.next();
    // Process a regular form field
    if (item.isFormField()) {
        _fields = "FieldsTrue:";			
        String fieldName = item.getFieldName();
        String value = item.getString();			
        try {
            //File appending
            objWriter.write(fieldName + " :  " + value);
            objWriter.write(System.getProperty( "line.separator" ));
        } 
        catch (Exception e) {
            e.printStackTrace();
        }			
    } 
    // Process a file upload
    else {
        if(_fields.equals("FieldsTrue:")){
            objWriter.flush();
            objWriter.close();	
        }
        else{
            objWriter.flush();
            objWriter.close();
            _fieldsTXT.delete();
        }
        String fieldName = item.getFieldName();
        fileName = item.getName();
        String contentType = item.getContentType();
        boolean isInMemory = item.isInMemory();
        sizeInBytes = item.getSize();
        if(fileName!=null && sizeInBytes!=0){
            String _temp_Name2 = application.getRealPath("/Dynamsoft_Upload/" + fileName);
            File uploadedFile = new File(_temp_Name2);
            if(!uploadedFile.exists())
            {
                boolean result = uploadedFile.createNewFile();
                System.out.println("File create result:"+result);
            }			
            try {
                item.write(uploadedFile);
            } 
            catch (Exception e) {
                e.printStackTrace();
            }
            if(_fieldsTXT.exists())
            {
                String _temp_Name3 = application.getRealPath("/action/Dynamsoft_Upload/" + fileName.substring(0,fileName.length()-4) + "_1.txt");
                _fieldsTXT.renameTo(new File(_temp_Name3));
            }
        }
    }
}
```

#### Save to Oracle

The following packages are required

``` jsp
<%@  page language="java" import="java.sql.*,java.io.*,java.util.*,org.apache.commons.fileupload.*,org.apache.commons.fileupload.disk.*,org.apache.commons.fileupload.servlet.*"%>
```

The code to save file to Oracle

``` java
// Prepare credentials for connectiong to Oracle, here we use Oracle express (XE)
String strDBUser = "dwtDB"; //database,schema name as well
String strDBPassword = "Aa000000";
String strDriverName = "oracle.jdbc.driver.OracleDriver";
String strConnString = "jdbc:oracle:thin:@127.0.0.1:1521:XE";
Connection conn=null;
// Test Database Connection
try
{
    Class.forName(strDriverName).newInstance();
    conn = DriverManager.getConnection(strConnString, strDBUser, strDBPassword);
    conn.setAutoCommit(true);
}
catch(Exception e)
{
    out.println("An exception occurred: " + e.getMessage());
}
String fileName = "";
long sizeInBytes = 0;
// Create a factory for disk-based file items
DiskFileItemFactory factory = new DiskFileItemFactory();
// Configure a repository (to ensure a secure temp location is used)
ServletContext servletContext = this.getServletConfig().getServletContext();
File repository = (File) servletContext.getAttribute("javax.servlet.context.tempdir");
// Set factory constraints
factory.setRepository(repository);
// Sets the size threshold beyond which files are written directly to disk.
factory.setSizeThreshold(1000000000);
// Create a new file upload handler
ServletFileUpload upload = new ServletFileUpload(factory);
// Set overall request size constraint
upload.setSizeMax(-1);
// Parse the request
List<FileItem> items = upload.parseRequest(request);
// Process the uploaded items
Iterator<FileItem> iter = items.iterator();
while (iter.hasNext()) {
    try{
        FileItem item = iter.next();				
        // Process a regular form field
        if (item.isFormField()) {} 			
        // Process a file upload
        else {
            fileName = item.getName();
            sizeInBytes = item.getSize();
            if(fileName != null && sizeInBytes != 0){
                /**
                 * Get the input stream (the file)
                 */ 
                InputStream stream_Input = item.getInputStream();
                byte[] buff = new byte[8000];
                int bytesRead = 0;
                ByteArrayOutputStream stream_BAO = new ByteArrayOutputStream();
                while((bytesRead = stream_Input.read(buff)) != -1) {
                    stream_BAO.write(buff, 0, bytesRead);
                }
                byte[] data = stream_BAO.toByteArray();
                ByteArrayInputStream stream_BAI = new ByteArrayInputStream(data);
                stream_Input.close();
                /**
                 * Save the stream into Oracle
                 */ 
                PreparedStatement preparedStatement = conn.prepareStatement("insert into dwtsample(id, document_name, document_data) values(s_tblImage.NextVal, ?, ?)");
                preparedStatement.setString(1, fileName);
                preparedStatement.setBinaryStream(2, stream_BAI, stream_BAI.available());
                preparedStatement.executeUpdate();
                preparedStatement.close();
                conn.close();
            }
        }
    }
    catch(Exception e) 
    { 	
    }
}
```

### Upload via CodeFusion

``` html
<cfset uploadFolderPath=GetDirectoryFromPath(GetCurrentTemplatePath()) />
<cfset newFolder=uploadFolderPath & "\Dynamsoft_Upload\" />
<cffile action="upload" filefield="RemoteFile" destination="#newFolder#" nameconflict="OVERWRITE" />
```

### Upload to Node Express Server

``` javascript
var formidable = require('formidable');
var util = require('util');
var express = require('express');
var fs = require('fs');
var app = express();
app.use(express.static(__dirname));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.post('/upload', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        fs.readFile(files.RemoteFile.path, function(err, data) {
            // save file from temp dir to new dir
            var newPath = __dirname + "/uploaded/" + files.RemoteFile.name;
            fs.writeFile(newPath, data, function(err) {
                if (err) throw err;
                console.log('file saved');
                res.end();
            });
        });
    });
})
var server = app.listen(2020, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening at http://%s:%s', host, port);
})
```

### Upload via MVC Controller

``` csharp
[HttpPost]
public Boolean Upload()
{
    HttpFileCollectionBase files = HttpContext.Request.Files;
    HttpPostedFileBase uploadfile = files.Get("RemoteFile");
    var uploads = Path.Combine(HostingEnvironment.ApplicationPhysicalPath,"UploadedImages");
    if (!Directory.Exists(uploads))
    {
        Directory.CreateDirectory(uploads);
    }
    Boolean fileUploaded = false;
    for (var i = 0; i < files.Count; i++)
    {
        var file = files[i];
        if (file.ContentLength > 0)
        {
            var filePath = Path.Combine(uploads, file.FileName);
            file.SaveAs(filePath);
            fileUploaded = true;
        }
    }
    return fileUploaded;
}
```

### Upload to Azure

``` csharp
DateTime utc = DateTime.Now.ToUniversalTime();
// (1) Prepare your data
String accountName = "dynamsoft";
String accountKey = "";
String baseUrl = "http://dynamsoft.blob.core.windows.net/dwt/";
String resourceName = Request["imageName"];
String path = "/dwt";
DateTime utc_start = utc.AddSeconds(-10); // 10 seconds before
String start = utc_start.GetDateTimeFormats('s')[0].ToString() + ".0000000Z";
DateTime utc_expires = utc.AddSeconds(1200);// 20 miniteus later
String expires = utc_expires.GetDateTimeFormats('s')[0].ToString() + ".0000000Z";
// (2) generate signature
String strToSign1 = "w";
String strToSign2 = start;
String strToSign3 = expires;
String strToSign4 = "/" + accountName + path;
String strToSign5 = "";
String strSign = String.Format("{0}\n{1}\n{2}\n{3}\n{4}", strToSign1, strToSign2, strToSign3, strToSign4, strToSign5);
// decoding
byte[] tobedecodedbytes = System.Convert.FromBase64String(accountKey);
System.Security.Cryptography.HMACSHA256 hmac = new System.Security.Cryptography.HMACSHA256(tobedecodedbytes);
hmac.Initialize();
byte[] buffer = Encoding.UTF8.GetBytes(strSign);
byte[] arrMAC = hmac.ComputeHash(buffer);
String strSig = System.Convert.ToBase64String(arrMAC);
// (3) generate SAS the query 
start = Server.UrlEncode(start);
expires = Server.UrlEncode(expires);
strSig = Server.UrlEncode(strSig);
String strParams = String.Format("sp=w&st={0}&se={1}&sr=c&sig={2}", start, expires, strSig);
String url = baseUrl + resourceName + "?" + strParams;
Response.Write(url);
```

### Resend the uploaded file by email

The following code uses ASP. NET (CSharp)

* Configure the server (Gmail as an example)

``` xml
‹system.net›
‹mailSettings›
    ‹smtp from="***@gmail.com"›
        ‹network host="smtp.gmail.com" port="25" userName="***@gmail.com" password="***" enableSsl="true"/›
    ‹/smtp›
‹/mailSettings›
‹/system.net›
```

* Make use of the `System.Net.Mail` namespace 

``` csharp
using System.Net.Mail;
```

* Add code to email the file as an attachment

``` csharp
HttpFileCollection files = HttpContext.Current.Request.Files;
HttpPostedFile uploadfile = files["RemoteFile"];
SmtpClient client = new SmtpClient();
MailAddress from = new MailAddress("***@gmail.com", " Test", System.Text.Encoding.UTF8);
MailAddress to = new MailAddress("***@gmail.com");
MailMessage message = new MailMessage(from, to);
message.Body = "This is a test email sent by ASP.NET";
message.BodyEncoding = System.Text.Encoding.UTF8;
message.Subject = "Just Testing";
message.SubjectEncoding = System.Text.Encoding.UTF8;
// Create the file attachment
Attachment data = new Attachment(uploadfile.InputStream, uploadfile.FileName);
message.Attachments.Add(data);
client.Send(message);
data.Dispose();
```

## Download a file

The following scripts are used for [downloading from a URL which points to a server-side script]({{site.indepth}}input.html#the-url-points-to-a-server-side-script)

### Download via CSharp

#### Get a file on the disk

``` csharp
String fileName = "sample.tif";
String filePath = Server.MapPath(".") + "\\files\\" + fileName;
System.IO.FileInfo fileInfo = new System.IO.FileInfo(filePath);
Response.ClearContent();
Response.ClearHeaders();
Response.Clear();
Response.Buffer = true;
String fileNameEncode;
fileNameEncode = HttpUtility.UrlEncode(fileName, System.Text.Encoding.UTF8);
fileNameEncode = fileNameEncode.Replace("+", "%20");
String appendedheader = "attachment;filename=" + fileNameEncode;
Response.AppendHeader("Content-Disposition", appendedheader);
Response.WriteFile(fileInfo.FullName);
```

#### Get a file from MS SQL

Check out [Save to MS SQL](#save-to-ms-sql) for code on making the connection to the SQL.

``` csharp
// ...Code to connect to MS SQL
// `strImageID` specify the file to download
String sql_getData = "SELECT * FROM " + tableName + " WHERE id = " + strImageID;
using (System.Data.SqlClient.SqlCommand sqlcmd_getData = new System.Data.SqlClient.SqlCommand(sql_getData, Connection))
{
    System.Data.SqlClient.SqlDataReader sdrRecordset = sqlcmd_getData.ExecuteReader();
    sdrRecordset.Read();
    String imgName = sdrRecordset["document_name"].ToString();
    String imgNameExtension = imgName.Substring(imgName.LastIndexOf("."));
    // Reads the file data as byte array
    byte[] byFileData = (byte[])sdrRecordset["document_data"];
    sdrRecordset.Close();
    Connection.Close();
    sdrRecordset = null;
    Response.Clear();
    Response.Buffer = true;
    switch(imgNameExtension)
    {
        // Sets the correct content type
        case "bmp": Response.ContentType = "image/bmp"; break;
        case "jpg": Response.ContentType = "image/jpg"; break;
        case "tif": Response.ContentType = "image/tiff"; break;
        case "png": Response.ContentType = "image/png"; break;
        case "pdf": Response.ContentType = "application/pdf"; break;
        default: break;
    }
    try
    {
        // Write the file back
        String fileNameEncode;
        fileNameEncode = HttpUtility.UrlEncode(imgName, System.Text.Encoding.UTF8);
        fileNameEncode = fileNameEncode.Replace("+", "%20");
        String appendedheader = "attachment;filename=" + fileNameEncode;
        Response.AppendHeader("Content-Disposition", appendedheader);
        Response.OutputStream.Write(byFileData, 0, byFileData.Length);
    }
    catch (Exception exc)
    {}
    Response.Flush();
    Response.Close();
}
```

### Download via PHP

#### Get a file out of MySQL

Check out [Save to MySQL](#save-to-mysql) for code on making the connection to MySQL.

``` php
// ...Code to connect to MySQL
// `$strImageID` specify the file to download
$sql_getData = "SELECT * FROM ".$tablename." WHERE id = ".$strImageID;
$result = $conn->query($sql_getData);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $documentName = $row["document_name"];
        $strImageExtName = substr($documentName, strlen($documentName) - 3);
        $documentData = $row["document_data"];
    }
}
$conn->close();
//Begin writing headers
header("Content-Description: File Transfer");
$header="Content-Disposition: attachment; filename=".$documentName.";";
header($header);
header("Content-Transfer-Encoding: binary");
// Sets the correct content type
if($strImageExtName == "bmp"){
    header('Content-Type: image/bmp');
}else if($strImageExtName == "jpg"){
    header('Content-Type: image/jpg');
}else if($strImageExtName == "tif"){
    header('Content-Type: image/tiff');
}else if($strImageExtName == "png"){
    header('Content-Type: image/png');
}else if($strImageExtName == "pdf"){
    header('Content-Type: application/pdf');
}
// Write the file back
echo $documentData;
```

### Download via JSP

#### Get a file out of Oracle

Check out [Save to Oracle](#save-to-oracle) for code on making the connection to MySQL.

``` java
// ...Code to connect to Oracle
// `strImageID` specify the file to download
Statement sql_getData = conn.createStatement(); 
ResultSet res_getData = sql_getData.executeQuery("select * from dwtsample where id =" + strImageID);

String documentName = "";
String strImageExtName = "";
String strImg="";

if (res_getData.next()){
    documentName = res_getData.getString("document_name");
    strImageExtName = documentName.substring(documentName.lastIndexOf(".") + 1);	
    Blob blob = res_getData.getBlob("document_data");
    InputStream steam_Input = blob.getBinaryStream();
    if (steam_Input != null) {
        // Gets the file as a byte array
        BufferedInputStream stream_BufferInput = new BufferedInputStream(steam_Input);
        byte[] byte_buf = new byte[(int)blob.length()];
        stream_BufferInput.read(byte_buf);
        stream_BufferInput.close();
        conn.close();

        response.setHeader("Content-disposition", "attachment; filename=\"" + documentName + "\"");
        response.setHeader("Content-Length", String.valueOf(byte_buf.length));
        // Sets the correct content type
        if(strImageExtName == "bmp"){
            response.setContentType("image/bmp");
        }else if(strImageExtName == "jpg"){
            response.setContentType("image/jpg");
        }else if(strImageExtName == "tif"){
            response.setContentType("image/tiff");
        }else if(strImageExtName == "png"){
            response.setContentType("image/png");
        }else if(strImageExtName == "pdf"){
            response.setContentType("application/pdf");
        }
        // Write the file back
        OutputStream stream_Output = response.getOutputStream();
        stream_Output.write(byte_buf, 0, byte_buf.length);
        stream_Output.flush();
        stream_Output.close();
    }
    else {
        out.println("<script language='javascript'>");
        out.println("alert('No image found!');");
        out.println("</script>");
    }
}
```

## Other Scripts

### License Checker for OCRPro

When performing a [client-side OCR operation]({{site.indepth}}ocr.html#use-ocrb-on-the-client-side) with `OCRPro`, the engine sends HTTP POST requests to the server for license tracking. The following code snippet shows how the requests are redirected to the class `LicenseCheckerServer`.

> The class `LicenseCheckerServer` is defined in the files `CheckLicense.dll` and `LicenseReader.dll`. If you don't have these files in your application, you can contact [Dynamsoft Support]({{site.about}}getsupport.html) or download them from [here](https://tst.dynamsoft.com/public/download/ocr/OCRProx64-v16.zip).

``` csharp
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.Drawing;
using CheckLicense;

namespace Dynamsoft
{
    public partial class LicenseChecker : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (this.Request.Form["DTW_AjaxMethod"] != null)
            {
                String strMethod = this.Request.Form["DTW_AjaxMethod"];
                if (strMethod == "CheckLicense")
                {
                    Response.Write(LicenseCheckerServer.CheckLicense(this.Request.Form["Productkey"], HttpContext.Current.Server.MapPath("OCRPro.lic")));
                }
                else if (strMethod == "WriteOCRCount")
                {
                    Response.Write(LicenseCheckerServer.WriteOCRCount(this.Request.Form["OCRCount"], HttpContext.Current.Server.MapPath("OCRPro.lic")));
                }
            }
            else
            {
                Response.Write(LicenseCheckerServer.GetErrorString());
            }
        }
    }
}
```