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