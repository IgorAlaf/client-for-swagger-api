import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchLogin } from '../../store/AsyncFunctions'
import { useDispatch } from 'react-redux'

const Login = () => {
	const [email, setEmail] = useState('')
	const dispatch = useDispatch()
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const handleSubmit = async e => {
		e.preventDefault()
		if (email && password) {
			const response = await dispatch(fetchLogin(email, password))
			if (response === '') {
				navigate('/')
			}
			setError(response)
		}
	}
	return (
		<div className='mt-10 p-10 flex gap-10 items-center lg:justify-center hr:mt-2'>
			<div className='bg-white p-12 rounded-md shadow-md py-40 hr:py-20 xs:p-10'>
				<h1 className='text-4xl font-semibold hr:text-3xl'>Welcome back</h1>
				<p className='text-gray-600 mt-2'>
					New to AuthTesting?
					<Link
						className='text-[#7C2DDE] font-medium'
						to={'/auth/registration'}
					>
						Create an account
					</Link>
				</p>
				<form className='flex flex-col relative' onSubmit={handleSubmit}>
					<div className='mt-5 flex flex-col'>
						<label className='flex flex-col mt-4'>
							<h3 className='text-sm font-medium'>Email</h3>
							<input
								value={email}
								onChange={e => setEmail(e.target.value)}
								className='mt-1 outline-none bg-transparent border-gray-400 border border-opacity-30 rounded-md py-[2px] px-3'
								type='email'
								placeholder='Enter your email'
							/>
						</label>
						<label className='flex flex-col mt-4'>
							<h3 className='text-sm font-medium'>Password</h3>
							<input
								value={password}
								onChange={e => setPassword(e.target.value)}
								className='mt-1 outline-none bg-transparent border-gray-400 border border-opacity-30 rounded-md py-[2px] px-3'
								type='password'
								placeholder='Enter your email'
							/>
						</label>
					</div>
					{error && (
						<p className='text-red-600 text-sm absolute top-2'>{error}</p>
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

export default Login
