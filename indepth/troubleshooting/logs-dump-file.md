

# Dynamic Web TWAIN Advanced Troubleshooting - Logs & Dump Files

[How to Enable and Collect Verbose Logs](#How-to-Enable-and-Collect-Verbose-Logs) 
  * [HTML5 Edition on Windows](#HTML5-Edition-on-Windows) 
  * [Mac Edition](#Mac-Edition)
  * [ActiveX Edition](#ActiveX-Edition)
  * [Linux Edition](#Linux-Edition)  

[How to Create a Dump File](#How-to-Create-a-Dump-File)

## How to Enable and Collect Verbose Logs

The property [`LogLevel`](/info/api/WebTwain_Util.md#loglevel) is used to catch detailed information when necessary. The property returns or sets the log level for debugging purpose.

```
Data type: Short

Syntax: ObjectName.LogLevel

Possible values:

0 – The default value for LogLevel.  
1 – More output information will be provided for debugging purpose
```

NOTE:

+ Don't forget to disable debug mode after you have collected the logs. Application performance will be affected if verbose logging is enabled. 

### HTML5 Edition on Windows

1. Start by deleting the old log files located at:

    v10~v12: *C:\Windows\SysWOW64\Dynamsoft\DynamicWebTwain\ForChrome\log*

    v13+: *C:\Windows\SysWOW64\Dynamsoft\DynamsoftService\log*

    **v15+**: *C:\Windows\SysWOW64\Dynamsoft\DynamsoftServicex64\log*

    For version 11.x or older, log files also would appear in
*C:\Users\{USERNAME}\AppData\LocalLow\Dynamsoft\\*
    
2. Set `Loglevel` to enable debug mode

    **Option A**: Set `LogLevel` to enable debug mode for all end users:

    Change the source code.  Set the `LogLevel` to 1 in the initialization function of Web TWAIN control, like Dynamsoft_OnReady.

    ```javascript
    function Dynamsoft_OnReady() {
        DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
        DWObject.LogLevel = 1;
    }
    ```

    **Option B**: Set `LogLevel` to enable debug mode on specific client machines (don't forget to [restart Dynamic Web TWAIN service](https://developer.dynamsoft.com/dwt/kb/how-to-get-support/dynamic-web-twain-how-to-restart-dynamic-web-twain-service) after the change):

    On client-side, for versions below v15.3, change Log level from 6 to 14 in `DWTConfiguration.ini` or `DSConfiguration.ini` at

    v10~v12: *C:\Windows\SysWOW64\Dynamsoft\DynamicWebTwain\ForChrome\DWTConfiguration.ini*

    v13+: *C:\Windows\SysWOW64\Dynamsoft\DynamsoftService\DSConfiguration.ini*

    From v15.3, change Log level from 1 to 14 in `DSConfiguration.ini` at

    **v15+**: *C:\Windows\SysWOW64\Dynamsoft\DynamsoftServicex64\DSConfiguration.ini*
    
3. Reproduce the issue that you encountered

4. Collect the log files in the directories below

    v10~v12: *C:\Windows\SysWOW64\Dynamsoft\DynamicWebTwain\\**ForChrome**\log*

    v13+: *C:\Windows\SysWOW64\Dynamsoft\DynamsoftService\log*

    **v15+**: *C:\Windows\SysWOW64\Dynamsoft\DynamsoftServicex64\log*

    For version 11.* or older, log file also would appear in
    *C:\Users\{USER NAME}\AppData\LocalLow\Dynamsoft\\*

5. Zip the log files and sent them to [support@dynamsoft.com](mailto:support@dynamsoft.com). Our team will review the logs and get back to you with next steps. 

NOTE:

1. For 32-bit Windows machines, the *ForChrome* folder is under *C:\Windows\system32\Dynamsoft\DynamicWebTwain\\* 

2. For Windows 10 OS, enabling the debug mode will slow down the performance of the scan page. To avoid the slowness in this situation, you can add the `webtwainservice.exe` to the exclusion list of Windows Defender.

    ```
    Add the webtwainservice.exe to Settings > Update &Security > Windows Defender > Exclusions > Processes
    ```


### Mac Edition

1. Start by deleting the old log files located at the below directory.

    v11~v12: Select *Go > Applications > Dynamsoft > WebTwain > {installed version No.} > log*

    v13+: Select *Go > Applications > Dynamsoft > DynamsoftService > {installed version No.} > log*

    **v15+**: Select *Go > Applications > Dynamsoft > DynamsoftServicex64 > {installed version No.} > log*

2. Set `Loglevel` to enable debug mode

    **Option A**: Set `LogLevel` to enable debug mode for all end users:

    Change the source code.  Set the `LogLevel` to 1 in the initialization function of Web TWAIN control, like Dynamsoft_OnReady.

    ```javascript
    function Dynamsoft_OnReady() {
        DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
        DWObject.LogLevel = 1;
    }
    ```

    **Option B**: Set `LogLevel` to enable debug mode on specific client machines (don't forget to [restart Dynamic Web TWAIN service](https://developer.dynamsoft.com/dwt/kb/how-to-get-support/dynamic-web-twain-how-to-restart-dynamic-web-twain-service) after the change):

    On client-side, for..
    
    v11~v12, change log level from 6 to 14 in `DWTConfiguration.ini` Select *Go > Applications > Dynamsoft > WebTwain > {installed version No.} > DWTConfiguration.ini*

    v13+, change log level from 6 to 14 in `DSConfiguration.ini` Select *Go > Applications > Dynamsoft > DynamsoftService > {installed version No.} > DSConfiguration.ini*

    *v15.3+*, change log level from 1 to 14 in `DSConfiguration.ini` Select *Go > Applications > Dynamsoft > DynamsoftServicex64 > {installed version No.} > DSConfiguration.ini*

3. Reproduce the issue that you encountered

4. Collect the log files in the directories below

    v11~v12: Select *Go > Applications > Dynamsoft > WebTwain > {installed version No.} > log*

    v13+: Select *Go > Applications > Dynamsoft > DynamsoftService > {installed version No.} > log*

    **v15+**: Select *Go > Go to Folder…*, a prompt will appear: type */var/log* in the box and you’ll find `system.log` file.
    
5. Zip the log files and sent them to [support@dynamsoft.com](mailto:support@dynamsoft.com). Our team will review the logs and get back to you with next steps.


### ActiveX Edition

For any version before v14.3.1:

1. Download DebugView [here](http://technet.microsoft.com/en-us/sysinternals/bb896647), and unzip it locally.

2. Set `LogLevel` to enable debug mode for all end users:

    ```javascript
    function Dynamsoft_OnReady() {
        DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
        DWObject.LogLevel = 1;
    }
    ```

3. Run `Dbgview.exe`.

4. Reproduce the issue you encountered with the ActiveX Edition. DebugView will record detailed information during the process, as shown below.

    ![Dbgview](http://www.dynamsoft.com/download/Support/KB/images/KB658001.png)

5. Please click on Save to save the log file and send it to [support@dynamsoft.com](mailto:support@dynamsoft.com). Our team will review the logs and get back to you with next steps.

From v14.3.1+

Check the steps under [HTML5 Edition on Windows](#HTML5-Edition-on-Windows).


### Linux Edition

1. Start by deleting the old log files located at the below directory.

    v12.x: */opt/dynamsoft/WebTwainService/log*

    v13+: */opt/dynamsoft/DynamsoftService/log*
    
    **v15.3+**: */opt/dynamsoft/DynamsoftServicex64/log*

2. Set `Loglevel` to enable debug mode

    **Option A**: Set `LogLevel` to enable debug mode for all end users:

    Change the source code.  Set the `LogLevel` to 1 in the initialization function of Web TWAIN control, like Dynamsoft_OnReady.

    ```javascript
    function Dynamsoft_OnReady() {
        DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
        DWObject.LogLevel = 1;
    }
    ```

    **Option B**: Set `LogLevel` to enable debug mode on specific client machines (don't forget to [restart Dynamic Web TWAIN service](https://developer.dynamsoft.com/dwt/kb/how-to-get-support/dynamic-web-twain-how-to-restart-dynamic-web-twain-service) after the change):

    On client-side, for..
    
    v11~v12, change log level from 6 to 14 in `DWTConfiguration.ini` in */opt/dynamsoft/WebTwainService* directory

    v13+, change log level from 6 to 14 in `DSConfiguration.ini` in */opt/dynamsoft/DynamsoftService* directory

    **v15.3+**, change log level from 1 to 14 in `DSConfiguration.ini` in */opt/dynamsoft/DynamsoftServicex64* directory

3. Reproduce the issue that you encountered

4. Collect the log files in the directories below

    v12.x: */opt/dynamsoft/WebTwainService/log*

    v13+: */opt/dynamsoft/DynamsoftService/log*

    **v15.3**: */opt/dynamsoft/DynamsoftServicex64/log*

5. Zip the log files and sent them to [support@dynamsoft.com](mailto:support@dynamsoft.com). Our team will review the logs and get back to you with next steps.


## How to Create a Dump File

https://developer.dynamsoft.com/dwt/kb/2799