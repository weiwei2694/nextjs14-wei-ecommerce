import React from 'react';
import { Inter } from 'next/font/google';
import Image from 'next/image';

import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

const Billboard = ({ img, title }: { img: string; title: string }) => {
	return (
		<div className={cn(inter.className, 'mb-8 sm:mb-10 mt-8 sm:mt-10')}>
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
					<h1 className='capitalize select-none text-3xl md:text-4xl font-bold text-center px-8'>
						{title}
					</h1>
				</div>
			</div>
		</div>
	);
};

export default Billboard;
