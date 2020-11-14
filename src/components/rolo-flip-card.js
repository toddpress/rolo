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
      #title {
        border-bottom: solid 1px #ccc;
      }
      input,textarea {
        padding: 0.4rem 0.8rem;
        box-sizing: border-box;
        overflow: auto;
        outline: none;
        -webkit-appearance: none;
        border: none;
      }
      input {
        border-bottom: solid 1px #ccc;
      }
      section[readonly] {
        background-color: hsl(200, 90%, 52%);
        display: flex;
        justify-content: space-between;
      }
      .flip {
        margin: 0.5em;
        color: #fff;
        font-weight: bold;
        border: solid 3.5px #fff;
        padding: 0.25em;
      }
      vaadin-button[theme='primary'] {
        margin: 0.5em;
      }

      div[slot='front'] {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      textarea {
        flex: 1;
        resize: none;
      }

      textarea[slot='back'] {
        width: 100%;
        height: 100%;
      }
    `;
  }
  onCardInput = (side) => (event) => {
    console.log('Values', event.target.value);
    const card = {
      ...this.card,
      [side]: event.target.value
    };
    this._dispatchEvent('card-update', card);
  }

  onTitleInput = (event) => {
    const card = {
      ...this.card,
      title: event.target.value
    };
    this._dispatchEvent('card-update', card);
  }

  render() {
    const { title, flipped, front, back, editable } = this.card;
    return html`
        <base-flip-card-title>
          <section slot="top" readonly>
              <div @click="${this.updateCard}" class="flip">Flip Card</div>
              <vaadin-button theme="primary" @click="${this.removeCard}">Remove</vaadin-button>
          </section>
        </base-flip-card-title>
        <base-flip-card is-flipped="${flipped}">
          <div slot="front">
            <input type="text" value="${title}" @input="${this.onTitleInput}">
            <textarea value="${front}" @input="${this.onCardInput('front')}"></textarea>
          </div>
            <textarea
              slot="back"
              value="${back}"
              @input=${this.onCardInput('back')}
            >${back}</textarea>
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
