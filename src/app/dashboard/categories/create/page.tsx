import React from 'react';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

import Form from './Form';

const Page = () => {
	return (
		<BodySection>
			<HeadSection
				title='Create category'
				subtitle='Add a new category'
			/>
			<Form />
		</BodySection>
	);
};

export default Page;
