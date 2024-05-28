import React from 'react';
import Link from 'next/link';

const Logo = () => {
	return (
		<Link
			href='/'
			className='relative w-fit text-balance font-extrabold text-zinc-900 text-xl uppercase'
		>
			STORE
		</Link>
	);
};

export default Logo;
