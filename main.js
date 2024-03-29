(function () {
  let _shadowRoot;
  let _oAuthURL;
  let _clientID;
  let _apiSecret;
  let ifmLogo = "https://1dawu2.github.io/ifm-wc/assets/logo.png";
  let ifmAvatar = "https://1dawu2.github.io/ifm-wc/assets/avatar.png";
  let backImg = "https://1dawu2.github.io/ifm-wc/assets/backImg.png";
  let imgCompany = "https://1dawu2.github.io/ifm-wc/assets/SAC_Offering.gif";
  let imgProblem = "https://1dawu2.github.io/ifm-wc/assets/SAC_Offering_Problem.png";
  let imgSolution = "https://1dawu2.github.io/ifm-wc/assets/SAC_Offering_HACK.png";

  let tmpl = document.createElement("template");
  tmpl.innerHTML = `
    <style>
    </style>
    <div id="ifm_hack_content" name="ifm_hack_content">
      <slot name="content"></slot>
    </div>
    <script id="oView" name="oView" type="sapui5/xmlview">
    <mvc:View
      controllerName="ifm.hack.initial"
      xmlns:core="sap.ui.core"
      xmlns:t="sap.ui.table"
      xmlns:m="sap.m"
      xmlns:f="sap.f"
      xmlns:card="sap.f.cards"
      xmlns:mvc="sap.ui.core.mvc"
      xmlns:tnt="sap.tnt">
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
            <m:ToolbarSpacer/>
            <m:Title text="IFM Health Analysis Conversion Kit" level="H1"/>
            <m:ToolbarSpacer/>
            <m:Button
              id="pSwitchBtn"
              icon="sap-icon://grid"
              press=".onSwitchOpen" />
            <m:Avatar
              displaySize="XS"
              backgroundColor="Transparent"
              displayShape="Circle"
              showBorder="false"   
              src="${ifmLogo}"           
            />
          </tnt:ToolHeader>
        </tnt:header>
        <tnt:sideContent>
          <tnt:SideNavigation
            id="sideNavigationList"
            expanded="false"
            itemSelect=".onItemSelect">
            <tnt:NavigationList
              expanded="false"
              id="navigationList">
              <tnt:NavigationListItem expanded="false" text="IFM HACK" icon="sap-icon://electrocardiogram" id="nl0" key="root"/>
              <tnt:NavigationListItem text="Unsupported Features" icon="sap-icon://activities" id="nl1" key="p1"/>
              <tnt:NavigationListItem text="About" icon="sap-icon://hint" id="nl2" key="p2"/>
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
            initialPage="root">           
              <m:Page id="root">
                <m:IconTabBar
                  expandable="false"
                  select=".onFilterSelect"
                  class="sapUiResponsiveContentPadding">
                  <m:items>
                    <m:IconTabFilter
                      id="countInput"
                      icon="sap-icon://clinical-order"
                      count="{rowCounter>/counter}"
                      text="Stories"
                      key="All" />
                    <m:IconTabFilter
                      id="activityLog"
                      icon="sap-icon://clinical-tast-tracker"
                      text="Activity Log"
                      key="Activity" />
                  </m:items>
                </m:IconTabBar>
                <m:content>
                  <m:Panel height="100%" expandable="true" expanded="true" headerText="SAC artifacts" id="oPanel"></m:Panel>
                </m:content>
              </m:Page>
              <m:Page id="p1">
                <m:OverflowToolbar>
                  <m:ToolbarSpacer/>
                  <m:Title text="Unsupported Features"/>
                  <m:ToolbarSpacer/>
                </m:OverflowToolbar>
                <m:Tree
                  id="linkList"
                  items="{/}">
                  <m:headerToolbar>
                    <m:OverflowToolbar>
                      <m:Title text="Weiterführende Informationen" />
                    </m:OverflowToolbar>
                  </m:headerToolbar>
                  <m:CustomTreeItem>
                  	<m:HBox>
			                <core:Icon size="2rem" src="{ref}" class="sapUiSmallMarginBegin sapUiSmallMarginTopBottom" />
			                <m:VBox class="sapUiSmallMarginBegin sapUiSmallMarginTopBottom" >
                        <m:Link text="{text}" target="_blank" href="{link}" />
                        <m:Label text="{title}"/>
                      </m:VBox>
                    </m:HBox>
                  </m:CustomTreeItem>
                </m:Tree>
                <m:Panel height="100%" expandable="true" expanded="false" headerText="SAC Help" id="helpODM"></m:Panel>
              </m:Page>
              <m:Page id="p2">
                <m:OverflowToolbar>
                  <m:ToolbarSpacer/>
                  <m:Title text="About"/>
                  <m:ToolbarSpacer/>
                </m:OverflowToolbar>
                <m:Panel
                  id="About">
                  <m:Carousel height="80%" class="sapUiContentPadding" loop="true" showPageIndicator="true">
                    <m:Image src="${backImg}" alt="INFOMOTION GmbH" />
                    <m:Image src="${imgCompany}" alt="Company" />
                    <m:Image src="${imgProblem}" alt="Problem Statement" />
                    <m:Image src="${imgSolution}" alt="Solution" />
                    <f:GridContainer
                      id="grid1"
                      snapToRow="true">
                        <f:layout>
                          <f:GridContainerSettings rowSize="5rem" columnSize="5rem" gap="1rem" />
                        </f:layout>
                        <f:Card width="400px">
                          <f:header>
                            <card:Header iconSrc="${ifmAvatar}" title="Kontakt" subtitle="David Wurm" />
                          </f:header>
                          <f:content>
                            <m:List
                              showSeparators="None"
                              items="{products>/productItems}">
                              <m:StandardListItem
                                description="{products>subtitle}"
                                icon="{products>iconFile}"
                                title="{products>title}" />
                            </m:List>
                          </f:content>
                        </f:Card>
                      </f:GridContainer>
                  </m:Carousel>
                </m:Panel>                  
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

      // controlling functions
      this._oStoryContainerController = sap.ui.controller("sap.epm.story.StoryContainer");
      console.log("Story Container");
      console.log(this._oStoryContainerController);
      this._oDocumentContext = this._oStoryContainerController.getDocumentContext();
      console.log("Document Context")
      console.log(this._oDocumentContext);
      this._uqmLoad = this._oDocumentContext.get("sap.fpa.bi.uqmLoader")
      console.log("uqmLoad");
      console.log(this._uqmLoad);
      // this._oDocument = this._oStoryContainerController.getDocument();
      // console.log(this._oDocument);
      // this._contentLib = sap.fpa.ui.infra.service.ServiceManager.getService("EPM/Contentlib");
      // console.log("content lib");
      // console.log(this._contentLib)
      // this._storyService = sap.fpa.ui.infra.service.ServiceManager.getService("fpa.StoryService");
      // console.log("story service");
      // console.log(this._storyService)

      // not working functions
      // n = this.getContext().get("sap.fpa.bi.documentService").getStoryModel()
      // this._oStoryContainer.showConvertToOptimizedDesignModeDialog();
      // "sap.fpa.ui.story.StoryOptimizedUnsupportedDialog"
      // sap.fpa.story.optimizedModeFeaturesValidator
      // o.getUnsupportedFeatures(this._getStoryModel(), this.getDocumentContext(), n, t);
      // console.log("Story Info");
      // console.log(sap.fpa.ui.story.FpaStoryUtils.story.getStoryInfo("59A395046F3F8A41401B0B1C28FD787D"));


    }

    /**
     * I'm trying to create a table that displays the data from the JSON model
     * @param changedProperties - A map of changed properties with old values.
     * @param that - the custom element itself
     * @returns The return value is the JSON object that is returned from the SAC API.
     */
    buildUI(changedProperties, that) {

      // testing
      // getSACMetadata();
      // prepareJSON2OModel();
      // convertSACArtifact();

      // initSAC();
      // sap.fpa.story.optimized.model.validator > "getModelValidator"
      // sap.fpa.story.optimizedModeFeaturesValidator > bound _getService
      // sap.fpa.story.documentActions
      // getStoryService
      // if (fpa.StoryService) {
      //   console.log(fpa.StoryService);
      // }

      // sts = sap.fpa.ui.infra.service.ServiceManager(e => e.getService());
      // optm = sap.fpa.ui.story.Utils.get("isOptimizedDesignMode");
      // console.log("ist optimized");
      // console.log(optm);
      // console.log("Story Service");
      // console.log(sts);

      var that_ = that;

      let content = document.createElement('div');
      content.slot = "content";
      that_.appendChild(content);

      sap.ui.define(
        [
          "sap/ui/core/mvc/Controller",
          "sap/ui/export/Spreadsheet",
          "sap/f/dnd/GridDropInfo",
          "sap/ui/core/library",
        ],
        function (Controller) {
          "use strict";

          return Controller.extend("ifm.hack.initial", {

            onInit: function (oEvent) {
              this.oPanel = this.byId("oPanel");
              this.bindTable(oEvent);
              this.bindTree(oEvent);
              this.bindHelp(oEvent);
              this.configGrid();
              this.configProductSwitch();
            },

            // getStoryContent: function (delay) {
            //   return new Promise(
            //     resolve => setTimeout(() => resolve(sap.fpa.ui.story.StoryFetcher.getContent(storyID)), delay)
            //   );
            // },

            getStoryContent: async function (storyId) {
              if (storyId) {
                const statusesPromise = Promise.allSettled([
                  sap.fpa.ui.story.StoryFetcher.getContent(storyId)
                ]);
                // wait...
                const statuses = await statusesPromise;
                // after 1 second
                console.log(statuses);
                return statuses;
              }
              // return await new Promise(function (resolve, reject) {
              //   sap.fpa.ui.story.StoryFetcher.getContent(storyId).then(function (content) {
              //     resolve(content);
              //   }).catch(function (error) {
              //     reject(error);
              //   });
              // });
            },

            getStoryOptimized: async function (storyID) {

              if (storyID) {
                await this.getStoryContent(storyID).then(function (content) {
                  // let odmMode = false;
                  // console.log(content[0].value.cdata.isOptimizedEnabled);
                  return content[0].value.cdata.isOptimizedEnabled
                  // if (content[0].value.cdata.isOptimizedEnabled) {
                  // Do something with the story content
                  // if (typeof content.cdata.content.optimizedEnabled !== 'undefined') {
                  //   odmMode = content.cdata.content.optimizedEnabled;
                  // } else if (typeof content.cdata.isOptimizedEnabled !== 'undefined') {
                  //   odmMode = content.cdata.isOptimizedEnabled;
                  // } else {
                  //   odmMode = false;
                  // }
                  //   return content[0].value.cdata.isOptimizedEnabled;
                  // }
                }).catch(function (error) {
                  // Handle any errors that occur during the retrieval
                  console.error(error);
                });
              }
              // if (storyID) {
              //   const statusesPromise = Promise.allSettled([
              //     this.getStoryContent(1000)
              //   ]);
              //   // wait...
              //   const statuses = await statusesPromise;
              //   // after 1 second
              //   console.log(statuses);
              // }

              // try {
              //   if (storyID) {
              //     const response = await Promise.allSettled(this.getStoryContent(storyID)).then((results) => results.forEach(
              //       (result) => console.log(result.status)
              //     ));
              //     return response
              //   } else {
              //     console.log("no Story ID provided");
              //   }
              // } catch (err) {
              //   console.log(err);
              //   throw err
              // }


              // const allPromise = await Promise.all([sap.fpa.ui.story.StoryFetcher.getContent(storyID)]);
              // var odmMode = false;
              // allPromise.then(values => {
              //   console.log(values);
              //   switch (mode) {
              //     case "ODM":
              //       if (typeof values[0].cdata.content.optimizedEnabled !== 'undefined') {
              //         odmMode = values[0].cdata.content.optimizedEnabled;
              //       } else if (typeof values[0].cdata.isOptimizedEnabled !== 'undefined') {
              //         odmMode = values[0].cdata.isOptimizedEnabled;
              //       } else {
              //         odmMode = false;
              //       }
              //     case "USF":
              //       if (typeof values[0].cdata.content.optimizedBlockingUnsupportedFeatures !== 'undefined') {
              //         odmMode = values[0].cdata.content.optimizedBlockingUnsupportedFeatures;
              //       } else {
              //         odmMode = false;
              //       }
              //   }
              // }).catch(error => {
              //   console.log(error);
              // }); 

              // if (storyID != '') {
              //   (async () => {
              //     await new Promise((resolve, reject) => {
              //       sap.fpa.ui.story.StoryFetcher.getContent(storyID)
              //         .then(result => {
              //           data = result;
              //           resolve();
              //           if (typeof data.cdata.content.optimizedEnabled === 'undefined') {
              //             return false;
              //           } else {
              //             return data.cdata.content.optimizedEnabled
              //           }
              //         })
              //         .catch(err => { throw err });
              //     })
              //       .catch(err => {
              //         console.log('Oh noes!! Error: ', err.code)
              //       });
              //   })();
              // } else {
              //   return false;
              // }


              // let promise = new Promise((resolve, reject) => {
              //   resolve(
              //     sap.fpa.ui.story.StoryFetcher.getContent(storyID)
              //   );
              // });
              // promise.then(data => {
              //   switch (mode) {
              //     case "ODM":
              //       try {
              //         var odmMode = false;
              //         if (typeof data.cdata.isOptimizedEnable === 'undefined') {
              //           odmMode = false;
              //           return odmMode;
              //         } else {
              //           odmMode = data.cdata.isOptimizedEnable;
              //           return odmMode;
              //         }
              //       } catch (error) {
              //         console.log("exception" + error);
              //       }
              //     // if (odmMode === 'undefined') {
              //     //   odmMode = false;
              //     // }
              //     // if (typeof data[0].cdata.content.optimizedEnabled !== 'undefined') {
              //     //   odmMode = data[0].cdata.content.optimizedEnabled;
              //     // } else if (typeof data[0].cdata.isOptimizedEnabled !== 'undefined') {
              //     //   odmMode = data[0].cdata.isOptimizedEnabled;
              //     // } else {
              //     //   odmMode = false;
              //     // }
              //     // case "USF":
              //     //   if (typeof data[0].cdata.content.optimizedBlockingUnsupportedFeatures !== 'undefined') {
              //     //     odmMode = data[0].cdata.content.optimizedBlockingUnsupportedFeatures;
              //     //   } else {
              //     //     odmMode = false;
              //     //   }
              //   }
              // });


              // const promise = Promise.all([
              //   sap.fpa.ui.story.StoryFetcher.getContent(storyID)
              // ]).then(function (resolve) {
              //   return resolve[0].cdata;
              // switch (mode) {
              //   case "ODM":
              //     if (typeof resolve[0].cdata.content.optimizedEnabled !== 'undefined') {
              //       odmMode = resolve[0].cdata.content.optimizedEnabled;
              //     } else if (typeof resolve[0].cdata.isOptimizedEnabled !== 'undefined') {
              //       odmMode = resolve[0].cdata.isOptimizedEnabled;
              //     } else {
              //       odmMode = false;
              //     }
              //   case "USF":
              //     if (typeof resolve[0].cdata.content.optimizedBlockingUnsupportedFeatures !== 'undefined') {
              //       odmMode = resolve[0].cdata.content.optimizedBlockingUnsupportedFeatures;
              //     } else {
              //       odmMode = false;
              //     }
              // }
              // }).catch(function (error) {
              //   console.log(error.message);
              // });
              // return odmMode;
            },

            onFilterSelect: function (oEvent) {
              var sKey = oEvent.getParameter("key");

              if (sKey === "Activity") {

                var downloadItems = "1000";

                var oActivityDialog = new sap.m.Dialog({
                  resizable: false,
                  contentWidth: "400px",
                  content: [
                    new sap.ui.commons.Label({ text: "Log-Aktivitäten:", design: "Bold" }),
                    new sap.m.StepInput({
                      change: function (oEvent) {
                        downloadItems = oEvent.getParameter("value");
                      },
                      description: "Zeilen",
                      min: 1,
                      max: 100000,
                      step: 1000,
                      value: 1000,
                      textAlign: "Center",
                    })
                  ],
                  beginButton: new sap.m.Button({
                    press: function () {
                      var tenantURL = "https://infomotion1.eu10.hanacloudservices.cloud.sap";
                      var apiURL = "/api/v1/audit/activities/exportActivities?";
                      var paraSortDec = "sortDescending=true&";
                      var paraSortKey = "sortKey=TIMESTAMP&";
                      var paraPageIndex = "pageIndex=1&";
                      var paraPageSize = "pageSize=" + downloadItems;
                      var paraFileName = "&csvName=activities";
                      var activityURL = tenantURL + apiURL + paraSortDec + paraSortKey + paraPageIndex + paraPageSize + paraFileName
                      sap.m.URLHelper.redirect(activityURL, true);
                      this.getParent().close();
                    },
                    text: "OK"
                  }),
                  customHeader: new sap.m.Bar({
                    contentMiddle: [
                      new sap.m.Title({
                        text: "Download Optionen",
                      })
                    ]
                  }),
                  contentHeight: "50%",
                  contentWidth: "50%",
                  verticalScrolling: false
                });
                oActivityDialog.open();
              };

              if (sKey === "All") {
                var oAllDialog = new sap.m.Dialog({
                  resizable: false,
                  contentWidth: "400px",
                  content: [
                    new sap.m.IllustratedMessage({
                      illustrationType: "sapIllus-SimpleCheckMark",
                      title: "IFM HACK",
                      description: "Einfach die Stories markieren und den Konvertierungsmodus starten"
                    })
                  ],
                  beginButton: new sap.m.Button({
                    press: function () {
                      this.getParent().close();
                    },
                    text: "OK"
                  }),
                  customHeader: new sap.m.Bar({
                    contentMiddle: [
                      new sap.m.Title({
                        text: "Story Übersicht",
                      })
                    ]
                  }),
                  contentHeight: "50%",
                  contentWidth: "50%",
                  verticalScrolling: false
                });
                oAllDialog.open();
              };
            },

            onSwitchChange: function (oEvent) {
              var oItemPressed = oEvent.getParameter("itemPressed"),
                sTargetSrc = oItemPressed.getTargetSrc();

              sap.m.MessageToast.show(sTargetSrc + " wird geöffnet");
              sap.m.URLHelper.redirect(sTargetSrc, true);
            },

            onSwitchClose: function () {
              this._pPopover.then(function (oPopover) {
                oPopover.close();
              });
            },

            onSwitchOpen: function (oEvent) {
              var oButton = this.getView().byId("pSwitchBtn");
              this._pPopover.then(function (oPopover) {
                oPopover.openBy(oButton);
              });
            },

            onItemSelect: function (oEvent) {
              var oItem = oEvent.getParameter("item");
              this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
            },

            onCollapseExpandPress: function () {
              var toolPage = this.byId("toolPage");
              toolPage.setSideExpanded(!toolPage.getSideExpanded());
            },

            configProductSwitch: function () {

              var oSwitchView = this.getView();

              if (!this._pPopover) {
                this._pPopover = sap.ui.core.Fragment.load({
                  type: "XML",
                  definition: `
                    <core:FragmentDefinition
                      xmlns:m="sap.m"
                      xmlns:f="sap.f"
                      xmlns:core="sap.ui.core">
                      <m:ResponsivePopover placement="Bottom" showHeader="false" >
                        <f:ProductSwitch change="onSwitchChange">
                          <f:items>
                            <f:ProductSwitchItem
                              src="sap-icon://cloud"
                              title="SAP Analytics Cloud"
                              subTitle="Landing Page"
                              targetSrc="https://infomotion1.eu10.hanacloudservices.cloud.sap/sap/fpa/ui/app.html#/home"
                              target="_blank" />
                            <f:ProductSwitchItem
                              src="sap-icon://sap-logo-shape"
                              title="SAP Datasphere"
                              subTitle="Landing Page"
                              targetSrc="https://dwc-infomotion.eu10.hcs.cloud.sap/dwaas-ui/index.html#/home"
                              target="_blank" />
                            <f:ProductSwitchItem
                              src="sap-icon://headset"
                              title="Support"
                              subTitle="Landing Page"
                              targetSrc="https://www.infomotion.de/"
                              target="_blank" />
                          </f:items>
                        </f:ProductSwitch>
                      </m:ResponsivePopover>
                    </core:FragmentDefinition >`,
                  controller: this
                }).then(function (oPopover) {
                  oSwitchView.addDependent(oPopover);
                  if (sap.ui.Device.system.phone) {
                    oPopover.setEndButton(new Button({ text: "Close", type: "Emphasized", press: this.onSwitchClose.bind(this) }));
                  }
                  return oPopover;
                }.bind(this));
              }
            },

            configGrid: function () {
              var DropLayout = sap.ui.core.dnd.DropLayout;
              var DropPosition = sap.ui.core.dnd.DropPosition;
              var oGrid = this.byId("grid1");
              var modelProduct = new sap.ui.model.json.JSONModel();
              modelProduct.setData(
                {
                  "productItems": [
                    {
                      "title": "Website",
                      "subtitle": "http://www.infomotion.de",
                      "iconFile": "sap-icon://world"
                    },
                    {
                      "title": "Telefon",
                      "subtitle": "+49 69 56608 3231",
                      "iconFile": "sap-icon://call"
                    },
                    {
                      "title": "Mail",
                      "subtitle": "david.wurm@infomotion.de",
                      "iconFile": "sap-icon://business-card"
                    }
                  ]
                }
              );
              sap.ui.getCore().setModel(modelProduct, "products");

              oGrid.addDragDropConfig(new sap.ui.core.dnd.DragInfo({
                sourceAggregation: "items"
              }));

              oGrid.addDragDropConfig(new sap.f.dnd.GridDropInfo({
                targetAggregation: "items",
                dropPosition: DropPosition.Between,
                dropLayout: DropLayout.Horizontal,
                drop: function (oInfo) {
                  var oDragged = oInfo.getParameter("draggedControl"),
                    oDropped = oInfo.getParameter("droppedControl"),
                    sInsertPosition = oInfo.getParameter("dropPosition"),
                    iDragPosition = oGrid.indexOfItem(oDragged),
                    iDropPosition = oGrid.indexOfItem(oDropped);

                  oGrid.removeItem(oDragged);

                  if (iDragPosition < iDropPosition) {
                    iDropPosition--;
                  }

                  if (sInsertPosition === "After") {
                    iDropPosition++;
                  }

                  oGrid.insertItem(oDragged, iDropPosition);
                  oGrid.focusItem(iDropPosition);
                }
              }));
            },

            bindTree: function (oEvent) {
              var sJSON = "https://raw.githubusercontent.com/1dawu2/ifm-wc/main/assets/unsupported_features.json"
              var oTreeModel = new sap.ui.model.json.JSONModel(sJSON);
              sap.ui.getCore().setModel(oTreeModel);
            },

            bindHelp: function (oEvent) {
              var oiFrame = new sap.ui.core.HTML({
                content: "<iframe id='helpViewer' height='100%' src='https://assets.sapanalytics.cloud/production/help/help-2023.2/en/65a0e996d2214fd6ab0d77fc27fc58cf.html?css=https%3A%2F%2Finfomotion1.eu10.hanacloudservices.cloud.sap%2Fsap%2Ffpa%2Fservices%2Frest%2Fepm%2Ffeature%2Fcss%3Ftenant%3DK' style='width: 100%; height: 100%;' allowfullscreen='' webkitallowfullscreen=''</iframe>"
              });
              let oVBox = this.getView().byId("helpODM");
              oVBox.addContent(oiFrame);
            },

            bindTable: function (oEvent) {
              var oBusy = new sap.m.BusyDialog();
              var oModel = new sap.ui.model.json.JSONModel();
              var that = this;

              oModel.attachRequestSent(function () {
                oBusy.open();
              });
              var sHeaders = { "DataServiceVersion": "2.0", "Accept": "application/json" };
              oModel.loadData(that_._export_settings.restapiurl, null, true, "GET", null, false, sHeaders);

              oModel.attachRequestCompleted(function (oEvent) {
                var oItems = oEvent.getSource().getData();
                oItems.forEach(function (item, index) {
                  // console.log(item.id);
                  // var story = sap.fpa.ui.story.StoryFetcher.getContent(item.id);
                  // console.log(story.cdata.content.optimizedEnabled);

                });
                oBusy.close();
              });

              var oTable = new sap.ui.table.Table({
                title: "Overview: SAC Stories",
                showNoData: true,
                // fixedLayout: false,
                // alternateRowColors: true,
                visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Auto
              });

              // register a table event handler
              oTable.addEventDelegate({
                onAfterRendering:
                  function (oEvent) {
                    var oBinding = this.getBinding("rows");
                    // get row counter
                    oBinding.attachChange(function (oEvent) {
                      var oSource = oEvent.getSource();
                      var oLength = oSource.iLength;
                      var modelCounter = new sap.ui.model.json.JSONModel();
                      modelCounter.setData(
                        { counter: oLength }
                      );
                      sap.ui.getCore().setModel(modelCounter, "rowCounter");

                      if (oLength === 0) {
                        sap.m.MessageToast.show("no data");
                      }
                    });

                  }
              }, oTable);

              // ID
              oTable.addColumn(new sap.ui.table.Column({
                autoResizable: true,
                label: new sap.ui.commons.Label({ text: "Story ID" }),
                template: new sap.ui.commons.TextView({ text: "{artifact>id}" }),
                sortProperty: "id",
                filterProperty: "id",
              }));

              // Name
              oTable.addColumn(new sap.ui.table.Column({
                autoResizable: true,
                label: new sap.ui.commons.Label({ text: "Name" }),
                template: new sap.ui.commons.TextView({ text: "{artifact>name}" }),
                sortProperty: "name",
                filterProperty: "name",
              }));

              // Description
              oTable.addColumn(new sap.ui.table.Column({
                autoResizable: true,
                label: new sap.ui.commons.Label({ text: "Description" }),
                template: new sap.ui.commons.TextView({ text: "{artifact>description}" }),
                sortProperty: "description",
                filterProperty: "description",
              }));

              // URL
              oTable.addColumn(new sap.ui.table.Column({
                autoResizable: true,
                label: new sap.ui.commons.Label({ text: "URL" }),
                template: new sap.m.Link({ text: "open", href: "{artifact>openURL}", target: "_blank" }),
              }));

              // Check ODM
              var listItem = new sap.m.CustomListItem({
                content: new sap.ui.commons.Button({
                  icon: "sap-icon://checklist",
                  text: {
                    parts: [
                      { path: "artifact>id" }
                    ],
                    formatter: function (id) {
                      return id;
                    },
                  },
                  press: function (oEvent) {
                    var sValue = oEvent.oSource.mProperties["text"];
                    var id = sValue[0];
                    that.that.getStoryOptimized(id);
                  },
                }),
              });
              oTable.addColumn(new sap.ui.table.Column({
                autoResizable: true,
                label: new sap.ui.commons.Label({ text: "ODM" }),
                template: new sap.m.List({
                  backgroundDesign: "Transparent",
                  items: {
                    path: "artifact>id",
                    template: listItem
                  },
                })
              }));

              // var oiFrame = new sap.ui.core.HTML({
              //   content: {
              //     path: "artifact>id",
              //     formatter: function (path) {
              //       var htmlContent = "<iframe id='storyViewer' src='https://infomotion1.eu10.hanacloudservices.cloud.sap/sap/fpa/ui/app.html#/story&/s/" + path + "?mode=edit' style='width: 100%; height: 100%;' allowfullscreen='' webkitallowfullscreen=''</iframe>"
              //       return htmlContent;
              //     }
              //   },
              // });
              // oTable.addColumn(new sap.ui.table.Column({
              //   label: new sap.ui.commons.Label({ text: "iFrame" }),
              //   template: oiFrame
              // }));

              // ODM
              oTable.addColumn(new sap.ui.table.Column({
                autoResizable: true,
                label: new sap.ui.commons.Label({ text: "ODM (False/True)" }),
                template: new sap.ui.commons.TextView({
                  text: {
                    path: 'artifact>id',
                    formatter: function (id) {
                      if (id) {
                        let optimised = that.getStoryOptimized(id);
                        if (optimised === true) {
                          id = true
                          return id
                        } else {
                          id = false
                          return id
                        }
                      } else {
                        id = false
                        return id;
                      }
                    },
                    // type: "sap.ui.model.odata.type.Boolean",
                  }
                }),
                sortProperty: "id",
                filterProperty: "id",
                filterType: new sap.ui.model.type.Boolean(),
              }));

              // // Unsupported Features
              // oTable.addColumn(new sap.ui.table.Column({
              //   autoResizable: true,
              //   label: new sap.ui.commons.Label({ text: "Unsupported Features (False/True)" }),
              //   template: new sap.ui.commons.TextView({
              //     text: {
              //       path: 'artifact>id',
              //       //   formatter: function (id) {
              //       //     // return getStoryOptimized(id, "USF");
              //       //   }
              //     }
              //   }),
              //   sortProperty: "id",
              //   filterProperty: "id",
              //   filterType: new sap.ui.model.type.Boolean(),
              // }));

              // Models
              var listItem = new sap.m.CustomListItem({
                content: new sap.ui.commons.Button({
                  icon: "sap-icon://database",
                  text: {
                    parts: [
                      { path: "artifact>id" },
                      { path: "artifact>description" }
                    ],
                    formatter: function (id, desc) {
                      return id + " - " + desc;
                    },
                  },
                  press: function (oEvent) {
                    var sValue = oEvent.oSource.mProperties["text"];
                    var id = sValue.split("-")[0];
                    window.open('https://infomotion1.eu10.hanacloudservices.cloud.sap/sap/fpa/ui/app.html#/modeler&/m/model/' + id, '_blank');
                  },
                }),
              });
              oTable.addColumn(new sap.ui.table.Column({
                autoResizable: true,
                label: new sap.ui.commons.Label({ text: "Models" }),
                template: new sap.m.List({
                  backgroundDesign: "Transparent",
                  items: {
                    path: "artifact>models/",
                    template: listItem
                  },
                }),
                sortProperty: "description}",
                filterProperty: "description}",
              }));

              // Template
              oTable.addColumn(new sap.ui.table.Column({
                autoResizable: true,
                label: new sap.ui.commons.Label({ text: "Template (False/True)" }),
                template: new sap.tnt.InfoLabel({
                  colorScheme: {
                    parts: [
                      { path: 'artifact>isTemplate' }
                    ],
                    formatter: function (oVal) {
                      switch (oVal) {
                        case false:
                          return 9;
                        case true:
                          return 8;
                        default:
                          return 9;
                      }
                    }
                  },
                  text: {
                    path: 'artifact>isTemplate',
                    type: "sap.ui.model.odata.type.Boolean",
                  },
                  icon: {
                    parts: [
                      { path: 'artifact>isTemplate' }
                    ],
                    formatter: function (oVal) {
                      switch (oVal) {
                        case false:
                          return "sap-icon://error";
                        case true:
                          return "sap-icon://message-success";
                        default:
                          return "sap-icon://error";
                      }
                    }

                  },
                }),
                sortProperty: "isTemplate",
                filterProperty: "isTemplate",
                filterType: new sap.ui.model.type.Boolean(),
              }));

              // Created by
              oTable.addColumn(new sap.ui.table.Column({
                autoResizable: true,
                label: new sap.ui.commons.Label({ text: "Created by" }),
                template: new sap.ui.commons.TextView({ text: "{artifact>createdBy}" }),
                sortProperty: "createdBy",
                filterProperty: "createdBy",
              }));

              // Created
              oTable.addColumn(new sap.ui.table.Column({
                autoResizable: true,
                label: new sap.ui.commons.Label({ text: "Created" }),
                template: new sap.ui.commons.TextView({
                  text: {
                    path: 'artifact>created',
                    type: "sap.ui.model.type.DateTime",
                    formatOptions: {
                      UTC: true,
                      source: {
                        pattern: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                      },
                      pattern: 'dd.MM.yyyy HH:mm',
                    }
                  }
                }),
                sortProperty: "created",
                filterProperty: "created",
                filterType: new sap.ui.model.type.DateTime(),
              }));

              // Changed
              oTable.addColumn(new sap.ui.table.Column({
                autoResizable: true,
                label: new sap.ui.commons.Label({ text: "Changed" }),
                template: new sap.ui.commons.TextView({
                  text: {
                    path: 'artifact>changed',
                    type: "sap.ui.model.type.DateTime",
                    formatOptions: {
                      UTC: true,
                      source: {
                        pattern: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                      },
                      pattern: 'dd.MM.yyyy HH:mm',
                    }
                  }
                }),
                sortProperty: "changed",
                filterProperty: "changed",
                filterType: new sap.ui.model.type.DateTime(),
              }));

              // bind model to table rows
              oTable.setModel(oModel, "artifact");
              oTable.bindRows({
                path: "artifact>/",
                // parameters: {
                //   expand: "",
                //   select: ""
                // }
                // events: {
                //   dataReceived: function () {
                //     oTable.getColumns().map((col, index) => oTable.autoResizeColumn(index));
                //   }
                // }
              });

              // configure toolbar
              oTable.setToolbar(new sap.ui.commons.Toolbar({
                items: [

                  new sap.ui.commons.Button({
                    icon: "sap-icon://begin",
                    press: function (oEvent) {
                      // TODO: call conversion for selected table entries
                      var oContext;
                      var oURL;
                      var selectedEntries = [];

                      var selectedIndices = oTable.getSelectedIndices();
                      for (var index = 0; index < selectedIndices.length; index++) {
                        oContext = oTable.getContextByIndex(index);
                        oURL = oContext.getProperty("id");
                        selectedEntries.push(oURL);
                      }
                      console.log(selectedEntries);
                      var oODMDialog = new sap.fpa.ui.story.controls.ToggleOptimizedModeMenuItem({

                      });
                      oODMDialog.open();
                      jQuery.sap.declare("sap.fpa.ui.story.StoryOptimizedUnsupportedDialog"),
                        oEvent.exports = sap.fpa.ui.story.StoryOptimizedUnsupportedDialog = {

                        };


                    }
                  }),
                  new sap.ui.commons.Button({
                    icon: "sap-icon://resize-vertical",
                    press: function (oEvent) {
                      if (oTable.getVisibleRowCountMode() === "Interactive") {
                        oTable.setVisibleRowCountMode("Auto");
                      } else {
                        oTable.setVisibleRowCountMode("Interactive");
                      }
                    }
                  }),
                  new sap.ui.commons.Button({
                    icon: "sap-icon://resize-horizontal",
                    press: function (oEvent) {
                      oTable.getColumns().map((col, index) => oTable.autoResizeColumn(index));
                    }
                  }),
                  new sap.ui.commons.Button({
                    icon: "sap-icon://synchronize",
                    press: function (oEvent) {
                      var oModel = oTable.getModel("artifact");
                      oBusy.open();
                      oModel.refresh(true);
                      oBusy.close();
                    }
                  }),
                  new sap.ui.commons.Button({
                    icon: "sap-icon://excel-attachment",
                    press: function (oEvent) {

                      var oRowBinding, oSettings, oSheet, oTable;

                      oRowBinding = oModel.getData();

                      var aCols = [];

                      aCols.push({
                        label: 'Name',
                        property: 'name',
                      });

                      aCols.push({
                        label: 'Story ID',
                        property: 'id',
                      });

                      aCols.push({
                        label: 'Description',
                        property: 'description',
                      });

                      aCols.push({
                        label: 'Created by',
                        property: 'createdBy',
                      });

                      aCols.push({
                        label: 'Template (false/true)',
                        property: 'isTemplate',
                        type: 'sap.ui.model.odata.type.Boolean',
                      });

                      aCols.push({
                        label: 'URL',
                        property: 'openURL',
                      });

                      aCols.push({
                        label: 'Created',
                        property: 'created',
                        type: "sap.ui.model.type.Date",
                        format: 'dd.MM.yyyy HH:mm',
                      });

                      aCols.push({
                        label: 'Changed',
                        property: 'changed',
                        type: "sap.ui.model.type.Date",
                        format: 'dd.MM.yyyy HH:mm',
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

                      oSheet = new sap.ui.export.Spreadsheet(oSettings);
                      oSheet.build().finally(function () {
                        oSheet.destroy();
                      });
                    }
                  })
                ]
              }));

              // assign the table content to the shadow DOM element oPanel
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
      if ("designMode" in changedProperties) {
        this._designMode = changedProperties["designMode"];
      }
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

  function initSAC(e) {
    jQuery.sap.declare("sap.fpa.ui.story.StoryIntegration"),
      function () {
        "use strict";
        e.exports = sap.fpa.ui.story.StoryIntegration = {
          CONTRIBUTIONS: {
            MODEL: "sap.bi.context.model",
            DESIGNER_PANEL_LIST: "sap.fpa.story.sidepanel.designer",
            TOOLBAR_BUTTONS: "sap.fpa.story.toolbar.buttons",
            ENTITY_DATA_PROVIDER_CACHE: "sap.lumira.entityService.EntityDataProviderCache",
            FORMULA_BAR: "sap.fpa.story.formulabar",
            FIREFLY_QUERY_DECORATOR: "firefly.query.decorator",
            WIDGET_SELECTION: "sap.fpa.story.widget.selection",
            ACROSS_MODEL_FILTER_WARNING: "sap.fpa.story.acrossModelFilter.warning",
            WIDGET_MENU_ACTIONS: "sap.fpa.bi.widget.menu.actions",
            WIDGET_EXPORT_ACTIONS: "sap.fpa.bi.widget.export.actions",
            WIDGET_QUICK_ACTIONS: "sap.fpa.bi.widget.quick.actions",
            WIDGET_QUICK_ACTIONS_MIXIN: "sap.fpa.bi.widget.quick.actions.mixin",
            WIDGET_CONTEXT_MENU_MIXIN: "sap.fpa.bi.widget.contextMenu.mixin",
            WIDGET_QUICK_ACTION_APPBUILDING_MIXIN: "sap.fpa.bi.appBuilding.widget.quick.actions.mixin",
            WIDGET_QUICK_ACTION_APPBUILDING_WIDGET_ALIGNMENT: "sap.fpa.bi.appBuilding.widget.quick.actions.widgetAlignment",
            APPBUILDING_DATASOURCE_BINDING_PROVIDER: "sap.fpa.bi.appBuilding.imageDSBindingProvider",
            APP_DESIGN_UQM_FILTERLINE_FILTEERS: "sap.fpa.bi.appBuilding.filterlineFilters",
            APPBUILDING_IMAGE_VALUESECTION_PANEL_PROVIDER: "sap.fpa.bi.appBuilding.imageValueSectionPanelProvider",
            WIDGETS_IN_CURRENT_PAGE_AND_POPUPS: "sap.fpa.bi.appBuilding.allWidgetsInCurrentPageAndPopup",
            WIDGET_INTERACTION_EFFECT_APPBUILDING_MIXIN: "sap.fpa.bi.appBuilding.widget.interaction.effect.mixin",
            APP_DESIGN_NLQ_SEARCH_API: "sap.fpa.bi.appBuilding.nlqSearchAPI",
            APP_DESIGN_WRAP_FLOW: "sap.fpa.bi.appBuilding.wrapflow",
            VIEWPORT_RENDERING_COMPONENT: "sap.fpa.bi.appBuilding.viewportRendering",
            APP_BUILDING_LOAD_INVISIBLE_WIDGETS: "sap.fpa.appBuilding.loadInvisibleWidgets",
            UPDATE_FILTERBAR_SETTINGS_BEFORE_SAVE_STATE: "sap.fpa.bi.story.updateFilterBarSettingsBeforeSaveState",
            WIDGET_QUICK_ACTION_APPBUILDING_WRAP_FLOW: "sap.fpa.bi.appBuilding.widget.quick.actions.wrapflow",
            WIDGET_QUICK_ACTION_APPBUILDING_USER_PERCENTAGE_HEIGHT: "sap.fpa.bi.appBuilding.widget.quick.actions.usePercentageHeight",
            WIDGET_QUICK_ACTION_APPBUILDING_USER_PERCENTAGE_WIDTH: "sap.fpa.bi.appBuilding.widget.quick.actions.usePercentageWidth",
            WIDGET_QUICK_ACTION_APPBUILDING_RESPONSIVE_RULE: "sap.fpa.bi.appBuilding.widget.quick.actions.setResponsiveRule",
            APP_DESIGN_NLQ_SEARCH_DIALOG: "sap.fpa.bi.appBuilding.nlqSearchDialog",
            DYNAMICTABLE_MERGED_ACTIONS: "sap.fpa.bi.dynamictable.quick.actions.merged",
            INITIAL_BOOKMARK_STATE: "sap.fpa.bi.bookmark.initialBookmarkState",
            DOCUMENT_WIDE_SETTINGS: "sap.fpa.story.documentsettings",
            SAVE_STORY_IF_DIRTY: "sap.fpa.story.saveifdirty",
            CREATE_STORY_FROM_WIDGET: "sap.fpa.bi.widget.menu.createStoryButton",
            CREATE_STORY_FROM_WIDGET_VISIBILITY: "sap.fpa.bi.widget.menu.createStoryButton.visibility",
            EXPLORER_MENU_ITEM_INFO: "sap.fpa.bi.widget.explorer.menu.item.info",
            FILTERED_SOURCE_TO_PASTE: "sap.fpa.bi.widget.filter.source.paste",
            PASTING_POSITION: "sap.fpa.bi.widget.pasting.position",
            STORY_IS_DIRTY: "sap.fpa.story.isdirty",
            DASHBOARD_MODEL: "sap.fpa.dashboard.model",
            STORY_ID: "sap.fpa.story.id",
            SOURCE_TEMPLATE_ID: "sap.fpa.template.id",
            GET_STORY_VIEW: "sap.fpa.appBuilding.getStoryView",
            GET_USED_DATASET_IDS: "sap.fpa.appBuilding.getUsedDatasetIds",
            STORY_NAME: "sap.fpa.story.name",
            STORY_STORYMODEL: "sap.fpa.story.getstorymodel",
            STORY_CURRENT_LAYOUT: "sap.fpa.story.currentlayout",
            THEMING_SERVICE: "sap.fpa.story.themingService",
            STORY_FULLSCREEN_WIDGET: "sap.fpa.story.fullscreenwidget",
            BOARDROOM_AGENDA_DATA: "sap.fpa.boardroom.agenda.data",
            STORY_STATE: "sap.fpa.story.storystate",
            STORY_VIEW: "sap.fpa.story.view",
            STORY_VIEW_MODE: "sap.fpa.story.view.mode",
            UPDATE_MODEL_FOR_CURRENT_PAGE: "sap.fpa.story.updateModelForCurrentPage",
            SAVE_PERSISTED_INA_FOR_BOOKMARK: "sap.fpa.story.savePersistedInAForBookmark",
            RESET_STORY_WITH_OPTIONS: "sap.fpa.story.resetStory",
            UPDATE_MODEL_BEFORE_SAVE_STATE: "sap.fpa.story.updateModelBeforeSaveState",
            DECORATE_DEFINITION_BEFORE_SAVE_OPTIMIZED_BOOKMARK: "sap.fpa.story.decorateDefinitionBeforeSaveOptimizedBookmark",
            COMPLETE_PERSISTENCE_FOR_ICS_BEFORE_SAVE_OPTIMIZED_BOOKMARK: "sap.fpa.story.completePersistenceForICsBeforeSaveOptimizedBookmark",
            ORIGINAL_STORY_MODEL: "sap.fpa.story.orginalStoryModel",
            UPDATE_APP_PAYLOAD: "sap.fpa.story.updateAppPayload",
            VALIDATE_NAME_OUTLINE: "sap.fpa.story.validateNameOutline",
            CANVAS_EMPTY_STATE_ACTIONS: "sap.fpa.story.canvasEmptyStateActions",
            ENTITY_PICKER_ACTIONS: "sap.fpa.story.entity.entityPickerActions",
            PAGE_WIDGET_CONTROLS: "sap.fpa.story.document.widgetControls",
            PAGE_SELECTIONS: "sap.fpa.story.layout.selection",
            INPUT_PROCESS_SERVICE: "sap.fpa.story.inputprocessservice",
            TEMPLATE_SERVICE: "sap.fpa.bi.template.TemplateService",
            STATIC_CONTENT_SERVICE: "sap.fpa.bi.story.staticContentService",
            UQM_QUERY_PERSISTENCY_SERVICE: "sap.fpa.bi.story.uqmPersistencyService",
            INPUT_SCHEDULE_TASK_ACTION_SERVICE: "sap.fpa.story.inputschedule.taskactionservice",
            STORY_INACCESSIBLE_MODELS: "sap.fpa.story.document.inaccessibleModels",
            SMART_DISCOVERY_ACTIONS: "sap.fpa.story.story.view.SmartDiscoveryActions",
            COPY_PASTE_PROVIDER: "sap.fpa.story.copypaste.provider",
            CANVAS_PLACEHOLDER_ACTIONS: "sap.fpa.story.canvas.placeHolderActions",
            PAGE_SIZE: "sap.fpa.story.canvas.pageSize",
            STORY_ZOOM_FACTOR: "sap.fpa.story.zoomFactor",
            STORY_DEVICE_PREVIEW_SETTINGS: "sap.fpa.story.devicePreviewSettings",
            SUPPRESS_COLLABORATION_LOADING: "sap.fpa.story.collaboration.suppressLoading",
            QUERY_CACHING_STRATEGY: "sap.fpa.story.query.cacheStrategy",
            WIDGET_VARIABLES: "sap.fpa.story.widget.prompts",
            DOCUMENT_STORE: "sap.fpa.story.documentStore",
            DOCUMENT_ACTIONS: "sap.fpa.story.documentActions",
            APP_STORE: "sap.fpa.bi.appStore",
            TOOLBAR_MODEL: "sap.fpa.story.toolbarModel",
            SIDEPANEL_MODEL: "sap.fpa.story.sidePanelModel",
            DOCUMENT_MODEL: "sap.fpa.story.documentModel",
            SHOW_HIDE_DIMENSION_MENU: "sap.fpa.story.showHideDimensionMenu",
            SORT_DIMENSION_DIALOG: "sap.fpa.story.sortDimensionDialog",
            UNIFIED_STORE: "sap.orca.unifiedStore",
            STORY_INSTANCE_ID: "sap.fpa.story.instanceId",
            DOC_ROOT_ID: "sap.fpa.story.docRootId",
            STORY_UDM_EXTERNAL_SYNC: "sap.fpa.story.udmExternalSync",
            DATA_MODEL_INSTANCE_ID: "sap.fpa.dataModel.instanceId",
            APP_DESIGN_FILTERLINE_FILTERS: "sap.fpa.appBuilding.filterLineFilters",
            APP_DESIGN_SET_FILTERLINE_FILTERS: "sap.fpa.appBuilding.setFilterLineFilters",
            APP_BUILDING_INSTANCE_ID: "sap.fpa.appBuilding.instanceId",
            APP_BUILDING_WIDGET_NAME: "sap.fpa.appBuilding.widgetName",
            APPBUILDING_ENTITIES_SKIP_INA_QUERY: "sap.fpa.appBuilding.entitiesSkipInaQuery",
            APP_BUILDING_SCRIPT_VARIABLE_INITIAL_VALUES: "sap.fpa.appBuilding.scriptvariable.initialvalues",
            APP_BUILDING_STORE_WRAPPER: "sap.fpa.appBuilding.storeWrapper",
            APP_BUILDING_FIRE_EVENT: "sap.fpa.appBuilding.fireEvent",
            APP_BUILDING_HAS_INIT_SCRIPT: "sap.fpa.appBuilding.hasInitScript",
            ALTER_WIDGET_COPY_PASTE_DATA: "sap.fpa.story.alterWidgetCopyPasteData",
            GET_STORY_VARIABLE_PROMPT_DIALOG_OPEN: "sap.fpa.story.getStoryVariablePromptDialogOpen",
            APP_BUILDING_SAVE_APP: "sap.fpa.appBuilding.saveApp",
            APP_BUILDING_OPTIMIZED_MODE_RELOAD_WARNING_FUNCTIONS: "sap.fpa.appBuilding.optimziedMode.reload.warning",
            APP_BUILDING_STATE_FOR_SAVE: "sap.fpa.appBuilding.stateForSave",
            APP_BUILDING_SHOW_HIDE_COMMENTMODE: "sap.fpa.appBuilding.showHideCommentMode",
            APP_BUILDING_RELOAD_APP: "sap.fpa.appBuilding.reloadApp",
            APP_BUILDING_RESPONSIVE_CONTAINER_ACTIONS: "sap.fpa.appBuilding.responsiveContainerActions",
            DATA_CHANGE_INSIGHTS_SUBSCRIPTION: "sap.fap.datachangeinsights.subscription",
            DATA_CHANGE_INSIGHTS_SUBSCRIPTION_PROMISE: "sap.fap.datachangeinsights.subscription.promise",
            DATA_CHANGE_INSIGHTS_SUBSCRIPTION_RANGE_SETTING_DIALOG: "sap.fap.datachangeinsights.subscription.rangeSettingDialog",
            EXTEND_POPUP_TO_DIALOG: "sap.fpa.extendPopupToDialog",
            COPY_PASTE_TECHNICAL_COMPONENT: "sap.fpa.appBuilding.copyPasteTechnicalComponent",
            INTEGRATION_QUERY_BUILDER_VIEW: "sap.fpa.story.integration.query.builder",
            APP_BUILDING_THEMING: "sap.fpa.appBuilding.theming",
            STORY2_CSS_WARNING_SERVICE: "sap.fpa.story2.cssWarningService",
            APPBUILDING_EXPORT_UTILS: "sap.fpa.appBuilding.appbuildingExportUtils",
            APPBUILDING_EXPORT_INFO_PROVIDER: "sap.fpa.appBuilding.export.info.provider",
            STORY_EXPORT: "sap.fpa.story.export",
            STORY2_START_SCHEDULING: "sap.fpa.story2.start.scheduling",
            EXPORTED_FILE_NAME: "sap.fpa.story2.exported.file.name",
            OPTIMIZED_MODE_FEATURES_VALIDATOR: "sap.fpa.story.optimizedModeFeaturesValidator",
            STORY_LAYOUT: "sap.fpa.story.getlayout",
            CURRENT_VIEW: "sap.fpa.bi.explorer.currentView",
            WIDGET_ID: "sap.fpa.story.widget.id",
            APPBUILDING_EXPORT_PDF_SCRIPT_ACTION_HELPER: "sap.fpa.appBuilding.exportPdfScriptActionHelper",
            APPBUILDING_CSS_THEME_HELPER: "sap.fpa.appBuilding.cssThemeHelper",
            APPBUILDING_SET_WIDGET_READY: "sap.fpa.appBuilding.setWidgetReady",
            APPBUILDING_DATA_EXPLORER_CONFIGURATION_HELPER: "sap.fpa.appBuilding.dataExplorerConfigurationHelper",
            REPEATABLE_GROUP_SERVICE: "sap.fpa.bi.pagegroup.repeatableGroupService",
            SET_PAGE_LOADING_INDICATOR: "sap.fpa.story.view.setPageLoadingIndicator",
            MODEL_VALIDATOR: "sap.fpa.story.optimized.model.validator",
            APPBUILDING_CUSTOM_MESSAGES: "sap.fpa.appBuilding.customMessages",
            NATIVE_APP_HAS_DIALOGS_OPEN: "sap.fpa.ui.enhancedTouch.nativeAppHasDialogsOpen",
            UQM_INPUT_CONTROL_PANEL: "sap.fpa.story.uqmInputControlPanel",
            WIDGET_UNIFIED_SETTINGS_SERVICE: "sap.fpa.appBuilding.widgetUnifiedSettingsService",
            PAGE_FILTER_WIDGET_LINKED_ANALYSIS_PANEL: "sap.fpa.appBuilding.inputControlLinkedAnalysisPanel",
            WIDGET_LINKED_ANALYSIS_PANEL: "sap.fpa.appBuilding.common.controls.linkedAnalysis.WidgetLinkedAnalysisPanel",
            PAGE_FILTER_WIDGET_BUILDER_PANEL: "sap.fpa.story.inputControlBuilderPanel",
            EVALUATION_EXECUTOR: "sap.fpa.bi.evaluationExecutor",
            MESSAGE_BUNDLE: "sap.fpa.bi.messageBundle",
            PAGE_FILTER_WIDGET_CASCADE_GROUPING_SERVICE: "sap.fpa.story.cascadeGroupingService",
            APPBUILDING_ALL_LINKED_ANALYSIS_TARGET_WIDGETS: "sap.fpa.appbuilding.common.linkedAnalysis.AllPageWidgets",
            STORY_DIRTY_STATE_INTERNAL: "sap.fpa.story.dirtyStateInternal",
            APPBUILDING_ENTITIES_IN_INIT_SCRIPT: "sap.fpa.appBuilding.onInitEntities",
            DATE_MANIPULATOR_FACTORY: "sap.lumira.entityService.date.DateManipulatorFactory",
            DOCUMENT_FILTERS_PERSISTENCE_PROMISE: "sap.fpa.story.documentFiltersPromise",
            UPDATE_STORY_FILTER_VISIBLE_STATE: "sap.fpa.story.storyFilter.update.visible.state",
            CURRENT_PAGE_INITIALIZED: "sap.fpa.ui.page.current.intialized",
            STORY2_BOOKMARK_RESOURCE_PROVIDER: "sap.fpa.ui.story2.bookmark.resource.provider",
            STORY2_BOOKMARK_INFO_PROVIDER: "sap.fpa.ui.story2.bookmark.info.provider",
            STORY2_BOOKMARK_TRIGGER_PROVIDER: "sap.fpa.ui.story2.bookmark.trigger.provider",
            STORY2_VIEW: "sap.fpa.ui.story2.view",
            STORY2_CHECK_WIDGET_VISIBILITY: "sap.fpa.ui.story2.check.widget.visibility",
            STORY2_COMMENTING_SCROLL_LAYOUT: "sap.fpa.ui.story2.commenting.scroll.layout",
            STORY2_BOOKMARK_MIGRATOR_REGISTER: "sap.fpa.story2.bookmark.migrator.register",
            STORY2_CSS_THEME_MANAGER: "sap.fpa.story2.cssThemeManager",
            STORY2_REPORTING_LAYOUT_UTILS: "sap.fpa.story2.reportingLayoutUtil",
            STORY2_BOOKMARK_SAVE_SUPPORT: "sap.fpa.story2.bookmark.save.support",
            LOAD_BOOKMARK_BY_API: "sap.fpa.story2.bookmark.api.load"
          },
          MODEL_EVENTS: {
            SET_EMPTY_STATE_BUTTON_ACTIONS: "sap.fpa.story.canvasEmptyStateActions.set",
            UPDATE_QUICK_ACTION_BUTTONS: "sap.fpa.story.widget.quick.actions.update",
            WIDGET_MODEL_UPDATED: "sap.fpa.story.widget.model.updated",
            WIDGET_DATASETS_UPDATED: "sap.fpa.story.widget.datasets.updated",
            DATASET_DATA_CHANGED: "sap.fpa.story.dataset.data.changed",
            DATASET_DATA_LOCKS_UPDATED: "sap.fpa.story.dataset.datalocks.updated",
            WIDGET_TITLE_CHANGED: "sap.fpa.story.widget.title.changed",
            EXCLUSION_FILTER_CHANGED: "sap.fpa.story.filter.exclusion.changed",
            TRANSIENT_FILTER_REMOVED: "sap.fpa.story.filter.transient.removed",
            PIN_DATAPOINT: "sap.fpa.story.pin.datapoint",
            REFRESH_PINNED_DATAPOINTS: "sap.fpa.story.refresh.pinned.datapoints",
            LINKEDANALYSIS_PANEL_DISABLED_REASON: "sap.fpa.story.linkedanalysis.disabled.reason",
            WIDGET_FILTERS_CHANGED: "sap.fpa.story.widget.filter.changed",
            CHART_DATA_CHANGED: "sap.fpa.story.widget.data.changed",
            CHART_DYNAMIC_TEXT_PROP_CHANGED: "sap.fpa.story.chartDynamicTextProperties.changed",
            FILTERS_CHANGED: "sap.fpa.story.dtc.filter.changed",
            TABLE_INITIALIZED: "sap.fpa.story.dtc.table.initialized",
            HIERARCHY_CHANGED: "sap.fpa.story.dtc.hierarchy.changed",
            RESTRICTION_CHANGED: "sap.fpa.story.dtc.restriction.changed",
            STORY_CALCULATION_REMOVED: "sap.fpa.ui.pa.story.calculation.removed",
            UPDATE_STORY_PAGES: "sap.fpa.bi.dimensionMemberOrder.customSort.update.story.pages",
            GROWING_TABLE_READY: "sap.fpa.story.growingTable.ready",
            REPEATABLE_GROUP_REFRESH: "sap.fpa.story.repeatblegroup.refreshed",
            LEGACY_BOOKMARK_MIGRATION_START: "sap.fpa.story.legacy.bookmark.migration.start",
            LEGACY_BOOKMARK_MIGRATION_END: "sap.fpa.story.legacy.bookmark.migration.end"
          },
          UI_EVENTS: {
            FILTER_MEMBER_SELECTOR: "sap.fpa.appBuilding.filterline.memberSelector",
            TEMP_STORY_DELETED: "sap.fpa.story.tempstorydeleted",
            WIDGET_DATA_SELECTION_CHANGED: "sap.fpa.story.widget.data.selection.changed",
            WIDGET_COLOR_SYNC_CHANGED: "sap.fpa.story.widget.color.sync.changed",
            WIDGET_CUSTOM_SORT_CHANGED: "sap.fpa.story.widget.customSort.changed",
            WIDGET_PATTERN_SYNC_CHANGED: "sap.fpa.story.widget.pattern.sync.changed",
            WIDGET_SYNCED_MEASURE_COLOR_CHANGED: "sap.fpa.story.widget.syncedmeasurecolorchanged",
            WIDGET_ADD_DATASET: "sap.fpa.story.widget.dataset.added",
            WIDGET_FIT_CONTENT: "sap.fpa.story.widget.fit.content",
            WIDGET_UPDATE_STYLING_CONTEXT: "sap.fpa.story.widget.update.stylingContext",
            WIDGET_RESET_STYLES: "sap.fpa.story.widget.reset.styles",
            WIDGET_SET_FOOTER_STATE: "sap.fpa.story.widget.set.footerstate",
            WIDGET_VISIBILITY_CHANGED: "sap.fpa.story.widget.visibility.changed",
            DOCUMENT_WIDE_SETTINGS_UPDATED: "sap.fpa.story.documentsettings.changed",
            WIDGET_SELECTION_CHANGED: "sap.fpa.story.widget.selection.changed",
            STORY_REMOVE_WIDGET: "sap.fpa.story.removewidget",
            STORY_REMOVE_LANE: "sap.fpa.story.removelane",
            STORY_GOTO_PAGE: "sap.fpa.story.gotoPage",
            STORY_INIT_PAGE_BY_TYPE: "sap.fpa.story.initpagebytype",
            STORY_INIT_PAGE_FROM_TEMPLATE: "sap.fpa.story.initpagefromtemplate",
            STORY_ADD_PAGE: "sap.fpa.story.addpage",
            STORY_REMOVE_PAGE: "sap.fpa.story.removepage",
            STORY_REORDER_PAGE: "sap.fpa.story.reorderpage",
            STORY_BLOCK_INTERACTION: "sap.fpa.story.blockinteraction",
            PREDICTIVE_KI_TOOLTIP_LINK_CLICKED: "sap.fpa.predictive.kitooltiplink.clicked",
            DATAVIEW_TOGGLE_PREVIEW_MODE: "sap.fpa.dm.togglePreviewMode",
            DISCUSSION_PANEL_TOGGLE: "sap.fpa.story.discussionpanel.toggle",
            DOCUMENT_SET_DESIGNER_PANEL: "sap.fpa.story.document.sidepanel.designer.set",
            DOCUMENT_SET_THRESHOLD_PANEL: "sap.fpa.story.document.sidepanel.threshold.set",
            EXPLORER_VIEW_SWITCH: "sap.fpa.explorer.viewswitch",
            EXPLORER_UPDATE_VIZ_CONTEXT: "sap.fpa.explorer.updatevizcontext",
            EXPLORER_SAVE: "sap.fpa.explorer.save",
            STORY_EXPLORER_SAVE: "sap.fpa.storyExplorer.save",
            STORY_EXPLORER_THEMECHANGED: "sap.fpa.storyExplorer.themechanged",
            EXPLORER_SWITCH_SIDEPANEL: "sap.fpa.explorer.switchsidepanel",
            EXPLORER_UPDATE_SMART_DISCOVERY_DATASET: "sap.lumira.document.SmartDiscovery.updatedataset",
            EXPLORER_UPDATE_SORT_COLUMNS: "sap.fpa.explorer.updatesortcolumns",
            STORY_UPDATE_FULLSCREEN_WIDGET: "sap.fpa.story.updatefullscreenwidget",
            STORY_SHARE: "sap.fpa.story.share",
            STORY_EXPORT_TO_PDF: "sap.fpa.story.exporttopdf",
            STORY_DISCUSS: "sap.fpa.story.discuss",
            STORY_SAVE: "sap.fpa.story.save",
            STORY_SAVEAS: "sap.fpa.story.saveas",
            STORY_SAVEASTEMPLATE: "sap.fpa.story.saveastemplate",
            STORY_SAVE_AND_GOTO_MODELER: "sap.fpa.story.save.and.goto.modeler",
            STORY2_SAVE: "sap.fpa.story2.save",
            STORY_EDIT_TITLE: "sap.fpa.story.edit.title",
            STORY_EDIT_PREFERENCES: "sap.fpa.story.edit.preferences",
            STORY_EDIT_QUERY_SETTINGS: "sap.fpa.story.edit.query.settings",
            STORY_CONVERT_OPTIMIZED_DESIGN_MODE: "sap.fpa.story.convert.optimized.design.mode",
            STORY_EDIT_SMART_INSIGHTS_SETTINGS: "sap.fpa.story.edit.smart.insights.settings",
            STORY_DIRTY: "sap.fpa.story.dirty",
            STORY_TOGGLESPLITVIEW: "sap.fpa.story.splitview.toggle",
            STORY_SWITCH_VIEW: "sap.fpa.story.switchView",
            STORY_SHOWDESIGNER: "sap.fpa.story.designer.show",
            STORY_TOGGLEDESIGNER: "sap.fpa.story.designer.toggle",
            STORY_TOGGLEFILTERS: "sap.fpa.story.sidepanel.filters.toggle",
            STORY_SHOWFILTERS: "sap.fpa.story.sidepanel.filters.show",
            STORY_TOGGLEOVERLAYPANE: "sap.fpa.story.overlaypane.toggle",
            STORY_TOGGLESIDEPANELCOMPLETE: "sap.fpa.story.sidepanel.toggle.complete",
            STORY_SHOWHYPERLINKPANE: "sap.fpa.story.sidepanel.hyperlink.show",
            STORY_SHOWLINKEDANALYSISPANE: "sap.fpa.story.sidepanel.linkedanalysis.show",
            STORY_LAYOUTPANEL_UPDATED: "sap.fpa.story.sidepanel.layout.updated",
            STORY_ONPAGETITLECHANGE: "sap.fpa.story.onpagetitlechange",
            STORY_TOGGLEPRESENTATIONMODE: "sap.fpa.story.presentationmode.toggle",
            STORY_PINPRESENTATIONMODE: "sap.fpa.story.presentationmode.pin",
            STORY_TOGGLEDEVICEPREVIEWMODE: "sap.fpa.story.devicepreviewmode.toggle",
            STORY_SETDEVICEPREVIEWKEY: "sap.fpa.story.devicepreviewkey.set",
            STORY_TOGGLETOOLBAR: "sap.fpa.story.toolbar.toggle",
            STORY_UPDATETOOLBAR: "sap.fpa.story.toolbar.update",
            STORY_TOGGLE_FILTERBAR: "sap.fpa.story.filterbar.toggle",
            STORY_SWITCH_FILTERBAR: "sap.fpa.story.filterbar.switch",
            STORY_OPENVARIABLEPROMPT: "sap.fpa.story.variableprompt.open",
            STORY_CLOSEVARIABLEPROMPT: "sap.fpa.story.variableprompt.close",
            STORY_VIEWPORT_CHANGED: "sap.fpa.story.viewport.changed",
            RECALCULATE_PIN_DATAPOINT_LINES: "sap.fpa.story.pindatapoint.recalculatelines",
            INPUT_SUMMARY_CONTENT_CHANGED: "sap.fpa.inputsummary.content.changed",
            IMAGE_UPLOAD_INDICATOR: "sap.fpa.story.image.upload.indicator",
            BEANS_ADDED: "sap.fpa.story.beans.added",
            BEAN_REMOVED: "sap.fpa.story.bean.removed",
            TABLE_VARIABLE_CHANGE: "sap.fpa.story.dynamicText.dtc.variable.update",
            DM_GEO_MENU_ITEM_CREATE_BY_COORDINATE: "sap.fpa.dm.geoByCoordinate",
            DM_GEO_MENU_ITEM_CREATE_BY_AREA: "sap.fpa.dm.geoByArea",
            DM_SUCCESS_FACTORS_DUMMY_BTN: "sap.fpa.dm.successFactorsDummy",
            TOGGLE_WIDGET_QUICK_ACTIONS: "sap.fpa.story.widget.quick.actions.toggle",
            COMMENT_SHORT_KEY_EVENT: "sap.fpa.bi.ScrollableTable.Comment.ShortKey",
            TOGGLE_FORMULA_BAR: "sap.fpa.story.formulabar.toggle",
            TOGGLE_CALENDAR_TOOLBAR: "sap.fpa.story.calendartoolbar.toggle",
            FORMULA_BAR_UPDATE_CONTENT: "sap.fpa.story.formulabar.updateContent",
            DM_CREATE_CALCULATED_COLUMN: "sap.fpa.dm.calculatedColumn",
            TOOLBAR_EXPANDED: "sap.fpa.story.toolbar.expanded",
            TOGGLE_EDITABLE: "sap.fpa.story.toolbar.editable",
            SMARTINSIGHT_PANEL_OPEN_IN_DIALOG: "sap.fpa.openSmartInsightPanelInDialog",
            OPEN_SELECT_THEME_DIALOG: "sap.fpa.openSelectThemeDialog",
            LOAD_DEFAULT_THEME: "sap.fpa.bi.appBuilding.theme.loadDefaultTheme",
            LOAD_LOCAL_THEME: "sap.fpa.bi.appBuilding.theme.loadLocalTheme",
            LOAD_RECENT_THEME: "sap.fpa.bi.appBuilding.theme.loadRecentTheme",
            OPEN_PREFERENCEDIALOG: "sap.fpa.bi.appBuilding.theme.openPreferenceDialog",
            OPEN_DEFAULT_THEME_PREFERENCE_DIALOG: "sap.fpa.bi.appBuilding.theme.openDefaultThemePreferenceDialog",
            OPEN_LOCAL_THEME_PREFERENCE_DIALOG: "sap.fpa.bi.appBuilding.theme.openLocalThemePreferenceDialog",
            TOGGLE_FIT_PAGE_TO_DEVICE: "sap.fpa.bi.appBuilding.fitPageToDevice.toggle",
            ENABLE_DEVICE_PREVIEW: "sap.fpa.bi.appBuildin.fitPageToDevice.enableDevicePreview.toggle",
            APP_BUILDING_DEVICE_PREVIEW_SIZE_CHANGED: "sap.fpa.bi.appBuilding.device.preview.size.changed",
            APP_BUILDING_CUSTOMIZED_DEVICE_PREVIEW_SIZE_CHANGED: "sap.fpa.bi.appBuilding.customized.device.preview.size.changed",
            RERENDER_BACKGROUND_COLOR: "sap.fpa.bi.appBuilding.theme.rerenderBackgroundColor",
            ON_THEMEAPI_ERROR: "sap.fpa.bi.appBuilding.theme.onThemeApiError",
            APP_BUILDING_THEME_PREFERENCES_DATA_PROVIDER: "sap.fpa.bi.appBuilding.theme.preferences.data.provider",
            WIDGET_UPDATE_NOT_FOLLOW_THEME: "sap.fpa.bi.appBuilding.widget.updateNotFollowTheme",
            WIDGET_DATA_SOURCE_REBIND: "sap.fpa.bi.appBuilding.widget.dataSource.rebind",
            REVERT_TO_BASIC_DATA_PREP: "sap.fpa.dm.revertToBasicDataPrep",
            ENSURE_EFFECTIVE_SETTINGS_CHANGE_SUBSCRIBERS: "sap.fpa.story.ensureEffectiveSetthingsChangeSubscribers",
            APP_BUILDING_PAGE_SIZE_CHANGED: "sap.fpa.bi.appBuilding.page.size.changed",
            BROADCASTMESSAGE_NOTIFICATION: "sap.fpa.ui.integration.broadcastMessage",
            REPEATABLE_GROUP_MIRRORED: "sap.fpa.story.repeatblegroup.mirrored",
            APP_BUILDING_SHOWLINKEDANALYSISPANE: "sap.fpa.appBuilding.sidepanel.linkedanalysis.show",
            APP_BUILDING_HIDELINKEDANALYSISPANE: "sap.fpa.appBuilding.sidepanel.linkedanalysis.hide",
            OPEN_LINKED_ANALYSIS_VIEW: "sap.fpa.appBuilding.open.linkedanalysisview",
            CLOSE_LINKED_ANALYSIS_VIEW: "sap.fpa.appBuilding.close.linkedanalysisview",
            APP_BUILDING_OPEN_CSS_EDITOR: "sap.fpa.appBuilding.open.cssEditor",
            APP_BUILDING_CLOSE_CSS_EDITOR: "sap.fpa.appBuilding.close.cssEditor",
            APP_BUILDING_NAME_UPDATED: "sap.fpa.appBuilding.name.updated",
            STORY2_DIRTY_FILTER_UPDATED: "sap.fpa.story2.dirtyfilter.updated",
            STORY_CONVERT_STORY2: "sap.fpa.story.convert.story2",
            SDK_WIDGET_ADD_MODEL: "sap.fpa.story2.customWidget.addModel"
          },
          TOOLBAR_BUTTONS: {
            CROSSTAB_INPUT_SCHEDULE: "crosstabgrid.inputschedule",
            EXPLORER_FACET_VIEW: "explorer.facetview",
            EXPLORER_GRID_VIEW: "explorer.gridview",
            EXPLORER_DATASET_GRID_VIEW: "explorer.datasetGridView",
            EXPLORER_IMPORT_DATA: "explorer.import data",
            EXPLORER_MAINTAIN_HIERARCHY: "explorer.speedboat hierarchy",
            EXPLORER_GEO_SPEEDBOAT: "explorer.speedboat geo",
            EXPLORER_SPEEDBOAT_CARDVIEW: "explorer.speedboat cardview",
            EXPLORER_SPEEDBOAT_TRANSFORM_BAR: "explorer.speedboat tranformbar",
            EXPLORER_DEDUPLICATE: "explorer.deduplicate",
            EXPLORER_CREATE_CALCULATED_COLUMN: "explorer.speedboat calculatedColumn",
            EXPLORER_UNPIVOT: "explorer.speedboat unpivot",
            EXPLORER_PUBLISH_MODEL: "explorer.publish.model",
            EXPLORER_SHOW_HIDE_DIMENSIONS: "explorer.show.hide.dimensions",
            EXPLORER_SORT_DIMENSIONS: "explorer.sort.dimensions",
            EXPLORER_SPEEDBOAT_SORT_COLUMNS: "explorer.speedboat sortColumns",
            EXPLORER_SUCCESS_FACTORS_FILTER: "explorer.successfactors.tool filter",
            EXPLORER_SUCCESS_FACTORS_CREATE_CALCULATED_COLUMN: "explorer.successfactors.speedboat calculatedColumn",
            EXPLORER_HISTORY: "explorer.history",
            EXPLORER_ADD_NEW_DATA: "explorer.addNewData",
            UNDO: "story.undo",
            REDO: "story.redo",
            DYNAMICTAB_VERMGMT: "dynamicgrid.versionmanagement",
            DYNAMICTAB_VERMGMT_HISTORY: "dynamicgrid.versionmanagementhistory",
            DYNAMICTAB_VERMGMT_SAVEDATA: "dynamicgrid.versionmanagementsavedata",
            DYNAMICTAB_COPYPASTE: "dynamicgrid.copypaste",
            DYNAMICTAB_ALLOCATION: "dynamicgrid.allocation",
            DYNAMICTAB_FORECAST: "dynamicgrid.forecast",
            DYNAMICTAB_CELLREFERENCE: "dynamicgrid.cellreference",
            DYNAMICTAB_SHOWHIDE: "dynamicgrid.showhide",
            DYNAMICTAB_FREEZE: "dynamicgrid.freeze",
            DYNAMICTAB_READONLYCELL: "dynamicgrid.readOnlyCell",
            DYNAMICTAB_VALUELOCKCELL: "dynamicgrid.valueLockCell",
            DYNAMICTAB_CREATEINPUTTASK: "dynamicgrid.createInputTask",
            DYNAMICTAB_FITTOCONTENT: "dynamicgrid.fitToContent",
            SMART_DISCOVERY: "smartdiscovery",
            ADD_PREDICTIVE: "addpredictive",
            SNAPSHOT: "snapshot",
            STORYTOOLBAR_GEO_MAP: "storytoolbar.geoMap",
            STORYTOOLBAR_VALUE_DRIVER_TREE: "storytoolbar.valueDriverTree",
            STORYTOOLBAR_DATA_ACTION_TRIGGER: "storytoolbar.dataActionTrigger",
            STORYTOOLBAR_R_VISUALIZATION: "storytoolbar.rVisualization",
            EMBEDTOOLBAR_RESET: "embedtoolbar.reset",
            EMBEDTOOLBAR_PROMPT: "embedtoolbar.prompt",
            EMBEDTOOLBAR_FILTER: "embedtoolbar.filter",
            EMBEDTOOLBAR_FAVORITE: "embedtoolbar.favorite"
          },
          DESIGNER_PANELS: {
            DATA: "sap.fpa.story.sidepanel.designer.data",
            FORMATTING: "sap.fpa.story.sidepanel.designer.formatting",
            GEO: "sap.fpa.story.sidepanel.designer.geo"
          },
          MENU_IDS: {
            EXPLORER_CHART_OPTIONS: "sap.fpa.story.explorer.chartoptions",
            EXAMINE_CHART_OPTIONS: "sap.fpa.story.examine.chartoptions"
          }
        }
      }()
  }

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
    let uqmMigration = documentContext.get("sap.fpa.bi.uqmMigration.UnsupportedFeatures");
    console.log("unsupported features");
    console.log(uqmMigration);
    let r = sap.fpa.ui.infra.common.getContext().getSemanticObject();
    console.log("semantic object");
    console.log(r);
    // sap.ui.define([
    //   "sap/fpa/ui/story/Utils"
    // ], function (Utils) {
    //   // Your code here
    //   Utils.getStoryById("59A395046F3F8A41401B0B1C28FD787D").then(function (story) {
    //     console.log(story);
    //   });
    // });
    // console.log(sap.fpa.bi.uqmMigration.UnsupportedFeatures);

    // SAC modules:
    // sap.fpa.ui.infra.service.AjaxHelper
    // "sap.fpa.ui.infra.service.firefly.FireflyServiceManagerBase"
    // isConvertingToOptimizedDesignMode
    // migrateStoryForOptimizedFormat
    // migrateForUQM 
    // sap.fpa.bi.uqmMigration.UnsupportedFeatures
    if (sap.lumira.story.StoryModel) {
      console.log("story model");
      console.log(sap.lumira.story.StoryModel);

    }

    if (sap.fpa.ui.infra.service.firefly.FireflyServiceManagerBase) {
      console.log(sap.fpa.ui.infra.service.firefly.FireflyServiceManagerBase);
    }

    jQuery.sap.declare("sap.fpa.ui.story.StoryIntegration"), function () {

    }

    // try detect runtime settings
    if (window.sap && sap.fpa && sap.fpa.ui && sap.fpa.ui.infra) {
      if (sap.fpa.ui.infra.common) {
        let context = sap.fpa.ui.infra.common.getContext();
        console.log("Context:");
        console.log(context);
        // var s = sap.fpa.ui.infra.common.getContext().get("sap.fpa.story.optimized.model.validator");
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

    let t;
    t = fn => sap.fpa.story.optimized.model.validator(true, fn);

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