---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# UPGRADE

Dynamsoft tries to improve `DWT` constantly and release one major version and 2 to 4 minor versions each year. The recommendation for our customers is to always keep your application up-to-date with our latest release. In this section, we'll talk about how to upgrade your application.

Essentially, there are three steps required to upgrade your application to use a newer version of `DWT` . Two of the steps would be done by the **application developer** on the server-side. The 3rd step would be done by **users** or **system administrators** on the client side.

1. Update the server-side resources for `DWT` ; 
2. Replace your old license key with the newer one;
3. Ensure client machines have uninstalled the old version of the service in preparation to install the newer version;

> If you are upgrading from a very old version (over 2 major versions apart like from v12 to v15), more steps may be needed. Please contact [Dynamsoft Support]({{site.about}}getsupport.html) for more information.

## Update the resources files

Read more about [resources files]({{site.about}}faqs.html#what-are-the-resources-files).

### Regular Web application

#### Uninstall the old version

* **Windows**: Search `Dynamic Web TWAIN` in `Control Panel -> Programs and Features` , and remove all the relevant components there.

* **macOS**: Execute `Applications > Dynamsoft > Dynamic Web TWAIN SDK {Version Number} > Uninstall.pkg`

#### Install the new version

Generally, you can [get the installer]({{site.about}}resources.html#how-to-get-dwt) to install the new verion.

#### Replace the resources files

If you haven't renamed the official folder, the resources files should reside in a folder named "Resources". In this step, copy the new resources files and replace the old ones. The new files are typically found in the following location after the installation

* **Windows**: `C:\Program Files (x86)\Dynamsoft\Dynamic Web TWAIN SDK {Version Number}\`
* **macOS**: `Applications > Dynamsoft > Dynamic Web TWAIN SDK {Version Number}`

### Applications that make use of the `dwt` package

If your application uses a framework or library like `Angular` , `React` , `Vue` , etc., the upgrade is easier as you just need to install the new version to replace the old one. For example

``` cmd
npm install dwt
```

or 

``` cmd
yarn add dwt
```

You may want to update the types definition as well

``` cmd
npm install @types/dwt
```

or 

``` cmd
yarn add @types/dwt
```

## Update the License Key

When you upgrade across major versions, the license is different and needs to be updated. The license of `DWT` is set using the global API `Dynamsoft.WebTwainEnv.ProductKey` and the change is only effective before [creating `WebTwain` instances]({{site.indepth}}initialize.html#creating-the-webtwain-instance). 

Normally, you can just make the change in the file `dynamsoft.webtwain.config.js` .

``` javascript
// If you have multiple license keys, just separate them with semicolons.
Dynamsoft.WebTwainEnv.ProductKey = 't0076lQAAAGNcO61He******; t0076lQAAAGNcO61He******';
```

If you set it elsewhere, you just find it and replace it.

## Update `DWT` on the client-side

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> >

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
