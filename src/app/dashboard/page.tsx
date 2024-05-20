import React from 'react';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { DollarSign, PackageSearch, Weight } from 'lucide-react';

const Page = () => {
	return (
		<BodySection>
			<HeadSection
				title='Dashboard'
				subtitle='Overview of you store'
			/>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
				<Card>
					<CardHeader>
						<div className='flex flex-row justify-between items-start'>
							<div className='flex flex-col gap-4'>
								<CardTitle className='font-semibold text-lg'>
									Total Revenue
								</CardTitle>
								<CardDescription className='text-zinc-900 font-extrabold text-2xl'>
									$59.00
								</CardDescription>
							</div>
							<DollarSign className='w-5 h-5 text-zinc-500' />
						</div>
					</CardHeader>
				</Card>

				<Card>
					<CardHeader>
						<div className='flex flex-row justify-between items-start'>
							<div className='flex flex-col gap-4'>
								<CardTitle className='font-semibold text-lg'>Sales</CardTitle>
								<CardDescription className='text-zinc-900 font-extrabold text-2xl'>
									+1
								</CardDescription>
							</div>
							<Weight className='w-5 h-5 text-zinc-500' />
						</div>
					</CardHeader>
				</Card>

				<Card>
					<CardHeader>
						<div className='flex flex-row justify-between items-start'>
							<div className='flex flex-col gap-4'>
								<CardTitle className='font-semibold text-lg'>
									Products in Stock
								</CardTitle>
								<CardDescription className='text-zinc-900 font-extrabold text-2xl'>
									7
								</CardDescription>
							</div>
							<PackageSearch className='w-5 h-5 text-zinc-500' />
						</div>
					</CardHeader>
				</Card>
			</div>
		</BodySection>
	);
};

export default Page;
