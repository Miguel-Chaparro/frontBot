import { useDispatch } from 'react-redux'
import { postAdded } from '../redux/reducer'

import { connect }from './Login'

const Login = (email, password) =>{
    const dispatch = useDispatch()
    const token =  connect( email, password)
    localStorage.setItem(token)
    dispatch(
        postAdded({
            token: token,
        })
    )
    return token
}

export default Login