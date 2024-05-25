import React from 'react';
import { redirect } from 'next/navigation';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

import { getTotalCategory, getCategories } from './_utils/actions';
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
		redirect('/dashboard/categories?page=1');
	}

	const totalCategory = await getTotalCategory();
	const categories = await getCategories({ page: Number(page) - 1 });

	return (
		<BodySection>
			<HeadSection
				title={`Categories(${totalCategory || 0})`}
				subtitle='Manage categories for your product'
				isNewButtonVisible
				newButtonPath='/dashboard/categories/create'
			/>

			<Table
				categories={categories}
				page={Number(page)}
			/>
		</BodySection>
	);
};

export default Page;
