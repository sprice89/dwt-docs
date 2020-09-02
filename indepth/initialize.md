
# INITIALIZATION
Initializing Dynamic Web TWAIN takes a few simple steps, as you have seen in the "Getting Started" guide. The following guide will dive deeper into how Dynamic Web TWAIN environment is intialized once the page is loaded.
## Loading the Core JS Files
Inside the `Resources` directory that is included with the SDK installation, you will find the following three files:
```
dynamsoft.webtwain.config.js
dynamsoft.webtwain.initiate.js
dynamsoft.webtwain.install.js
```
These three files are the main JavaScript files that define the configuration and operation of Dynamic Web TWAIN. Loading in these files is the first step of the process, so let's break down each file's purpose:

`dynamsoft.webtwain.initiate.js`
This file is the **core** of the Dynamic Web TWAIN JavaScript Library. You're not supposed to change it without consulting the Dynamsoft Support Team. 

`dynamsoft.webtwain.config.js`
This file is used to make basic configuration of Dynamic Web TWAIN. Here is where you configure the product key, change the initial viewer size, and more.

`dynamsoft.webtwain.install.js`
This file is used to configure the dialogs which show up when the Dynamsoft Service or any of the Dynamic Web TWAIN modules is not installed or needs to be upgraded. This file is automatically loaded in  `dynamsoft.webtwain.initiate.js`, and therefore does not need to be referenced in a Hello World HTML page.

## Loading the supporting files
Once the main JavaScript files are loaded in, the initialization process now moves to loading all the other JS files as well as the CSS files. All of these files are contained in the `src` subfolder of `Resources`. Not all of these files will be used, as that will depend on the mode in which the SDK is being used. Let's give a general breakdown of the files:
```
dynamsoft.viewer.js
dynamsoft.viewer.css
dynamsoft.webtwain.css
```
The three above files are used to build the viewer component of Dynamic Web TWAIN, as well as define the css of the other components of the SDK.
```
dynamsoft.imagecore-1.5.9.wasm
dynamsoft.imageio.js
dynamsoft.imageio_wasm-1.6.1.js
dynamsoft.pdfReader-1.4.10.wasm
dynamsoft.pdfWriter-1.4.1.wasm
```
The above files are called upon when the SDK is used in WASM mode instead of Service mode. All of the above files are used to define the image viewer operations (including image/PDF input/output). However, no matter the mode that is used, these files will be downloaded regardless of whether they are utilized or not.

More details on the two mode can be found in the "Creating the WebTwain instance" section, so please keep reading.

## Loading Add-on JS files
The last part of the loading phase in initialization is the loading of the JS files requires to make any of Web TWAIN add-on components work. Web TWAIN offers a number of add-ons, including a barcode reader, a PDF rasterizer, and OCR.

Without diving too much into what each add-on does, let's list all of the files, which you will find located in the `addon` folder in the `Resources` directory.

##  Creating the WebTwain Instance
Once all the necessary files have been loaded in, it is time for the main part of the initialization process to take place, the creation of the WebTwain instance. Before we dive into the details of what this entails, let's take a look at the two modes in which the SDK can be used:

**Service Mode** 

The Dynamsoft Service is a quiet, background service that handles the communication between the connected scanner's driver and the browser client.  
When using Web TWAIN on a Windows, Mac, or Linux machine, the user by default goes with service mode (recommended) which requires the installation of the Dynamsoft Service.  
Once the user accesses the web page, they will be prompted to install the service. The prompt will display the download link, and once the installer (.msi) is downloaded, the installation process will take just a few seconds.  
  
The Dynamsoft Service uses the localhost connection to communicate with the browser client. The service uses ports **18622, 18625, 18623, and 18626** for connection. The latter two ports are used when there is an SSL encryption, and the earlier two when otherwise. These ports can be configured in the DSConfiguration.ini file of the service, located in:
`C:\Windows\SysWOW64\Dynamsoft\DynamsoftService(DynamsoftServicex64)\DSConfiguration.ini` (on Windows)

Once a connection is established, the SDK will be fully operating in Service Mode. 

By default, there are always three Dynamsoft Service processes running. All of them are called `Dynamsoft Service` and use the same file `DynamsoftService.exe`. However they start under different arguments.

The main process starts without any argument as follows:
`"C:\Windows\SysWOW64\Dynamsoft\DynamsoftServicex64\DynamsoftService.exe"`

Then there is a monitor process which is meant to monitor the main process and automatically start it in case it crashes
`'C:\Windows\SysWOW64\Dynamsoft\DynamsoftServicex64\DynamsoftService.exe -asmonitor Global\Dynamsoft_1.5.0_352325843_stop_service_event Global\Dynamsoft_1.5.0_352325828_certcheck_event'`

The last always-running process is meant to support the SSL certificate for Firefox
`'"-scan" "\\.\pipe\dynamsoftscan_15.0_70056_60" "0" "Global\ss352604281_61_70056" "0" "C:\Windows\SysWOW64\Dynamsoft\DynamsoftServicex64\dwt_trial_15.0.0.0625.dll"'`

Service mode *needs* to be used if you wish to use a connected physical scanner. It is this Dynamsoft Service that handles all communication between the browser client and the scanner driver. As mentioned previously, Service mode is the default if the user is on a Windows, macOS, or Linux machine.

**WASM Mode**


 3. Explain the init process of DWT
    - Load the main JS files
    - Establish basic work environment
    - Load supporting JS/CSS files
    - [optional] Load add-on JS files
    - Create WebTwain instances
        - Service Mode
            - Show prompt to install service
            - Establish connection to the service
        - WASM Mode
            - Load supporting JS/WASM files
        - Different ways to create a WebTwain instance
            - Load() based on `Containers`
                - Explain the Container and how to change it
                - Dynamsoft_OnReady
            - CreateDWTObject & CreateDWTObjectEx
                - Callback functions
https://developer.dynamsoft.com/dwt/kb/develop-with-dynamic-web-twain/how-to-initialize-web-twain-object-manually
