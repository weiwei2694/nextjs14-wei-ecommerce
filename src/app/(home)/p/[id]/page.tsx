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

import CardProduct from '@/components/home/CardProduct';
import HeadingTitle from '@/components/home/HeadingTitle';
import { getProduct } from './actions';

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

	const product: TSingleProduct | null = await getProduct(id);
	if (!product) {
		return notFound();
	}

	const relatedProducts = await db.product.findMany({
		where: {
			id: { not: id },
			isArchived: false,
			category: {
				name: product.category.name,
			},
			images: {
				some: {},
			},
		},
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
		take: 4,
	});

	return (
		<div className='my-8 max-w-7xl mx-auto px-6 2xl:px-0'>
			<div className='flex flex-col gap-16'>
				<Product product={product} />

				<hr />

				<div className='flex flex-col gap-5'>
					<HeadingTitle title='related items' />

					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
						{relatedProducts.map((product, productIndex) => (
							<CardProduct
								key={productIndex}
								product={product}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
