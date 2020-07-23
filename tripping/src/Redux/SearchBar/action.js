import {INCREMENT, DECREMENT} from './actionTypes'

export const increment = (payload) => ({
    type:INCREMENT,
    payload
})

export const decrement = (payload) => ({
    type:DECREMENT,
    payload
})