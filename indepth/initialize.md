---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# INITIALIZE

- Explain the init process of DWT
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
