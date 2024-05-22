import React from 'react';
import { redirect } from 'next/navigation';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

const Page = ({
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

	return (
		<BodySection>
			<HeadSection
				title={`Categories(0)`}
				subtitle='Manage categories for your product'
				isNewButtonVisible
				newButtonPath='/dashboard/categories/create'
			/>
		</BodySection>
	);
};

export default Page;
