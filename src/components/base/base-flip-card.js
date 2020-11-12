import { LitElement, css, customElement, html, property } from 'lit-element';

import BaseComponent from '../base-component';

@customElement('base-flip-card')
class BaseFlipCard extends BaseComponent {
  @property({
    type: Boolean,
    attribute: 'is-flipped',
    converter: (val) => /^(true)$/.test(val),
  })
  isFlipped = false;

  static get styles() {
    return css`
      .base-flip-card {
        position: relative;
        background-color: transparent;
        perspective: 1000px;
        transform-style: preserve-3d;
        transition: transform 0.8s;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
          0 6px 20px 0 rgba(0, 0, 0, 0.19);
        max-width: 100%;
      }

      .base-flip-card::after {
        content: '';
        display: block;
        padding-top: calc(
          100% / (5 / 3)
        ); /* padding hack to achieve 3x5 note card aspect ratio*/
      }

      .base-flip-card--flipped {
        transform: rotateY(180deg);
      }

      .base-flip-card__back,
      .base-flip-card__front {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        -webkit-backface-visibility: hidden; /* Safari */
        backface-visibility: hidden;
      }

      .base-flip-card__back {
        transform: rotateY(180deg);
      }
    `;
  }

  render() {
    return html`
      <div
        class="base-flip-card ${this.isFlipped
          ? 'base-flip-card--flipped'
          : ''}"
        part="card"
      >
        <div class="base-flip-card__front" part="front">
          <slot name="front"></slot>
        </div>
        <div class="base-flip-card__back" part="back">
          <slot name="back"></slot>
        </div>
      </div>
    `;
  }
}

export default BaseFlipCard;
