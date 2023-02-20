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
      <script id="oView" name="oView" type="sapui5/xmlview">
      <mvc:View
          controllerName="ifm.hack.controller"
          xmlns="sap.ui.table"
          xmlns:mvc="sap.ui.core.mvc"
          xmlns:u="sap.ui.unified"
          xmlns:c="sap.ui.core"
          xmlns:m="sap.m"
      height="100%">
          <m:Page
            showHeader="false"
            enableScrolling="false"
            class="sapUiContentPadding">
            <m:content>
              <Table
                selectionMode="MultiToggle"
                visibleRowCount="7"
                ariaLabelledBy="title">
                <extension>
                  <m:OverflowToolbar style="Clear">
                    <m:Title id="title" text="Products"/>
                  </m:OverflowToolbar>
                </extension>
                <columns>
                  <Column width="11rem">
                    <m:Label text="Product Name" />
                    <template>
                      <m:Text text="test1" wrapping="false" />
                    </template>
                  </Column>
                  <Column width="11rem">
                    <m:Label text="Product Id" />
                    <template>
                      <m:Input value="test2"/>
                    </template>
                  </Column>
                </columns>
              </Table>
            </m:content>
          </m:Page>
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

      // getStoryMetaData();

      this._export_settings = {};
      this._export_settings.restapiurl = "";
      this._export_settings.score = "";
      this._export_settings.name = "";
      this._export_settings.clientID = "";
      this._export_settings.apiSecret = "";
      this._export_settings.oAuthURL = "";

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