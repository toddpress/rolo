import { LitElement, customElement, html, property, css } from 'lit-element';

@customElement('rolo-card')
class RoloCard extends LitElement {
  @property({ 
    type: Boolean, 
    attribute: 'is-flipped',
    converter: (val) => /^(true)$/.test(val)
  })
  isFlipped = false;

  static get styles() {
    return css`
      .rolo-card {
        background-color: transparent;
        width: 300px;
        height: 200px;
        perspective: 1000px;
      }
      .rolo-card__inner {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
          0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
      .rolo-card__inner--flipped {
        transform: rotateY(180deg);
      }

      .rolo-card__body {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
      }

      .rolo-card__header {
        flex: 0 0 0%;
      }
      .rolo-card__front,
      .rolo-card__back,
      .rolo-card__header {
        -webkit-backface-visibility: hidden; /* Safari */
        backface-visibility: hidden;
      }

      .rolo-card__back {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .rolo-card__back {
        transform: rotateY(180deg);
      }
    `;
  }

  render() {
    return html`
      <article class="rolo-card">
        <div
          class="rolo-card__inner ${this.isFlipped
            ? 'rolo-card__inner--flipped'
            : ''}"
        >
          <div class="rolo-card__body">
            <header class="rolo-card__header">
              <slot name="card-title">
                <h1>Title</h1>
              </slot>
            </header>

            
            <section class="rolo-card__front">
              <slot name="card-front"></slot>
            </section>
          </div>
          <section class="rolo-card__back">
            <slot name="card-back"></slot>
          </section>
        </div>
      </article>
    `;
  }  
  flip() {
    this.isFlipped = !this.isFlipped;
  }
}
export default RoloCard;
