import React from 'react';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

const Page = () => {
	return (
		<BodySection>
			<HeadSection
				title='Create color'
				subtitle='Add a new color'
			/>
		</BodySection>
	);
};

export default Page;
