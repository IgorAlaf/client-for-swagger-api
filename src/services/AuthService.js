import $api from '../http'

export default class AuthService {
	static async login(email, password) {
		const response = await $api.post('/login', {
			email,
			password
		})
		localStorage.setItem('user_id', response.data.user.id)
		return response
	}
	static async registration(firstName, lastName, city, email, password) {
		const response = await $api.post('/registration', {
			email,
			password,
			firstName,
			lastName,
			city
		})
		localStorage.setItem('user_id', response.data.user.id)
		return response
	}
	static async logout() {
		return $api.get('/logout')
	}
	static async edit(firstName, lastName, city, email, password, newPass) {
		const id = localStorage.getItem('user_id')
		if (id) {
			const response = await $api.put(`/account/${id}/edit`, {
				firstName,
				lastName,
				email,
				city,
				password,
				newPass
			})
			return response
		}
		throw new Error('User unauthorized')
	}
}
