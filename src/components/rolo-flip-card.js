import './base/base-flip-card';

import { css, customElement, html, property } from 'lit-element';
import { removeCard, updateCard } from '../redux/actions.js';

import BaseComponent from './base/base-component';
import { connect } from 'pwa-helpers';
import { store } from '../redux/store.js';

@customElement('rolo-flip-card')
class RoloCard extends connect(store)(BaseComponent) {
  
  @property({ type: Object }) card = {};

  static get styles() {
    return css`
      :host {
        display: inline-block;
        min-width: 300px;
        flex-basis: 40%;
        margin: 0 var(--space-md-fixed) var(--space-md-fixed) 0;
        /* @TODO - remove margin once grid layout implemented. 
              Then adjust item  spacing with grid gap */
        animation: 250ms fadeZoomIn 1 ease-in-out;
      }

      input,
      textarea,
      button {
        overflow: auto;
        appearance: none;
        -webkit-appearance: none;
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
      }

      input,
      textarea {
        padding: 0 var(--space-xxs);
        box-sizing: border-box;
        cursor: text;
      }

      .flip-button {
        color: #fff;
        font-weight: bold;
        border: 2px solid #fff;
        border-radius: 5px;
        padding: var(--space-xxxs) var(--space-sm);
        margin: 4px 0px;
      }

      base-flip-card div[slot] {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      base-flip-card div[slot] textarea {
        flex: 1;
        resize: none;
      }

      base-flip-card div[slot='front'] input {
        border-bottom: 1px solid var(--shade-20pct);
      }

      base-flip-card-title div[slot='top'] {
        background-color: var(--menu-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-xxs) var(--space-sm);
      }

      @keyframes fadeZoomIn {
        from {
          transform: scale(0.75);
          opacity: 0;
        }

        to {
          transform: scale(1);
          opacity: 1;
        }
      }
    `;
  }
  onCardInput = (side) => (event) => {
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
        <div slot="top">
          <button 
            @click="${this.updateCard}" 
            class="flip-button"
          >Flip Card</button>
          <vaadin-button
            theme="primary"
            class="remove-button"
            @click="${this.removeCard}"
            >Remove</vaadin-button
          >
        </div>
      </base-flip-card-title>
      <base-flip-card is-flipped="${flipped}">
        <div slot="front">
          <input value="${title}" @input="${this.onTitleInput}" />
          <textarea
            value="${front}"
            @input="${this.onCardInput('front')}"
          ></textarea>
        </div>
        <div slot="back">
          <textarea
            slot="back"
            value="${back}"
            @input=${this.onCardInput('back')}
          ></textarea>
        </div>
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
