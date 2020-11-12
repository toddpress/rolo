export const ADD_CARD = 'ADD_CARD';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const UPDATE_CARD = 'UPDATE_CARD';


export const updateCard = (card) => {
    return {
        type: UPDATE_CARD,
        payload: {
            card
        }
    }
}

export const addCard = () => {
    return {
        type: ADD_CARD,
        payload: {}
    }
}

export const updateFilter = filter => {
    return {
        type: UPDATE_FILTER,
        filter
    }
}
