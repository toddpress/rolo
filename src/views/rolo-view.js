import { LitElement, html, property } from 'lit-element';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import { connect } from 'pwa-helpers';
import { store } from '../redux/store.js';
import { VisibilityFilters, getVisibleCardsSelector } from '../redux/reducers.js';
import { addCard, updateFilter } from '../redux/actions.js';

class RoloView extends connect(store)(LitElement) {

    @property({ type: Array })
    cards = [];

    @property({ type: String })
    filter = '';

    stateChanged(state) {
        this.cards = state.cards;
        this.filter = state.filter;
    }

    render() {
        return html`
        <style>
        </style>
        <div>
            <div>
                <button @click="${this.addCard}">Add Card +</button>
            </div>
            ${this.cards.map(
                (card) => html`<div>
                    <vaadin-text-field placeholder="Title" value=${card ? card.title : ''}></vaadin-text-field>
                    <vaadin-text-field placeholder="Body" value=${card ? card.body : ''}></vaadin-text-field>
                </div>`
            )}
        </div>
        `;
    }

    addCard = () => {
        store.dispatch(addCard({title: '', body: ''}));
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('rolo-view', RoloView);