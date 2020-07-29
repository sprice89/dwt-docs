---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# Upgrade to latest version

Essentially, there are three steps required to update your application to use a newer version of Dynamic WebTWAIN. Two of the steps would be done by the application developer on the server -ide. The 3rd step would be done by users/ system administrators on the client side. The server side-steps are explained in detail below. For client-side upgrade steps, please see our[client side upgrade guide](./clientsideupgrade.html) 

1) Update the serverside "Resources" Folder ---------Done by application developer
2) Replace your old license key with the newer one.---------Done by application developer
3) Ensure client machines have uninstalled the old version of the service in preparation to install the newer version. ---Done by user/ system administrator. 

NOTES

1) If you are upgrading from a very old version (at least 2 major versions apart like from v12 to v15), more steps may be needed. Please contact Dynamsoft Support for more information.

# For the developer
There are two basic steps involved, updating the server side "Resources" folder, and replacing your old product key with the new one. Both steps are emphasized below.

# Step 1 Update Resources on the Server

a) Uninstall the trial/old version
Windows: Search Dynamic Web TWAIN in Control Panel -> Programs and Features, and remove all the relevant components there.

macOS: Execute Applications > Dynamsoft > Dynamic Web TWAIN SDK {Version Number} > Uninstall.pkg

b) Install the latest full version

The download link of the full version can be found in the purchasing email that was sent to the registered email/purchaser’s email. If you purchased the SDK but lost the download link of the full version, please log into the Dynamsoft Customer Portal and find the download link there under Download Center --> Download Products --> Full Version Download -->

c) Replace the whole Resources folder of Dynamic Web TWAIN in your application with the Resources folder of the full version (the resources folder will be generated after running the installer from the download link above). Typically, you can find it at the following path:

Windows: C:\Program Files (x86)\Dynamsoft\Dynamic Web TWAIN SDK {Version Number}

macOS: Applications > Dynamsoft > Dynamic Web TWAIN SDK {Version Number}

# Step 2 Update the License Key

In the file dynamsoft.webtwain.config.js, search for Dynamsoft.WebTwainEnv.ProductKey and input the product key(s) you received.

Dynamsoft.WebTwainEnv.ProductKey = 't0076lQAAAGNcO61He******;t0076lQAAAGNcO61He******';
NOTE

If you are using dynamsoft.webtwain.min.js, you should search for X.ProductKey instead.
If you are referencing the file from the cloud (like from Dynamsoft Website- NOT RECOMMENDED), then you need to update the license at runtime. For example:

function Dynamsoft_OnReady() {
    var DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
    DWObject.ProductKey = 't0076lQAAAGNcO61He******;t0076lQAAAGNcO61He******';
}


