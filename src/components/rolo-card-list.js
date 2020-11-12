import './rolo-flip-card'

import { css, customElement, html, property } from 'lit-element';

import BaseComponent from './base-component';
import { repeat } from 'lit-html/directives/repeat';

@customElement('rolo-card-list')
class RoloCardList extends BaseComponent {
  @property({
    type: Array,
  })
  cards = [];

  static get styles() {
    return css`
      .rolo-card-list {
        padding: 0.8rem 1.6rem;
      }
      .rolo-card-list rolo-flip-card::part(card) {
        width: 300px;
      }
      .rolo-card-list rolo-flip-card section[contenteditable] {
        height: 100%;
        padding: 0.4rem 0.8rem;
        box-sizing: border-box;
      }
    `;
  }
  onCardInput = (id) => (side) => (event) => {
    this._dispatchEvent('card-update', { id, side, value: event.target.textContent.trim() });
  };
  render() {
    return html`<div class="rolo-card-list">
      ${repeat(this.cards, ({ id }) => id, (card, index) => {
          const { id, editable, front, back, flipped } = card;
          return html`
              <rolo-flip-card is-flipped="${flipped}" >
                  <section
                    slot="front"
                    ?contenteditable=${editable} 
                    @input=${this.onCardInput(id)('front')}
                  >
                    ${front}
                  </section>
                  <section slot="back"
                    ?contenteditable=${editable} 
                    @input=${this.onCardInput(id)('back')}>
                    ${back}
                  </section>
              </rolo-flip-card>
          </div>`;
        }
      )}
    </div>`;
  }
}

export default RoloCardList;
