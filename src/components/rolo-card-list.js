import './rolo-flip-card';

import { css, customElement, html, property } from 'lit-element';

import BaseComponent from './base/base-component';
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
      .rolo-card-list rolo-flip-card::part(body) {
        width: 300px;
      }
    `;
  }

  render() {
    return html`<div class="rolo-card-list">
      ${repeat(
        this.cards,
        ({ id }) => id,
        (card, index) => {
          return html`<rolo-flip-card .card=${card}></rolo-flip-card>`;
        }
      )}
    </div>`;
  }
}

export default RoloCardList;
