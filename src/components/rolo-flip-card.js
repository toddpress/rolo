import { LitElement, css, customElement, html, property } from 'lit-element';

@customElement('rolo-flip-card')
class RoloCard extends LitElement {
  @property({
    type: Boolean,
    attribute: 'is-flipped',
    converter: (val) => /^(true)$/.test(val),
  })
  isFlipped = false;

  static get styles() {
    return css`
      .rolo-flip-card {
        position: relative;
        background-color: transparent;
        perspective: 1000px;
        transform-style: preserve-3d;
        transition: transform 0.8s;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
          0 6px 20px 0 rgba(0, 0, 0, 0.19);
        max-width: 100%;
      }

      .rolo-flip-card::after {
        content: '';
        display: block;
        padding-top: calc(100% / (5/3)); /* padding hack to achieve 3x5 note card aspect ratio*/
      }

      .rolo-flip-card--flipped {
        transform: rotateY(180deg);
      }

      .rolo-flip-card__back,
      .rolo-flip-card__front {
        position: absolute; top: 0; bottom: 0; left: 0; right: 0;
        -webkit-backface-visibility: hidden; /* Safari */
        backface-visibility: hidden;
      }

      .rolo-flip-card__back {
        transform: rotateY(180deg);
      }
    `;
  }

  render() {
    return html`
      <div
        class="rolo-flip-card ${this.isFlipped ? 'rolo-flip-card--flipped' : ''}"
        part="card"
      >
        <div class="rolo-flip-card__front" part="front">
          <slot name="front"></slot>
        </div>
        <div class="rolo-flip-card__back" part="back">
          <slot name="back"></slot>
        </div>
      </div>
    `;
  }
}

export default RoloCard
