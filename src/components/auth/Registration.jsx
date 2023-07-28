import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fetchRegistration } from '../../store/AsyncFunctions'
import { useForm, SubmitHandler } from 'react-hook-form'
import cn from 'classnames'
import './Auth.css'
import arrow from '../../assets/images/Arrow.svg'
import tick from '../../assets/images/tick-accept.svg'
const cityList = [
	'Moscow',
	'Omsk',
	'Kazan',
	'Saint Petersburg',
	'Khabarovsk',
	'Vladivostok'
]
const Registration = () => {
	const [error, setError] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [showSelect, setShowSelect] = useState(false)
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
		const response = await dispatch(
			fetchRegistration(
				data.firstName,
				data.lastName,
				data.city,
				data.email,
				data.password
			)
		)
		if (response === '') {
			navigate('/')
		}
		setError(response)
	}
	useEffect(() => {
		setError('')
	}, [getValues('email')])

	return (
		<div className='wrapper-register flex gap-10 items-center justify-center hr:mt-2'>
			<div className='mt-[91px]  hr:px-[30px] md:px-[64px] md:w-[500px] px-[102px]  bg-white p-10 py-20 hr:py-10 xs:p-10 w-[588px]'>
				<h1 className='text-4xl font-semibold hr:text-3xl tr:text-2xl'>
					Sign up
				</h1>
				<p className='text-gray-600 mt-2 xs:text-sm'>
					Already have an account?&nbsp;
					<Link className='underline' to={'/auth/login'}>
						Log in to the site
					</Link>
				</p>
				<form
					className='flex flex-col relative'
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className='mt-[50px] xs:mt-[10px] tr:mt-[25px] flex flex-col'>
						<label className='flex flex-col mt-4 tr:mt-2 relative'>
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
								autoComplete='disabled'
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
							{error && (
								<div className='text-red-500 text-sm tr:text-xs absolute right-[10px] top-[58%]'>
									Already exists
								</div>
							)}
						</label>

						<label className='flex flex-col mt-4 tr:mt-2 relative'>
							<h3 className='text-[15px] font-semibold'>Password</h3>
							<input
								className={cn(
									'mt-2 outline-none bg-transparent border-[#1C1C1C] border  py-[1px] px-3',
									{
										'pr-[80px] border border-solid border-[#ff0000]':
											errors.password
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
								autoComplete='new-password'
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
							{!errors.password && getValues('password') && (
								<div>
									<img
										src={tick}
										alt='tick'
										className='absolute right-[10px] top-[60%]'
									/>
								</div>
							)}
						</label>
						<label className='flex flex-col mt-4 tr:mt-2 relative'>
							<h3 className='text-[15px] font-semibold'>FirstName</h3>
							<input
								className={cn(
									'mt-2 outline-none bg-transparent border-[#1C1C1C] border-[1px]  py-[1px] px-3',
									{
										'pr-[80px] border border-solid border-[#ff0000]':
											errors.firstName
									},
									{
										'border border-solid border-[#6bff36]':
											!errors.firstName && getValues('firstName')
									},
									{
										'border-opacity-30':
											!getFieldState('firstName').isDirty || errors.firstName
									}
								)}
								type='text'
								placeholder='Enter your firstName'
								{...register('firstName', {
									required: 'Empty',
									maxLength: 50,
									minLength: {
										value: 2,
										message: 'Min 2 chars'
									}
								})}
							/>
							{errors.firstName && (
								<div className='text-red-500 text-sm tr:text-xs absolute right-[10px] top-[58%]'>
									{errors.firstName?.message}
								</div>
							)}
							{!errors.firstName && getValues('firstName') && (
								<div>
									<img
										src={tick}
										alt='tick'
										className='absolute right-[10px] top-[60%]'
									/>
								</div>
							)}
						</label>
						<label className='flex flex-col mt-4 tr:mt-2 relative'>
							<h3 className='text-[15px] font-semibold'>LastName</h3>
							<input
								className={cn(
									'mt-2 outline-none bg-transparent border-[#1C1C1C] border-[1px]  py-[1px] px-3',
									{
										'pr-[80px] border border-solid border-[#ff0000]':
											errors.lastName
									},
									{
										'border border-solid border-[#6bff36]':
											!errors.lastName && getValues('lastName')
									},
									{
										'border-opacity-30':
											!getFieldState('lastName').isDirty || errors.lastName
									}
								)}
								type='text'
								placeholder='Enter your lastName'
								{...register('lastName', {
									required: 'Empty',
									maxLength: 50,
									minLength: {
										value: 2,
										message: 'Min 2 chars'
									}
								})}
							/>
							{errors.lastName && (
								<div className='text-red-500 text-sm tr:text-xs absolute right-[10px] top-[58%]'>
									{errors.lastName?.message}
								</div>
							)}
							{!errors.lastName && getValues('lastName') && (
								<div>
									<img
										src={tick}
										alt='tick'
										className='absolute right-[10px] top-[60%]'
									/>
								</div>
							)}
						</label>
						<label className='select-city flex flex-col mt-4 tr:mt-2 cursor-pointer'>
							<h3 className='text-[15px] font-semibold'>City</h3>
							<input
								className={cn(
									'mt-2 outline-none bg-transparent border-[#1C1C1C] border-[1px]  py-[1px] px-3',
									{
										'pr-[80px] border border-solid border-[#ff0000]':
											errors.city
									},
									{
										'border border-solid border-[#6bff36] border-opacity-100':
											getValues('city')
									},
									{
										'border-opacity-30':
											!getFieldState('city').isDirty || !getValues('city')
									}
								)}
								type='text'
								readOnly
								placeholder='Enter your city'
								{...register('city', {
									required: 'Empty'
								})}
							/>
							<div
								className=' absolute right-[5px] top-[48%] p-2'
								onClick={() => setShowSelect(prev => !prev)}
							>
								<img src={arrow} alt='arr' className='w-[16px] h-[16px]' />
							</div>
						</label>
						{showSelect && (
							<ul className='select-list z-10 bg-white px-[26px] py-[6px] absolute max-h-[182px] w-[204px] border-2 border-solid border-[#c1c1c1] flex flex-col overflow-y-scroll'>
								{cityList.map((item, key) => (
									<li
										key={key}
										onClick={() => {
											setValue('city', item)
											setShowSelect(false)
										}}
										className='text-[16px] font-semibold mt-[18px] cursor-pointer'
									>
										{item}
									</li>
								))}
							</ul>
						)}
					</div>
					<button
						onClick={handleSubmit}
						className='button-register bg-[#E06CFD] text-white py-[6px] mt-7  px-4 rounded-[20px] text-xs'
						type='submit'
					>
						Sign up
					</button>
				</form>
			</div>
		</div>
	)
}

export default Registration
