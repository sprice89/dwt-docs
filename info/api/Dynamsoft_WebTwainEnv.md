<script src="https://www.dynamsoft.com/assets/js/jquery.dynamsoft.header.js?showSearch=false&host=www.dynamsoft.com"></script>
# Dynamsoft.WebTwainEnv

>  Global properties and functions.

```typescript
interface Dynamsoft.WebTwainEnv {
    readonly ActiveXVersion: string;
    readonly JSVersion: string;
    readonly PdfVersion: string;
    readonly ServerLinuxVersionInfo: string;
    readonly ServerMacVersionInfo: string;
    readonly ServerVersionInfo: string;
    /**
     * Whether to create a WebTwain instance automatically.
     */
    AutoLoad: boolean;
    ContainerMap: object;
    /**
     * Define the Id and UI of the WebTwain instances.
     */
    Containers: Container[];
    Host: string; //"local.dynamsoft.com"
    IfAddMD5InUploadHeader: boolean;
    IfDisableDefaultSettings: boolean;
    IfUseActiveXForIE10Plus: boolean;
    readonly inited: boolean;
    ProductKey: string;
    ResourcesPath: string;
    UseLocalService: boolean;
    UseDefaultInstallUI: boolean;
    
    // Functions
    CreateDWTObject(
        ContainerId: string, 
        host?: string, 
        port?: string | number, 
        portSSL?: string | number, 
        asyncSuccessFunc: function (DWObject: WebTwain) {}, 
        asyncFailureFunc: function (errorString: string) {}
    ): void;
    CreateDWTObjectEx(
        dwtInitialConfig: IDWTInitialConfig,                 
        asyncSuccessFunc: (DWObject: WebTwain) => {},                   
        asyncFailureFunc: (errorString: string) => {}
    ): void;
    DeleteDWTObject(Id?: string): boolean;
    GetWebTwain(ContainerId?: string): WebTwain;
    GetWebTwainEx(WebTwainId: string): WebTwain;
    Load(): void;
    Unload(): void;
    RemoveAllAuthorizations: function () {};
    OnWebTwainNotFound: function () {};
    OnWebTwainPostExecute: function () {};
    OnWebTwainPreExecute: function () {};
    OnWebTwainReady: function () {};
    OnWebTwainWillInit: function () {};
}
```

## Options

- `Containers: Container[]`

An array of `Container` definitions that specifies the UI elements for `WebTwain` instances. The `Container` interface is defined below


```typescript
interface Container {
    WebTwainId: string, // Id of the WebTwain instance
    ContainerId?: string, // Id of the element
    Width?: string | number, // Width of the element
    Height?: string | number // Height of the element
}
```

- `IfAddMD5InUploadHeader: boolean`
  
  Whether or not an md5 header `dwt-md5` should be included in HTTP upload requests. Note that this header is not a standard header and may be deemed invalid on some web servers.
  
  The default value is `false`.
  
- `readonly inited: boolean`
  
  Indicates whether the Dynamic Web TWAIN library is ready to work.
  
- `ProductKey: boolean`
  
  Sets or returns the product key for the library. A product key is required to enables certain modules of the library.
  
- `ResourcesPath: boolean`
  
  Sets or returns where the library looks for resources files including service installers, CSS, etc.
  
- `UseLocalService: boolean`

  Sets or returns whether to use the service or use WASM only. This property can be changed at runtime (but not recommended) and affects `WebTwain` instances created after the change.

  The default value is `true`.



## Functions

- `CreateDWTObject(...): void`

  Creates a new `WebTwain` instance that listens to the specified host & ports. An UI element specified by the parameter `ContainerId` which is typically a <div> is required. The library will generate a UI and bind it to this element.
  
- `CreateDWTObjectEx(...): void`

  Creates a new UI-less `WebTwain` instance. This instance will be uniquely identified by the parameter `WebTwainId`.
  
  ```javascript
  interface IDWTInitialConfig {
    WebTwainId: string,
    Host?: string,
    Port?: string,
    PortSSL?: string
  }
  ```
  
  
  
- `DeleteDWTObject(Id: string)`: void

  Delete the `WebTwain` instance specified by `Id` which can either be a `ContainerId` or a `WebTwainId`.

- `GetWebTwain(ContainerId?: string): WebTwain`

  Gets an `WebTwain` instance by its `ContainerId`.
  
- `GetWebTwainEx(WebTwainId: string): WebTwain`

  Gets an `WebTwain` instance by its `WebTwainId`.
  
- `Load(): void`

  Initiates the library. If there are predefined `Containers`, one `WebTwain` instance will be created for each `Container`.

- `RegisterEvent(...): void`

  Registers an environmental event. Typically the event is `OnWebTwainReady` which is triggered when the initialization completes.

- `Unload(): void`

  Destroys all `WebTwain` instances and cuts off the connection to the Dynamsoft Service.