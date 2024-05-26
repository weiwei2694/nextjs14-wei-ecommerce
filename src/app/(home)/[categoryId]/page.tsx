import React from 'react';
import { notFound } from 'next/navigation';

import { db } from '@/db';

const Page = async ({ params }: { params: { categoryId: string } }) => {
	const { categoryId } = params;

	const category = await db.category.findUnique({
		where: { id: categoryId },
	});
	if (!category) {
		return notFound();
	}

	return <div>Page</div>;
};

export default Page;
