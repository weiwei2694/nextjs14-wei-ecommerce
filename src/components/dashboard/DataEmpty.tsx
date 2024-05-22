import Link from 'next/link';
import React from 'react';
import { Open_Sans } from 'next/font/google';

import { buttonVariants } from '../ui/button';

import { cn } from '@/lib/utils';

import { ArrowRightIcon } from 'lucide-react';

const openSans = Open_Sans({ subsets: ['latin'] });

const DataEmpty = ({ href }: { href: string }) => {
	return (
		<div className={cn(openSans.className, 'grid place-items-center h-[30vh]')}>
			<div className='flex flex-col gap-5 items-center'>
				<h2 className='text-zinc-900 text-lg tracking-tight font-medium'>
					Your data is currently empty
				</h2>
				<Link
					href={href}
					className={buttonVariants({
						variant: 'outline',
						size: 'sm',
						className: 'w-fit',
					})}
				>
					Create a new one
					<ArrowRightIcon className='ml-1.5 h-5 w-5' />
				</Link>
			</div>
		</div>
	);
};

export default DataEmpty;
