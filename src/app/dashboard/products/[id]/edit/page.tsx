import React from 'react';
import { notFound } from 'next/navigation';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';
import { getProduct } from '../../_utils/actions';

const Page = async ({ params }: { params: { id: string } }) => {
	const { id } = params;

	const product = await getProduct({ id });
	if (!product) {
		return notFound();
	}

	return (
		<BodySection>
			<HeadSection
				title='Edit product'
				subtitle='Edit and update your product'
			/>
		</BodySection>
	);
};

export default Page;
