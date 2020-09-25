---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# DYNAMSOFT SERVICE

## How to install DWT

- For development and test
  - Refer to [how to get dwt]({{site.about}}resources.html#how-to-get-dwt) to download and install the library.
- For production (installation on the client machines)
  - The library has built-in guidance for the installation
  
* How to install it (what if an older version exists --> must consider uninstalling)
    - Normal procedure (prompt and such)
    - Install by command
    - Personal installer
    - Mass installation
        - Group policy
        - Others?


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


* Customize the installer
    - Built into customer's bigger installer
    - White label options

* How it works
    - What does the service do?
    - Why are multiple services running?
    - Crash control?
    - what are these files and folders in the installation dir
* Customize the service
    - What do all the settings in the INI mean and how to set them
* Info about the service status page

https://127.0.0.1:18626/



https://developer.dynamsoft.com/dwt/kb/how-to-get-support/dynamic-web-twain-how-to-restart-dynamic-web-twain-service
https://www.dynamsoft.com/docs/dwt/KB/Deploy-Dist.html#aboutservices
https://www.dynamsoft.com/docs/dwt/KB/Deploy-Dist.html#aboutdistfiles
https://developer.dynamsoft.com/dwt/kb/installation-and-upgrade/dynamic-web-twain-module-is-not-installed

https://developer.dynamsoft.com/dwt/kb/2472

https://developer.dynamsoft.com/dwt/kb/2128
https://developer.dynamsoft.com/dwt/kb/installation-and-upgrade/why-am-i-prompted-to-install-the-dynamsoft-service
https://developer.dynamsoft.com/dwt/kb/2890
https://developer.dynamsoft.com/dwt/kb/2907
https://developer.dynamsoft.com/dwt/kb/2678

https://developer.dynamsoft.com/dwt/kb/2638
https://developer.dynamsoft.com/dwt/kb/2866
https://developer.dynamsoft.com/dwt/kb/2046
https://developer.dynamsoft.com/dwt/kb/distribution-deployment/dynamic-web-twain-installation-problem-temp-solution
https://developer.dynamsoft.com/dwt/kb/distribution-deployment/why-is-the-browser-prompting-me-to-install-the-scanning-service-repeatedly
https://developer.dynamsoft.com/dwt/kb/2894
https://developer.dynamsoft.com/dwt/kb/trouble-shooting-for-end-users/how-to-locate-the-pluginservices-on-client-machines
