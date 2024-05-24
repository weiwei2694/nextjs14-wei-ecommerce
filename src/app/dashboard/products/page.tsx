import React from 'react';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';
import { getTotalProduct } from './_utils/actions';

const Page = async () => {
	const totalProduct = await getTotalProduct();

	return (
		<BodySection>
			<HeadSection
				title={`Products (${totalProduct})`}
				subtitle='Manage products for your store'
				isNewButtonVisible
				newButtonPath='/dashboard/products/create'
			/>
		</BodySection>
	);
};

export default Page;
