import { Component, ComponentDidLoad, ComponentInterface, Prop, h, State } from '@stencil/core';
import { format } from '../../utils/utils';
import { PokeApiService, Pokemon } from './ifm-api.service';

@Component({
  tag: 'ifm-stories',
  styleUrl: 'ifm-stories.scss',
  shadow: true,
})
export class IFMStories implements ComponentInterface, ComponentDidLoad {
  private pokeApiService = new PokeApiService();
  private itemsPerPage = 10;
  private offset = 0;
  @State() private pokemons: Pokemon[];
  @State() private pokemonCount: number;
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  componentDidLoad(): void {
    this.loadPage();
  }

  private loadPage(): void {
    this.pokeApiService.loadPage(this.offset, this.itemsPerPage)
      .then(response => {
        this.pokemons = response.results;
        this.pokemonCount = response.count;
      });
  }

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return <div class="main">
      Hello, World! I'm {this.getText()}
      <article class="panel is-primary">
        <p class="panel-heading">
          Primary
        </p>
        <p class="panel-tabs">
          <a class="is-active">All</a>
          <a>Public</a>
          <a>Private</a>
          <a>Sources</a>
          <a>Forks</a>
        </p>
        <div class="panel-block">
          <p class="control has-icons-left">
            <input class="input is-primary" type="text" placeholder="Search">
              <span class="icon is-left">
                <i class="fas fa-search" aria-hidden="true"></i>
              </span>
            </input>
          </p>
        </div>
        <a class="panel-block is-active">
          <span class="panel-icon">
            <i class="fas fa-book" aria-hidden="true"></i>
          </span>
          bulma
        </a>
        <a class="panel-block">
          <span class="panel-icon">
            <i class="fas fa-book" aria-hidden="true"></i>
          </span>
          marksheet
        </a>
        <a class="panel-block">
          <span class="panel-icon">
            <i class="fas fa-book" aria-hidden="true"></i>
          </span>
          minireset.css
        </a>
        <a class="panel-block">
          <span class="panel-icon">
            <i class="fas fa-book" aria-hidden="true"></i>
          </span>
          jgthms.github.io
        </a>
      </article>

    </div>;
  }
}
