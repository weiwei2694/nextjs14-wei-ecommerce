import React from 'react';
import { Inter } from 'next/font/google';

import { cn } from '@/lib/utils';

const inter = Inter({
	subsets: ['latin'],
});

const NavbarParent = ({
	children,
	className,
}: {
	children?: React.ReactNode;
	className?: string;
}) => {
	return (
		<nav className='sticky z-[100] top-0 bg-white/50 backdrop-blur border-b border-gray-200'>
			<div className='max-w-7xl mx-auto'>
				<div
					className={cn(
						inter.className,
						'flex items-center justify-between h-16 px-6 2xl:px-0',
						className
					)}
				>
					{children}
				</div>
			</div>
		</nav>
	);
};

export default NavbarParent;
