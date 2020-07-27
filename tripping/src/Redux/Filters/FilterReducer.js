import { FREECANCELLATION_FILTER, PRICE_FILTER, AMENITIES_FILTER, ACCOMMODATION_FILTER } from './actionTypes';

let initialState = {
    filter: {
        freeCancellation: [],
        priceFilter: [],
        amenitesFilter: [],
        accommodationFilter: []
    }
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FREECANCELLATION_FILTER:
            return {
                ...state,
                freeCancellation: [...state.freeCancellation, payload]
            }
        case PRICE_FILTER:
            return {
                ...state,
                priceFilter: [...state.priceFilter, ...payload]
            }
        case AMENITIES_FILTER:
            return {
                ...state,
                amenitesFilter: [...state.amenitesFilter, ...payload]
            }
        case ACCOMMODATION_FILTER:
            console.log(payload)
            return {
                ...state,
                accommodationFilter: [...state.accommodationFilter, ...payload]
            }
        default:
            return state
    }
}

export default reducer;