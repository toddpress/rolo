import { LitElement, customElement, html, property, css } from 'lit-element';

@customElement('rolo-card')
class RoloCard extends LitElement {
  @property({
    type: Boolean,
    attribute: 'is-flipped',
    converter: (val) => /^(true)$/.test(val),
  })
  isFlipped = false;

  static get styles() {
    return css`
      .rolo-card {
        position: relative;
        background-color: transparent;
        perspective: 1000px;
        transform-style: preserve-3d;
        transition: transform 0.8s;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
          0 6px 20px 0 rgba(0, 0, 0, 0.19);
        max-width: 100%;
      }

      .rolo-card::after {
        content: '';
        display: block;
        padding-top: calc(100% / (5/3)); /* padding hack to achieve 3x5 note card aspect ratio*/
      }

      .rolo-card--flipped {
        transform: rotateY(180deg);
      }

      .rolo-card__back,
      .rolo-card__front {
        position: absolute; top: 0; bottom: 0; left: 0; right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
        letter-spacing: 0.01rem;
        -webkit-backface-visibility: hidden; /* Safari */
        backface-visibility: hidden;
      }

      .rolo-card__back {
        transform: rotateY(180deg);
      }
    `;
  }

  render() {
    return html`
      <article
        class="rolo-card ${this.isFlipped ? 'rolo-card--flipped' : ''}"
        @click="${() => this.isFlipped = !this.isFlipped}"
      >
        <section class="rolo-card__front">
          <slot name="card-front"></slot>
        </section>
        <section class="rolo-card__back">
          <slot name="card-back"></slot>
        </section>
      </article>
    `;
  }
}

export default RoloCard
