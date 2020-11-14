import { customElement, property } from "../../../node_modules/lit-element/lit-element";

@customElement('base-flip-card-title')
class BaseFlipCardTitle extends BaseComponent {
    @property({
        type: String,
        attribute: 'title'
    })
    title = '';

    static get styles() {
        return css`
            .base-flip-card-title {
                background-color: hsl(214, 90%, 52%);
                width: 100%;
            }
        `;
    }

    render() {
        return html`
          <div class="base-flip-card-title-${title}" part="card">
            <div class="base-flip-card-title" part="title">
                <slot name="title"></slot>
            </div>
          </div>
        `;
    }
}

export default BaseFlipCardTitle;