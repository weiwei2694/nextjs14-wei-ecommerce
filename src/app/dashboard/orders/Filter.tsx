'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

import { ChevronsUpDown } from 'lucide-react';

const Filter = ({ paid }: { paid: boolean | undefined }) => {
	const router = useRouter();

	return (
		<div className='grid grid-cols-6'>
			<div className='col-span-5'></div>
			<div className='col-span-1'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							size='sm'
							variant='outline'
							className='w-full flex justify-between'
						>
							{typeof paid === 'undefined'
								? 'Select payment status'
								: paid
								? 'Paid'
								: 'Not paid'}
							<ChevronsUpDown className='w-4 h-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Options (default all)</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => router.push('/dashboard/orders?page=1')}
						>
							All
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => router.push('/dashboard/orders?page=1&paid=true')}
						>
							Paid
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => router.push('/dashboard/orders?page=1&paid=false')}
						>
							Not paid
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
};

export default Filter;
