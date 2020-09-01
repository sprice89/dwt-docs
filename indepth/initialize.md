
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
Once the main JavaScript files are loaded in, the initialization process now moves to loading all the other JS files as well as the CSS files. All of these files are contained in the `src` subfolder of `Resources`.
FINISH THIS SECTION AFTER DETAILED INFO ON WHAT EACH SRC FILE IS
-----
##  Creating the WebTwain Instance
Once all the necessary files have been loaded in, it is time for the main part of the initialization process to take place, the creation of the WebTwain instance. Before we dive into the details of what this entails, let's take a look at the two modes in which the SDK can be used:

 1. **Service Mode** 
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
