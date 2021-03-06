import {
    ADD_CARD,
    UPDATE_CARD,
    UPDATE_FILTER,
    REMOVE_CARD
} from './actions';

import { createSelector } from 'reselect';
import { nanoid } from 'nanoid'

export const VisibilityFilters = {
    SHOW_ALL: 'All',
    SHOW_ACTIVE: 'Active',
    SHOW_COMPLETED: 'Completed'
};

const INITIAL_STATE = {
  cards: [{ id: nanoid() , title: 'My First Card', flipped: false, editable: true, front: '', back: '' }],
  filter: VisibilityFilters.SHOW_ALL
};

const getCardsSelector = state => state.cards;
const getFilterSelector = state => state.filter;

export const getVisibleCardsSelector = createSelector(
    // Add filtering back in using switch statement.
    getCardsSelector, getFilterSelector, (cards, filter) => cards
);

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_CARD: {
            const { title } = action.payload; 
            return {
              ...state,
              cards: [
                {
                  id: nanoid(),
                  title,
                  flipped: false,
                  editable: true,
                  front: '',
                  back: '',
                },
                ...state.cards,
              ],
            };
        }
        case UPDATE_CARD: {
            const { card } = action.payload;
            const index = state.cards.findIndex(c => c.id === card.id)
            const cards = [
                ...state.cards.slice(0, index),
                card,
                ...state.cards.slice(index + 1)
            ];

            return {
                ...state,
                cards
            }
        }
        case REMOVE_CARD: {
            return {
                ...state,
                cards: [
                    ...state.cards.slice(0, state.cards.findIndex(c => c.id === action.payload.id)), 
                    ...state.cards.slice(state.cards.findIndex(c => c.id === action.payload.id) + 1)
                ]
            }
        }
        case UPDATE_FILTER: {
            return {
                ...state,
                filter: action.filter
            }
        }
        default:
            return state;
    }
}