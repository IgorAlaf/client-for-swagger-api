import React from 'react'
import { Link } from 'react-router-dom'

const Main = () => {
	return (
		<main>
			<div className='mt-7'>
				<h1 className='text-6xl font-semibold max-w-2xl leading-tight md:text-5xl sm:text-4xl'>
					Authorization is about ensuring users can do and see what they are
					authorized to do.
				</h1>
			</div>
			<div className='mt-20'>
				<div className='h-96 flex'>
					<div
						className='bg-[#C9C2FF] h-full md:hidden'
						style={{ flex: '1 1 30%' }}
					></div>
					<div
						className='bg-[#161616] h-full flex item-center justify-end '
						style={{ flex: '1 1 70%' }}
					>
						<div className='p-8'>
							<h1 className='text-[#D1CBFF] max-w-xs leading-relaxed mb-7'>
								To get a full understanding of the authorization and use all the
								functions of the service, you must register...click
							</h1>
							<Link
								className='bg-[#D1CBFF] text-lg transition-color duration-300 font-semibold text-black py-[6px] px-8  rounded-sm hover:bg-[#e7e4fd] hover:shadow-md'
								to={'/auth/registration'}
							>
								Sign up
							</Link>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Main
