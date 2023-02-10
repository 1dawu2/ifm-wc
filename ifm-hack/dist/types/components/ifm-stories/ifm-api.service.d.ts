export interface PokeApiListResult<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
export interface Pokemon {
  name: string;
  url: string;
}
export declare class PokeApiService {
  private readonly pokeBaseUrl;
  loadPage(offset: number, size: number): Promise<PokeApiListResult<Pokemon>>;
}
