import React from 'react';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

import { getOrders, getTotalOrder } from './_utils/actions';
import Table from './Table';

const Page = async ({
	searchParams,
}: {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}) => {
	const { page } = searchParams;

	const totalOrder = await getTotalOrder();
	const orders = await getOrders({
		page: Number(page) - 1,
	});

	return (
		<BodySection>
			<HeadSection
				title={`Orders(${totalOrder || 0})`}
				subtitle='Manage orders'
			/>

			<Table
				orders={orders}
				page={Number(page)}
			/>
		</BodySection>
	);
};

export default Page;
