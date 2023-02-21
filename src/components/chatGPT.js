//import html from './chatGPT.html'
const { Configuration, OpenAIApi } = require("openai");
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-fiori/dist/SideNavigation";
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

        var uiBtnWC = document.createElement('div');
        uiBtnWC.innerHTML = `<ui5-button>Hello UI5 Web Components</ui5-button>`;
        shadowRoot.append(uiBtnWC);

        var uiMenuWC = document.createElement('div');
        uiMenuWC.innerHTML = `
        <ui5-side-navigation>
            <ui5-side-navigation-item text="Home" icon="home"></ui5-side-navigation-item>
            <ui5-side-navigation-item text="People" expanded icon="group">
                <ui5-side-navigation-sub-item text="From My Team"></ui5-side-navigation-sub-item>
                <ui5-side-navigation-sub-item text="From Other Teams"></ui5-side-navigation-sub-item>
            </ui5-side-navigation-item>
            <ui5-side-navigation-item text="Locations" icon="locate-me" selected></ui5-side-navigation-item>
            <ui5-side-navigation-item text="Events" icon="calendar">
                <ui5-side-navigation-sub-item text="Local"></ui5-side-navigation-sub-item>
                <ui5-side-navigation-sub-item text="Others"></ui5-side-navigation-sub-item>
            </ui5-side-navigation-item>

            <ui5-side-navigation-item slot="fixedItems" text="Useful Links" icon="chain-link"></ui5-side-navigation-item>
            <ui5-side-navigation-item slot="fixedItems" text="History" icon="history"></ui5-side-navigation-item>
        </ui5-side-navigation>
         <script>
            const sideNavigation = document.querySelector("ui5-side-navigation");
            document.querySelector("#startButton").addEventListener("click", event => sideNavigation.collapsed = !sideNavigation.collapsed);
        </script>`;
        shadowRoot.append(uiMenuWC);

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