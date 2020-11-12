import {
    ADD_CARD,
    UPDATE_CARD,
    UPDATE_FILTER
} from './actions';

import { createSelector } from 'reselect';
import { nanoid } from 'nanoid'

export const VisibilityFilters = {
    SHOW_ALL: 'All',
    SHOW_ACTIVE: 'Active',
    SHOW_COMPLETED: 'Completed'
};

const INITIAL_STATE = {
  cards: [{ id: nanoid() , flipped: false, editable: true, front: '', back: '' }],
  filter: VisibilityFilters.SHOW_ALL,
};

const getCardsSelector = state => state.cards;
const getFilterSelector = state => state.filter;

export const getVisibleCardsSelector = createSelector(
    // Add filtering back in using switch statement.
    getCardsSelector, getFilterSelector, (cards, filter) => cards
);

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_CARD:
            return {
              ...state,
              cards: [
                ...state.cards,
                {
                  id: nanoid(),
                  flipped: false,
                  editable: true,
                  front: '',
                  back: '',
                },
              ],
            };
        case UPDATE_CARD:
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
        case UPDATE_FILTER:
            return {
                ...state,
                filter: action.filter
            }
        default:
            return state;
    }
}