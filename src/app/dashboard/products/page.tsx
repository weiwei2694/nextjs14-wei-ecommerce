import React from 'react';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

const Page = () => {
	return (
		<BodySection>
			<HeadSection
				title='Products (7)'
				subtitle='Manage products for your store'
				isNewButtonVisible
				newButtonPath='/dashboard/products/create'
			/>
		</BodySection>
	);
};

export default Page;
