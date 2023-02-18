import html from './header.html'

export default class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }


    render() {
        const { shadowRoot } = this;

        const { cssContent, htmlContent } = this.htmlToElement(html);
        shadowRoot.innerHTML = '';
        shadowRoot.appendChild(cssContent)
        shadowRoot.appendChild(htmlContent)

        sap.ui.define([
            "sap/ui/core/mvc/Controller"
        ], function (Controller) {
            "use strict";

            return Controller.extend("myapp.controller.View1", {
                onInit: function () {
                    var oData = {
                        products: [
                            { ProductName: "Product A", Price: 10 },
                            { ProductName: "Product B", Price: 20 },
                            { ProductName: "Product C", Price: 30 },
                        ]
                    };

                    var oModel = new sap.ui.model.json.JSONModel(oData);
                    this.getView().setModel(oModel);
                    console.table(oModel);
                }
            });
        });


        // // shadowRoot.querySelector('.title').innerHTML = 'Marvelius 1.0';
        // var vData = [{
        //     assID: "EM123456",
        //     name: "Bharath S",
        //     linkText: "Cognizant Technology Solutions",
        //     href: "http://www.cognizant.com",
        //     gender: "Male",
        //     mobile: "9934307162", rating: 5
        // },];

        // // Define a table [Note: you must include the table library to make the Table class work]
        // var oTable = new sap.ui.table.Table({
        //     title: "Employee Details",                                   // Displayed as the heading of the table
        //     visibleRowCount: 3,                                           // How much rows you want to display in the table
        //     selectionMode: sap.ui.table.SelectionMode.Single, //Use Singe or Multi
        //     // navigationMode: sap.ui.table.NavigationMode.Paginator, //Paginator or Scrollbar
        //     fixedColumnCount: 3,                     // Freezes the number of column
        //     enableColumnReordering: true,       // Allows you to drag and drop the column and reorder the position of the column
        //     width: "1024px"                              // width of the table

        // });

        // // Use the Object defined for table to add new column into the table

        // oTable.addColumn(new sap.ui.table.Column({

        //     label: new sap.ui.commons.Label({ text: "Associate ID" }),             // Creates an Header with value defined for the text attribute

        //     template: new sap.ui.commons.TextField().bindProperty("value", "assID"), // binds the value into the text field defined using JSON

        //     sortProperty: "assID",        // enables sorting on the column

        //     filterProperty: "assID",       // enables set filter on the column

        //     width: "125px"                  // width of the column

        // }));

        // oTable.addColumn(new sap.ui.table.Column({

        //     label: new sap.ui.commons.Label({ text: "Associate Name" }),

        //     template: new sap.ui.commons.TextField().bindProperty("value", "name"),

        //     sortProperty: "name",

        //     filterProperty: "name",

        //     width: "125px"

        // }));

        // oTable.addColumn(new sap.ui.table.Column({

        //     label: new sap.ui.commons.Label({ text: "Company" }),

        //     template: new sap.ui.commons.Link().bindProperty("text", "linkText").bindProperty("href", "href"),

        //     sortProperty: "linkText",

        //     filterProperty: "linkText",

        //     width: "200px"

        // }));

        // oTable.addColumn(new sap.ui.table.Column({

        //     label: new sap.ui.commons.Label({ text: "Gender" }),

        //     template: new sap.ui.commons.ComboBox(

        //         {
        //             items: [new sap.ui.core.ListItem({ text: "Female" }),

        //             new sap.ui.core.ListItem({ text: "Male" })]
        //         }).bindProperty("value", "gender"),

        //     sortProperty: "gender",

        //     filterProperty: "gender",

        //     width: "75px"

        // }));

        // oTable.addColumn(new sap.ui.table.Column({

        //     label: new sap.ui.commons.Label({ text: "Contact Number" }),

        //     template: new sap.ui.commons.TextField().bindProperty("value", "mobile"),

        //     sortProperty: "mobile",

        //     filterProperty: "mobile",

        //     width: "75px"

        // }));

        // oTable.addColumn(new sap.ui.table.Column({

        //     label: new sap.ui.commons.Label({ text: "Rating" }),

        //     template: new sap.ui.commons.RatingIndicator().bindProperty("value", "rating"),

        //     sortProperty: "rating",

        //     filterProperty: "rating",

        //     width: "100px"

        // }));

        // //Create a model and bind the table rows to this model
        // var oModel = new sap.ui.model.json.JSONModel();        // created a JSON model      
        // oModel.setData({ modelData: vData });                              // Set the data to the model using the JSON object defined already
        // oTable.setModel(oModel);
        // oTable.bindRows("/modelData"); // binding all the rows into the model
        // //Initially sort the table
        // oTable.sort(oTable.getColumns()[0]);
        // oTable.getView();
        // oTable.placeAt("EmpTbl");
    }


    htmlToElement(html) {
        var template = document.createElement('template');
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return { cssContent: template.content.firstChild, htmlContent: template.content.lastChild };
    }
}