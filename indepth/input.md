---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# INPUT

## Different ways to get data into dwt buffer

- Scan
    - Local scanner (plugged in the same machine)
    - Remote scanner (plugged in a centralized machine)
        - Use our remote-scan feature (mobile compliant)
        - Use a 3rd party tool (TSScan?)
    - Configure the scan
        - Basic settings (resolution, pixeltype, duplex, etc.)
        - TWAIN only: Capability negotiation
            - Use latest APIs get/setCapabilities
- Capture (camera)
    - directshow
    - h5 MediaDevices
- Load local files
    - Show dialog
    - Absolute path
    - Drag & drop
    - (mobile) Load from image storage 
    - (android) Load from local directory?
- Download from a remote server
    - HTTP
        - File
        - Stream
    - FTP

## How to achieve automation

- Event-driving workflow
- Next-gen API like `startScan`