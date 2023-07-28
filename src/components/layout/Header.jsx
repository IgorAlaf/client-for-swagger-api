import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchLogout } from '../../store/AsyncFunctions'
import './Header.css'
const Header = () => {
	const { isAuth } = useSelector(store => store.userReducer)
	const dispatch = useDispatch()
	const handleLogout = async e => {
		const response = await dispatch(fetchLogout())
	}
	return (
		<header className='text-black flex py-5 items-center justify-between border-b border-solid border-b-black sm:justify-around '>
			<h1>
				<Link className='text-xl font-semibold' to={'/'}>
					AuthTesting
				</Link>
			</h1>
			<nav>
				<ul className='flex gap-3 xs:gap-2'>
					<li>
						<Link
							className='hover:text-[#E7E4FD] text-[20px] sm:hidden hover:bg-black py-1 px-2 rounded-sm transition-color duration-300'
							to={'/'}
						>
							Product
						</Link>
					</li>
					<li>
						<Link
							className='hover:text-[#E7E4FD] text-[20px]  sm:hidden hover:bg-black py-1 px-2 rounded-sm transition-color duration-300'
							to={'/'}
						>
							Resources
						</Link>
					</li>
					<li>
						<Link
							className='hover:text-[#E7E4FD] text-[20px] sm:hidden hover:bg-black py-1 px-2 rounded-sm transition-color duration-300'
							to={'/'}
						>
							About
						</Link>
					</li>
					<li>
						{!isAuth ? (
							<Link className='cursor-not-allowed  py-1 px-2 sm:text-lg text-[20px]'>
								Profile
							</Link>
						) : (
							<Link
								className='hover:text-[#E7E4FD] sm:text-lg hover:bg-black py-1 px-2 rounded-sm transition-color duration-300 text-[20px]'
								to={'/profile'}
							>
								Profile
							</Link>
						)}
					</li>
				</ul>
			</nav>
			{!isAuth ? (
				<div className='flex gap-5 items-center tr:gap-1 tr:flex-col-reverse'>
					<Link
						className='text-sm font-medium transition-all  duration-150 hover:shadow-md  border-b-black hover:border-b'
						to={'/auth/login'}
					>
						Log in
					</Link>
					<Link
						className='text-sm text-white font-medium rounded-[20px] tr:px-2 bg-[#010103] py-[6px] px-[12px] transition-color duration-300 hover:bg-[#232329]'
						to={'/auth/registration'}
					>
						Sign up
					</Link>
				</div>
			) : (
				<button
					className='header-button rounded-[20px] bg-tl text-[13px] font-semibold py-[5px] px-[12px] bg-purple-700 text-white sm:mr-0'
					type='button'
					onClick={handleLogout}
				>
					Log out
				</button>
			)}
		</header>
	)
}

export default Header
