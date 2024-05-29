import React from 'react';
import { notFound } from 'next/navigation';

import { db } from '@/db';

const Page = async ({ params }: { params: { id: string } }) => {
	const { id } = params;

	const product = await db.product.findUnique({
		where: { id, images: { some: {} } },
		include: {
			category: {
				select: {
					name: true,
				},
			},
			images: true,
		},
	});
	if (!product) {
		return notFound();
	}

	return <div>Page</div>;
};

export default Page;
