import React from 'react';
import Image from 'next/image';

const Billboard = ({ img, title }: { img: string; title: string }) => {
	return (
		<div className='my-8'>
			<div className='relative'>
				<Image
					src={img}
					alt='Explore your image'
					width={500}
					height={400}
					className='w-full h-[400px] lg:h-[500px] object-cover rounded-xl'
					priority
				/>

				<div className='absolute inset-0 grid place-items-center'>
					<h1 className='select-none text-4xl md:text-5xl lg:text-6xl font-extrabold text-center px-8 max-w-3xl text-zinc-900'>
						{title}
					</h1>
				</div>
			</div>
		</div>
	);
};

export default Billboard;
