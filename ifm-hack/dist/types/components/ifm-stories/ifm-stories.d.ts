import { ComponentDidLoad, ComponentInterface } from '../../stencil-public-runtime';
export declare class IFMStories implements ComponentInterface, ComponentDidLoad {
  private pokeApiService;
  private itemsPerPage;
  private offset;
  private pokemons;
  private pokemonCount;
  /**
   * The first name
   */
  first: string;
  /**
   * The middle name
   */
  middle: string;
  /**
   * The last name
   */
  last: string;
  componentDidLoad(): void;
  private loadPage;
  private getText;
  render(): any;
}
