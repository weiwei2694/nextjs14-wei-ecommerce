import React from 'react';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

const Page = () => {
	return (
		<BodySection>
			<HeadSection
				title='Create category'
				subtitle='Add a new category'
			/>
		</BodySection>
	);
};

export default Page;
