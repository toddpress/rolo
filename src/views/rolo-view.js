import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '../components/rolo-card-list';

import { LitElement, css, customElement, html, property } from 'lit-element';
import { addCard, updateCard } from '../redux/actions.js';

import { connect } from 'pwa-helpers';
import { store } from '../redux/store.js';

@customElement('rolo-view')
class RoloView extends connect(store)(LitElement) {
  @property({ type: Array })
  cards = [];

  @property({ type: String })
  filter = '';

  @property({ type: String})
  title = '';

  stateChanged(state) {
    this.cards = state.cards;
    this.filter = state.filter;
  }
  static get styles() {
    return css`
    `;
  }

  render() {
    return html`
      <div>
        <div>
          <vaadin-button theme="primary" @click="${this.addCard}" 
            ?disabled="${!this.title}">Add Card +</vaadin-button>
          <vaadin-text-field 
            label="Card Title" 
            placeholder="Enter Title"
            maxLength=15
            value="${this.title}"
            @input="${this.updateTitle}"
          >
          </vaadin-text-field>
        </div>
        <rolo-card-list 
          .cards=${this.cards} 
          @card-update=${this.updateCard}
        >
      </rolo-card-list>
      </div>
    `;
  }

  updateTitle = (e) => this.title = e.srcElement.value;

  updateCard = (e) => {
    const card = e.detail;
    store.dispatch(updateCard(card));
  }
  
  addCard = () => {
    store.dispatch(addCard(this.title));
    this.title = '';
  };
}
