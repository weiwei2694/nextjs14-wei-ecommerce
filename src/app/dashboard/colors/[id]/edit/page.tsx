import React from 'react';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

const Page = ({ params }: { params: { id: string } }) => {
	const { id } = params;

	return (
		<BodySection>
			<HeadSection
				title='Edit color'
				subtitle='Edit a new color'
			/>
		</BodySection>
	);
};

export default Page;
