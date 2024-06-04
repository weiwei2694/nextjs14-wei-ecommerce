import React from 'react';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

import { getTotalOrder } from './_utils/actions';

const Page = async () => {
	const totalOrder = await getTotalOrder();

	return (
		<BodySection>
			<HeadSection
				title={`Orders(${totalOrder || 0})`}
				subtitle='Manage orders'
			/>
		</BodySection>
	);
};

export default Page;
