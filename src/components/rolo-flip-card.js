import './base/base-flip-card';

import { css, customElement, html, property } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../redux/store.js';
import { updateCard, removeCard } from '../redux/actions.js'; 

import BaseComponent from './base/base-component';

@customElement('rolo-flip-card')
class RoloCard extends connect(store)(BaseComponent) {
  
  @property({ type: Object }) card = {};

  static get styles() {
    return css`
      section[contenteditable] {
        height: 100%;
        padding: 0.4rem 0.8rem;
        box-sizing: border-box;
        overflow: auto;
      }
      section[readonly] {
        background-color: hsl(200, 90%, 52%);
        display: flex;
        justify-content: space-between;
      }
      .title {
        margin: 0.5em;
        color: #fff;
        font-weight: bold;
        border: solid 3.5px #fff;
        padding: 0.25em;
      }
      vaadin-button[theme='primary'] {
        margin: 0.5em;
      }
    `;
  }
  onCardInput = (side) => (event) => {
    const card = {
      ...this.card,
      [side]: event.target.dataset.value
    };
    this._dispatchEvent('card-update', card);
  }
  render() {
    const { title, flipped, front, back, editable } = this.card;
    return html`
        <base-flip-card-title title="${title}">
          <section slot="title" readonly>
              <div @click="${this.updateCard}" class="title">${title}</div>
              <vaadin-button theme="primary" @click="${this.removeCard}">Remove</vaadin-button>
          </section>
        </base-flip-card-title>
        <base-flip-card is-flipped="${flipped}">
            <section
              slot="front"
              ?contenteditable=${editable}
              data-value="${front}"
              @input="${this.onCardInput('front')}"
            >${front}</section>
            <section
              slot="back"
              ?contenteditable=${editable}
              data-value="${back}"
              @input=${this.onCardInput('back')}
            >${back}</section>
      </base-flip-card>`;
  }

  updateCard = () => {
    store.dispatch(updateCard({...this.card, flipped: !this.card.flipped}));
  }

  removeCard = () => {
    store.dispatch(removeCard({...this.card}))
  }
}

export default RoloCard;
