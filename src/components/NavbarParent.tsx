import React from 'react';
import { Urbanist } from 'next/font/google';

import { cn } from '@/lib/utils';

const urbanist = Urbanist({ subsets: ['latin'] });

const NavbarParent = ({
	children,
	className,
	isSticky,
}: {
	children?: React.ReactNode;
	className?: string;
	isSticky?: boolean;
}) => {
	return (
		<nav
			className={cn(
				'border-b border-gray-200 bg-white',
				isSticky ? 'sticky z-[100] top-0' : ''
			)}
		>
			<div className='max-w-7xl mx-auto'>
				<div
					className={cn(
						urbanist.className,
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
