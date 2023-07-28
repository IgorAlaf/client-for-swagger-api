import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchCheckAuth, fetchEditUser } from '../../store/AsyncFunctions'
import './Profile.css'
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
		<div className=' wrapper-profile mt-[109px] p-10 px-[78px] lg:px-[30px] rounded-sm flex flex-col md:flex-col md:items-center md:gap-y-10'>
			<h1 className='text-[64px] font-semibold tr:text-[45px]'>Profile</h1>
			<div className='flex items-start justify-between md:flex-col-reverse md:gap-y-8'>
				<div className='flex'>
					<div className='mt-7'>
						<div className='flex flex-col  mt-2 '>
							<h3 className='font-semibold text-[16px]'>Password</h3>
							<input
								type='password'
								placeholder='Enter your pass'
								value={password}
								onChange={e => setPassword(e.target.value)}
								form='form1'
								className='xs:w-[180px] bg-transparent mt-[13px] border-[#353535] px-2 rounded-sm w-[228px] md:w-[268px] hr:w-[228px] py-[1px] outline-none border-solid border placeholder:text-[#474747]'
							/>
							<h3 className='font-semibold text-[15px] mt-[20px]'>
								New Password
							</h3>
							<input
								type='password'
								placeholder='Enter new pass'
								form='form1'
								value={newPass}
								onChange={e => setNewPass(e.target.value)}
								className='xs:w-[180px] bg-transparent mt-[13px] border-[#353535] px-2 w-[228px] md:w-[268px] hr:w-[228px] rounded-sm py-[1px] outline-none border-solid border placeholder:text-[#474747]'
							/>
							<p
								className='text-[#151CC4] text-[13px] mt-[13px] hover:text-[#0D15E7] transition-colors duration-300 cursor-pointer'
								style={{ maxWidth: '170px' }}
							>
								if you don't want to change your password, leave this{' '}
								<span className='text-blue-700'>fields empty</span>
							</p>
							<button
								onClick={handleSubmit}
								className='bg-[#E06CFD] rounded-[20px] text-white py-1 px-3 mt-[40px] shadow-lg hover:bg-[#D33BFA] transition-colors duration-300'
							>
								Send changes
							</button>
						</div>
					</div>
				</div>
				<form
					onSubmit={e => e.preventDefault()}
					id='form1'
					className='mt-7 tr:mt-4'
				>
					<div>
						<h3 className='text-[15px] font-semibold'>Email</h3>
						<div className='flex gap-4 items-center mt-[13px] mb-[20px]'>
							<input
								ref={emailRef}
								readOnly={true}
								type='text'
								placeholder='email'
								onBlur={() => (emailRef.current.readOnly = true)}
								value={email}
								onChange={e => setEmail(e.target.value)}
								className='xs:w-[180px] hr:w-[228px] bg-transparent w-[268px] border-[#353535] px-2 rounded-sm py-[1px] outline-none border-solid border xs:px-2'
							/>
							<button
								onClick={e => {
									emailRef.current.focus()
									emailRef.current.readOnly = false
								}}
								type='button'
								className='bg-[#806CFD] text-white py-[2px] px-4 rounded-sm  hover:bg-[#4E32FB] transition-colors duration-300'
							>
								edit
							</button>
						</div>
					</div>

					<div>
						<h3 className='text-[15px] font-semibold'>First name</h3>
						<div className='flex gap-4 items-center mt-[13px] mb-[20px]'>
							<input
								ref={firstNameRef}
								type='text'
								placeholder='first name'
								onBlur={() => (firstNameRef.current.readOnly = true)}
								readOnly
								value={firstName}
								onChange={e => setFirstName(e.target.value)}
								className='xs:w-[180px] hr:w-[228px] bg-transparent w-[268px] border-[#353535] px-2 rounded-sm py-[1px] outline-none border-solid border xs:px-2'
							/>
							<button
								onClick={e => {
									firstNameRef.current.focus()
									firstNameRef.current.readOnly = false
								}}
								type='button'
								className='bg-[#806CFD] text-white py-[2px] px-4 rounded-sm  hover:bg-[#4E32FB] transition-colors duration-300'
							>
								edit
							</button>
						</div>
					</div>
					<div>
						<h3 className='text-[15px] font-semibold'>Last name</h3>
						<div className='flex gap-4 items-center mt-[13px] mb-[20px]'>
							<input
								ref={lastNameRef}
								type='text'
								onBlur={() => (lastNameRef.current.readOnly = true)}
								readOnly
								placeholder='last name'
								value={lastName}
								onChange={e => setLastName(e.target.value)}
								className='xs:w-[180px] hr:w-[228px] bg-transparent w-[268px] border-[#353535] px-2 rounded-sm py-[1px] outline-none border-solid border xs:px-2'
							/>
							<button
								onClick={e => {
									lastNameRef.current.focus()
									lastNameRef.current.readOnly = false
								}}
								type='button'
								className='bg-[#806CFD] hover:bg-[#4E32FB] transition-colors duration-300 text-white py-[2px] px-4 rounded-sm '
							>
								edit
							</button>
						</div>
					</div>

					<div>
						<h3 className='text-[15px] font-semibold'>City</h3>
						<div className='flex gap-4 items-center mt-[13px]'>
							<input
								ref={cityRef}
								type='text'
								onBlur={() => (cityRef.current.readOnly = true)}
								readOnly
								placeholder='city'
								value={city}
								onChange={e => setCity(e.target.value)}
								className='xs:w-[180px] hr:w-[228px] bg-transparent w-[268px] border-[#353535] px-2 rounded-sm py-[1px] outline-none border-solid border xs:px-2'
							/>
							<button
								type='button'
								onClick={e => {
									cityRef.current.focus()
									cityRef.current.readOnly = false
								}}
								className='bg-[#806CFD] hover:bg-[#4E32FB] transition-colors duration-300 text-white py-[2px] px-4 rounded-sm'
							>
								edit
							</button>
						</div>
					</div>
					{errors && <p className='text-red-600 absolute text-sm '>{errors}</p>}
					{success && (
						<p className='text-green-700 text-sm absolute'>{success}</p>
					)}
					<button
						type='submit'
						onClick={handleSubmit}
						className='xs:px-[40px] bg-[#806CFD] hover:bg-[#4E32FB] transition-colors duration-300 text-white py-[3px] mt-[37px] rounded-[20px] px-[66px]'
					>
						Send changes
					</button>
				</form>
			</div>
		</div>
	)
}

export default Profile
