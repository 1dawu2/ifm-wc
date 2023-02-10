import { h } from '@stencil/core';
import { format } from '../../utils/utils';
import { PokeApiService } from './ifm-api.service';
export class IFMStories {
  constructor() {
    this.pokeApiService = new PokeApiService();
    this.itemsPerPage = 10;
    this.offset = 0;
    this.pokemons = undefined;
    this.pokemonCount = undefined;
    this.first = undefined;
    this.middle = undefined;
    this.last = undefined;
  }
  componentDidLoad() {
    this.loadPage();
  }
  loadPage() {
    this.pokeApiService.loadPage(this.offset, this.itemsPerPage)
      .then(response => {
      this.pokemons = response.results;
      this.pokemonCount = response.count;
    });
  }
  getText() {
    return format(this.first, this.middle, this.last);
  }
  render() {
    return h("div", { class: "main" }, "Hello, World! I'm ", this.getText(), this.pokemons && this.pokemons.length
      ? h("div", null, h("p", null, "Es existieren ", this.pokemonCount, " in der Datenbank."), h("p", null, "Folgend sind die n\u00E4chsten ", this.pokemons.length, "."), h("table", null, h("thead", null, h("tr", null, h("th", null, "Name"))), h("tbody", null, this.pokemons.map(pokemon => h("tr", null, h("td", null, pokemon.name))))))
      : h("div", null, "PokeApi wird befragt..."), h("article", { class: "panel is-primary" }, h("p", { class: "panel-heading" }, "Primary"), h("p", { class: "panel-tabs" }, h("a", { class: "is-active" }, "All"), h("a", null, "Public"), h("a", null, "Private"), h("a", null, "Sources"), h("a", null, "Forks")), h("div", { class: "panel-block" }, h("p", { class: "control has-icons-left" }, h("input", { class: "input is-primary", type: "text", placeholder: "Search" }, h("span", { class: "icon is-left" }, h("i", { class: "fas fa-search", "aria-hidden": "true" }))))), h("a", { class: "panel-block is-active" }, h("span", { class: "panel-icon" }, h("i", { class: "fas fa-book", "aria-hidden": "true" })), "bulma"), h("a", { class: "panel-block" }, h("span", { class: "panel-icon" }, h("i", { class: "fas fa-book", "aria-hidden": "true" })), "marksheet"), h("a", { class: "panel-block" }, h("span", { class: "panel-icon" }, h("i", { class: "fas fa-book", "aria-hidden": "true" })), "minireset.css"), h("a", { class: "panel-block" }, h("span", { class: "panel-icon" }, h("i", { class: "fas fa-book", "aria-hidden": "true" })), "jgthms.github.io")));
  }
  static get is() { return "ifm-stories"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["ifm-stories.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ifm-stories.css"]
    };
  }
  static get properties() {
    return {
      "first": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The first name"
        },
        "attribute": "first",
        "reflect": false
      },
      "middle": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The middle name"
        },
        "attribute": "middle",
        "reflect": false
      },
      "last": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The last name"
        },
        "attribute": "last",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "pokemons": {},
      "pokemonCount": {}
    };
  }
}
//# sourceMappingURL=ifm-stories.js.map
