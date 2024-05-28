import React from 'react';
import { notFound } from 'next/navigation';

import { db } from '@/db';

import Billboard from '@/components/home/Billboard';
import CardProduct from '@/components/home/CardProduct';
import { Button } from '@/components/ui/button';

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

	const colors = await db.color.findMany();
	const sizes = await db.size.findMany();

	return (
		<div className='max-w-7xl mx-auto px-6 2xl:px-0'>
			<Billboard
				title={category.title}
				img={category.billboard}
			/>
			<div className='grid grid-cols-5 gap-8 mb-8'>
				<div className='col-span-1 flex flex-col gap-8'>
					<div className='flex flex-col gap-2'>
						<h2 className='font-semibold'>Colors</h2>
						<hr />
						<div className='flex flex-wrap gap-2'>
							{colors.map((color, colorIndex) => (
								<Button
									variant='outline'
									key={colorIndex}
									className='capitalize'
								>
									{color.name}
								</Button>
							))}
						</div>
					</div>
					<div className='flex flex-col gap-2'>
						<h2 className='font-semibold'>Sizes</h2>
						<hr />
						<div className='flex flex-wrap gap-2'>
							{sizes.map((size, sizeIndex) => (
								<Button
									variant='outline'
									key={sizeIndex}
									className='capitalize'
								>
									{size.name}
								</Button>
							))}
						</div>
					</div>
				</div>

				<div className='col-span-4 flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
					{category.products.map((product, productIndex) => (
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
