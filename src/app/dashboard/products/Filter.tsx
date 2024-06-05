'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { buttonVariants } from '@/components/ui/button';

import { cn } from '@/lib/utils';

const Filter = () => {
	const router = useRouter();

	const [q, setQ] = React.useState<string>('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		router.push(`/dashboard/products?page=1&q=${q}`);
	};

	return (
		<div className='grid grid-cols-7'>
			<div className='col-span-2'>
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						placeholder='Search by Title'
						className={cn(
							buttonVariants({ variant: 'outline', size: 'sm' }),
							'w-full'
						)}
						value={q}
						onChange={(e) => setQ(e.target.value)}
					/>
					<button
						type='submit'
						hidden
					></button>
				</form>
			</div>
			<div className='col-span-5'></div>
		</div>
	);
};

export default Filter;
