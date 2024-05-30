import React from 'react';
import Link from 'next/link';

import { Minus, Plus, X } from 'lucide-react';

import type { ProductStorage } from './CardProduct';

import { Button } from '@/components/ui/button';

import { formatPrice } from '@/lib/utils';

import useTriggerUseEffect from '@/hooks/useTriggerUseEffect';

const CartProduct = ({ product: cartItem }: { product: ProductStorage }) => {
	const [count, setCount] = React.useState<number>(cartItem.total);
	const { setTriggerUseEffect } = useTriggerUseEffect();

	const listTitle = (title: string): string => {
		return title.split('').length >= 50 ? `${title.slice(0, 50)} ...` : title;
	};

	const handleCount = (type: 'increment' | 'decrement') => {
		try {
			const cart = localStorage.getItem('cart');

			if (cart) {
				const parsedCart: ProductStorage[] = JSON.parse(cart);

				if (type === 'increment') {
					setCount((prev) => prev + 1);
					parsedCart.map((value) => {
						if (value.product.id === cartItem.product.id) {
							value.total += 1;
							value.amount += cartItem.product.price;
						}
						return value;
					});
				} else if (type === 'decrement') {
					if (count > 1) {
						setCount((prev) => prev - 1);
						parsedCart.map((value) => {
							if (value.product.id === cartItem.product.id) {
								value.total -= 1;
								value.amount -= cartItem.product.price;
							}
							return value;
						});
					}
				}

				localStorage.setItem('cart', JSON.stringify(parsedCart));
			}
		} finally {
			const randomNumberString = String(Math.floor(Math.random() * 10000));
			setTriggerUseEffect(randomNumberString);
		}
	};

	const handleDelete = () => {
		try {
			const cart = localStorage.getItem('cart');

			if (cart) {
				const parsedCart: ProductStorage[] = JSON.parse(cart);
				const newCart = parsedCart.filter(
					(value) => value.product.id !== cartItem.product.id
				);
				localStorage.setItem('cart', JSON.stringify(newCart));
			}
		} finally {
			const randomNumberString = String(Math.floor(Math.random() * 10000));
			setTriggerUseEffect(randomNumberString);
		}
	};

	return (
		<li className='w-full pb-6 pe-5'>
			<div className='w-full flex flex-row justify-between'>
				<div className='flex flex-row space-x-4'>
					<img
						src={cartItem.product.images[0].url}
						alt='img alt'
						className='object-cover w-[70px] h-[90px] select-none'
					/>

					<div className='py-1'>
						<div className='flex flex-col space-y-2'>
							<Link
								href='/'
								className='text-sm transition-all duration-200 hover:underline text-zinc-900 text-wrap'
							>
								{listTitle(cartItem.product.title)}
							</Link>

							<div className='flex flex-col text-[13px] text-zinc-500'>
								<div className='flex gap-1'>
									<span>Color:</span>{' '}
									<div className='flex items-center gap-2'>
										<span className='capitalize'>
											{cartItem.product.color.name}
										</span>

										<div className='w-px h-3 bg-gray-200' />

										<div
											className='w-4 h-4 border border-gray-200 rounded-full'
											style={{
												backgroundColor: cartItem.product.color.color,
											}}
										/>
									</div>
								</div>

								<div className='flex gap-1'>
									<span>Size:</span> <span>{cartItem.product.size.value}</span>
								</div>
							</div>

							<div className='flex space-x-4 border border-gray-200 py-0.5 px-2 font-normal text-black w-fit select-none'>
								<button
									onClick={() => handleCount('decrement')}
									type='button'
									className='outline-none border-none'
								>
									<Minus className='w-3 h-4' />
								</button>
								<span aria-hidden='true'>{cartItem.total}</span>
								<button
									onClick={() => handleCount('increment')}
									type='button'
									className='outline-none border-none'
								>
									<Plus className='w-3 h-4' />
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className='flex flex-col justify-between items-end'>
					<Button
						size='icon'
						variant='ghost'
						className='-mt-1 h-6 w-6 rounded-full bg-none hover:bg-zinc-900 hover:text-white transition-colors duration-200'
						onClick={handleDelete}
					>
						<X className='w-3 h-3' />
					</Button>

					<p>{formatPrice(cartItem.product.price)}</p>
				</div>
			</div>
		</li>
	);
};

export default CartProduct;
