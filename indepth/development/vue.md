---
layout: default-layout
needAutoGenerateSidebar: true
description: "TOADD"
title: "TOADD"
---

# Use `DWT` with Vue

[Vue](https://vuejs.org/) is a progressive framework for building user interfaces. Check out the following on how to implement `DWT` into a Vue application.

## Preparation

Make sure you have [node](https://nodejs.org/), [yarn](https://yarnpkg.com/cli/install) and [Vue CLI](https://cli.vuejs.org/) installed. `node 14.4.0` , `yarn 1.22.4` and `@vue/cli 4.46` are used in the example below.

## Create the sample project

### Create an bootstrapped raw Vue application

``` cmd
vue create dwt-vue
```

### CD to the root directory of the application and install the `dwt` and `ncp` package

``` cmd
yarn add dwt
```

``` cmd
yarn add ncp
```

> `ncp` is used to copy static resources files.

## Configure the project

Open `package.json` and change `scripts` like this.

``` json
"scripts": {
    "serve": "ncp node_modules/dwt/dist public/dwt-resources && vue-cli-service serve",
    "build": "vue-cli-service build&& ncp node_modules/dwt/dist build/dwt-resources",
    "lint": "vue-cli-service lint"
},
```

> The change ensures the static files required to run `DWT` are copied over to the built resulting project.

## Start to implement

### Edit the default component

Change the file `/src/components/HelloWorld.vue` to match the following `template` and `script` (keep the `style` as is)

``` html
<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <select v-if="!bWASM" id="sources"></select>
        <button v-if="!bWASM" @click="acquireImage()">Acquire Images</button>
        <button @click="openImage()">Open Documents</button> <br /> <br />
        <div v-bind:id="containerId"></div>
    </div>
</template>

<script>
    import Dynamsoft from "dwt";
    export default {
        name: "HelloWorld",
        props: {
            msg: String,
        },
        data() {
            return {
                containerId: "dwtControlContainer",
                bWASM: false,
            };
        },
        mounted() {
            this.bWASM = Dynamsoft.Lib.env.bMobile || Dynamsoft.WebTwainEnv.UseLocalService;
            Dynamsoft.WebTwainEnv.ResourcesPath = "dwt-resources";
            Dynamsoft.WebTwainEnv.ProductKey = 'YOUR-PRODUCT-KEY';
            Dynamsoft.WebTwainEnv.Containers = [{
                WebTwainId: "dwtObject",
                ContainerId: this.containerId,
                Width: "100%",
                Height: "400px",
            }, ];
            Dynamsoft.WebTwainEnv.RegisterEvent("OnWebTwainReady", () => {
                this.Dynamsoft_OnReady();
            });
            Dynamsoft.WebTwainEnv.Load();
        },
        methods: {
            Dynamsoft_OnReady() {
                this.DWObject = Dynamsoft.WebTwainEnv.GetWebTwain(this.containerId);
                if (this.bWASM) {
                    this.DWObject.MouseShape = true;
                } else {
                    let sources = this.DWObject.GetSourceNames();
                    this.selectSources = document.getElementById("sources");
                    this.selectSources.options.length = 0;
                    for (let i = 0; i < sources.length; i++) {
                        this.selectSources.options.add(new Option(sources[i], i.toString()));
                    }
                }
            },
            acquireImage() {
                if (!this.DWObject) this.DWObject = Dynamsoft.WebTwainEnv.GetWebTwain();
                if (this.bWASM) {
                    alert("Scanning is not supported under the WASM mode!");
                } else if (
                    this.DWObject.SourceCount > 0 &&
                    this.DWObject.SelectSourceByIndex(this.selectSources.selectedIndex)
                ) {
                    const onAcquireImageSuccess = () => {
                        this.DWObject.CloseSource();
                    };
                    const onAcquireImageFailure = onAcquireImageSuccess;
                    this.DWObject.OpenSource();
                    this.DWObject.AcquireImage({},
                        onAcquireImageSuccess,
                        onAcquireImageFailure
                    );
                } else {
                    alert("No Source Available!");
                }
            },
            openImage() {
                if (!this.DWObject) this.DWObject = Dynamsoft.WebTwainEnv.GetWebTwain();
                this.DWObject.IfShowFileDialog = true;
                this.DWObject.Addon.PDF.SetConvertMode(Dynamsoft.EnumDWT_ConvertMode.CM_RENDERALL);
                this.DWObject.LoadImageEx("", Dynamsoft.EnumDWT_ImageType.IT_ALL, () => {}, () => {});
            },
        },
    };
</script>
```

> Note:
> * `containerId` specifies the DIV to create `DWT` viewer in which is defined in the template.
> * `OnWebTwainReady` is the callback triggered when the initialization succeeds.
> * `ProductKey` must be set to a valid trial or full key.
> * `ResourcesPath` is set to the location of the static files mentioned in [Configure the project](#configure-the-project).

### Try running the project

``` cmd
yarn serve
```

#### On desktop

If you have installed `DWT` and have configured a valid `ProductKey` . You will have a working page to scan documents from your scanner now. Otherwise, you should see instructions on the page that guide you to install the library. [More info>>]({{site.indepth}}initialize.html#installation-of-the-dynamsoft-service).

#### On mobile

You should be able to open a file or catpure an image.

## Official Samples

Check out the following two sample projects:

* [dwt-vue-simple](https://github.com/dynamsoft-dwt/dwt-vue-simple)

* [dwt-vue-advanced](https://github.com/dynamsoft-dwt/dwt-vue-advanced)
