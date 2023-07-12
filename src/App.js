import { useEffect } from 'react'
import Main from './components/main/Main'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCheckAuth } from './store/AsyncFunctions'

function App() {
	const { isAuth } = useSelector(store => store.userReducer)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	useEffect(() => {
		async function check() {
			if (!localStorage.getItem('user_id')) {
				navigate('/auth/registration')
			}
			if (localStorage.getItem('token')) {
				await dispatch(fetchCheckAuth())
			}
		}
		check()
	}, [])
	return (
		<div className='App'>
			<Main />
		</div>
	)
}

export default App
