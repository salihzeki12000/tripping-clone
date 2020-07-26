import {FREECANCELLATION_FILTER,PRICE_FILTER,AMENITIES_FILTER,ACCOMMODATION_FILTER} from './actionTypes';

export const freeCategory = payload => ({
    type: FREECANCELLATION_FILTER,
    payload
})
export const priceFilter = payload => ({
    type: PRICE_FILTER,
    payload
})
export const amenitesFilter = payload => ({
    type: AMENITIES_FILTER,
    payload
})
export const accommodationFilter = payload => ({
    type: ACCOMMODATION_FILTER,
    payload
})
