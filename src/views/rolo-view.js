import { LitElement, html, property, css } from 'lit-element';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import './../components/rolo-flip-card';
import './../components/rolo-markdown';

import { connect } from 'pwa-helpers';
import { store } from '../redux/store.js';
import { VisibilityFilters, getVisibleCardsSelector } from '../redux/reducers.js';
import { addCard, updateFilter } from '../redux/actions.js';

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
    return html`
      <div>
        <div class="rolo-view__card-list">
          <rolo-flip-card is-flipped="${this.isTheOneCardFlipped}">
            <div slot="card-front">CARD FRONT</div>
            <div slot="card-back">CARD BACK</div>
          </rolo-flip-card>
        </div>
        <div>
          <button @click="${this.addCard}">Add Card +</button>
        </div>

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

customElements.define('rolo-view', RoloView);