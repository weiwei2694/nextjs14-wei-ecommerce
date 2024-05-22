import React from 'react';
import { redirect } from 'next/navigation';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

import { getSizes, getTotalSize } from './_utils/actions';
import Table from './Table';

const Page = async ({
	searchParams,
}: {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}) => {
	const { page } = searchParams;
	if (!page || typeof page !== 'string') {
		redirect('/dashboard/sizes?page=1');
	}

	const totalSize = await getTotalSize();
	const sizes = await getSizes({ page: Number(page) - 1 });

	return (
		<BodySection>
			<HeadSection
				title={`Sizes (${totalSize || 0})`}
				subtitle='Manage sizes for you product'
				isNewButtonVisible
				newButtonPath='/dashboard/sizes/create'
			/>

			<Table
				sizes={sizes}
				page={Number(page)}
			/>
		</BodySection>
	);
};

export default Page;
