import React from 'react';
import { Inter } from 'next/font/google';

import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

const Footer = () => {
	return (
		<footer className={cn(inter.className, 'py-8 border-t border-t-gray-200')}>
			<div className='flex justify-center items-center'>
				<p className='text-sm'>&copy; 2024 Store. Inc All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
