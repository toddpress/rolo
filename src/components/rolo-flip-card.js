import './base/base-flip-card';

import { css, customElement, html, property } from 'lit-element';

import BaseComponent from './base/base-component';

@customElement('rolo-flip-card')
class RoloCard extends BaseComponent {
  
  @property({ type: Object }) card = {};

  static get styles() {
    return css`
      section[contenteditable] {
        height: 100%;
        padding: 0.4rem 0.8rem;
        box-sizing: border-box;
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
    const { flipped, front, back, editable } = this.card;
    return html`
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
}

export default RoloCard;
