import React from 'react';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';
import Form from './Form';

const Page = () => {
	return (
		<BodySection>
			<HeadSection
				title='Create size'
				subtitle='Add a new size'
			/>

			<Form />
		</BodySection>
	);
};

export default Page;
