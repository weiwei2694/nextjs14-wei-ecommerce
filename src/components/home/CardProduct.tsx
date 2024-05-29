'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Recursive } from 'next/font/google';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { cn, formatPrice } from '@/lib/utils';

import type { ProductFeatured } from '@/app/(home)/page';

const recursive = Recursive({ subsets: ['latin'] });

const CardProduct = ({ product }: { product: ProductFeatured }) => {
	return (
		<Card className='group'>
			<CardHeader>
				<div className='relative'>
					<Image
						src={product.images[0].url}
						alt='product img'
						width={300}
						height={260}
						className='w-full h-[260px] object-cover rounded-lg'
						priority
					/>

					<div className='absolute hidden inset-0 group-hover:lg:flex items-end justify-center pb-5 px-5'>
						<Button
							className={cn(
								recursive.className,
								'tracking-[.1rem] rounded-none w-full'
							)}
						>
							ADD TO CART
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<Link
					href={`/p/${product.id}`}
					className='hover:underline'
				>
					<CardTitle className='text-xl'>{product.title}</CardTitle>
				</Link>
				<CardDescription className='capitalize'>
					{product.category.name}
				</CardDescription>
			</CardContent>
			<CardFooter>
				<CardTitle className='text-lg'>{formatPrice(product.price)}</CardTitle>
			</CardFooter>
		</Card>
	);
};

export default CardProduct;
