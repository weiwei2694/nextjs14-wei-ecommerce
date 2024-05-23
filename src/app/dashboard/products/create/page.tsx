import React from 'react';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

import Form from './Form';
import { getCategories, getColors, getSizes } from '../_utils/actions';

import type { Category, Color, Size } from '@prisma/client';

const Page = async () => {
	const categories = await getCategories();
	const colors = await getColors();
	const sizes = await getSizes();

	return (
		<BodySection>
			<HeadSection
				title='Create product'
				subtitle='Add a new product'
			/>

			<Form
				categories={categories as Category[]}
				colors={colors as Color[]}
				sizes={sizes as Size[]}
			/>
		</BodySection>
	);
};

export default Page;
