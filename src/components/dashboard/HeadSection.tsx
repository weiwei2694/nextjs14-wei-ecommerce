import React from 'react';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';

import { Plus } from 'lucide-react';

const HeadSection = ({
	title,
	subtitle,

	isNewButtonVisible,
	newButtonPath,
}: {
	title: string;
	subtitle?: string;

	isNewButtonVisible?: boolean;
	newButtonPath?: string;
}) => {
	return (
		<section className='pt-2 border-b border-b-gray-200'>
			<div className='h-24 flex items-center justify-between'>
				<div className='flex flex-col space-y-1'>
					<h1 className='text-3xl font-extrabold text-zinc-900'>{title}</h1>
					{subtitle ? (
						<h4 className='text-sm text-zinc-500 tracking-tight'>{subtitle}</h4>
					) : null}
				</div>

				{isNewButtonVisible && newButtonPath ? (
					<Link
						href={newButtonPath!}
						className={buttonVariants({
							variant: 'default',
							size: 'default',
							className: 'text-white',
						})}
					>
						<Plus className='w-4 h-4 mr-1.5' />
						<span className='tracking-tight'>Add New</span>
					</Link>
				) : null}
			</div>
		</section>
	);
};

export default HeadSection;
