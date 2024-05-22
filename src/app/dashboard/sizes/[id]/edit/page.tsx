import React from 'react';
import { notFound } from 'next/navigation';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

import { getSize } from '../../_utils/actions';
import Form from './Form';

const Page = async ({ params }: { params: { id: string } }) => {
	const { id } = params;

	const size = await getSize({ id });
	if (!size) {
		return notFound();
	}

	return (
		<BodySection>
			<HeadSection
				title='Edit size'
				subtitle='Edit a new size'
			/>

			<Form size={size} />
		</BodySection>
	);
};

export default Page;
