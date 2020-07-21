<script src="https://www.dynamsoft.com/assets/js/jquery.dynamsoft.header.js?showSearch=false&host=www.dynamsoft.com"></script>
# API List

## Global

[Dynamsoft.WebTwainEnv](Dynamsoft.WebTwainEnv.md) 

[Dynamsoft.Enum](Dynamsoft.Enum.md) 

## WebTwain

### Buffer

| Methods   |    |
|:-|:-|
| [ClearImageTags()](WebTwain.Buffer.md#clearimagetags)   | [FilterImagesByTag()](WebTwain.Buffer.md#filterimagesbytag)  |
| [SetDefaultTag()](WebTwain.Buffer.md#setdefaulttag) | [TagImages()](WebTwain.Buffer.md#tagimages)  |
| [GetImageBitDepth()](WebTwain.Buffer.md#getimagebitdepth)  | [GetImageSize()](WebTwain.Buffer.md#getimagesize)  |
| [GetImageSizeWithSpecifiedType()](WebTwain.Buffer.md#getimagesizewithspecifiedtype) | [GetSelectedImagesSize()](WebTwain.Buffer.md#getselectedimagessize) |
| [GetImageHeight()](WebTwain.Buffer.md#getimageheight)   | [GetImageWidth()](WebTwain.Buffer.md#getimagewidth)   |
| [GetImagePartURL()](WebTwain.Buffer.md#getimageparturl) | [GetImageURL()](WebTwain.Buffer.md#getimageurl) |
| [GetImageXResolution()](WebTwain.Buffer.md#getimagexresolution)  | [GetImageYResolution()](WebTwain.Buffer.md#getimageyresolution)  |
| [GetSkewAngle()](WebTwain.Buffer.md#getskewangle) | [GetSkewAngleEx()](WebTwain.Buffer.md#getskewangleex) |
| [ImageIDToIndex()](WebTwain.Buffer.md#imageidtoindex)   | [IndexToImageID()](WebTwain.Buffer.md#indextoimageid) |
| [IsBlankImage()](WebTwain.Buffer.md#isblankimage) | [IsBlankImageExpress()](WebTwain.Buffer.md#isblankimageexpress)  |
| [SelectAllImages()](WebTwain.Buffer.md#selectallimages) | [SelectImages](WebTwain.Buffer.md#selectimages) |
| [MoveImage()](WebTwain.Buffer.md#moveimage)    | [SwitchImage()](WebTwain.Buffer.md#switchimage) |
| [RemoveImage()](WebTwain.Buffer.md#removeimage)   | [RemoveAllImages()](WebTwain.Buffer.md#removeallimages)   |
| [RemoveAllSelectedImages()](WebTwain.Buffer.md#removeallselectedimages) |    |

| Properties  |  |
|:-|:-|
| [BlankImageCurrentStdDev](WebTwain.Buffer.md#blanimagecurrentstddev)   | [BlankImageMaxStdDev](WebTwain.Buffer.md#blankimagemaxstddev)  |
| [BlankImageThreshold](WebTwain.Buffer.md#blankimagethreshold)   | [BufferMemoryLimit](WebTwain.Buffer.md#buffermemorylimit)  |
| [CurrentImageIndexInBuffer](WebTwain.Buffer.md#currentimageindexinbuffer) | [HowManyImagesInBuffer](WebTwain.Buffer.md#howmanyimagesinbuffer) |
| [IfAllowLocalCache](WebTwain.Buffer.md#ifallowlocalcache)   | [SelectedImagesIndices](WebTwain.Buffer.md#selectedimagesindices) |
| [SelectionRectAspectRatio](WebTwain.Buffer.md#selectionrectaspectratio)   | [MaxImagesInBuffer](WebTwain.Buffer.md#maximagesinbuffer)  |

| Event  |
|:-|
| [OnBitmapChanged](WebTwain.Buffer.md#onbitmapchanged)   |
| [OnImageAreaSelected](WebTwain.Buffer.md#onimageareaselected) |
| [OnImageAreaDeSelected](WebTwain.Buffer.md#onimageareadeselected) |
| [OnIndexChangeDragDropDone](WebTwain.Buffer.md#onindexchangedragdropdone)   |
| [OnTopImageInTheViewChanged](WebTwain.Buffer.md#ontopimageintheviewchanged) |

> [Deprecation] The following APIs are deprecated.

| Methods  |  |
|:-|:-|
| [GetSelectedImageIndex()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Runtime-Info.html#GetSelectedImageIndex) | [SetSelectedImageIndex](https://www.dynamsoft.com/docs/dwt15.3.1/API/Basic-Edit.html#SetSelectedImageIndex) |

| Property  |
|:-|
| [SelectedImagesCount](https://www.dynamsoft.com/docs/dwt15.3.1/API/Runtime-Info.html#SelectedImagesCount) |

### Edit

| Methods   | |
|:-|:-|
| [Crop()](WebTwain.Edit.md#crop)  | [CropToClipboard()](WebTwain.Edit.md#croptoclipboard)    |
| [CutFrameToClipboard()](WebTwain.Edit.md#cutframetoclipboard) | [CutToClipboard()](WebTwain.Edit.md#cuttoclipboard)  |
| [CopyToClipboard()](WebTwain.Edit.md#copytoclipboard)  | [Erase()](WebTwain.Edit.md#erase)    |
| [Flip()](WebTwain.Edit.md#flip)  | [Mirror()](WebTwain.Edit.md#mirror)  |
| [Rotate()](WebTwain.Edit.md#rotate)    | [RotateEx()](WebTwain.Edit.md#rotateex) |
| [RotateLeft()](WebTwain.Edit.md#rotateleft)  | [RotateRight()](WebTwain.Edit.md#rotateright) |
| [ChangeBitDepth()](WebTwain.Edit.md#changebitdepth) | [SetDPI()](WebTwain.Edit.md#setdpe)  |
| [ConvertToBW()](WebTwain.Edit.md#converttobw)   | [ConvertToGrayScale()](WebTwain.Edit.md#converttograyscale) |
| [ChangeImageSize()](WebTwain.Edit.md#changeimagesize)  | [Invert()](WebTwain.Edit.md#invert)  |
| [SetImageWidth()](WebTwain.Edit.md#setimagewidth)   | [ShowImageEditor()](WebTwain.Edit.md#showimageeditor)    |

| Property    |
|:-|
| [BackgroundFillColor](WebTwain.Edit.md#backgroundfillcolor) |

> [Deprecation] The following APIs are deprecated


| Methods  |  |
|:-|:-|
| [AddText()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Basic-Edit.html#AddText) | [CreateTextFont()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Basic-Edit.html#CreateTextFont) |
| [OverlayRectangle()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Basic-Edit.html#OverlayRectangle) | |

### IO

## Input

| Methods    |
|:-|
| [LoadImage()](WebTwain.IO.md#loadimage) |
| [LoadImageEx()](WebTwain.IO.md#loadimageex)  |
| [LoadImageFromBase64Binary()](WebTwain.IO.md#loadimagefrombase64binary) |
| [LoadImageFromBinary()](WebTwain.IO.md#loadimagefrombinary)   |
| [LoadDibFromClipboard()](WebTwain.IO.md#loaddibfromclipboard) |
| [FTPDownload()](WebTwain.IO.md#ftpdownload)  |
| [FTPDownloadEx()](WebTwain.IO.md#ftpdownloadex)  |
| [HTTPDownload()](WebTwain.IO.md#httpdownload)    |
| [HTTPDownloadEx()](WebTwain.IO.md#httpdownloadex)   |
| [HTTPDownloadThroughPost()](WebTwain.IO.md#httpdownloadthroughpost)  |
| [HTTPDownloadDirectly()](WebTwain.IO.md#httpdownloaddirectly) |

## Output

| Methods   |
|:-|
| [ConvertToBase64()](WebTwain.IO.md#converttobase64) |
| [ConvertToBlob()](WebTwain.IO.md#converttoblob) |
| [FTPUpload()](WebTwain.IO.md#ftpupload)    |
| [FTPUploadEx()](WebTwain.IO.md#ftpuploadex)   |
| [FTPUploadAllAsMultiPageTIFF()](WebTwain.IO.md#ftpuploadallasmultipagetiff) |
| [FTPUploadAllAsPDF()](WebTwain.IO.md#ftpuploadallaspdf)   |
| [FTPUploadAsMultiPagePDF()](WebTwain.IO.md#ftpuploadasmultipagepdf) |
| [FTPUploadAsMultiPageTIFF()](WebTwain.IO.md#ftpuploadasmultipagetiff)   |
| [HTTPUpload()](WebTwain.IO.md#httpupload)  |
| [HTTPUploadThroughPutEx()](WebTwain.IO.md#httpuploadthroughputex)   |
| [HTTPUploadThroughPost()](WebTwain.IO.md#httpuploadthroughpost)  |
| [HTTPUploadThroughPostEx()](WebTwain.IO.md#httpuploadthroughpostex) |
| [HTTPUploadAllThroughPostAsMultiPageTIFF()](WebTwain.IO.md#httpuploadallthroughpostasmultipagetiff) |
| [HTTPUploadAllThroughPostAsPDF()](WebTwain.IO.md#httpuploadallthroughpostaspdf) |
| [HTTPUploadThroughPostAsMultiPagePDF()](WebTwain.IO.md#httpuploadthroughpostasmultipagepdf) |
| [HTTPUploadThroughPostAsMultiPageTIFF()](WebTwain.IO.md#httpuploadthroughpostasmultipagetiff) |
| [HTTPUploadThroughPostDirectly()](WebTwain.IO.md#httpuploadthroughpostdirectly) |
| [SaveAsBMP()](WebTwain.IO.md#saveasbmp)    |
| [SaveAsJPEG()](WebTwain.IO.md#saveasjpeg)  |
| [SaveAsPDF()](WebTwain.IO.md#saveaspdf)    |
| [SaveAsPNG()](WebTwain.IO.md#saveaspng)    |
| [SaveAsTIFF()](WebTwain.IO.md#saveastiff)  |
| [SaveSelectedImagesAsMultiPagePDF()](WebTwain.IO.md#saveselectedimagesasmultipagepdf) |
| [SaveSelectedImagesAsMultiPageTIFF()](WebTwain.IO.md#saveselectedimagesasmultipagetiff) |
| [SaveAllAsMultiPageTIFF()](WebTwain.IO.md#saveallasmultipagetiff)   |
| [SaveAllAsPDF()](WebTwain.IO.md#saveallaspdf) |

## Others

| Methods    |  |
|:-|:-|
| [ClearTiffCustomTag()](WebTwain.IO.md#cleartiffcustomtag)    | [SetTiffCustomTag()](WebTwain.IO.md#settiffcustomtag) |
| [ClearAllHTTPFormField()](WebTwain.IO.md#clearallhttpformfield) | [SetHTTPFormField()](WebTwain.IO.md#sethttpformfield) |
| [SetHTTPHeader()](WebTwain.IO.md#sethttpheader)   | [SetUploadSegment()](WebTwain.IO.md#setuploadsegment) |
| [ShowFileDialog()](WebTwain.IO.md#showfiledialog) | [Print()](WebTwain.IO.md#print)   |

| Properties    | |
|:-|:-|
| [FTPPassword](WebTwain.IO.md#ftppassword)  | [FTPPort](WebTwain.IO.md#ftpport)   |
| [FTPUserName](WebTwain.IO.md#ftpusername)  | [IfPASVMode](WebTwain.IO.md#ifpasvmode) |
| [HttpFieldNameOfUploadedImage](WebTwain.IO.md#httpfieldnameofuploadedimage) | [HTTPPort](WebTwain.IO.md#httpport) |
| [IfSSL](WebTwain.IO.md#ifssl)  | [HTTPPostResponseString](WebTwain.IO.md#httppostresponsestring)  |
| [IfShowFileDialog](WebTwain.IO.md#ifshowfiledialog) | [IfShowCancelDialogWhenImageTransfer](WebTwain.IO.md#ifshowprogressbar) |
| [IfShowProgressBar](WebTwain.IO.md#ifshowprogressbar)  | [JPEGQuality]()    |
| [IfTiffMultiPage](WebTwain.IO.md#iftiffmultipage)   | [TIFFCompressionType](WebTwain.IO.md#tiffcompressiontype)   |

| Events |
|:-|
| [OnGetFilePath](WebTwain.IO.md#ongetfilepath) |
| [OnPostLoad](WebTwain.IO.md#onpostload)    |
| [OnInternetTransferPercentage](WebTwain.IO.md#oninternettransferpercentage) |

> [Deprecation] The following APIs are deprecated

| Methods   |   |
|:-|:-|
| [SaveSelectedImagesToBase64Binary()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Load-Save.html#SaveSelectedImagesToBase64Binary) |   |

| Properties    | |
|:-|:-|
| [IfOpenImageWithGDIPlus](https://www.dynamsoft.com/docs/dwt15.3.1/API/Encode-Decode.html#IfOpenImageWithGDIPlus) | |
| [PDFAuthor](https://www.dynamsoft.com/docs/dwt15.3.1/API/Encode-Decode.html#PDFAuthor) | [PDFCompressionType](https://www.dynamsoft.com/docs/dwt15.3.1/API/Encode-Decode.html#PDFCompressionType) |
| [PDFCreationDate](https://www.dynamsoft.com/docs/dwt15.3.1/API/Encode-Decode.html#PDFCreationDate) | [PDFCreator](https://www.dynamsoft.com/docs/dwt15.3.1/API/Encode-Decode.html#PDFCreator) |
| [PDFKeywords](https://www.dynamsoft.com/docs/dwt15.3.1/API/Encode-Decode.html#PDFKeywords) | [PDFModifiedDate](https://www.dynamsoft.com/docs/dwt15.3.1/API/Encode-Decode.html#PDFModifiedDate) |
| [PDFProducer](https://www.dynamsoft.com/docs/dwt15.3.1/API/Encode-Decode.html#PDFProducer) | [PDFSubject](https://www.dynamsoft.com/docs/dwt15.3.1/API/Encode-Decode.html#PDFSubject) |
| [PDFTitle](https://www.dynamsoft.com/docs/dwt15.3.1/API/Encode-Decode.html#PDFTitle) | [PDFVersion](https://www.dynamsoft.com/docs/dwt15.3.1/API/Encode-Decode.html#PDFVersion) |

### Scan

| Methods   |  |
|:-|:-|
| [AcquireImage()](WebTwain.Acquire.md#acquireimage) | [CloseSource()](WebTwain.Acquire.md#closesource)  |
| [CloseWorkingProcess](WebTwain.Acquire.md#closeworkingprocess)   | [DisableSource()](WebTwain.Acquire.md#disablesource) |
| [EnableSource()](WebTwain.Acquire.md#enablesource) | [GetDeviceType()](WebTwain.Acquire.md#getdevicetype) |
| [GetSourceNameItems()](WebTwain.Acquire.md#getsourcenameitems)   | [GetSourceNames()](WebTwain.Acquire.md#getsourcenames)   |
| [OpenSource()](WebTwain.Acquire.md#opensource)  | [SelectSource()](WebTwain.Acquire.md#selectsource)   |
| [SelectSourceByIndex()](WebTwain.Acquire.md#selectsourcebyindex) | [SetOpenSourceTimeout()](WebTwain.Acquire.md#setopensourcetimeout) |
| [startScan()](WebTwain.Acquire.md#startscan) | [EnableSourceUI()](WebTwain.Acquire.md#enablesourceui)   |

| Properties |   |
|:-|:-|
| [CurrentSourceName](WebTwain.Acquire.md#currentsourcename) | [IfDisableSourceAfterAcquire](WebTwain.Acquire.md#ifdisablesourceafteracquire) |
| [IfDuplexEnabled](WebTwain.Acquire.md#ifduplexenabled)  | [IfFeederEnabled](WebTwain.Acquire.md#iffeederenabled)  |
| [PageSize](WebTwain.Acquire.md#pagesize)  | [PixelType](WebTwain.Acquire.md#pixeltype) |
| [Resolution](WebTwain.Acquire.md#resolution) | [SourceCount](WebTwain.Acquire.md#sourcecount) |

| Events  |  |
|:-|:-|
| [OnPostAllTransfers](WebTwain.Acquire.md#onpostalltransfers)   | [OnPostTransfer](WebTwain.Acquire.md#onposttransfer)    |
| [OnPostTransferAsync](WebTwain.Acquire.md#onposttransferasync) | [OnPreAllTransfers](WebTwain.Acquire.md#onprealltransfers) |
| [OnPreTransfer](WebTwain.Acquire.md#onpretransfer)   |  |

> The following APIs are compatible with TWAIN (mostly Windows, but could also be macOS)

| Methods    | |
|:-|:-|
| [CancelAllPendingTransfers()](WebTwain.Acquire.md#cancelallpendingtransfers) | [CloseSourceManager()](WebTwain.Acquire.md#closesourcemanager) |
| [FeedPage()](WebTwain.Acquire.md#feedpage)   | [GetCustomDSData()](WebTwain.Acquire.md#getcustomdsdata)    |
| [GetCustomDSDataEx()](WebTwain.Acquire.md#getcustomdsdataex)   | [OpenSourceManager()](WebTwain.Acquire.md#opensourcemanager)   |
| [ResetImageLayout()](WebTwain.Acquire.md#resetimagelayout)  | [RewindPage()](WebTwain.Acquire.md#rewindpage)   |
| [SetCustomDSData()](WebTwain.Acquire.md#setcustomdsdata) | [SetCustomDSDataEx()](WebTwain.Acquire.md#setcustomdsdataex)   |
| [SetFileXferInfo()](WebTwain.Acquire.md#setfilexferinfo) | [SetImageLayout()](WebTwain.Acquire.md#setimagelayout)  |
| [getCapabilities](WebTwain.Acquire.md#getcapabilities)   | [setCapabilities](WebTwain.Acquire.md#setcapabilities)  |

| Properties  | |
|:-|:-|
| [BitDepth ](WebTwain.Acquire.md#bitdepth)  | [Brightness](WebTwain.Acquire.md#brightness) |
| [Contrast](WebTwain.Acquire.md#contrast)   | [DataSourceStatus](WebTwain.Acquire.md#datasourcestatus) |
| [DefaultSourceName](WebTwain.Acquire.md#defaultsourcename)   | [Duplex](WebTwain.Acquire.md#duplex)  |
| [IfAutoBright](WebTwain.Acquire.md#ifautobright)    | [IfAutoDiscardBlankpages](WebTwain.Acquire.md#ifautodiscardblankpages)    |
| [IfAutoFeed](WebTwain.Acquire.md#ifautofeed)  | [IfAutomaticBorderDetection](WebTwain.Acquire.md#ifautomaticborderdetection) |
| [IfAutomaticDeskew](WebTwain.Acquire.md#ifautomaticdeskew)   | [IfAutoScan](WebTwain.Acquire.md#ifautoscan) |
| [IfFeederLoaded](WebTwain.Acquire.md#iffeederloaded)   | [IfPaperDetectable](WebTwain.Acquire.md#ifpaperdetectable)  |
| [IfShowIndicator](WebTwain.Acquire.md#ifshowindicator) | [IfShowUI](WebTwain.Acquire.md#ifshowui) |
| [IfUIControllable](WebTwain.Acquire.md#ifuicontrollable)  | [IfUseTwainDSM](WebTwain.Acquire.md#ifusetwaindsm)    |
| [ImageLayoutDocumentNumber](WebTwain.Acquire.md#imagelayoutdocumentnumber) | [ImageLayoutFrameBottom](WebTwain.Acquire.md#imagelayoutframebottom)  |
| [ImageLayoutFrameLeft](WebTwain.Acquire.md#imagelayoutframeleft) | [ImageLayoutFrameNumber](WebTwain.Acquire.md#imagelayoutframenumber)  |
| [ImageLayoutFrameRight](WebTwain.Acquire.md#imagelayoutframeright)  | [ImageLayoutFrameTop](WebTwain.Acquire.md#imagelayoutframetop) |
| [ImageLayoutPageNumber](WebTwain.Acquire.md#imagelayoutpagenumber)  | [ImagePixelType](WebTwain.Acquire.md#imagepixeltype)  |
| [MagData](WebTwain.Acquire.md#magdata) | [MagType](WebTwain.Acquire.md#magtype)   |
| [PendingXfers](WebTwain.Acquire.md#pendingxfers)    | [PixelFlavor](WebTwain.Acquire.md#pixelflavor)  |
| [TransferMode](WebTwain.Acquire.md#transfermode)    | [Unit](WebTwain.Acquire.md#unit) |
| [XferCount](WebTwain.Acquire.md#xfercount) | |

| Event  |
|:-|
| [OnSourceUIClose](WebTwain.Acquire.md#onsourceuiclose) |


> [Deprecation] The following APIs are deprecated

| Methods  |  |
|:-|:-|
| [CapGet()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapGet) | [CapGetHelp()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapGetHelp) |
| [CapGetCurrent()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapGetCurrent) | [CapGetDefault()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapGetDefault) |
| [CapGetFrameBottom()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapGetFrameBottom) | [CapGetFrameLeft()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapGetFrameLeft) |
| [CapGetFrameRight()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapGetFrameRight) | [CapGetFrameTop()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapGetFrameTop) |
| [CapGetLabel()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapGetLabel) | [CapGetLabels()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapGetLabels) |
| [CapSet()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapSet) | [CapReset()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapReset) |
| [CapSetFrame()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapSetFrame) | [CapIfSupported()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapIfSupported) |
| [GetCapItems()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#GetCapItems) | [GetCapItemsString()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#GetCapItemsString) |
| [SetCapItems()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#SetCapItems) | [SetCapItemsString()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#SetCapItemsString) |

| Properties    | |
|:-|:-|
| [Capability](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#Capability) | [CapNumItems](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapNumItems) |
| [CapMaxValue](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapMaxValue) | [CapMinValue](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapMinValue) |
| [CapCurrentValue](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapCurrentValue) | [CapCurrentIndex](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapCurrentIndex) |
| [CapDefaultValue](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapDefaultValue) | [CapDefaultIndex](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapDefaultIndex) |
| [CapType](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapType) | [CapValueType](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapValueType) |
| CapDescription   | [CapStepSize](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapStepSize) |
| [CapValue](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapValue) | [CapValueString](https://www.dynamsoft.com/docs/dwt15.3.1/API/Capability-Negotiation.html#CapValueString) |

> The following API only makes sense on macOS and Linux

| Property   |
|:-|
| [ImageCaptureDriverType](WebTwain.Acquire.md#imagecapturedrivertype) |

### Util

| Methods    |   |
|:-|:-|
| [RegisterEvent()](WebTwain.Util.md#registerevent) | [UnregisterEvent()](WebTwain.Util.md#unregisterevent)  |
| [SetLanguage()](WebTwain.Util.md#setlanguage)  | [GenerateURLForUploadData()](WebTwain.Util.md#generateurlforuploaddata) |

| Properties  |  |
|:-|:-|
| [ErrorCode](WebTwain.Util.md#errorcode)  | [ErrorString](WebTwain.Util.md#errorstring)   |
| [LogLevel](WebTwain.Util.md#loglevel) | [Manufacturer](WebTwain.Util.md#manufacturer) |
| [ProductFamily](WebTwain.Util.md#productfamily) | [ProductName](WebTwain.Util.md#productname)   |
| [VersionInfo](WebTwain.Util.md#versioninfo)  | [ProductKey](WebTwain.Util.md#productkey)  |

### Viewer

> For WebTwain instances

| Methods  |
|:-|
| [BindViewer()](WebTwain.Viewer.md#bindviewer)  |
| [UnbindView()](WebTwain.Viewer.md#unbindviewer)   |
| [UpdateViewer()](WebTwain.Viewer.md#updateviewer) |

| Properties   |   |
|:-|:-|
| [BackgroundColor](WebTwain.Viewer.md#backgroundcolor) | [SelectionImageBorderColor](WebTwain.Viewer.md#selectionimagebordercolor) |
| [FitWindowType](WebTwain.Viewer.md#fitwindowtype)  | [IfFitWindow](WebTwain.Viewer.md#iffitwindow)  |
| [Height](WebTwain.Viewer.md#height)  | [Width](WebTwain.Viewer.md#width)  |
| [IfAutoScroll](WebTwain.Viewer.md#ifautoscroll)    | [ShowPageNumber](WebTwain.Viewer.md#showpagenumber)   |
| [MouseX](WebTwain.Viewer.md#mousex)  | [MouseY](WebTwain.Viewer.md#mousey)   |
| [ImageMargin](WebTwain.Viewer.md#imagemargin)  | [MouseShape](WebTwain.Viewer.md#mouseshape)  |
| [Zoom](WebTwain.Viewer.md#zoom)   |   |

| Events |    |
|:-|:-|
| [OnMouseClick](WebTwain.Viewer.md#onmouseclick) | [OnMouseDoubleClick](WebTwain.Viewer.md#onmousedoubleclick) |
| [OnMouseMove](WebTwain.Viewer.md#onmousemove)   | [OnMouseRightClick](WebTwain.Viewer.md#onmouserightclick)   |

> For the WebTwain.Viewer interface

| Methods |  |
|:-|:-|
| [setViewMode()](WebTwain.Viewer.md#setviewmode) | [updateUISettings()](WebTwain.Viewer.md#updateuisettings)  |
| [setButtonClass()](WebTwain.Viewer.md#setbuttonclass)  | [setSelectedImageArea()](WebTwain.Viewer.md#setselectedimagearea) |
| [zoomIn()](WebTwain.Viewer.md#zoomin) | [zoomOut()](WebTwain.Viewer.md#zoomout)    |
| [bindCustomElement](WebTwain.Viewer.md#bindcustomelement) | [showCustomElement](WebTwain.Viewer.md#showcustomelement)  |
| [hideCustomElement](WebTwain.Viewer.md#hidecustomelement) | [toggleCustomElement](WebTwain.Viewer.md#togglecustomelement   |

| Properties |
|:-|
| [bOnlyShowThumbnailsView](WebTwain.Viewer.md#bonlyshowthumbnailsview)   |
| [cursorOverThumbnailsView](WebTwain.Viewer.md#cursoroverthumbnailsview) |

> [Deprecation] The following APIs are deprecated

| Methods  |  |
|:-|:-|
| [SetViewMode()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Display-UI.html#SetViewMode) | [SetSelectedImageArea()](https://www.dynamsoft.com/docs/dwt15.3.1/API/Basic-Edit.html#SetSelectedImageArea) |

## Addon

### BarcodeReader

| Methods   |
|:-|
| [decode()](Addon.BarcodeReader.md#decode)   |
| [getRuntimeSettings()](Addon.BarcodeReader.md#getruntimesettings) |
| [updateRuntimeSettings()](Addon.BarcodeReader.md#updateruntimesettings)  |
| [resetRuntimeSettings()](Addon.BarcodeReader.md#resetruntimesettings)    |
| [initRuntimeSettingsWithString()](Addon.BarcodeReader.md#initruntimesettingswithstring) |

### OCR

| Methods  |  |
|:-|:-|
| [Download()](Addon.OCR.md#download)  | [DownloadLangData()](Addon.OCR.md#downloadlangdata)  |
| [IsModuleInstalled()](Addon.OCR.md#ismoduleinstalled)   | [SetLanguage()](Addon.OCR.md#setlanguage)   |
| [SetOutputFormat()](Addon.OCR.md#setoutputformat) | [SetPageSetMode()](Addon.OCR.md#setpagesetmode)   |
| [GetIfUseDetectedFont()](Addon.OCR.md#getifusedetectedfont)    | [SetIfUseDetectedFont()](Addon.OCR.md#setifusedetectedfont)    |
| [GetUnicodeFontName()](Addon.OCR.md#getunicodefontname) | [SetUnicodeFontName()](Addon.OCR.md#setunicodefontname) |
| [GetMinFontSizeforMoreAccurateResult()](Addon.OCR.md#getminfontsizeformoreaccurateresult) | [SetMinFontSizeforMoreAccurateResult()](Addon.OCR.md#setminfontsizeformoreaccurateresult) |
| [Recognize()](Addon.OCR.md#recognize)    | [RecognizeFile()](Addon.OCR.md#recognizefile) |
| [RecognizeRect()](Addon.OCR.md#recognizerect) | [RecognizeSelectedImages()](Addon.OCR.md#recognizeselectedimages) |

### OCRPro

| Methods    | |
|:-|:-|
| [Download()](Addon.OCRPro.md#download) | [IsModuleInstalled()](Addon.OCRPro.md#ismoduleinstalled)   |
| [Recognize()](Addon.OCRPro.md#recognize)  | [RecognizeFile()](Addon.OCRPro.md#recognizefile) |
| [RecognizeRect()](Addon.OCRPro.md#recognizerect) | [RecognizeSelectedImages()](Addon.OCRPro.md#recognizeselectedimages) |

| Property    |
|:-|
| [Settings](Addon.OCRPro.md#settings) |

### PDF

| Methods  |
|:-|
| [IsTextBasedPDF()](Addon.PDF.md#istextbasedpdf) |
| [SetConvertMode()](Addon.PDF.md#setconvertmode) |
| [SetPassword()](Addon.PDF.md#setpassword)    |
| [SetResolution()](Addon.PDF.md#setresolution)   |
| [Write.Setup()](Addon.PDF.md#writesetup) |

### Webcam


| Methods  |  |
|:-|:-|
| [CaptureImage()](Addon.Webcam.md#captureimage) | [CloseSource()](Addon.Webcam.md#closesource)   |
| [GetCameraControlPropertySetting()](Addon.Webcam.md#getcameracontrolpropertysetting) | [GetCameraControlPropertyMoreSetting()](Addon.Webcam.md#getcameracontrolpropertymoresetting) |
| [GetVideoPropertySetting()](Addon.Webcam.md#getvideopropertysetting) | [GetVideoPropertyMoreSetting()](Addon.Webcam.md#getvideopropertymoresetting) |
| [SetCameraControlPropertySetting()](Addon.Webcam.md#setcameracontrolpropertysetting) | [SetVideoPropertySetting()](Addon.Webcam.md#setvideopropertysetting) |
| [GetFrameRate()](Addon.Webcam.md#getframerate) | [SetFrameRate()](Addon.Webcam.md#setframerate) |
| [GetMediaType()](Addon.Webcam.md#getmediatype) | [SetMediaType()](Addon.Webcam.md#setmediatype) |
| [GetResolution()](Addon.Webcam.md#getresolution) | [SetResolution()](Addon.Webcam.md#setresolution) |
| [GetFramePartURL()](Addon.Webcam.md#getframeparturl) | [GetFrameURL()](Addon.Webcam.md#getframeurl)   |
| [GetSourceList()](Addon.Webcam.md#getsourcelist)  | [SelectSource()](Addon.Webcam.md#selectsource)   |
| [PauseVideo()](Addon.Webcam.md#pausevideo) | [PlayVideo()](Addon.Webcam.md#playvideo) |
| [SetVideoRotateMode()](Addon.Webcam.md#setvideorotatemode)    | [StopVideo()](Addon.Webcam.md#stopvideo) |

## [Dynamsoft.FileUploader](#dynamsoftfileuploader)

| Methods  |
|:-|
| [Init()](Dynamsoft.FileUploader.md#init)   |
| [CreateJob()](Dynamsoft.FileUploader.md#createjob)   |
| [Run()](Dynamsoft.FileUploader.md#run)  |
| [Cancel()](Dynamsoft.FileUploader.md#cancel)  |
| [CancelAllUpload()](Dynamsoft.FileUploader.md#cancelallupload) |