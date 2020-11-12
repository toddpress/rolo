import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import './../components/rolo-card-list';

import { LitElement, css, customElement, html, property } from 'lit-element';
import {
  VisibilityFilters,
  getVisibleCardsSelector,
} from '../redux/reducers.js';
import { addCard, updateCard, updateFilter } from '../redux/actions.js';

import { connect } from 'pwa-helpers';
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
    return html`
      <div>
        <div>
          <button @click="${this.addCard}">Add Card +</button>
        </div>

        <rolo-card-list .cards=${this.cards} @card-update=${this.updateCard}></rolo-card-list>

        <vaadin-button
          theme="primary"
          @click="${() =>
            (this.isTheOneCardFlipped = !this.isTheOneCardFlipped)}"
        >
          Flip
        </vaadin-button>
      </div>
    `;
  }
  updateCard = (e) => {
    const card = e.detail;
    store.dispatch(updateCard(card));
  }
  addCard = () => {
    store.dispatch(addCard({ title: '', body: '' }));
  };
}
