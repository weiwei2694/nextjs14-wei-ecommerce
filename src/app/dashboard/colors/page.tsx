import React from 'react';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

const Page = () => {
	return (
		<BodySection>
			<HeadSection
				title='Colors(3)'
				subtitle='Manage colors for your product'
				isNewButtonVisible
				newButtonPath='/dashboard/colors/create'
			/>
		</BodySection>
	);
};

export default Page;
