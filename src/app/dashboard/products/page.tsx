import React from 'react';
import { redirect } from 'next/navigation';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

import { getProducts, getTotalProduct } from './_utils/actions';
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
		redirect('/dashboard/products?page=1');
	}

	const totalProduct = await getTotalProduct();
	const products = await getProducts({ page: Number(page) - 1 });

	return (
		<BodySection>
			<HeadSection
				title={`Products (${totalProduct || 0})`}
				subtitle='Manage products for your store'
				isNewButtonVisible
				newButtonPath='/dashboard/products/create'
			/>

			<Table
				products={products}
				page={Number(page)}
			/>
		</BodySection>
	);
};

export default Page;
