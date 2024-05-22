import React from 'react';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

const Page = () => {
	return (
		<BodySection>
			<HeadSection
				title='Create size'
				subtitle='Add a new size'
			/>
		</BodySection>
	);
};

export default Page;
