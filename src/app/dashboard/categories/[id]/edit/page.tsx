import React from 'react';
import { notFound } from 'next/navigation';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

import Form from './Form';
import { getCategory } from '../../_utils/actions';

const Page = async ({ params }: { params: { id: string } }) => {
	const { id } = params;

	const category = await getCategory({ id });
	if (!category) {
		return notFound();
	}

	return (
		<BodySection>
			<HeadSection
				title='Edit category'
				subtitle='Edit a new category'
			/>

			<Form category={category} />
		</BodySection>
	);
};

export default Page;
