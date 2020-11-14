import { LitElement } from "lit-element";

export default class BaseComponent extends LitElement {
    _dispatchEvent(type, detail, options = {}) {
        let event = new CustomEvent(type, {
            bubbles: true,
            composed: true,
            detail,
            ...options
        });
        this.dispatchEvent(event);
    }
}