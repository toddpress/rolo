import { nanoid } from 'nanoid';

export const ADD_CARD = 'ADD_CARD';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const UPDATE_CARD = 'UPDATE_CARD';
export const REMOVE_CARD = 'REMOVE_CARD';


export const updateCard = (card) => {
    return {
        type: UPDATE_CARD,
        payload: {
            card
        }
    }
}

export const addCard = card => {
    return {
        type: ADD_CARD,
        payload: {
            id: nanoid(),
            ...card
        }
    }
}

export const removeCard = card => {
    return {
        type: REMOVE_CARD,
        payload: {
            id: nanoid(),
            ...card
        }
    }
}

export const updateFilter = filter => {
    return {
        type: UPDATE_FILTER,
        filter
    }
}
