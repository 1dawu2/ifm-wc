(function () {
  let _shadowRoot;
  let _oAuthURL;
  let _clientID;
  let _apiSecret;
  let ifmLogo = "https://1dawu2.github.io/ifm-wc/assets/logo.svg";
  let backImg = "https://1dawu2.github.io/ifm-wc/assets/backImg.png";

  let tmpl = document.createElement("template");
  tmpl.innerHTML = `
    <style>
    </style>
    <div id="ui5_content" name="ui5_content">
    <slot name="content"></slot>
    </div>
    <script id="oView" name="oView" type="sapui5/xmlview">
    <mvc:View
      controllerName="ifm.hack.initial"
      xmlns:t="sap.ui.table"
      xmlns:m="sap.m"
      xmlns:mvc="sap.ui.core.mvc"
      xmlns:core="sap.ui.core"
      xmlns:tnt="sap.tnt"
      height="100%"
      class="side-navigation-demo"
    >
      <tnt:ToolPage id="toolPage">
        <tnt:header>
          <tnt:ToolHeader>
            <m:Button
              id="sideNavigationToggleButton"
              icon="sap-icon://menu2"
              type="Transparent"
              press=".onSideNavButtonPress">
              <layoutData>
                <OverflowToolbarLayoutData priority="NeverOverflow" />
              </layoutData>
            </m:Button>
            <m:ToolbarSpacer width="20px" />
            <m:Button text="File" type="Transparent">
              <layoutData>
                <OverflowToolbarLayoutData priority="Low" />
              </layoutData>
            </m:Button>
          </tnt:ToolHeader>
        </tnt:header>
        <tnt:sideContent>
          <tnt:SideNavigation
            expanded="true"
            selectedKey="{/selectedKey}"
            itemSelect=".onItemSelect">
            <tnt:NavigationList">
              <tnt:NavigationListItem text="Item 1" icon="sap-icon://action-settings" key="root">
                <tnt:NavigationListItem text="Sub Item 1" />
                <tnt:NavigationListItem text="Sub Item 3" id="subItem3" key="subItem3" />
              </tnt:NavigationListItem>
            </tnt:NavigationList>
            <tnt:fixedItem>
              <tnt:NavigationList>
                <tnt:NavigationListItem text="Item 1" icon="sap-icon://employee" />
              </tnt:NavigationList>
            </tnt:fixedItem>
          </tnt:SideNavigation>
        </tnt:sideContent>
        <tnt:mainContents>
          <m:NavContainer id="pageContainer" initialPage="root">
            <core:pages>
              <m:ScrollContainer
                id="root"
                horizontal="false"
                vertical="true"
                height="100%">
                <m:headerToolbar>
                  <m:OverflowToolbar>
                    <m:Title text="IFM Health Analysis Conversion Kit" level="H2"/>
                    <m:ToolbarSpacer/>
                    <m:Button icon="sap-icon://refresh" press="onTableRefresh" >
                      <m:layoutData>
                        <m:OverflowToolbarLayoutData priority="NeverOverflow" />
                      </m:layoutData>
                    </m:Button>
                    <m: Button icon="sap-icon://action-settings" press="onSettingsPressed" >
                      <m:layoutData>
                        <m:OverflowToolbarLayoutData priority="NeverOverflow" />
                      </m:layoutData>
                    </Button>
                    <m:Avatar
                      src="${ifmLogo}"
                      displaySize="S"
                    />
                  </m:OverflowToolbar>
                </m:headerToolbar>				
                <m:Panel id="oPanel" width="auto" class="sapUiResponsiveMargin"
                />
              </m:ScrollContainer>
            </core:pages>
          </m:NavContainer>
        </tnt:mainContents>
      </tnt:ToolPage>
    </mvc:View>
    </script>
  `;
  class IFMStories extends HTMLElement {
    constructor() {
      super();

      _shadowRoot = this.attachShadow({
        mode: "open"
      });

      _shadowRoot.appendChild(tmpl.content.cloneNode(true));

      this._export_settings = {};
      this._export_settings.restapiurl = "";
      this._export_settings.name = "";
      this._export_settings.clientID = "";
      this._export_settings.apiSecret = "";
      this._export_settings.oAuthURL = "";

    }

    drawMenu() {

    
    }

    buildUI(changedProperties, that) {

      // testing
      getSACMetadata();
      prepareJSON2OModel();

      var that_ = that;

      let content = document.createElement('div');
      content.slot = "content";
      that_.appendChild(content);

      sap.ui.define(
        [
          "sap/ui/core/mvc/Controller",
          "sap/ui/core/format/DateFormat",
        ],
        function (Controller) {
          "use strict";

          return Controller.extend("ifm.hack.initial", {

            onCollapseExpandPress: function () {
              var oSideNavigation = this.byId("sideNavigation");
              var bExpanded = oSideNavigation.getExpanded();

              oSideNavigation.setExpanded(!bExpanded);
            },

            onHideShowSubItemPress: function () {
              var oNavListItem = this.byId("subItem3");
              oNavListItem.setVisible(!oNavListItem.getVisible());
            },

            onInit: function (oEvent) {
              this.oPanel = this.byId("oPanel");
              this.bindTable();
            },
            bindTable: function () {
              var oBusy = new sap.m.BusyDialog();
              var oModel = new sap.ui.model.json.JSONModel();
              oModel.attachRequestSent(function () {
                oBusy.open();
              });
              var sHeaders = { "DataServiceVersion": "2.0", "Accept": "application/json" };
              oModel.loadData(that_._export_settings.restapiurl, null, true, "GET", null, false, sHeaders);
              oModel.attachRequestCompleted(function (oEvent) {
                var oData = oEvent.getSource().oData;
                console.log(oData);
                oBusy.close();
              });

              var oTable = new sap.ui.table.Table({
                title: "SAC Story/Application Overview:",
                showNoData: true,
                visibleRowCount: 100,
                firstVisibleRow: 10,
                navigationMode: sap.ui.table.NavigationMode.Paginator
              });

              oTable.addColumn(new sap.ui.table.Column({
                label: new sap.ui.commons.Label({ text: "Name" }),
                template: new sap.ui.commons.TextView({ text: "{resources>name}" }),
                sortProperty: "Name",
                filterProperty: "Name",
              }));

              oTable.addColumn(new sap.ui.table.Column({
                label: new sap.ui.commons.Label({ text: "Description" }),
                template: new sap.ui.commons.TextView({ text: "{resources>description}" }),
                sortProperty: "Descriptione",
                filterProperty: "Descriptione",
              }));

              oTable.setModel(oModel, "artefact");
              // oTable.bindRows("model1>/DLList");

              this.oPanel.addContent(oTable);
            }

          });

        });

      //### THE APP: place the XMLView somewhere into DOM ###
      var oView = new sap.ui.core.mvc.XMLView({
        viewContent: jQuery(_shadowRoot.getElementById("oView")).html(),
      });
      oView.placeAt(content);

    }

    onCustomWidgetResize(width, height) {
    }

    connectedCallback() {
    }

    disconnectedCallback() {
    }

    onCustomWidgetBeforeUpdate(changedProperties) {
      this.drawMenu();
    }

    onCustomWidgetAfterUpdate(changedProperties) {
      this.buildUI(changedProperties, this);
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
  function getSACMetadata() {
    // prepare meta data
    let findAggregatedObjects;

    let shell = commonApp.getShell();
    if (shell) { // old SAC
      findAggregatedObjects = fn => shell.findElements(true, fn);
    }
    if (!findAggregatedObjects) { // new SAC
      findAggregatedObjects = fn => sap.fpa.ui.story.Utils.getShellContainer().getCurrentPage().getComponentInstance().findAggregatedObjects(true, fn);
      console.log("Aggregated Objects:");
      console.log(findAggregatedObjects);
    }

    let documentContext = findAggregatedObjects(e => e.getMetadata().hasProperty("resourceType") && e.getProperty("resourceType") == "STORY")[0].getDocumentContext();
    let storyModel = documentContext.get("sap.fpa.story.getstorymodel");
    console.log("Story Model:");
    console.log(storyModel);
    let entityService = documentContext.get("sap.fpa.bi.entityService");
    console.log("Entity Service:");
    console.log(entityService);
    let widgetControls = documentContext.get("sap.fpa.story.document.widgetControls");
    console.log("Widget Controls");
    console.log(widgetControls);

  }

  function getAppId(context) {
    let app = (context || sap.fpa.ui.infra.common.getContext()).getInternalAppArguments(); // sap.fpa.ui.story.Utils.getInternalAppArguments()
    return app && (app.appId /* application */ || app.resource_id /* story */);
  }

  function prepareJSON2OModel() {
    // enhance SAC/App URL
    if (window.sap && sap.fpa && sap.fpa.ui && sap.fpa.ui.infra) {

      if (sap.fpa.ui.infra.common) {

        var context = sap.fpa.ui.infra.common.getContext();
        var appid = getAppId(context);
        console.log("AppID:");
        console.log(appid);

        if (context.getTenantUrl) {

          var tenant_URL = context.getTenantUrl(false);
          console.log("Tenant URL:");
          console.log(tenant_URL);
          var urlPattern = `"${tenant_URL}/app.html#/story&/s/<STORY_ID>/?mode=view"`;
          // example:
          //https://infomotion1.eu10.hanacloudservices.cloud.sap/sap/fpa/ui/tenants/65182/app.html#/story&/s/59A395046F3F8A41401B0B1C28FD787D/?mode=view
        }
      }
    }
  }

})();