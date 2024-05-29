'use client';

import React from 'react';
import Link from 'next/link';
import { Open_Sans } from 'next/font/google';

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Minus, Plus, ShoppingBag, X } from 'lucide-react';

import { cn } from '@/lib/utils';

const openSans = Open_Sans({ subsets: ['latin'] });

// TEMPORARY
const lists = [
	{
		image:
			'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww',
		title: 'Lettering Single Knit Watch I0088',
		color: 'Black',
		size: 'XL',
		price: '44',
	},
	{
		image:
			'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww',
		title:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sequi quae vitae harum? Ipsam iste remmodi suscipit, atque ratione?',
		color: 'Black',
		size: 'XL',
		price: '44',
	},

	{
		image:
			'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww',
		title: 'Lettering Single Knit Watch I0088',
		color: 'Black',
		size: 'XL',
		price: '44',
	},
	{
		image:
			'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww',
		title: 'Lettering Single Knit Watch I0088',
		color: 'Black',
		size: 'XL',
		price: '44',
	},
	{
		image:
			'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww',
		title: 'Lettering Single Knit Watch I0088',
		color: 'Black',
		size: 'XL',
		price: '44',
	},
];

const SheetBody = ({
	children,
	className,
}: {
	children?: React.ReactNode;
	className?: string;
}) => {
	return <div className={cn('!mt-5', className)}>{children}</div>;
};

const AStraightLine = () => {
	return <div className='w-full h-px bg-gray-200' />;
};

const Cart = () => {
	const listTitle = (title: string): string => {
		return title.split('').length >= 50 ? `${title.slice(0, 50)} ...` : title;
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					size='sm'
					className='rounded-full px-5'
				>
					<ShoppingBag className='w-5 h-5 mr-1.5' />
					<span className='font-bold text-xs'>12</span>
				</Button>
			</SheetTrigger>
			<SheetContent
				side='right'
				className={cn(
					openSans.className,
					'w-full sm:w-[600px] sm:max-w-none flex flex-col space-y-1 p-[30px]'
				)}
			>
				<SheetHeader>
					<SheetTitle className='tracking-[.3rem] font-[600] uppercase'>
						CART
					</SheetTitle>
				</SheetHeader>

				<AStraightLine />

				<ScrollArea className='flex-1'>
					<SheetBody className='w-full'>
						<ul className='w-full flex flex-col space-y-5'>
							{lists.map((list, i) => (
								<React.Fragment key={i}>
									<li className='w-full pb-6 pe-5'>
										<div className='w-full flex flex-row justify-between'>
											<div className='flex flex-row space-x-4'>
												<img
													src='https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww'
													alt='img alt'
													className='object-cover w-[70px] h-[90px] select-none'
												/>

												<div className='py-1'>
													<div className='flex flex-col space-y-2'>
														<Link
															href='/'
															className='text-sm transition-all duration-200 hover:underline text-zinc-900 text-wrap'
														>
															{listTitle(list.title)}
														</Link>

														<div className='flex flex-col text-[13px] text-zinc-500'>
															<p>
																<span>Color:</span> <span>{list.color}</span>
															</p>

															<p>
																<span>Size:</span> <span>{list.size}</span>
															</p>
														</div>

														<div className='flex space-x-4 border border-gray-200 py-0.5 px-2 font-normal text-black w-fit select-none'>
															<button
																onClick={() => {}}
																type='button'
																className='outline-none border-none'
															>
																<Minus className='w-3 h-4' />
															</button>
															<span aria-hidden='true'>2</span>
															<button
																onClick={() => {}}
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
												>
													<X className='w-3 h-3' />
												</Button>

												<p>${list.price}.00</p>
											</div>
										</div>
									</li>

									<AStraightLine />
								</React.Fragment>
							))}
						</ul>
					</SheetBody>
				</ScrollArea>

				<SheetFooter>
					<div className='flex flex-col space-y-5 w-full'>
						<span
							aria-hidden='true'
							className='text-[13px] tracking-[.04rem]'
						>
							Tax included. Shipping calculated at checkout.
						</span>
						<Button
							type='button'
							className='py-[10px] px-[30px] rounded-none h-[49px] w-full uppercase text-white tracking-[.3rem] font-[600] flex flex-row items-center justify-center gap-x-4'
						>
							checkout
							<div
								aria-hidden='true'
								className='w-[14px] h-[2px] bg-white'
							/>
							<span className='tracking-widest'>$22 usd</span>
						</Button>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default Cart;
