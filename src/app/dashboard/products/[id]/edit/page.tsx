import React from 'react';
import { notFound } from 'next/navigation';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

import {
	getCategories,
	getColors,
	getProduct,
	getSizes,
} from '../../_utils/actions';
import Form from './Form';

import type { Category, Color, Size } from '@prisma/client';

const Page = async ({ params }: { params: { id: string } }) => {
	const { id } = params;

	const product = await getProduct({ id });
	if (!product) {
		return notFound();
	}

	const categories = await getCategories();
	const sizes = await getSizes();
	const colors = await getColors();

	return (
		<BodySection>
			<HeadSection
				title='Edit product'
				subtitle='Edit and update your product'
			/>

			<Form
				product={product}
				categories={categories as Category[]}
				sizes={sizes as Size[]}
				colors={colors as Color[]}
			/>
		</BodySection>
	);
};

export default Page;
