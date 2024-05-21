import React from 'react';
import { redirect } from 'next/navigation';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

import Table from './Table';
import { getTotalColor, getColors } from './_utils/actions';

const Page = async ({
	searchParams,
}: {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}) => {
	const { page } = searchParams;
	if (!page || typeof page !== 'string') {
		redirect('/dashboard/colors?page=1');
	}

	const totalColor = await getTotalColor();
	const colors = await getColors({ page: Number(page) - 1 });

	return (
		<BodySection>
			<HeadSection
				title={`Colors(${totalColor || 0})`}
				subtitle='Manage colors for your product'
				isNewButtonVisible
				newButtonPath='/dashboard/colors/create'
			/>

			<Table
				colors={colors}
				page={Number(page)}
			/>
		</BodySection>
	);
};

export default Page;
