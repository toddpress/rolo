import { LitElement, customElement, html, css } from 'lit-element';
import marked from 'marked';
// import DOMPurify from 'dompurify';

@customElement('rolo-markdown')
class RoloMarkdown extends LitElement {
  static get styles() {
    return css``;
  }
  
  normalizeText(txt) {
    return txt
      .split(/\n/)
      .map((t) => t.trim())
      .join('\n');
  }

  firstUpdated() {
    const txt = this.textContent;
    const normalized = this.normalizeText(txt);
    const html = marked(normalized, {
      breaks: true
    });
    this.innerHTML = html;

  }

  render() {
    return html`<div>
      <slot></slot>
    </div>`;
  }
}

export default RoloMarkdown;
