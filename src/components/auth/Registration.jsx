import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchRegistration } from '../../store/AsyncFunctions'

const Registration = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [city, setCity] = useState('')
	const [error, setError] = useState('')
	const dispatch = useDispatch()
	const handleSubmit = async e => {
		e.preventDefault()
		if ((email, password, firstName, lastName, city)) {
			const response = await dispatch(
				fetchRegistration(firstName, lastName, city, email, password)
			)
			if (response === '') {
				navigate('/')
			}
			setError(response)
		}
	}

	return (
		<div className='mt-10 p-10 flex gap-10 items-center lg:justify-center hr:mt-2'>
			<div className='bg-white p-10 rounded-md shadow-md py-20 hr:py-10 xs:p-10'>
				<h1 className='text-4xl font-semibold hr:text-3xl'>Sign up</h1>
				<p className='text-gray-600 mt-2'>
					Already have an account?
					<Link className='text-[#7C2DDE] font-medium' to={'/auth/login'}>
						Log in to the site
					</Link>
				</p>
				<form className='flex flex-col relative' onSubmit={handleSubmit}>
					<div className='mt-5 flex flex-col'>
						<label className='flex flex-col mt-4'>
							<h3 className='text-sm font-medium'>Email</h3>
							<input
								className='mt-1 outline-none bg-transparent border-gray-400 border border-opacity-30 rounded-md py-[2px] px-3'
								type='email'
								value={email}
								onChange={e => setEmail(e.target.value)}
								placeholder='Enter your email'
							/>
						</label>
						<label className='flex flex-col mt-4'>
							<h3 className='text-sm font-medium'>Password</h3>
							<input
								className='mt-1 outline-none bg-transparent border-gray-400 border border-opacity-30 rounded-md py-[2px] px-3'
								type='password'
								value={password}
								onChange={e => setPassword(e.target.value)}
								placeholder='Enter your email'
							/>
						</label>
						<label className='flex flex-col mt-4'>
							<h3 className='text-sm font-medium'>FirstName</h3>
							<input
								className='mt-1 outline-none bg-transparent border-gray-400 border border-opacity-30 rounded-md py-[2px] px-3'
								type='text'
								placeholder='Enter your firstName'
								value={firstName}
								onChange={e => setFirstName(e.target.value)}
							/>
						</label>
						<label className='flex flex-col mt-4'>
							<h3 className='text-sm font-medium'>LastName</h3>
							<input
								className='mt-1 outline-none bg-transparent border-gray-400 border border-opacity-30 rounded-md py-[2px] px-3'
								type='text'
								placeholder='Enter your lastName'
								value={lastName}
								onChange={e => setLastName(e.target.value)}
							/>
						</label>
						<label className='flex flex-col mt-4'>
							<h3 className='text-sm font-medium'>City</h3>
							<input
								className='mt-1 outline-none bg-transparent border-gray-400 border border-opacity-30 rounded-md py-[2px] px-3'
								type='text'
								placeholder='Enter your city'
								value={city}
								onChange={e => setCity(e.target.value)}
							/>
						</label>
					</div>
					{error && (
						<p className='text-red-600 absolute top-2 text-right'>{error}</p>
					)}
					<button
						onClick={handleSubmit}
						className='bg-[#7C2DDE] text-white py-[6px] mt-7  px-4 rounded-md text-xs'
						type='submit'
					>
						Sign in
					</button>
				</form>
			</div>
			<div className='lg:hidden' style={{ flex: '0 1 50%' }}>
				<p className='text-purple-800 shadow-lg p-3 bg-[#d8d3ff] text-lg font-medium leading-loose'>
					<h1 className='text-3xl text-center mb-5'>About testing</h1>
					Software testing is the culmination of application development through
					which software testers evaluate code by questioning it. This
					evaluation can be brief or proceed until all stakeholders are
					satisfied. Software testing identifies bugs and issues in the
					development process so they're fixed prior to product launch. This
					approach ensures that only quality products are distributed to
					consumers, which in turn elevates customer satisfaction and trust.
				</p>
			</div>
		</div>
	)
}

export default Registration
