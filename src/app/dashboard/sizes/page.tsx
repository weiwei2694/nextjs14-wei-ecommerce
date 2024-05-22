import React from 'react';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

import { getTotalSize } from './_lib/actions';

const Page = async () => {
	const totalSize = await getTotalSize();

	return (
		<BodySection>
			<HeadSection
				title={`Sizes (${totalSize || 0})`}
				subtitle='Manage sizes for you product'
				isNewButtonVisible
				newButtonPath='/dashboard/sizes/create'
			/>
		</BodySection>
	);
};

export default Page;
