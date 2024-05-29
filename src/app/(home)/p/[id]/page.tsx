import React from 'react';
import { notFound } from 'next/navigation';

import { db } from '@/db';

import type {
	Color,
	Image,
	Product as ProductPrisma,
	Size,
} from '@prisma/client';
import Product from './Product';

export type TSingleProduct = {
	images: Image[];
	category: {
		name: string;
	};
	color: Color;
	size: Size;
} & ProductPrisma;

const Page = async ({ params }: { params: { id: string } }) => {
	const { id } = params;

	const product: TSingleProduct | null = await db.product.findUnique({
		where: { id, images: { some: {} }, isArchived: false },
		include: {
			category: {
				select: {
					name: true,
				},
			},
			images: true,
			color: true,
			size: true,
		},
	});
	if (!product) {
		return notFound();
	}

	return (
		<div className='my-8 max-w-7xl mx-auto px-6 2xl:px-0'>
			<Product product={product} />
		</div>
	);
};

export default Page;
