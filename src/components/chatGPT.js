//import html from './chatGPT.html'
const { Configuration, OpenAIApi } = require("openai");

export default class ChatGPT extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();

        this._export_settings = {};
        this._export_settings.apiSecret = "";
        console.log(this._export_settings.apiSecret);

        var n = sap.ui.getCore().getConfiguration().getLanguage();
        // this.oComposeComp = sap.ui.getCore().createComponent({
        //     name: "sap.epm.story",
        //     settings: {
        //         editMode: this.getEditMode(),
        //         queryService: this.getQueryService(),
        //         userLocale: n
        //     }
        // });
        // console.log(this.oComposeComp);
        // var t = this.getUnsupportedBlockingFeatures();
        // console.log(t);
        // var n = this.getContext().get("sap.fpa.bi.documentService").getStoryModel()
        // console.log(n);
        // var o = this.getUnsupportedFeatures();
        // console.log(o);
        this.addEventListener("click", event => {
            console.log('click');
        });

    }

    // Data Source
    set myDataSource(dataBinding) {
        this._myDataSource = dataBinding;
        // console.log(this._myDataSource);
        this.render();
    }

    // SETTINGS
    get apiSecret() {
        return this._export_settings.apiSecret;
    }
    set apiSecret(value) {
        this._export_settings.apiSecret = value;
    }

    static get observedAttributes() {
        return [
            "apiSecret",
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue != newValue) {
            this[name] = newValue;
        }
    }

    render() {
        const { shadowRoot } = this;

        // create chatbox element
        const chatbox = document.createElement('div');
        chatbox.id = 'chatbox';

        // append chatbox to shadow DOM
        shadowRoot.appendChild(chatbox);

        // create input element
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'chat-input';

        // add event listener to input element
        input.addEventListener('keydown', (event) => {
            if (event.keyCode === 13) {
                const message = event.target.value;
                this.sendChatGPTMessage(message);
                event.target.value = '';
            }
        });

        // append input to shadow DOM
        shadowRoot.appendChild(input);

        // create table element
        // const table = new sap.ui.table.Table({
        //     id: 'chat-gpt-table-main',
        //     columns: [
        //         new sap.ui.table.Column({
        //             label: new sap.m.Label({ text: 'You' }),
        //             template: new sap.m.Text({ text: "{You}" }),
        //         }),
        //         new sap.ui.table.Column({
        //             label: new sap.m.Label({ text: 'Chatbot' }),
        //             template: new sap.m.Text({ text: "{Chatbot}" }),
        //         })
        //     ]
        // });

        // // append table to shadow DOM
        // const tableContainer = document.createElement('div');
        // tableContainer.id = 'table-container';
        // shadowRoot.appendChild(tableContainer);
        // table.placeAt(tableContainer);

        // sap.ui.define([
        //     "sap/ui/core/mvc/Controller"
        // ], function (Controller) {
        //     "use strict";

        //     return Controller.extend("myapp.controller.View1", {
        //         onInit: function () {
        //             var oData = {
        //                 products: [
        //                     { ProductName: "Product A", Price: 10 },
        //                     { ProductName: "Product B", Price: 20 },
        //                     { ProductName: "Product C", Price: 30 },
        //                 ]
        //             };

        //             var oModel = new sap.ui.model.json.JSONModel(oData);
        //             this.getView().setModel(oModel);
        //             console.table(oModel);
        //         }
        //     });
        // });


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

    async sendChatGPTMessage(message) {
        // add message to chatbox
        const configuration = new Configuration({
            apiKey: this._export_settings.apiSecret,
        });
        const openai = new OpenAIApi(configuration);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `"${message}"`,
            temperature: 0,
            max_tokens: 7,
        });

        console.log(response.data.choices[0].text);

        // const apiKey = this._export_settings.apiSecret;
        // const url = "https://api.openai.com/v1/engines/davinci-codex/completions";
        // console.log(apiKey);
        // try {
        //     const response = await fetch(url, {
        //         method: 'POST',
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Authorization": `Bearer ${apiKey}`,
        //         },
        //         body: JSON.stringify({
        //             "prompt": message,
        //             "max_tokens": 5,
        //             "temperature": 1,
        //             "top_p": 1,
        //             "n": 1,
        //             "stream": false,
        //             "logprobs": null,
        //             "stop": "\n"
        //         }),
        //         redirect: "follow"
        //         // body: JSON.stringify(body)
        //     });
        //     const data = await response.json();
        //     console.log(JSON.stringify(data));
        //     this.context = data.context;

        // add message to table
        // const model = new sap.ui.model.json.JSONModel();
        // model.setData({ You: message, Chatbot: data.message });
        // const table = sap.ui.getCore().byId('chat-gpt-table');
        // table.setModel(model);
        // table.bindRows('/');

        // add message to chatbox
        const chatbox = this.shadowRoot.querySelector('#chatbox');
        chatbox.innerHTML += `<p><strong>You:</strong> ${message}</p><p><strong>Chatbot:</strong> ${response.data.choices[0].text}</p>`;
        // } catch(error) {
        //     console.error(error);
        // }
    }
}