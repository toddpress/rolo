import './rolo-flip-card';

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
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: flex-start;
      }
      .rolo-card-list rolo-flip-card::part(body) {
        width: 300px;
      }
      rolo-flip-card {
        margin-bottom: 2em;
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
