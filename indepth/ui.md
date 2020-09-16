
## Other UI Elements

### Hide or change the backdrop and mask plus the progress indicators

### Change the installation UI

### How to customize the upload/download progress bar?
Use IfShowCancelDialogWhenImageTransfer property to disable the progress dialog during the uploading/downloading.
Use OnInternetTransferPercentage event to customize your own progress bar. This event will return the percentage that has been uploaded or downloaded:
1
2
3
DWObject.RegisterEvent('OnInternetTransferPercentage', function(sPercentage){
    console.log(sPercentage); //Your code goes here.
});