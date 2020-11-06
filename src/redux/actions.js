import { nanoid } from 'nanoid';

export const ADD_CARD = 'ADD_CARD';
export const UPDATE_FILTER = 'UPDATE_FILTER';

export const addCard = card => {
    return {
        type: ADD_CARD,
        todo: {
            id: nanoid(),
            card
        }
    }
}

export const updateFilter = filter => {
    return {
        type: UPDATE_FILTER,
        filter
    }
}
