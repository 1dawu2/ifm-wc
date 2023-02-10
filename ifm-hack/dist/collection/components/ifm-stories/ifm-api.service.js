export class PokeApiService {
  constructor() {
    this.pokeBaseUrl = 'https://pokeapi.co/api/v2/';
  }
  loadPage(offset, size) {
    return fetch(`${this.pokeBaseUrl}pokemon?offset=${offset}&limit=${size}`)
      .then(response => response.json());
  }
}
//# sourceMappingURL=ifm-api.service.js.map
