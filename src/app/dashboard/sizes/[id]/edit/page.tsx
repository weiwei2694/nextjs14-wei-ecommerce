import React from 'react';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

const Page = async ({ params }: { params: { id: string } }) => {
	const { id } = params;

	return (
		<BodySection>
			<HeadSection
				title='Edit size'
				subtitle='Edit a new size'
			/>
		</BodySection>
	);
};

export default Page;
