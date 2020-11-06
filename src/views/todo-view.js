import '@vaadin/vaadin-text-field';
import { LitElement, html, property, css} from 'lit-element';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import './../components/rolo-card'
import {
  VisibilityFilters,
  getVisibleTodosSelector
} from '../redux/reducer.js';
import { connect } from 'pwa-helpers';
import { store } from '../redux/store.js';
import {
  addTodo,
  updateTodoStatus,
  updateFilter,
  clearCompleted
} from '../redux/actions.js';

class TodoView extends connect(store)(LitElement) {
  // static get properties() {
  //   return {
  //     todos: { type: Array },
  //     filter: { type: String },
  //     task: { type: String }
  //   };
  // }
  @property({ type: Array })
  todos = [];

  @property({ type: String })
  filter = '';

  @property({ type: String })
  task = '';

  @property({ type: Boolean })
  isFlipped = false;

  stateChanged(state) {
    this.todos = getVisibleTodosSelector(state);
    this.filter = state.filter;
  }

  render() {
    return html`
      <style>
        todo-view {
          display: block;
          max-width: 800px;
          margin: 0 auto;
        }
        todo-view .input-layout {
          width: 100%;
          display: flex;
        }
        todo-view .input-layout vaadin-text-field {
          flex: 1;
          margin-right: var(--spacing);
        }
        todo-view .todos-list {
          margin-top: var(--spacing);
        }
        todo-view .visibility-filters {
          margin-top: calc(4 * var(--spacing));
        }
      </style>
      
        <rolo-card is-flipped="${this.isFlipped}">
          <div slot="card-front">CARD FRONT</div>
          <div slot="card-back">CARD BACK</div>
        </rolo-card>
      
      <vaadin-button theme="primary" @click="${this.flip}">
        Flip
      </vaadin-button>
    `;
  }
  flip() {
    this.isFlipped = !this.isFlipped;
  }
  addTodo() {
    if (this.task) {
      store.dispatch(addTodo(this.task));
      this.task = '';
    }
  }

  shortcutListener(e) {
    if (e.key === 'Enter') {
      this.addTodo();
    }
  }

  updateTask(e) {
    this.task = e.target.value;
  }

  updateTodoStatus(updatedTodo, complete) {
    store.dispatch(updateTodoStatus(updatedTodo, complete));
  }

  filterChanged(e) {
    store.dispatch(updateFilter(e.detail.value));
  }

  clearCompleted() {
    store.dispatch(clearCompleted());
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('todo-view', TodoView);