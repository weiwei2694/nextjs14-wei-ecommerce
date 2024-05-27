import React from 'react';
import { notFound } from 'next/navigation';

import { db } from '@/db';

import Billboard from '@/components/home/Billboard';

const Page = async ({ params }: { params: { categoryId: string } }) => {
	const { categoryId } = params;

	const category = await db.category.findUnique({
		where: { id: categoryId },
	});
	if (!category) {
		return notFound();
	}

	return (
		<div className='max-w-7xl mx-auto px-6 2xl:px-0'>
			<Billboard
				title={category.title}
				img={category.billboard}
			/>
		</div>
	);
};

export default Page;
