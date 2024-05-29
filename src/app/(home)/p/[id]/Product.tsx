'use client';

import React from 'react';
import Image from 'next/image';

import type { TSingleProduct } from './page';

import { ShoppingCart } from 'lucide-react';

import { formatPrice } from '@/lib/utils';

const Product = ({ product }: { product: TSingleProduct }) => {
	const [activeImage, setActiveImage] = React.useState(product.images[0]);

	return (
		<div className='flex flex-col xl:flex-row gap-5'>
			{/* Image */}
			<div className='flex flex-col-reverse sm:flex-row-reverse justify-end gap-3'>
				{/* Active Image */}
				<Image
					src={activeImage?.url}
					alt={product?.title}
					width={800}
					height={800}
					className='w-full sm:w-[500px] h-[450px] sm:h-[500px] object-cover rounded-xl'
					priority
				/>
				{/* Layout Image - Mobile */}
				<div className='flex flex-row sm:flex-col gap-3 overflow-x-auto'>
					{product.images.map((image, imageIndex) => (
						<div
							key={imageIndex}
							onClick={() => setActiveImage(image)}
						>
							<Image
								src={image?.url}
								alt={product?.title}
								width={100}
								height={100}
								className={`object-cover w-[100px] h-[100px] rounded-xl cursor-pointer ${
									image === activeImage ? 'border-2 border-black p-1' : null
								}`}
								priority
							/>
						</div>
					))}
				</div>
			</div>

			<div className='flex-1 flex flex-col gap-8 md:gap-0 my-3'>
				<div className='flex flex-col'>
					<div className='flex justify-start flex-col gap-5'>
						<div className='flex flex-col gap-2'>
							<h1 className='text-3xl text-zinc-900 font-bold'>
								{product.title}
							</h1>

							<h2 className='font-bold text-2xl text-zinc-900'>
								{formatPrice(product.price)}
							</h2>
						</div>

						<hr />

						<div className='flex flex-col gap-5'>
							<div className='flex flex-col gap-2'>
								<div className='flex items-center gap-2'>
									<h4 className='text-sm text-zinc-900 font-extrabold tracking-wide'>
										Size:
									</h4>

									<p className='uppercase'>{product.size.value}</p>
								</div>

								<div className='flex items-center gap-2'>
									<h4 className='text-sm text-zinc-900 font-extrabold tracking-wide'>
										Color:
									</h4>

									<div
										style={{ backgroundColor: product.color.color }}
										className='w-[20px] h-[20px] rounded-full border border-black'
									/>
								</div>
							</div>

							<div className='flex-0 md:flex-1 flex items-end'>
								<button
									onClick={() => {}}
									type='button'
									className='flex items-center gap-2 py-3 px-5 rounded-full font-medium bg-black text-white hover:bg-gray-800 disabled:bg-gray-700 disabled:cursor-not-allowed focus:outline-none'
								>
									Add To Cart
									<span className='text-2xl'>
										<ShoppingCart className='w-4 h-4' />
									</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Product;
