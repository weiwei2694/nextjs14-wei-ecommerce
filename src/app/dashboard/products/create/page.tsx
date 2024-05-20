import React from 'react';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

const Page = () => {
	return (
		<BodySection>
			<HeadSection
				title='Create product'
				subtitle='Add a new product'
			/>
		</BodySection>
	);
};

export default Page;
