import React from 'react';
import { redirect } from 'next/navigation';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

import { getTotalCategory } from './_utils/actions';

const Page = async ({
	searchParams,
}: {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}) => {
	const { page } = searchParams;
	if (!page || typeof page !== 'string') {
		redirect('/dashboard/categories?page=1');
	}

	const totalCategory = await getTotalCategory();

	return (
		<BodySection>
			<HeadSection
				title={`Categories(${totalCategory})`}
				subtitle='Manage categories for your product'
				isNewButtonVisible
				newButtonPath='/dashboard/categories/create'
			/>
		</BodySection>
	);
};

export default Page;
