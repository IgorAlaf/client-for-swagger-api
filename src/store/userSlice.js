import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
	name: 'userReducer',
	initialState: {
		user: {
			firstName: '',
			lastName: '',
			email: '',
			city: ''
		},
		isAuth: false,
		isLoading: false,
		errors: ''
	},
	reducers: {
		setUser(state, action) {
			const { firstName, lastName, email, city } = action.payload.user
			state.user.firstName = firstName
			state.user.lastName = lastName
			state.user.email = email
			state.user.city = city
		},
		setAuth: (state, action) => {
			state.isAuth = action.payload
		},
		loginFetch(state) {
			state.isLoading = true
		},
		loginFetchSuccess(state, action) {
			state.isLoading = false
			state.isAuth = true
			state.user = action.payload
		},
		loginFetchError(state, action) {
			state.isLoading = false
			state.errors = action.payload
		},
		regFetch(state) {
			state.isLoading = true
		},
		regFetchSuccess(state, action) {
			state.isLoading = false
			state.isAuth = true
			state.user = action.payload
		},
		setLoading(state, action) {
			state.isLoading = action.payload
		},
		regFetchError(state, action) {
			state.isLoading = false
			state.errors = action.payload
		},
		logoutFetch(state) {
			state.isLoading = true
		},
		logoutFetchSuccess(state) {
			state.isLoading = false
			state.isAuth = false
			state.user = {}
		},
		logoutFetchError(state, action) {
			state.isLoading = false
			state.errors = action.payload
		},
		checkAuth(state) {
			state.isLoading = true
		},
		checkAuthSuccess(state, action) {
			state.isLoading = false
			state.isAuth = true
			state.user = action.payload
		},
		checkAuthError(state, action) {
			state.isLoading = false
			state.errors = action.payload
		},
		editUser(state, action) {
			state.isLoading = true
		},
		editUserSuccess(state, action) {
			state.isLoading = false
			const { firstName, lastName, email, city } = action.payload.user
			state.user.firstName = firstName
			state.user.lastName = lastName
			state.user.email = email
			state.user.city = city
		},
		editUserError(state, action) {
			state.isLoading = true
			state.errors = action.payload
		}
	}
})

export default userSlice
