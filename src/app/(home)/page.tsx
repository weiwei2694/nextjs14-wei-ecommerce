import React from 'react';

import { db } from '@/db';

import CardProduct from '@/components/home/CardProduct';
import HeadingTitle from '@/components/home/HeadingTitle';
import Billboard from '@/components/home/Billboard';

import type { Color, Image, Product, Size } from '@prisma/client';

export type ProductFeatured = {
	images: Image[];
	category: {
		name: string;
	};
	color: Color;
	size: Size;
} & Product;

const Page = async () => {
	const products: ProductFeatured[] = await db.product.findMany({
		where: {
			isArchived: false,
			isFeatured: true,
			images: {
				some: {},
			},
		},
		include: {
			images: true,
			category: {
				select: {
					name: true,
				},
			},
			color: true,
			size: true,
		},
	});

	return (
		<div className='max-w-7xl mx-auto px-6 2xl:px-0'>
			<Billboard
				title='Explore the Featured Collection!'
				img='/featured-2.jpg'
			/>

			<div className='flex flex-col gap-5 mt-16 mb-8'>
				<HeadingTitle title='featured products' />

				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
					{products.map((product, productIndex) => (
						<CardProduct
							key={productIndex}
							product={product}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Page;
