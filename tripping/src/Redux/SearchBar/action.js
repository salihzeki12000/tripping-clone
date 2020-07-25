import {INCREMENT, DECREMENT, SEARCHDATA} from './actionTypes'

export const increment = (payload) => ({
    type:INCREMENT,
    payload
})

export const decrement = (payload) => ({
    type:DECREMENT,
    payload
})

export const searchData = (payload) => ({
    type:SEARCHDATA,
    payload
})