import React from 'react';
import { redirect } from 'next/navigation';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

import { getOrders, getTotalOrder } from './_utils/actions';
import Table from './Table';
import Filter from './Filter';

const Page = async ({
	searchParams,
}: {
	searchParams: {
		[key: string]: string | undefined;
	};
}) => {
	const { page, paid } = searchParams;

	if (!page || typeof page !== 'string') {
		redirect('/dashboard/orders?page=1');
	}

	let paidStatus: boolean | undefined = undefined;

	if (paid === 'true') {
		paidStatus = true;
	} else if (paid === 'false') {
		paidStatus = false;
	}

	const totalOrder = await getTotalOrder();
	const orders = await getOrders({
		page: Number(page) - 1,
		isPaid: paidStatus,
	});

	return (
		<BodySection>
			<HeadSection
				title={`Orders(${totalOrder || 0})`}
				subtitle='Manage orders'
			/>

			<div className='flex flex-col gap-5'>
				<Filter paid={paidStatus} />

				<Table
					orders={orders}
					page={Number(page)}
				/>
			</div>
		</BodySection>
	);
};

export default Page;
