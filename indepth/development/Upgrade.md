---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# Upgrade to latest version

Essentially, there are three steps required to update your application to use a newer version of Dynamic WebTWAIN. Two of the steps would be done by the application developer on the server -ide. The 3rd step would be done by users/ system administrators on the client side. The server side-steps are explained in detail below. For client-side upgrade steps, please see our [client side upgrade guide](./clientsideupgrade.html) 

1. Update the serverside "Resources" Folder ---------Done by application developer
2. Replace your old license key with the newer one.---------Done by application developer
3. Ensure client machines have uninstalled the old version of the service in preparation to install the newer version. ---Done by user/ system administrator. 

> NOTES
>
> If you are upgrading from a very old version (at least 2 major versions apart like from v12 to v15), more steps may be needed. Please contact Dynamsoft Support for more information.


## For the developer
There are two basic steps involved, updating the server side "Resources" folder, and replacing your old product key with the new one. Both steps are emphasized below.

### Step 1 Update Resources on the Server

a) Uninstall the trial/old version
Windows: Search Dynamic Web TWAIN in Control Panel -> Programs and Features, and remove all the relevant components there.

macOS: Execute Applications > Dynamsoft > Dynamic Web TWAIN SDK {Version Number} > Uninstall.pkg

b) Install the latest full version

The download link of the full version can be found in the purchasing email that was sent to the registered email/purchaser’s email. If you purchased the SDK but lost the download link of the full version, please log into the Dynamsoft Customer Portal and find the download link there under Download Center --> Download Products --> Full Version Download -->

c) Replace the whole Resources folder of Dynamic Web TWAIN in your application with the Resources folder of the full version (the resources folder will be generated after running the installer from the download link above). Typically, you can find it at the following path:

Windows: C:\Program Files (x86)\Dynamsoft\Dynamic Web TWAIN SDK {Version Number}

macOS: Applications > Dynamsoft > Dynamic Web TWAIN SDK {Version Number}

### Step 2 Update the License Key

In the file dynamsoft.webtwain.config.js, search for Dynamsoft.WebTwainEnv.ProductKey and input the product key(s) you received.

Dynamsoft.WebTwainEnv.ProductKey = 't0076lQAAAGNcO61He******;t0076lQAAAGNcO61He******';
NOTE

If you are using dynamsoft.webtwain.min.js, you should search for X.ProductKey instead.
If you are referencing the file from the cloud (like from Dynamsoft Website- NOT RECOMMENDED), then you need to update the license at runtime. For example:

function Dynamsoft_OnReady() {
    var DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
    DWObject.ProductKey = 't0076lQAAAGNcO61He******;t0076lQAAAGNcO61He******';
}


---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---
# How to upgrade Dynamic WebTWAIN on the Client Side

# For the end users
When accessing the new site for the first time, users will be prompted to download and install a new version of the Dynamsoft Service. They may need to uninstall the old version of the service first. Follow the instructions on the download prompt to complete the installation. Then the service will be connected or you can refresh your browser. 

# Uninstall Old Service on the Client Machines
On Windows
1) Remove Dynamsoft Service (Trial) through Control Panel, if you see anything named like "Dynamsoft " or "Dynamic Web TWAIN ", Then remove them as well.
2) Remove the folder C:\Windows\SysWOW64\Dynamsoft\DynamsoftService and C:\Windows\SysWOW64\Dynamsoft\DynamsoftServicex64 together with all files under it.

On macOS
3)Run the file Uninstall.pkg to uninstall it. The file can be found in Go > Applications > Dynamsoft > WebTwain > {installed version No.} >

On Linux
Run the file uninstall.sh to uninstall it. The file can be found in opt/dynamsoft/DynamsoftService

# Install the new service on the Client Machines
Dynamic Web TWAIN runs 100% on the client-side, every client machine needs to install its components (known as the Dynamsoft Service) in order to use the SDK.

When users first visit the web page which has Dynamic Web TWAIN implemented, the automatic initialization of the SDK which is built in its JavaScript library will try to establish connection with the Dynamsoft Service which is expected to be installed locally.

NOTE: the initialization happens after the DOMContentLoaded event fires.

Should the connection fail, it means the service is not installed and the following prompt will come up and ask the end user to download and install the service.

![service install](../assets/serviceinstall.png)

NOTE: the same prompt will appear no matter whether the client OS is Windows, macOS or Linux. But the file you download differs on different Systems. On Windows and macOS, the users can double click the downloaded installer to install the SDK. On Linux, however, the users will need to run either one of the following command to install it

Debian / Ubuntu

dpkg -i DynamsoftServiceSetup.deb
Fedora

rpm -ivh DynamsoftServiceSetup.rpm

Once the installation is done, you can click 'Reconnect to the service' or refresh the page to start using the SDK.

![service reconnect](../assets/servicereconnect.png)

---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# Upgrade to include mobile functionality
If you are upgrading to version 16 for mobile functionality, there are some considerations to be made. As mobile support is one of the newest offerings from Dynamsoft, not all of the old DWT features are fully available at present. That said, we are constantly working on increasing the mobile supported feature set, so we recommend reviewing our*[release notes](https://www.dynamsoft.com/Products/WebTWAIN_News.aspx)*, and if you have any doubts, contact dynamsoft support.

As an example for how some existing DWT features will work on mobile, see below: 

Scanning -> this will become capturing from mobile cameras
Loading -> this is also just loading or capturing
Edit -> similar to existing desktop browser functionality
upload -> similiar to existing desktop browser functionality
barcode reading, pdf rasterizing ->identical to current desktop browser functionality
save -> supported, but it may not work as well on mobile since there isn't an equivalent idea to a file system, especially on iOS.
ocr -> not supported on mobile yet