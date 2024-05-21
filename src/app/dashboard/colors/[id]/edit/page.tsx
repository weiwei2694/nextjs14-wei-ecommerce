import React from 'react';
import { notFound } from 'next/navigation';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

import { getColor } from '../../_utils/actions';
import Form from './Form';

const Page = async ({ params }: { params: { id: string } }) => {
	const { id } = params;

	const color = await getColor({ id });
	if (!color) {
		return notFound();
	}

	return (
		<BodySection>
			<HeadSection
				title='Edit color'
				subtitle='Edit a new color'
			/>

			<Form color={color} />
		</BodySection>
	);
};

export default Page;
