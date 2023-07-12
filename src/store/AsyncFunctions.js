import userSlice from './userSlice'
import AuthService from '../services/AuthService'
import axios from 'axios'
import $api from '../http'

export const fetchLogin = (email, password) => async dispatch => {
	try {
		dispatch(userSlice.actions.loginFetch())
		const response = await AuthService.login(email, password)
		localStorage.setItem('token', response.data.accessToken)
		dispatch(userSlice.actions.loginFetchSuccess(response.data.user))
		return ''
	} catch (err) {
		let message = 'Error!!!'
		if (err instanceof Error) {
			message = err.message
		}
		dispatch(userSlice.actions.loginFetchError(message))
		return 'Email or password is not valid'
	}
}

export const fetchRegistration =
	(firstName, lastName, city, email, password) => async dispatch => {
		try {
			dispatch(userSlice.actions.regFetch)
			const response = await AuthService.registration(
				firstName,
				lastName,
				city,
				email,
				password
			)
			localStorage.setItem('token', response.data.accessToken)
			dispatch(userSlice.actions.loginFetchSuccess(response.data.user))
			return ''
		} catch (err) {
			let message = 'Error!!!'
			if (err instanceof Error) {
				message = err.message
			}
			dispatch(userSlice.actions.loginFetchError(message))
			return 'You entered invalid data, check out the swagger example '
		}
	}

export const fetchLogout = () => async dispath => {
	try {
		dispath(userSlice.actions.logoutFetch())
		await AuthService.logout()
		localStorage.removeItem('token')
		dispath(userSlice.actions.logoutFetchSuccess())
	} catch (err) {
		let message = 'Error!!!'
		if (err instanceof Error) {
			message = err.message
		}
		dispath(userSlice.actions.loginFetchError(message))
	}
}

export const fetchCheckAuth = () => async dispatch => {
	try {
		dispatch(userSlice.actions.checkAuth())
		const response = await axios.post(
			`${process.env.REACT_APP_API_URL}/refresh`,
			{},
			{ withCredentials: true }
		)
		localStorage.setItem('token', response.data.accessToken)
		dispatch(userSlice.actions.checkAuthSuccess(response.data.user))
	} catch (err) {
		let message = 'Error!!!'
		if (err instanceof Error) {
			message = err.message
		}
		dispatch(userSlice.actions.checkAuthError(message))
	}
}

export const fetchEditUser =
	(firstName, lastName, city, email, password, newPass) => async dispatch => {
		try {
			dispatch(userSlice.actions.editUser)
			const response = await AuthService.edit(
				firstName,
				lastName,
				city,
				email,
				password,
				newPass
			)
			dispatch(userSlice.actions.editUserSuccess(response.data))
			return ''
		} catch (err) {
			let message = 'Error!!!'
			if (err instanceof Error) {
				message = err.message
			}
			dispatch(userSlice.actions.editUserError(message))
			return err.message
		}
	}
