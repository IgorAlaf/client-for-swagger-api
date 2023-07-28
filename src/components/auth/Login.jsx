import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchLogin } from '../../store/AsyncFunctions'
import { useDispatch } from 'react-redux'
import './Auth.css'
import cn from 'classnames'
import { useForm } from 'react-hook-form'
import tick from '../../assets/images/tick-accept.svg'
const Login = () => {
	const [email, setEmail] = useState('')
	const dispatch = useDispatch()
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		getFieldState,
		getValues,
		setValue,
		formState: { errors }
	} = useForm({
		mode: 'onChange'
	})
	const onSubmit = async data => {
		const response = await dispatch(fetchLogin(data.email, data.password))
		if (response === '') {
			navigate('/')
		}
		setError(response)
	}
	useEffect(() => {
		setError('')
	}, [getValues('email'), getValues('password')])
	return (
		<div className='wrapper-login mt-10 p-10 flex gap-10 items-center justify-center hr:mt-2'>
			<div className='bg-white md:px-[64px] px-[102px] rounded-md shadow-md py-[86px] hr:py-20 xs:p-10 w-[588px]'>
				<h1 className='text-4xl font-semibold hr:text-3xl'>Welcome back</h1>
				<p className='text-gray-600 mt-2 text-[15px]'>
					New to AuthTesting?&nbsp;
					<Link className='underline ' to={'/auth/registration'}>
						Create an account
					</Link>
				</p>
				<form
					className='flex flex-col relative'
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className='mt-[60px] flex flex-col tr:mt-[20px] '>
						<label className='flex flex-col mt-4 relative'>
							<h3 className='text-[15px] font-semibold'>Email</h3>
							<input
								className={cn(
									'mt-2 outline-none bg-transparent border-[#1C1C1C] border  py-[1px] px-3',
									{
										'pr-[80px] border border-solid border-[#ff0000] border-opacity-30':
											errors.email || error
									},
									{
										'border border-solid border-[#6bff36]':
											!errors.email && getValues('email')
									},
									{
										'border-opacity-30':
											!getFieldState('email').isDirty || errors.email
									}
								)}
								type='email'
								autoComplete='h87h58g7h8hd'
								placeholder='Enter your email'
								{...register('email', {
									required: 'Empty',
									pattern: {
										value:
											/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
										message: 'Not email'
									}
								})}
							/>
							{errors.email && !error && (
								<div className='text-red-500 text-sm tr:text-xs absolute right-[10px] top-[58%]'>
									{errors.email?.message}
								</div>
							)}
							{!errors.email && !error && getValues('email') && !error && (
								<div>
									<img
										src={tick}
										alt='tick'
										className='absolute right-[10px] top-[60%]'
									/>
								</div>
							)}
						</label>
						<label className='flex flex-col mt-4 relative'>
							<h3 className='text-[15px] font-semibold'>Password</h3>
							<input
								className={cn(
									'mt-2 outline-none bg-transparent border-[#1C1C1C] border  py-[1px] px-3',
									{
										'pr-[80px] border border-solid border-[#ff0000] border-opacity-30':
											errors.password || error
									},
									{
										'border border-solid border-[#6bff36]':
											!errors.password && getValues('password')
									},
									{
										'border-opacity-30':
											!getFieldState('password').isDirty || errors.password
									}
								)}
								type='password'
								autoComplete='h87h58g7h8hd'
								placeholder='Enter your password'
								{...register('password', {
									required: 'Empty',
									maxLength: 50,
									minLength: {
										value: 6,
										message: 'Min 6 chars'
									}
								})}
							/>
							{errors.password && (
								<div className='text-red-500 text-sm tr:text-xs absolute right-[10px] top-[58%]'>
									{errors.password?.message}
								</div>
							)}
							{!errors.password && getValues('password') && !error && (
								<div>
									<img
										src={tick}
										alt='tick'
										className='absolute right-[10px] top-[60%]'
									/>
								</div>
							)}
						</label>
					</div>
					{error && (
						<p className='text-red-600 text-sm absolute top-2'>{error}</p>
					)}
					<button
						onClick={handleSubmit}
						className='bg-[#E06CFD] tr:mt-[40px] text-white py-[4px] mt-[76px]  px-4 rounded-[20px] text-[15px]'
						type='submit'
					>
						Sign in
					</button>
				</form>
			</div>
		</div>
	)
}

export default Login
