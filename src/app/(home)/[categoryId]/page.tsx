import React from 'react';
import { notFound } from 'next/navigation';

import { db } from '@/db';

import Billboard from '@/components/home/Billboard';
import CardProduct from '@/components/home/CardProduct';

const Page = async ({ params }: { params: { categoryId: string } }) => {
	const { categoryId } = params;

	const category = await db.category.findUnique({
		where: { id: categoryId },
		include: {
			products: {
				where: {
					isArchived: false,
					images: { some: {} },
				},
				include: {
					images: true,
					category: {
						select: {
							name: true,
						},
					},
				},
			},
		},
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
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
				{category.products.map((product, productIndex) => (
					<CardProduct
						key={productIndex}
						product={product}
					/>
				))}
			</div>
		</div>
	);
};

export default Page;
