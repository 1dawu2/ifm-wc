
//const { html } = require('./template.html');

var getScriptPromisify = (src) => {
  return new Promise((resolve) => {
    $.getScript(src, resolve);
  });
};

(function () {
  let _shadowRoot;
  let _score;
  let _oAuthURL;
  let _clientID;
  let _apiSecret;

  let div;
  let Ar = [];
  let widgetName;

  let tmpl = document.createElement("template");
  tmpl.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <div id="sacGrid"></div>
    <button class="button is-rounded">Rounded</button>
  `;

  //https://apis.google.com/js/api.js
  const googlesheetsjs = "http://localhost/SAC/sacgooglesheetstock/box/api.js";
  //https://www.amcharts.com/lib/4/core.js
  const amchartscorejs = "http://localhost/SAC/sacgooglesheetstock/box/core.js";
  //https://www.amcharts.com/lib/4/charts.js
  const amchartschartsjs = "http://localhost/SAC/sacgooglesheetstock/box/charts.js";
  //https://www.amcharts.com/lib/4/themes/animated.js
  const amchartsanimatedjs = "http://localhost/SAC/sacgooglesheetstock/box/animated.js";
  // https://cdnjs.cloudflare.com/ajax/libs/axios/1.3.2/axios.min.js
  const axios = 'https://cdnjs.cloudflare.com/ajax/libs/axios/1.3.2/axios.min.js';



  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      let script = document.createElement('script');
      script.src = src;

      script.onload = () => { console.log("Load: " + src); resolve(script); }
      script.onerror = () => reject(new Error(`Script load error for ${src}`));

      shadowRoot.appendChild(script)
    });
  }

  class IFMStories extends HTMLElement {
    constructor() {
      super();

      _shadowRoot = this.attachShadow({
        mode: "open"
      });

      _shadowRoot.appendChild(tmpl.content.cloneNode(true));

      //this._root = this._shadowRoot.getElementById("root");

      this._props = {};

      this.render();

      this._export_settings = {};
      this._export_settings.restapiurl = "";
      this._export_settings.score = "";
      this._export_settings.name = "";
      this._export_settings.clientID = "";
      this._export_settings.apiSecret = "";
      this._export_settings.oAuthURL = "";

      this.addEventListener("click", event => {
        console.log('click');
      });

      this._firstConnection = 0;
      this._firstConnectionUI5 = 0;

    }

    // onCustomWidgetResize(width, height) {
    //   this.render();
    // }

    set myDataSource(dataBinding) {
      this._myDataSource = dataBinding;
      // console.log(this._myDataSource);
      this.render();
    }

    // async LoadLibs() {
    //   try {
    //     await loadScript(axios);
    //     // await loadScript(amchartscorejs);				
    //     // await loadScript(amchartschartsjs);				
    //     // await loadScript(amchartsanimatedjs);
    //   } catch (e) {
    //     alert(e);
    //   } finally {
    //     Draw(Ar, that._firstConnection);
    //     that._firstConnection = 1;
    //   }
    // }
    // LoadLibs();
    // async generateText() {
    //   const API_KEY = await axios.getApiKey();
    //   const API_ENDPOINT = "https://api.openai.com/v1/engines/text-davinci-002/jobs";

    //   const prompt = "What is the capital of France?";
    //   try {
    //     const response = await axios.post(API_ENDPOINT, {
    //       prompt: prompt,
    //       max_tokens: 100,
    //       temperature: 0.5,
    //       api_key: API_KEY
    //     });

    //     const generatedText = response.data.choices[0].text;
    //     console.log(generatedText);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    async render() {
      await getScriptPromisify(
        "https://cdn.jsdelivr.net/npm/gridjs/dist/gridjs.umd.js"
      );

      if (!this._myDataSource || this._myDataSource.state !== "success") {
        return;
      }

      const dimension = this._myDataSource.metadata.feeds.dimensions.values[0];
      const measure = this._myDataSource.metadata.feeds.measures.values[0];
      const data = this._myDataSource.data.map((data) => {
        return {
          name: data[dimension].label,
          value: data[measure].raw,
        };
      });

      // const grid = new window.gridjs.Grid({
      //   columns: ["Name", "Email", "Phone Number"],
      //   data: [
      //     ["John", "john@example.com", "(353) 01 222 3333"],
      //     ["Mark", "mark@gmail.com", "(01) 22 888 4444"],
      //     ["Eoin", "eoin@gmail.com", "0097 22 654 00033"],
      //     ["Sarah", "sarahcdd@gmail.com", "+322 876 1233"],
      //     ["Afshin", "afshin@mail.com", "(353) 22 87 8356"]
      //   ]
      // }).render(this.shadowRoot.getElementById("sacGrid"));

    }

    connectedCallback() {
      try {
        if (window.commonApp) {
          let outlineContainer = commonApp.getShell().findElements(true, ele => ele.hasStyleClass && ele.hasStyleClass("sapAppBuildingOutline"))[0]; // sId: "__container0"

          if (outlineContainer && outlineContainer.getReactProps) {
            let parseReactState = state => {
              let components = {};

              let globalState = state.globalState;
              let instances = globalState.instances;
              let app = instances.app["[{\"app\":\"MAIN_APPLICATION\"}]"];
              let names = app.names;

              for (let key in names) {
                let name = names[key];

                let obj = JSON.parse(key).pop();
                let type = Object.keys(obj)[0];
                let id = obj[type];

                components[id] = {
                  type: type,
                  name: name
                };
              }

              for (let componentId in components) {
                let component = components[componentId];
              }

              let metadata = JSON.stringify({
                components: components,
                vars: app.globalVars
              });

              if (metadata != this.metadata) {
                this.metadata = metadata;

                this.dispatchEvent(new CustomEvent("propertiesChanged", {
                  detail: {
                    properties: {
                      metadata: metadata
                    }
                  }
                }));
              }
            };

            let subscribeReactStore = store => {
              this._subscription = store.subscribe({
                effect: state => {
                  parseReactState(state);
                  return {
                    result: 1
                  };
                }
              });
            };

            let props = outlineContainer.getReactProps();
            if (props) {
              subscribeReactStore(props.store);
            } else {
              let oldRenderReactComponent = outlineContainer.renderReactComponent;
              outlineContainer.renderReactComponent = e => {
                let props = outlineContainer.getReactProps();
                subscribeReactStore(props.store);

                oldRenderReactComponent.call(outlineContainer, e);
              }
            }
          }
        }
      } catch (e) { }
    }

    disconnectedCallback() {
      if (this._subscription) { // react store subscription
        this._subscription();
        this._subscription = null;
      }
    }

    onCustomWidgetBeforeUpdate(changedProperties) {
      if ("designMode" in changedProperties) {
        this._designMode = changedProperties["designMode"];
      }
    }

    onCustomWidgetAfterUpdate(changedProperties) {
      UI5(changedProperties, this);
    }

    _renderExportButton() {
      let components = this.metadata ? JSON.parse(this.metadata)["components"] : {};
      console.log("_renderExportButton-components");
      // console.log(components);
    }

    _firePropertiesChanged() {
      this.score = "";
      this.dispatchEvent(new CustomEvent("propertiesChanged", {
        detail: {
          properties: {
            score: this.score
          }
        }
      }));
    }

    // SETTINGS
    get restapiurl() {
      return this._export_settings.restapiurl;
    }
    set restapiurl(value) {
      this._export_settings.restapiurl = value;
    }

    get name() {
      return this._export_settings.name;
    }
    set name(value) {
      this._export_settings.name = value;
    }

    get score() {
      return this._export_settings.score;
    }
    set score(value) {
      value = _score;
      this._export_settings.score = value;
    }

    get clientID() {
      return this._export_settings.clientID;
    }
    set clientID(value) {
      value = _clientID;
      this._export_settings.clientID = value;
    }

    get apiSecret() {
      return this._export_settings.apiSecret;
    }
    set apiSecret(value) {
      value = _apiSecret;
      this._export_settings.apiSecret = value;
    }

    get oAuthURL() {
      return this._export_settings.oAuthURL;
    }
    set oAuthURL(value) {
      value = _oAuthURL;
      this._export_settings.oAuthURL = value;
    }

    static get observedAttributes() {
      return [
        "restapiurl",
        "name",
        "score",
        "clientID",
        "apiSecret",
        "oAuthURL"
      ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue != newValue) {
        this[name] = newValue;
      }
    }

  }
  customElements.define("com-ifm-hack-stories", IFMStories);

  function UI5(changedProperties, that) {
    var that_ = that;

    div = document.createElement('div');
    widgetName = that._export_settings.name;
    div.slot = "content_" + widgetName;

    var restAPIURL = that._export_settings.restapiurl;
    // console.log("restAPIURL: " + restAPIURL);

    if (that._firstConnectionUI5 === 0) {
      // console.log("--First Time --");

      let div0 = document.createElement('div');
      div0.innerHTML = '<?xml version="1.0"?><script id="oView_' + widgetName + '" name="oView_' + widgetName + '" type="sapui5/xmlview"><mvc:View xmlns="sap.m" xmlns:mvc="sap.ui.core.mvc" xmlns:core="sap.ui.core" xmlns:l="sap.ui.layout" height="100%" controllerName="myView.Template"><l:VerticalLayout class="sapUiContentPadding" width="100%"><l:content></l:content><Button id="buttonId" class="sapUiSmallMarginBottom" text="Get Stories" width="150px" press=".onButtonPress" /><Table id="sacTable"></Table></l:VerticalLayout></mvc:View></script>';
      _shadowRoot.appendChild(div0);

      let div1 = document.createElement('div');
      div1.innerHTML = '<div id="ui5_content_' + widgetName + '" name="ui5_content_' + widgetName + '"><slot name="content_' + widgetName + '"></slot></div></div>';
      _shadowRoot.appendChild(div1);

      that_.appendChild(div);

      var mapcanvas_divstr = _shadowRoot.getElementById('oView_' + widgetName);

      Ar.push({
        'id': widgetName,
        'div': mapcanvas_divstr
      });
      // console.log(Ar);
    }

    sap.ui.getCore().attachInit(function () {
      "use strict";

      //### Controller ###
      sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/m/BusyDialog"
      ], function (Controller, BusyDialog) {
        "use strict";

        var busyDialog = (busyDialog) ? busyDialog : new BusyDialog({});

        return Controller.extend("myView.Template", {

          onButtonPress: function (oEvent) {
            var this_ = this;

            this_.wasteTime();

            var CLIENT_ID_str = _clientID;
            var API_SECRET_str = _apiSecret;
            var API_URL_str = _oAuthURL;

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = false;

            // xhr.addEventListener("readystatechange", function () {
            //   if (this.readyState === this.DONE) {
            //     console.log(this.responseText);
            //   }
            // });
            xhr.onreadystatechange = function () {
              if (this.readyState == 4 && this.status == 200) {
                var res = JSON.parse(this.responseText);
                buildTable(res);
              }
            };

            //setting request method
            //API endpoint for API sandbox 
            xhr.open("GET", restAPIURL);

            //adding request headers
            xhr.setRequestHeader("DataServiceVersion", "2.0");
            xhr.setRequestHeader("Accept", "application/json");

            //sending request
            xhr.send();
            // console.log("xhr reqeust:")
            // console.log(dataR);
            // _score = dataR;

            // Define a table [Note: you must include the table library to make the Table class work]

            function buildTable(data) {

              var oTable = new sap.ui.table.Table({
                title: "SAC Stories",
                visibleRowCount: 3,
                selectionMode: sap.ui.table.SelectionMode.Single,
                fixedColumnCount: 1,
                enableColumnReordering: true,
                width: "100%"
              });

              // Use the Object defined for table to add new column into the table

              oTable.addColumn(new sap.ui.table.Column({
                label: new sap.ui.commons.Label({ text: "Story ID" }),
                template: new sap.ui.commons.TextField().bindProperty("value", "name"),
                sortProperty: "name",
                filterProperty: "name",
                width: "125px"

              }));

              var oModel = new sap.ui.model.json.JSONModel();
              oModel.setData({ modelData: data });
              oTable.setModel(oModel);
              oTable.bindRows("/modelData");
              oTable.sort(oTable.getColumns()[0]);
              console.log(oTable);
              oTable.shadowRoot.getElementById("sacGrid");
              // this_.getView().byId("sacTable");
              // oTable.placeAt("div")

              this_.runNext();

            }
            // var dataD = JSON.stringify({
            //   "NamespaceID": "string",
            //   "ProviderID": "string",
            //   "EntitySetName": "string",
            //   "ExternalID": "string",
            //   "Description": "string"
            // });

            // var xhr = new XMLHttpRequest();
            // xhr.withCredentials = false;

            // xhr.addEventListener("readystatechange", function () {
            //   if (this.readyState === this.DONE) {
            //     console.log(this.responseText);
            //   }
            // });

            // //setting request method
            // //API endpoint for API sandbox 
            // xhr.open("POST", "https://infomotion1.eu10.hanacloudservices.cloud.sap/api/v1/dataexport/administration/Subscriptions");


            // //adding request headers
            // xhr.setRequestHeader("x-csrf-token", "Mandatory x-csrf-token that can be obtained by sending a GET request to <tenant-url>/api/v1/csrf with the header parameter x-csrf-token:fetch.");
            // xhr.setRequestHeader("DataServiceVersion", "2.0");
            // xhr.setRequestHeader("Accept", "application/json");
            // xhr.setRequestHeader("Content-Type", "application/json");


            // //sending request
            // xhr.send(dataD);

            // $.ajax({
            //   type: 'POST',
            //   url: API_URL_str,
            //   contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            //   crossDomain: false,
            //   cache: true,
            //   dataType: 'json',
            //   data: {
            //     client_id: CLIENT_ID_str,
            //     client_secret: API_SECRET_str,
            //     grant_type: 'client_credentials',
            //   },

            //   success: function (data) {
            //     console.log("get token:")
            //     console.log(data);

            //     var access_token = data.access_token;
            //     console.log(access_token);

            //     $.ajax({
            //       url: restAPIURL,
            //       type: 'POST',
            //       headers: {
            //         "Authorization": "Bearer " + access_token,
            //         "Content-Type": "application/x-www-form-urlencoded"
            //       },
            //       data: $.param({
            //         // "partnernumber": partnernumber
            //       }),
            //       async: true,
            //       timeout: 0,
            //       contentType: 'application/x-www-form-urlencoded',
            //       success: function (data) {
            //         this_.runNext();
            //         _score = data;
            //         console.log("REST API Data:")
            //         console.log(data);

            //         that._firePropertiesChanged();
            //         this.settings = {};
            //         this.settings.score = "";

            //         that.dispatchEvent(new CustomEvent("onStart", {
            //           detail: {
            //             settings: this.settings
            //           }
            //         }));

            //       },
            //       error: function (e) {
            //         this_.runNext();
            //         console.log("error: " + e);
            //         console.log(e);
            //       }
            //     });

            //   },
            //   error: function (e) {
            //     this_.runNext();
            //     console.log(e.responseText);
            //   }
            // });

          },

          wasteTime: function () {
            busyDialog.open();
          },

          runNext: function () {
            busyDialog.close();
          },
        });
      });

      console.log("widgetName:" + widgetName);
      var foundIndex = Ar.findIndex(x => x.id == widgetName);
      var divfinal = Ar[foundIndex].div;

      //### THE APP: place the XMLView somewhere into DOM ###
      var oView = sap.ui.xmlview({
        viewContent: jQuery(divfinal).html(),
      });

      oView.placeAt(div);

      if (that_._designMode) {
        oView.byId("buttonId").setEnabled(false);
        // oView.byId("sacTable").setEnabled(false);
      } else {
        oView.byId("buttonId").setEnabled(true);
        // oView.byId("sacTable").setEnabled(true);
      }
    });
  }
})();