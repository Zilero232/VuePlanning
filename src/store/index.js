import { createStore } from 'vuex'
import auth from './auth'
import planning from './planning'
import date from './date'
import board from './board'

export default createStore({
    modules: {
        auth,
        planning,
        date,
        board
    }
})