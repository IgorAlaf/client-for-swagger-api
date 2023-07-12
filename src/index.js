import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Login from './components/auth/Login'
import Registration from './components/auth/Registration'
import Profile from './components/profile/Profile'
import { Provider } from 'react-redux'
import store from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'))

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Layout>
				<App />
			</Layout>
		)
	},
	{
		path: '/auth/login',
		element: (
			<Layout>
				<Login />
			</Layout>
		)
	},
	{
		path: '/auth/registration',
		element: (
			<Layout>
				<Registration />
			</Layout>
		)
	},
	{
		path: '/profile',
		element: (
			<Layout>
				<Profile />
			</Layout>
		)
	}
])
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
)
