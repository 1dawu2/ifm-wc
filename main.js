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
              press=".onCollapseExpandPress">
              <m:layoutData>
                <m:OverflowToolbarLayoutData priority="NeverOverflow" />
              </m:layoutData>
            </m:Button>
            <m:ToolbarSpacer width="20px" />
            <m:Avatar
              src="${ifmLogo}"
              displaySize="S"
              backgroundColor="Transparent"
              displayShape="Square"
              showBorder="false"
            />           
          </tnt:ToolHeader>
        </tnt:header>
        <tnt:sideContent>
          <tnt:SideNavigation
            selectedKey="subItem3"
            itemSelect=".onItemSelect">
            <tnt:NavigationList id="navigationList">
              <tnt:NavigationListItem text="About IFM HACK" icon="sap-icon://electrocardiogram" id="item1" key="item1">
                <tnt:NavigationListItem text="Unsupported Features" icon="sap-icon://quality-issue" id="item2" key="item2"/>
                <tnt:NavigationListItem text="Page 13" icon="sap-icon://electrocardiogram" id="item3" key="item3"/>
              </tnt:NavigationListItem>
            </tnt:NavigationList>
            <tnt:fixedItem>
              <tnt:NavigationList>
                <tnt:NavigationListItem text="INFOMOTION GmbH" icon="sap-icon://globe" href="http://www.infomotion.de" target="_blank"/>
              </tnt:NavigationList>
            </tnt:fixedItem>
          </tnt:SideNavigation>
        </tnt:sideContent>
        <tnt:mainContents>
          <m:NavContainer
            id="pageContainer"
            height="16em">
              <m:Page
                id="root"
                title="Root">
                <m:OverflowToolbar>
                  <m:ToolbarSpacer/>
                  <m:Title text="IFM Health Analysis Conversion Kit" level="H2"/>
                  <m:ToolbarSpacer/>
                  <m:Button icon="sap-icon://refresh" press="onTableRefresh">
                    <m:layoutData>
                      <m:OverflowToolbarLayoutData priority="NeverOverflow" />
                    </m:layoutData>
                  </m:Button>
                  <m:Button icon="sap-icon://action-settings" press="onSettingsPressed">
                    <m:layoutData>
                      <m:OverflowToolbarLayoutData priority="NeverOverflow" />
                    </m:layoutData>
                  </m:Button>
                </m:OverflowToolbar>	
                <m:Panel id="oPanel" width="auto" class="sapUiResponsiveMargin"/>
                <m:footer><m:Toolbar><m:Button text="Action 1" /></m:Toolbar></m:footer>
              </m:Page>
              <m:Page
                id="p1"
                title="Page 1">
                <m:OverflowToolbar>
                  <m:ToolbarSpacer/>
                  <m:Title text="IFM Health Analysis Conversion Kit" level="H2"/>
                  <m:ToolbarSpacer/>
                  <m:Button icon="sap-icon://refresh" press="onTableRefresh" >
                    <m:layoutData>
                      <m:OverflowToolbarLayoutData priority="NeverOverflow" />
                    </m:layoutData>
                  </m:Button>
                  <m:Button icon="sap-icon://action-settings" press="onSettingsPressed">
                    <m:layoutData>
                      <m:OverflowToolbarLayoutData priority="NeverOverflow" />
                    </m:layoutData>
                  </m:Button>
                </m:OverflowToolbar>
                <m:footer><m:Toolbar><m:Button text="Action 1" /></m:Toolbar></m:footer>
              </m:Page>
          </m:NavContainer>
        </tnt:mainContents>
      </tnt:ToolPage>
    </mvc:View>
    </script>
  `;

  class IFMStories extends HTMLElement {

    /**
     * The constructor function is called when the element is created. It's a good place to set up initial
     * values for the element's properties and to set up event listeners.
     */
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

    /**
     * I'm trying to create a table that displays the data from the JSON model
     * @param changedProperties - A map of changed properties with old values.
     * @param that - the custom element itself
     * @returns The return value is the JSON object that is returned from the SAC API.
     */
    buildUI(changedProperties, that) {

      // testing
      getSACMetadata();
      prepareJSON2OModel();
      convertSACArtifact();

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

            handleNav: function (evt) {
              var navCon = this.byId("navCon");
              var target = evt.getSource().data("target");
              if (target) {
                var animation = this.byId("animationSelect").getSelectedKey();
                navCon.to(this.byId(target), animation);
              } else {
                navCon.back();
              }
            },

            // onCollapseExpandPress: function () {
            //   var oSideNavigation = this.byId("sideNavigation");
            //   var bExpanded = oSideNavigation.getExpanded();

            //   oSideNavigation.setExpanded(!bExpanded);
            // },

            onSettingsPressed: function () {

            },

            onTableRefresh: function () {

            },

            onInit: function (oEvent) {
              this.oPanel = this.byId("oPanel");
              this.bindTable();
            },

            onGroup: function (oEvent) {
              this.bGrouped = !this.bGrouped;
              this.fnApplyFiltersAndOrdering();
            },

            onCollapseExpandPress: function () {
              var oNavigationList = this.byId("navigationList");
              var bExpanded = oNavigationList.getExpanded();

              oNavigationList.setExpanded(!bExpanded);
            },

            fnApplyFiltersAndOrdering: function (oEvent) {
              var aFilters = [],
                aSorters = [];

              if (this.bGrouped) {
                aSorters.push(new Sorter("SupplierName", this.bDescending, this._fnGroup));
              } else {
                aSorters.push(new Sorter("Name", this.bDescending));
              }

              if (this.sSearchQuery) {
                var oFilter = new Filter("Name", FilterOperator.Contains, this.sSearchQuery);
                aFilters.push(oFilter);
              }

              this.byId("idProductsTable").getBinding("items").filter(aFilters).sort(aSorters);
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
                oBusy.close();
              });
              console.log("JSON Model:");
              console.log(oModel);

              var oTable = new sap.ui.table.Table({
                title: "SAC Story/Application Overview:",
                showNoData: true,
                visibleRowCount: 100,
                firstVisibleRow: 10
              });

              oTable.addColumn(new sap.ui.table.Column({
                label: new sap.ui.commons.Label({ text: "Name" }),
                template: new sap.ui.commons.TextView({ text: "{artifact>name}" }),
                sortProperty: "Name",
                filterProperty: "Name",
              }));

              oTable.addColumn(new sap.ui.table.Column({
                label: new sap.ui.commons.Label({ text: "Description" }),
                template: new sap.ui.commons.TextView({ text: "{artifact>description}" }),
                sortProperty: "Description",
                filterProperty: "Description",
              }));

              oTable.addColumn(new sap.ui.table.Column({
                label: new sap.ui.commons.Label({ text: "URL" }),
                template: new sap.m.Link({ text: "{artifact>name}", href: "{artifact>openURL}", target: "_blank" }),
                sortProperty: "URL",
                filterProperty: "URL",
              }));

              oTable.addColumn(new sap.ui.table.Column({
                label: new sap.ui.commons.Label({ text: "Models" }),
                template: new sap.ui.commons.TextView({ text: "{artifact>models/}" }),
                sortProperty: "Models",
                filterProperty: "Models",
              }));

              oTable.addColumn(new sap.ui.table.Column({
                label: new sap.ui.commons.Label({ text: "Created by" }),
                template: new sap.ui.commons.TextView({ text: "{artifact>createdBy}" }),
                sortProperty: "Created by",
                filterProperty: "Created by",
              }));

              oTable.addColumn(new sap.ui.table.Column({
                label: new sap.ui.commons.Label({ text: "Created" }),
                template: new sap.ui.commons.TextView({ text: "{artifact>created}" }),
                sortProperty: "Created",
                filterProperty: "Created",
              }));

              oTable.setModel(oModel, "artifact");
              oTable.bindRows("artifact>/");
              // oTable.bindItems("artifact>/", new sap.m.ColumnListItem({
              //   cells: [
              //     new sap.m.Text({
              //       text: "{models/description}"
              //     }),
              //     new sap.m.Text({
              //       text: "{models/externalId}"
              //     }),
              //     new sap.m.Text({
              //       text: "{models/id}",
              //     }),
              //     new sap.m.Text({
              //       text: "{models/isPlanning}",
              //     }),
              //   ]
              // }));

              // add table toolbar:
              oTable.setToolbar(new sap.ui.commons.Toolbar({
                items: [
                  new sap.ui.commons.Button({
                    icon: "sap-icon://excel-attachment",
                    press: function (oEvent) {
                      // jQuery.sap.require("sap.ui.core.util.Export");
                      // jQuery.sap.require("sap.ui.core.util.ExportTypeCSV");
                      // oTable.exportData({
                      //   exportType: new sap.ui.core.util.ExportTypeCSV()
                      // })
                      //   .saveFile()
                      //   .always(function () {
                      //     this.destroy();
                      //   });
                      var oRowBinding, oSettings, oSheet, oTable;

                      if (!this._oTable) {
                        this._oTable = this.byId('exportTable');
                      }

                      oTable = this._oTable;
                      oRowBinding = oTable.getBinding('items');
                      var aCols = [];

                      aCols.push({
                        label: 'Name',
                        type: EdmType.String,
                        property: 'name',
                      });

                      oSettings = {
                        workbook: {
                          columns: aCols,
                          hierarchyLevel: 'Level'
                        },

                        dataSource: oRowBinding,
                        fileName: 'Export.xlsx',
                        worker: false
                      };

                      oSheet = new Spreadsheet(oSettings);
                      oSheet.build().finally(function () {
                        oSheet.destroy();
                      });
                    }
                  })
                ]
              }));

              // create table footer:
              oTable.setFooter(new sap.ui.commons.Button({
                text: "Migration Steps",
                icon: "sap-icon://process"
              }));

              // add table filter:
              oTable.attachFilter(function (oEvent) {
                var oMessage = new sap.ui.commons.Message({
                  type: sap.ui.commons.MessageType.Success,
                  text: "Filter column: " + oEvent.getParameter("column").getId() + " - " + oEvent.getParameter("value")
                });
                oMsgBar.addMessages([oMessage]);
              });
              // create the paginator
              // var oPaginator = new sap.ui.commons.Paginator({
              //   numberOfPages: 1, // set the number of pages to 1 initially
              //   currentPage: 1, // set the current page to 1 initially
              //   visible: false, // hide the paginator initially
              //   page: function (oEvent) {
              //     // update the table data when the page changes
              //     var iPage = oEvent.getParameter("page");
              //     oModel.setData(getDataForPage(iPage));
              //     oTable.setFirstVisibleRow(0);
              //   }
              // });

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

    /**
     * The onCustomWidgetResize function is called when the widget is resized
     * @param width - The width of the widget.
     * @param height - The height of the widget.
     */
    onCustomWidgetResize(width, height) {
    }

    /**
     * The connectedCallback() function is called when the element is inserted into the DOM.
     */
    connectedCallback() {
    }

    /* The above code is a JavaScript code that is used to define the behavior of the custom widget. */
    disconnectedCallback() {
    }

    /**
     * This function is called before the widget is updated.
     * @param changedProperties - An object containing the changed properties.
     */
    onCustomWidgetBeforeUpdate(changedProperties) {
    }

    /**
     * This function is called after the widget is updated. It is called with an object containing the
     * changed properties.
     * @param changedProperties - An object containing the changed properties.
     */
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
    // try detect runtime settings
    if (window.sap && sap.fpa && sap.fpa.ui && sap.fpa.ui.infra) {
      if (sap.fpa.ui.infra.common) {
        let context = sap.fpa.ui.infra.common.getContext();
        console.log("Context:");
        console.log(context);
        // sap.ui.require(["sap/fpa/story/optimizedModeFeaturesValidator"], function (oOptimizedModeFeaturesValidator) {
        //   // oOptimizedModeFeaturesValidator module is loaded
        //   var aUnsupportedFeatures = sap.fpa.story.optimizedModeFeaturesValidator.getUnsupportedFeatures();
        //   for (var i = 0; i < aUnsupportedFeatures.length; i++) {
        //     console.log(aUnsupportedFeatures[i]);
        //   }
        // });

        // if (sap.fpa.story) {
        //   console.log(sap.fpa.story);
        // }
        // console.log(jQuery.sap.declare("sap.fpa.ui.story"));
        // jQuery.sap.require("sap.fpa.ui.story");
        // console.log("Story Service");
        // storyService = new sap.fpa.ui.story.StoryService;
        // console.log(storyService);
        // var storyService = new sap.fpa.ui.story.StoryService.getInstance();
        // console.log("Story Service:");
        // console.log(storyService);

        // var n = sap.fpa.ui.story.Utils.getContentLibService();
        // setSelectedStory: function(e) {
        //   if (null != e)
        //     if ("string" == typeof e || "number" == typeof e)
        //       this.getModel().setCurrentStoryId(e);
        //     else if ("object" === u(e))
        //       if (e.id)
        //         this.getModel().setCurrentStoryId(e);
        //       else if (e.originatorId) {
        //         var t = this.getModel().getStoryByOriginatorId(e.originatorId);
        //         null !== t && this.getModel().setCurrentStoryId(t.id)
        //       }
        // },
        // getSelectedStory: function() {
        //   var e = this.getModel().getCurrentStory()
        //     , t = null;
        //   return null !== e && (t = {
        //     id: e.id
        //   },
        //     e.originatorId && (t.originatorId = e.originatorId)),
        //     t
        // },
      }
    }
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

  function convertSACArtifact() {

    // if (sap.fpa) {
    //   console.log(sap.fpa.story);
    //   var story = sap.fpa.story.getStoryById("59A395046F3F8A41401B0B1C28FD787D");
    //   console.log("Story details:");
    //   console.log(story);
    // }

    // if (sap.fpa.ui.story) {
    //   console.log(sap.fpa.ui.story);
    // }

    // var aUnsupportedFeatures = sap.fpa.story.optimizedModeFeaturesValidator.getUnsupportedFeatures();
    // for (var i = 0; i < aUnsupportedFeatures.length; i++) {
    //   console.log(aUnsupportedFeatures[i]);
    // }

    // // this._context.get("sap.fpa.story.optimized.model.validator")
    // var oStoryConverter = sap.fpa.ui.story.api.StoryConverter.getInstance();
    // console.log("Story Converter");
    // console.log(oStoryConverter);
    // var oConversionSettings = {
    //   storyId: "59A395046F3F8A41401B0B1C28FD787D",
    //   designType: sap.fpa.ui.story.api.DesignType.OPTIMIZED
    // };

    // oStoryConverter.convert(oConversionSettings, function (bSuccess) {
    //   if (bSuccess) {
    //     // Story was successfully converted
    //     console.log("Story convert successful")

    //     var oSuccessDialog = new Dialog({
    //       type: DialogType.Message,
    //       title: "Conversion Status",
    //       content: new Text({ text: "Conversion has been completed successfully." }),
    //       beginButton: new Button({
    //         type: ButtonType.Emphasized,
    //         text: "OK",
    //         press: function () {
    //           oSuccessDialog.close();
    //         }.bind(this)
    //       })
    //     });

    //     oSuccessDialog.open();

    //   } else {
    //     // Conversion failed
    //     console.log("Story convert failed");

    //     var oErrorDialog = new Dialog({
    //       type: DialogType.Message,
    //       title: "Conversion Status",
    //       content: new Text({ text: "Conversion has failed." }),
    //       beginButton: new Button({
    //         type: ButtonType.Emphasized,
    //         text: "OK",
    //         press: function () {
    //           oErrorDialog.close();
    //         }.bind(this)
    //       })
    //     });

    //     oErrorDialog.open();
    //   }
    // });

  }

})();