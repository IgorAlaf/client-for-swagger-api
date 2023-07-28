import React from 'react'
import { Link } from 'react-router-dom'
import './Main.css'
const Main = () => {
	return (
		<main>
			<div className='mt-[110px]'>
				<h1 className='text-[64px] max-w-2xl leading-[64px] md:text-5xl sm:text-4xl text-auth'>
					Authorization is about ensuring users can do and see what they are
					authorized to do.
				</h1>
			</div>
		</main>
	)
}

export default Main
