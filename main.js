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


  let tmpl = document.createElement("template");
  tmpl.innerHTML = `
    <script id="sap-ui-bootstrap"
      data-sap-ui-theme="sap_bluecrystal"
      data-sap-ui-xx-bindingSyntax="complex"
      data-sap-ui-libs="sap.m, sap.ui.commons, sap.ui.table">
    </script>

    <script id="view1" type="ui5/xmlview">
      <mvc:View 
        controllerName="view1.initial"
        xmlns="sap.ui.table"
          xmlns:mvc="sap.ui.core.mvc"
          xmlns:m="sap.m"
          xmlns:u="sap.ui.unified"
          xmlns:core="sap.ui.core" >
      
      <m:Panel id="oPanel"/>
      
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

      this.buildTable();

      // getStoryMetaData();

      this._export_settings = {};
      this._export_settings.restapiurl = "";
      this._export_settings.score = "";
      this._export_settings.name = "";
      this._export_settings.clientID = "";
      this._export_settings.apiSecret = "";
      this._export_settings.oAuthURL = "";

    }

    buildTable() {

      sap.ui.controller("view1.initial", {
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

          var oTable = new sap.ui.table.Table({
            title: "Table binding",
            showNoData: true,
            visibleRowCount: 5
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

      var oView = sap.ui.xmlview({
        viewContent: jQuery("#view1").html()
      });

      oView.placeAt("content");

      // var naughtyList = [
      //   { lastName: "Dente", name: "Al", stillNaughty: true },
      //   { lastName: "Friese", name: "Andy", stillNaughty: true },
      //   { lastName: "Mann", name: "Anita", stillNaughty: false }
      // ];

      // var oModel = new sap.ui.model.json.JSONModel();
      // oModel.setData(naughtyList);
      // // instantiate the table
      // sap.ui.getCore().applyTheme("sap_belize");
      // var oTable = new sap.ui.table.Table({
      //   selectionMode: sap.ui.table.SelectionMode.Single,
      //   selectionBehavior: sap.ui.table.SelectionBehavior.Row
      // });

      // // define the Table columns and the binding values
      // oTable.addColumn(new sap.ui.table.Column({
      //   label: new sap.ui.commons.Label({ text: "Last Name" }),
      //   template: new sap.ui.commons.TextView({ text: "{lastName}" })
      // }));

      // oTable.addColumn(new sap.ui.table.Column({
      //   label: new sap.ui.commons.Label({ text: "First Name" }),
      //   template: new sap.ui.commons.TextField({ value: "{name}" })
      // }));

      // oTable.addColumn(new sap.ui.table.Column({
      //   label: new sap.ui.commons.Label({ text: "Still Naughty" }),
      //   template: new sap.ui.commons.CheckBox({ checked: '{stillNaughty}' })
      // }));

      // oTable.setModel(oModel);
      // oTable.bindRows("/");
      // oTable.placeAt("content");

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

    connectedCallback() {
    }

    disconnectedCallback() {
    }

    onCustomWidgetBeforeUpdate(changedProperties) {
    }

    onCustomWidgetAfterUpdate(changedProperties) {
    }

    // Data Binding
    set myDataSource(dataBinding) {
      this._myDataSource = dataBinding;
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

})();