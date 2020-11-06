import {
    ADD_CARD,
    UPDATE_FILTER
} from './actions';
import { createSelector } from 'reselect';

export const VisibilityFilters = {
    SHOW_ALL: 'All',
    SHOW_ACTIVE: 'Active',
    SHOW_COMPLETED: 'Completed'
};

const INITIAL_STATE = {
    cards: [],
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
        case ADD_CARD:
            return {
                ...state,
                cards: [...state.cards, action.card]
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