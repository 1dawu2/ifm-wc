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

        shadowRoot.querySelector('.title').innerHTML = 'Marvelius 1.0';
    }


    htmlToElement(html) {
        var template = document.createElement('template');
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return { cssContent: template.content.firstChild, htmlContent: template.content.lastChild };
    }
}