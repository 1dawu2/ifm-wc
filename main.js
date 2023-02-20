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
  <mvc:View
      xmlns="sap.m"
      xmlns:mvc="sap.ui.core.mvc"
      xmlns:smartFilterBar="sap.ui.comp.smartfilterbar"
      xmlns:smartTable="sap.ui.comp.smarttable"
      xmlns:html="http://www.w3.org/1999/xhtml"
      controllerName="ifm.hack.Template"
      height="100%">

        <!-- use this to make the table occupy the available screen height -->
        <VBox fitContainer="true">
          <smartFilterBar:SmartFilterBar id="smartFilterBar" entitySet="LineItemsSet" persistencyKey="SmartFilter_Explored" basicSearchFieldName="Bukrs" enableBasicSearch="true" >
            <smartFilterBar:controlConfiguration>
              <smartFilterBar:ControlConfiguration key="Bukrs">
              <smartFilterBar:defaultFilterValues>
                  <smartFilterBar:SelectOption low="0001">
                  </smartFilterBar:SelectOption>
                </smartFilterBar:defaultFilterValues>
              </smartFilterBar:ControlConfiguration>
              <smartFilterBar:ControlConfiguration key="Gjahr">
                <smartFilterBar:defaultFilterValues>
                    <smartFilterBar:SelectOption low="2014">
                    </smartFilterBar:SelectOption>
                  </smartFilterBar:defaultFilterValues>
                </smartFilterBar:ControlConfiguration>
            </smartFilterBar:controlConfiguration>
            <!-- layout data used to make the table growing but the filter bar fixed -->
            <smartFilterBar:layoutData>
              <FlexItemData shrinkFactor="0"/>
            </smartFilterBar:layoutData>
          </smartFilterBar:SmartFilterBar>
          <smartTable:SmartTable id="LineItemsSmartTable" entitySet="LineItemsSet" smartFilterId="smartFilterBar" tableType="Table" useExportToExcel="true" beforeExport="onBeforeExport" useVariantManagement="true" useTablePersonalisation="true" header="Line Items" showRowCount="true" persistencyKey="SmartTableAnalytical_Explored" enableAutoBinding="true" class="sapUiResponsiveContentPadding" enableAutoColumnWidth="true" editTogglable="true" app:useSmartToggle="true">
            <!-- layout data used to make the table growing but the filter bar fixed -->
            <smartTable:layoutData>
              <FlexItemData growFactor="1" baseSize="0%"/>
            </smartTable:layoutData>
          </smartTable:SmartTable>
        </VBox>
  </mvc:View>`;

  class IFMStories extends HTMLElement {
    constructor() {
      super();

      _shadowRoot = this.attachShadow({
        mode: "open"
      });

      _shadowRoot.appendChild(tmpl.content.cloneNode(true));

      getStoryMetaData();

      this._export_settings = {};
      this._export_settings.restapiurl = "";
      this._export_settings.score = "";
      this._export_settings.name = "";
      this._export_settings.clientID = "";
      this._export_settings.apiSecret = "";
      this._export_settings.oAuthURL = "";

      this._firstConnection = 0;
      this._firstConnectionUI5 = 0;

    }

    async render() {
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
    }

    onCustomWidgetResize(width, height) {
    }

    set myDataSource(dataBinding) {
      this._myDataSource = dataBinding;
    }

    connectedCallback() {
      try {
        if (window.commonApp) {
          let outlineContainer = commonApp.getShell().findElements(true, ele => ele.hasStyleClass && ele.hasStyleClass("sapAppBuildingOutline"))[0]; // sId: "__container0"

          if (outlineContainer && outlineContainer.getReactProps) {
            let parseReactState = state => {
              let components = {};

              let globalState = state.globalState;
              console.log("global state:")
              console.log(globalState);
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
                console.log("meta data:");
                console.log(metadata);

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

  // UTILS
  function requestResource() {

    // X-CSRF-Token = FPA_CSRF_TOKEN "6587FFC74BC9E440AE845312E4B240A8"
    // Content-Type = "application/json;charset=utf-8"
    // "{"action":"startEdit","data":{"resourceId":"DDA04A05753124D2130C61D4D6C0AABC"}}"
    // "POST"
    // "/sap/fpa/services/rest/epm/contentlib?tenant=K"

    // isOptimizedDesignEnabled: function() {
    //   if (R.isActive("UQM_INTEGRATION_DESIGN_MODE")) {
    //       var e = this.getStoryModel();
    //       return !(!e.isOptimizedDesignEnabled || !e.isOptimizedDesignEnabled())
    //   }
    //   return !1

    //   _fnConvertOptimizedDesignMode

    //   _fnConvertStory2

    //   UnsupportedFeatures

    //   getCoreConverters: function() {
    //     return Object.assign({}, {
    //         unifiedTransformation: i(13186),
    //         filters: i(4082),
    //         pageGroups: i(18896),
    //         chart: i(13187),
    //         table: i(13188),
    //         geo: i(12896),
    //         datasetLinks: i(18899),
    //         calculations: i(13189),
    //         rss: i(12897),
    //         pictogram: i(13190),
    //         tableKPIs: i(12630),
    //         fieldSelection: i(19241).B,
    //         threshold: i(1510).g,
    //         storyQuerySettings: i(1504)

  }

  function getStoryMetaData() {
    // DASHBOARD_OBJECT_TYPE: "STORY",
    // DASHBOARD_OBJECT_APPLICATION_TYPE: "APPLICATION",
    // OBJECT_MANAGER_SERVICE: "EPM/ObjectMgr",
    // CONTENT_LIB_SERVICE: "EPM/Contentlib",
    // STORY_SERVICE: "fpa.StoryService",
    let shellCont = sap.fpa.ui.story.Utils.getShellContainer();

    console.log(shellCont);
    console.log(window.sap);
    console.log(sap.fpa);
    console.log(sap.fpa.ui.story.Story.getMetadata("59A395046F3F8A41401B0B1C28FD787D"));
    // console.log(sap.fpa.ui.story.Utils.getStoryNameList());
    let contentLib = sap.fpa.ui.infra.service.ServiceManager.getService("EPM/Contentlib");
    console.log(contentLib);
    let storyService = sap.fpa.ui.infra.service.ServiceManager.getService("fpa.StoryService");
    console.log(storyService);
    let isOptimizeA = sap.fpa.ui.story.Utils.isOptimizedDesignMode();
    console.log(isOptimizeA);
    let context = sap.fpa.ui.infra.common.getContext();

    let context2 = sap.fpa.ui.infra.common.getContext("59A395046F3F8A41401B0B1C28FD787D");
    console.log(context2);
    console.log(context);
    let app = sap.fpa.ui.infra.common.getContext().getInternalAppArguments("59A395046F3F8A41401B0B1C28FD787D");
    console.log(app);
    let findAggregatedObjects = fn => sap.fpa.ui.story.Utils.getShellContainer().getCurrentPage().getComponentInstance().findAggregatedObjects(true, fn);
    console.log(findAggregatedObjects);
    let documentContext = findAggregatedObjects(e => e.getMetadata().hasProperty("resourceType") && e.getProperty("resourceType") == "STORY")[0].getDocumentContext();
    let testProperty = findAggregatedObjects(e => e.getMetadata().hasProperty("/analytic/optimizedDesignEnabled"));
    let storyInstance = documentContext.get("sap.fpa.story.instanceId");
    console.log(storyInstance);
    console.log(testProperty);
    console.log(documentContext);
    let storyModel = documentContext.get("sap.fpa.story.getstorymodel");
    console.log(storyModel);
    console.log(storyModel.getApplicationEntity());
    let isOptimized = documentContext.get("sap.fpa.story.optimized.model.validator");
    console.log(isOptimized);
    let docuStore = documentContext.get("sap.fpa.story.documentStore");
    console.log(docuStore);
    let story2 = documentContext.get("sap.fpa.story.optimizedModeFeaturesValidator");
    console.log(story2);

  }

  function UI5(changedProperties, that) {
    var that_ = that;

    // div = document.createElement('div');
    // widgetName = that._export_settings.name;
    // div.slot = "content_" + widgetName;

    // if (that._firstConnectionUI5 === 0) {
    //   console.log("--First Time --");

    //   let div0 = document.createElement('div');
    //   div0.innerHTML = '<?xml version="1.0"?><script id="oView_' + widgetName + '" name="oView_' + widgetName + '" type="sapui5/xmlview"><mvc:View xmlns="sap.m" xmlns:mvc="sap.ui.core.mvc" xmlns:core="sap.ui.core" xmlns:l="sap.ui.layout" height="100%" controllerName="myView.Template"><l:VerticalLayout class="sapUiContentPadding" width="100%"><l:content></l:content><Button id="buttonId" class="sapUiSmallMarginBottom" text="Get Stories" width="150px" press=".onButtonPress" /></l:VerticalLayout></mvc:View></script>';
    //   _shadowRoot.appendChild(div0);

    //   let div1 = document.createElement('div');
    //   div1.innerHTML = '<div id="ui5_content_' + widgetName + '" name="ui5_content_' + widgetName + '"><slot name="content_' + widgetName + '"></slot></div></div>';
    //   _shadowRoot.appendChild(div1);

    //   that_.appendChild(div);

    //   var mapcanvas_divstr = _shadowRoot.getElementById('oView_' + widgetName);

    //   Ar.push({
    //     'id': widgetName,
    //     'div': mapcanvas_divstr
    //   });
    // }

    sap.ui.getCore().attachInit(function () {
      "use strict";

      //### Controller ###
      sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/m/BusyDialog"
      ], function (Controller, BusyDialog) {
        "use strict";

        var busyDialog = (busyDialog) ? busyDialog : new BusyDialog({});

        return Controller.extend("ifm.hack.Template", {

          onInit: function () {

            var this_ = this;

            this_.wasteTime();

            var CLIENT_ID_str = _clientID;
            var API_SECRET_str = _apiSecret;
            var API_URL_str = _oAuthURL;
            var restAPIURL = that._export_settings.restapiurl;

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = false;

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

            // Define a table [Note: you must include the table library to make the Table class work]
            function buildTable(data) {


              var oView = this_.getView();
              var oModel = new sap.ui.model.json.JSONModel();
              oModel.setData(data);
              oView.setModel(oModel);

              this_.runNext();

            }
          },

          onBeforeExport: function (oEvt) {
            var mExcelSettings = oEvt.getParameter("exportSettings");
            // GW export
            if (mExcelSettings.url) {
              return;
            }
            // For UI5 Client Export --> The settings contains sap.ui.export.SpreadSheet relevant settings that be used to modify the output of excel

            // Disable Worker as Mockserver is used in Demokit sample --> Do not use this for real applications!
            mExcelSettings.worker = false;
          },

          // onButtonPress: function (oEvent) {
          //   var this_ = this;

          //   this_.wasteTime();

          //   var CLIENT_ID_str = _clientID;
          //   var API_SECRET_str = _apiSecret;
          //   var API_URL_str = _oAuthURL;
          //   var restAPIURL = that._export_settings.restapiurl;

          //   var xhr = new XMLHttpRequest();
          //   xhr.withCredentials = false;

          //   xhr.onreadystatechange = function () {
          //     if (this.readyState == 4 && this.status == 200) {
          //       var res = JSON.parse(this.responseText);
          //       buildTable(res);
          //     }
          //   };

          //   //setting request method
          //   //API endpoint for API sandbox 
          //   xhr.open("GET", restAPIURL);

          //   //adding request headers
          //   xhr.setRequestHeader("DataServiceVersion", "2.0");
          //   xhr.setRequestHeader("Accept", "application/json");

          //   //sending request
          //   xhr.send();

          //   // Define a table [Note: you must include the table library to make the Table class work]
          //   function buildTable(data) {

          //     var oTable = new sap.ui.table.Table({
          //       title: "SAC Stories",
          //       selectionMode: sap.ui.table.SelectionMode.Single,
          //       fixedColumnCount: 1,
          //       enableColumnReordering: true,
          //       width: "800px"
          //     });

          //     // Use the Object defined for table to add new column into the table
          //     oTable.addColumn(new sap.ui.table.Column({
          //       label: new sap.ui.commons.Label({ text: "Story ID" }),
          //       template: new sap.ui.commons.TextField().bindProperty("value", "name"),
          //       sortProperty: "name",
          //       filterProperty: "name",
          //       width: "125px"

          //     }));

          //     var oModel = new sap.ui.model.json.JSONModel();
          //     oModel.setData({ modelData: data });
          //     oTable.setModel(oModel);
          //     oTable.bindRows("/modelData");
          //     oTable.sort(oTable.getColumns()[0]);
          //     oTable.placeAt(_shadowRoot.getElementById('ui5_content_' + widgetName));

          //     this_.runNext();

          //   }
          // },

          wasteTime: function () {
            busyDialog.open();
          },

          runNext: function () {
            busyDialog.close();
          },
        });
      });

      // var foundIndex = Ar.findIndex(x => x.id == widgetName);
      // var divfinal = Ar[foundIndex].div;

      //### THE APP: place the XMLView somewhere into DOM ###
      // var oView = sap.ui.xmlview({
      //   viewContent: jQuery(divfinal).html(),
      // });

      // oView.placeAt(div);

      if (that_._designMode) {
        oView.byId("buttonId").setEnabled(false);

      } else {
        oView.byId("buttonId").setEnabled(true);
      }
    });
  }
})();