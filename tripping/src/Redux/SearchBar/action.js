import {INCREMENT, DECREMENT, SEARCHDATA, DATES, NOOFDAYS} from './actionTypes'

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

export const DatesData = (payload) => ({
    type:DATES,
    payload
})

export const noOfDays = (payload) => ({
    type:NOOFDAYS,
    payload
})
