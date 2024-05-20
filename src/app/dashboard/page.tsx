import React from 'react';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

const Page = () => {
	return (
		<BodySection>
			<HeadSection
				title='Dashboard'
				subtitle='Overview of you store'
			/>
		</BodySection>
	);
};

export default Page;
