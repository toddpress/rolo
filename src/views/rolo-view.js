import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import './../components/rolo-flip-card';
import './../components/rolo-markdown';

import { LitElement, css, customElement, html, property } from 'lit-element';
import {
  VisibilityFilters,
  getVisibleCardsSelector,
} from '../redux/reducers.js';
import { addCard, updateFilter } from '../redux/actions.js';

import { connect } from 'pwa-helpers';
import {repeat} from 'lit-html/directives/repeat';
import { store } from '../redux/store.js';

@customElement('rolo-view')
class RoloView extends connect(store)(LitElement) {
  @property({ type: Array })
  cards = [];

  @property({ type: String })
  filter = '';

  @property({ type: Boolean })
  isTheOneCardFlipped = false;

  stateChanged(state) {
    this.cards = state.cards;
    this.filter = state.filter;
  }
  static get styles() {
    return css`
      .rolo-view__card-list rolo-flip-card::part(card) {
        width: 300px;
      }
    `;
  }
  render() {
    // @TODO - refactor/copy-paste into dedicated rolo-card-list component
    const _renderCardList = (cards) => {
      const onCardInput = (id) => (side) => (event) => {
        console.log('[onCardInput] event fired on the %s-side of card (id %s)', side, id);
        console.info('[onCardInput] event: %o', event);
        // @TODO - dispatch update action for side <side> of card <id>
      };
      return html` <div class="rolo-view__card-list">
        ${repeat( /* 1. Array, 2. Keying function, 3. Template */
          cards,
          ({ id }) => id,
          (card, index) => {
            const { id, editable, front, back, flipped } = card;
            return html`
              <rolo-flip-card is-flipped="${flipped}">
                <div slot="card-front">
                  <section 
                    ?contenteditable=${editable} 
                    @input=${onCardInput(id)('front')}
                  >
                    ${front}
                  </section>
                </div>
                <div slot="card-back">
                  <section 
                    ?contenteditable=${editable} 
                    @input=${onCardInput(id)('back')}
                  >
                    ${back}
                  </section>
                </div>
              </rolo-flip-card>
          </div>`;
          }
        )}
      </div>`;
    };

    return html`
      <div>
        <div>
          <button @click="${this.addCard}">Add Card +</button>
        </div>

        ${_renderCardList(this.cards)}

        <vaadin-button
          theme="primary"
          @click="${() =>
            (this.isTheOneCardFlipped = !this.isTheOneCardFlipped)}"
        >
          Flip
        </vaadin-button>

        ${this.cards.map(
          (card) => html`<div>
            <vaadin-text-field
              placeholder="Title"
              value=${card ? card.title : ''}
            ></vaadin-text-field>
            <vaadin-text-field
              placeholder="Body"
              value=${card ? card.body : ''}
            ></vaadin-text-field>
          </div>`
        )}
      </div>
    `;
  }

  addCard = () => {
    store.dispatch(addCard({ title: '', body: '' }));
  };
}

