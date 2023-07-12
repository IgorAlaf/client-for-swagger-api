import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchCheckAuth, fetchEditUser } from '../../store/AsyncFunctions'

const Profile = () => {
	const navigate = useNavigate()
	const emailRef = useRef()
	const firstNameRef = useRef()
	const lastNameRef = useRef()
	const cityRef = useRef()
	const dispatch = useDispatch()
	const { user, isAuth } = useSelector(store => store.userReducer)
	const [email, setEmail] = useState(user.email)
	const [firstName, setFirstName] = useState(user.firstName)
	const [lastName, setLastName] = useState(user.lastName)
	const [city, setCity] = useState(user.city)
	const [password, setPassword] = useState('')
	const [newPass, setNewPass] = useState('')
	const [errors, setErrors] = useState('')
	const [success, setSuccess] = useState('')

	useEffect(() => {
		async function check() {
			if (!localStorage.getItem('user_id')) {
				navigate('/')
			}
			if (localStorage.getItem('token')) {
				await dispatch(fetchCheckAuth())
			}
		}
		check()
	}, [])
	useEffect(() => {
		if (!isAuth) {
			navigate('/')
		}
	}, [isAuth])
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const response = await dispatch(
				fetchEditUser(firstName, lastName, city, email, password, newPass)
			)
			if (response) {
				setErrors('Something validation error')
				setSuccess('')
			}
			if (!response) {
				setErrors('')
				setSuccess('Your account details have been successfully changed')
			}
		} catch (e) {}
	}
	return (
		<div className='mt-10 p-10 rounded-sm bg-[#ddd8ff] flex items-start justify-between md:flex-col md:items-center md:gap-y-10'>
			<form onSubmit={e => e.preventDefault()} id='form1'>
				<div>
					<h3 className='font-medium text-lg'>Email</h3>
					<div className='flex gap-4 items-center mt-2 mb-2'>
						<input
							ref={emailRef}
							readOnly={true}
							type='text'
							placeholder='email'
							onBlur={() => (emailRef.current.readOnly = true)}
							value={email}
							onChange={e => setEmail(e.target.value)}
							className='bg-transparent border-gray-400 px-5 rounded-sm py-[2px] outline-none border-solid border xs:px-2'
						/>
						<button
							onClick={e => {
								emailRef.current.focus()
								emailRef.current.readOnly = false
							}}
							type='button'
							className='bg-[#a89dfd] text-white py-1 px-4 rounded-sm transition-colors duration-300 hover:bg-[#9587fe] '
						>
							edit
						</button>
					</div>
				</div>

				<div>
					<h3 className='font-medium text-lg'>First name</h3>
					<div className='flex gap-4 items-center mt-2 mb-2'>
						<input
							ref={firstNameRef}
							type='text'
							placeholder='first name'
							onBlur={() => (firstNameRef.current.readOnly = true)}
							readOnly
							value={firstName}
							onChange={e => setFirstName(e.target.value)}
							className='bg-transparent border-gray-400 px-5 rounded-sm py-[2px] outline-none border-solid border xs:px-2'
						/>
						<button
							onClick={e => {
								firstNameRef.current.focus()
								firstNameRef.current.readOnly = false
							}}
							type='button'
							className='bg-[#a89dfd] text-white py-1 px-4 rounded-sm transition-colors duration-300 hover:bg-[#9587fe] '
						>
							edit
						</button>
					</div>
				</div>
				<div>
					<h3 className='font-medium text-lg'>Last name</h3>
					<div className='flex gap-4 items-center mt-2 mb-2'>
						<input
							ref={lastNameRef}
							type='text'
							onBlur={() => (lastNameRef.current.readOnly = true)}
							readOnly
							placeholder='last name'
							value={lastName}
							onChange={e => setLastName(e.target.value)}
							className='bg-transparent border-gray-400 px-5 rounded-sm py-[2px] outline-none border-solid border xs:px-2'
						/>
						<button
							onClick={e => {
								lastNameRef.current.focus()
								lastNameRef.current.readOnly = false
							}}
							type='button'
							className='bg-[#a89dfd] text-white py-1 px-4 rounded-sm transition-colors duration-300 hover:bg-[#9587fe] '
						>
							edit
						</button>
					</div>
				</div>

				<div>
					<h3 className='font-medium text-lg'>City</h3>
					<div className='flex gap-4 items-center mt-2 '>
						<input
							ref={cityRef}
							type='text'
							onBlur={() => (cityRef.current.readOnly = true)}
							readOnly
							placeholder='city'
							value={city}
							onChange={e => setCity(e.target.value)}
							className='bg-transparent border-gray-400 px-5 rounded-sm py-[2px] outline-none border-solid border xs:px-2'
						/>
						<button
							type='button'
							onClick={e => {
								cityRef.current.focus()
								cityRef.current.readOnly = false
							}}
							className='bg-[#a89dfd] text-white py-1 px-4 rounded-sm transition-colors duration-300 hover:bg-[#9587fe] '
						>
							edit
						</button>
					</div>
				</div>
				{errors && <p className='text-red-600 absolute text-sm '>{errors}</p>}
				{success && (
					<p className='text-green-500 text-sm absolute'>{success}</p>
				)}
				<button
					type='submit'
					onClick={handleSubmit}
					className='bg-[#8453d1] text-white py-1 px-3 mt-5'
				>
					Send changes
				</button>
			</form>
			<div>
				<h1 className='text-5xl font-semibold'>Profile</h1>
				<div className='mt-7'>
					<div className='flex gap-4 flex-col mt-2 '>
						<h3 className='font-medium text-lg'>Password</h3>
						<input
							type='password'
							placeholder='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							form='form1'
							className='bg-transparent border-gray-400 px-5 rounded-sm py-[2px] outline-none border-solid border'
						/>
						<h3 className='font-medium text-lg'>New Password</h3>
						<input
							type='password'
							placeholder='new password'
							form='form1'
							value={newPass}
							onChange={e => setNewPass(e.target.value)}
							className='bg-transparent border-gray-400 px-5 rounded-sm py-[2px] outline-none border-solid border'
						/>
						<p className='text-blue-500' style={{ maxWidth: '200px' }}>
							if you don't want to change your password, leave this{' '}
							<span className='text-blue-700'>fields empty</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
