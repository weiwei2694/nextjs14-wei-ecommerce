import React from 'react';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { DollarSign, PackageSearch, Weight } from 'lucide-react';

import { formatPrice } from '@/lib/utils';

import { db } from '@/db';

const Page = async () => {
	const activeListings = await db.product.count({
		where: {
			isArchived: false,
			images: {
				some: {},
			},
		},
	});
	const sales = await db.order.count({
		where: {
			isPaid: true,
		},
	});

	const orders = await db.order.findMany({
		where: {
			isPaid: true,
		},
	});
	const totalRevenue = orders.reduce((a, b) => a + b.amount, 0);

	return (
		<BodySection>
			<HeadSection
				title='Dashboard'
				subtitle='Overview of you store'
			/>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
						<DollarSign className='w-5 h-5 text-zinc-500' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>
							{formatPrice(totalRevenue)}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Sales</CardTitle>
						<Weight className='w-5 h-5 text-zinc-500' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>+{sales}</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							Active Listings
						</CardTitle>
						<PackageSearch className='w-5 h-5 text-zinc-500' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{activeListings}</div>
					</CardContent>
				</Card>
			</div>
		</BodySection>
	);
};

export default Page;
