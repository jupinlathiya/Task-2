import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  adminUserLoginReducer,
  adminUserRegisterReducer,
  createUserReducer,
  deleteUserReducer,
  getUserReducer,
  getUsersReducer,
  updateUserReducer,
} from './reducers/userReducer'

const reducer = combineReducers({
  userLogin: adminUserLoginReducer,
  userRegister: adminUserRegisterReducer,
  createUser: createUserReducer,
  getUser: getUserReducer,
  getUsers: getUsersReducer,
  updateUser: updateUserReducer,
  deleteUser: deleteUserReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  userRegister : { userInfo: userInfoFromStorage }
}
const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
