import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { db } from '@/db';

import { buildRedirectUrl } from '@/lib/utils';

import Billboard from '@/components/home/Billboard';
import CardProduct from '@/components/home/CardProduct';
import { buttonVariants } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

import { SlidersHorizontal } from 'lucide-react';

const Page = async ({
	params,
	searchParams,
}: {
	params: { categoryId: string };
	searchParams: {
		[key: string]: string | undefined;
	};
}) => {
	const { categoryId } = params;
	const { color: colorFilter, size: sizeFilter } = searchParams;

	const category = await db.category.findUnique({
		where: {
			id: categoryId,
		},
		include: {
			products: {
				where: {
					isArchived: false,
					images: { some: {} },
					color: {
						name: colorFilter?.toLowerCase(),
					},
					size: {
						value: sizeFilter?.toUpperCase(),
					},
				},
				include: {
					images: true,
					category: {
						select: {
							name: true,
						},
					},
					size: true,
					color: true,
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
			<div className='grid grid-cols-5 gap-5 xl:gap-8 mb-8'>
				{/* filter large desktop */}
				<div className='col-span-1 hidden xl:flex flex-col gap-8'>
					<div className='flex flex-col gap-2'>
						<h2 className='font-semibold'>Colors</h2>
						<hr />
						<div className='flex flex-wrap gap-2'>
							<Link
								href={buildRedirectUrl(categoryId, undefined, sizeFilter)}
								className={buttonVariants({
									variant: colorFilter === undefined ? 'default' : 'outline',
								})}
							>
								All
							</Link>
							{colors.map((color, colorIndex) => (
								<Link
									href={buildRedirectUrl(categoryId, color.name, sizeFilter)}
									key={colorIndex}
									className={buttonVariants({
										variant:
											colorFilter?.toLowerCase() === color.name
												? 'default'
												: 'outline',
										className: 'capitalize',
									})}
								>
									{color.name}
								</Link>
							))}
						</div>
					</div>
					<div className='flex flex-col gap-2'>
						<h2 className='font-semibold'>Sizes</h2>
						<hr />
						<div className='flex flex-wrap gap-2'>
							<Link
								href={buildRedirectUrl(categoryId, colorFilter, undefined)}
								className={buttonVariants({
									variant: sizeFilter === undefined ? 'default' : 'outline',
									className: 'capitalize',
								})}
							>
								All
							</Link>
							{sizes.map((size, sizeIndex) => (
								<Link
									href={buildRedirectUrl(categoryId, colorFilter, size.value)}
									key={sizeIndex}
									className={buttonVariants({
										variant:
											sizeFilter?.toUpperCase() === size.value
												? 'default'
												: 'outline',
										className: 'capitalize',
									})}
								>
									{size.name}
								</Link>
							))}
						</div>
					</div>
				</div>

				{/* filter mobile - desktop */}
				<div className='col-span-full block xl:hidden'>
					<Sheet>
						<SheetTrigger
							className={buttonVariants({
								variant: 'secondary',
								size: 'sm',
							})}
						>
							<SlidersHorizontal className='w-4 h-4' />
						</SheetTrigger>
						<SheetContent side='left'>
							<SheetHeader className='mb-8 text-start'>
								<SheetTitle>Filter</SheetTitle>
								<SheetDescription>
									Use filters to refine the results according to your
									preferences.
								</SheetDescription>
							</SheetHeader>
							<div className='flex flex-col gap-8'>
								<div className='flex flex-col gap-2'>
									<h2 className='font-semibold'>Colors</h2>
									<hr />
									<div className='flex flex-wrap gap-2'>
										<Link
											href={buildRedirectUrl(categoryId, undefined, sizeFilter)}
											className={buttonVariants({
												variant:
													colorFilter === undefined ? 'default' : 'outline',
											})}
										>
											All
										</Link>
										{colors.map((color, colorIndex) => (
											<Link
												href={buildRedirectUrl(
													categoryId,
													color.name,
													sizeFilter
												)}
												key={colorIndex}
												className={buttonVariants({
													variant:
														colorFilter?.toLowerCase() === color.name
															? 'default'
															: 'outline',
													className: 'capitalize',
												})}
											>
												{color.name}
											</Link>
										))}
									</div>
								</div>
								<div className='flex flex-col gap-2'>
									<h2 className='font-semibold'>Sizes</h2>
									<hr />
									<div className='flex flex-wrap gap-2'>
										<Link
											href={buildRedirectUrl(
												categoryId,
												colorFilter,
												undefined
											)}
											className={buttonVariants({
												variant:
													sizeFilter === undefined ? 'default' : 'outline',
												className: 'capitalize',
											})}
										>
											All
										</Link>
										{sizes.map((size, sizeIndex) => (
											<Link
												href={buildRedirectUrl(
													categoryId,
													colorFilter,
													size.value
												)}
												key={sizeIndex}
												className={buttonVariants({
													variant:
														sizeFilter?.toUpperCase() === size.value
															? 'default'
															: 'outline',
													className: 'capitalize',
												})}
											>
												{size.name}
											</Link>
										))}
									</div>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>

				<div className='col-span-full xl:col-span-4 flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
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
