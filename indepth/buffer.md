---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# BUFFER

DWT buffer means the collection of images and their status.

- Local cache set up (use it or not, memory limit, , benefit). max-count (allowed)
- Move, switch, remove
- Tagging
- Return information about the data
    - count, current, bitdepth, size, width, height, url, resolution, skew angle, index, image id, selection status
    - [Future] annotation data
- Blankness detection
    - Set threshold, max deviation
    - Read current deviation
    - Determine the blankness
- Status reporting
    - bitmap changed (reflecting image edit,index change,remove, etc.)
    - image selection
    - dragdrop down


https://developer.dynamsoft.com/dwt/kb/2586