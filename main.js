(function () {
  let _shadowRoot;
  let _oAuthURL;
  let _clientID;
  let _apiSecret;
  let ifmLogo = "https://1dawu2.github.io/ifm-wc/assets/logo.svg";
  let backImg = "https://1dawu2.github.io/ifm-wc/assets/backImg.jpg";

  let tmpl = document.createElement("template");
  tmpl.innerHTML = `
    <style>
      :host(.side-navigation-demo) {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
      
        -webkit-box-direction: normal;
        -webkit-box-orient: vertical;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
      
        max-width: 15rem;
      }
    </style>
    <div id="ui5_content" name="ui5_content">
    <slot name="content"></slot>
    </div>
    <script id="oView" name="oView" type="sapui5/xmlview">
      <mvc:View 
        controllerName="ifm.hack.initial"
        xmlns:tnt="sap.tnt"
        xmlns:l="sap.ui.layout"
        xmlns="sap.ui.table"
        xmlns:mvc="sap.ui.core.mvc"
        xmlns:m="sap.m"
        xmlns:core="sap.ui.core"
      >
        <m:Button
          text="Toggle Collapse/Expand"
          icon="sap-icon://menu2"
          press=".onCollapseExpandPress"
        />
        <m:Button
          text="Show/Hide Sub Item 3"
          icon="sap-icon://menu2"
          press=".onHideShowSubItemPress"
        />
        <tnt:SideNavigation id="sideNavigation" selectedKey="subItem3">
          <tnt:NavigationList>
            <tnt:NavigationListItem text="Item 1" icon="sap-icon://employee">
              <tnt:NavigationListItem text="Sub Item 1" />
              <tnt:NavigationListItem text="Sub Item 2" />
              <tnt:NavigationListItem text="Sub Item 3" id="subItem3" key="subItem3" />
              <tnt:NavigationListItem text="Sub Item 4" />
            </tnt:NavigationListItem>
            <tnt:NavigationListItem text="Item 2" icon="sap-icon://building">
              <tnt:NavigationListItem text="Sub Item 1" />
              <tnt:NavigationListItem text="Sub Item 2" />
              <tnt:NavigationListItem text="Sub Item 3" />
              <tnt:NavigationListItem text="Sub Item 4" />
            </tnt:NavigationListItem>
          </tnt:NavigationList>
          <tnt:fixedItem>
            <tnt:NavigationList>
              <tnt:NavigationListItem text="Item 1" icon="sap-icon://employee" />
              <tnt:NavigationListItem text="Item 2" icon="sap-icon://building" />
              <tnt:NavigationListItem text="Item 3" icon="sap-icon://card" />
            </tnt:NavigationList>
          </tnt:fixedItem>
        </tnt:SideNavigation>
        <m:Panel id="oHeader" width="auto" class="sapUiResponsiveMargin">
          <m:VBox alignItems="Center">
            <m:Avatar
              src="${ifmLogo}"
              displaySize="XL"
              showBorder="false"
            />
            <m:Image
              src="${backImg}"
              height="100%"
              width="100%"
              backgroundSize="contain"
              backgroundPosition="center center"
            />
            <m:Text text="IFM Health Analysis Conversion Kit" class="sapUiSmallMarginTop"/>
          </m:VBox>
        </m:Panel>
        <m:Panel id="oPanel" width="auto" class="sapUiResponsiveMargin"
        />
      </mvc:View>
    </script>
    <div id="content"></div>
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

    buildUI(that) {

      var that_ = that;

      let content = document.createElement('div');
      content.slot = "content";
      that_.appendChild(content);

      sap.ui.require([
        "sap/ui/core/mvc/Controller"
      ], function (Controller) {
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
            var data = [{
              "fname": "Akhilesh",
              "lname": "Upadhyay"
            }, {
              "fname": "Aakanksha",
              "lname": "Gupta"
            }];

            var oModel = new sap.ui.model.json.JSONModel();
            oModel.setData({ DLList: data });

            var oModelTest = new sap.ui.model.json.JSONModel();
            var sHeaders = { "DataServiceVersion": "2.0", "Accept": "application/json" };
            var resURL = that_._export_settings.restapiurl.replace('stories?include=models','Resources');
            oModelTest.loadData(that_._export_settings.restapiurl, null, true, "GET", null, false, sHeaders);
            oModelTest.attachRequestCompleted(function (oEvent) {
              var oData = oEvent.getSource().oData;
              console.log(oData);
            });

            var oTable = new sap.ui.table.Table({
              title: "SAC Story/Application Overview:",
              showNoData: true,
              visibleRowCount: 10,
              backgroundDesign: "Translucent "
            });

            oTable.addColumn(new sap.ui.table.Column({
              label: new sap.ui.commons.Label({ text: "First Name" }),
              template: new sap.ui.commons.TextView({ text: "{model1>fname}" })
            }));

            oTable.addColumn(new sap.ui.table.Column({
              label: new sap.ui.commons.Label({ text: "Last Name" }),
              template: new sap.ui.commons.TextView({ text: "{model1>lname}" })
            }));

            oTable.setModel(oModel, "model1");
            oTable.bindRows("model1>/DLList");

            this.oPanel.addContent(oTable);
          }

        });
      });

      // sap.ui.controller("ifm.hack.initial", {

      // });

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
      this.buildUI(this);
    }

    onCustomWidgetAfterUpdate(changedProperties) {
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

})();