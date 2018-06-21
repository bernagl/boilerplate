import { combineReducers } from 'redux'
import auth from './auth'
import cart from './cart'
import clases from './clase'
import gimnasios from './gimnasio'

export default combineReducers({ auth, cart, clases, gimnasios })
