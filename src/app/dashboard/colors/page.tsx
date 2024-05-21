import React from 'react';

import BodySection from '@/components/dashboard/BodySection';
import HeadSection from '@/components/dashboard/HeadSection';

import Table from './Table';
import { getTotalColor, getColors } from './actions';

const Page = async () => {
	const totalColor = await getTotalColor();
	const colors = await getColors();

	return (
		<BodySection>
			<HeadSection
				title={`Colors(${totalColor || 0})`}
				subtitle='Manage colors for your product'
				isNewButtonVisible
				newButtonPath='/dashboard/colors/create'
			/>

			<Table colors={colors} />
		</BodySection>
	);
};

export default Page;
