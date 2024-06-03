'use client';

import React from 'react';
import { Open_Sans } from 'next/font/google';
import { useRouter } from 'next/navigation';

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

import { ShoppingBag } from 'lucide-react';

import { cn, formatPrice } from '@/lib/utils';

import type { ProductStorage } from './CardProduct';
import CartProduct from './CartProduct';

import useTriggerUseEffect from '@/hooks/useTriggerUseEffect';

import { getProductIsArchived } from '@/app/(home)/p/[id]/actions';

import { toast } from 'sonner';

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { createCheckoutSession } from '@/app/(home)/actions';

const openSans = Open_Sans({ subsets: ['latin'] });

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
	const router = useRouter();
	const { user } = useKindeBrowserClient();

	const { triggerUseEffect } = useTriggerUseEffect();
	const [cart, setCart] = React.useState<ProductStorage[]>([]);
	const [isPending, startTransition] = React.useTransition();

	React.useEffect(() => {
		setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
	}, [triggerUseEffect]);

	const totalPrice: number =
		cart?.reduce((total, curr) => total + curr.amount, 0) || 0;

	const handleCheckout = async () => {
		try {
			if (!user) {
				router.push('/api/auth/login?post_login_redirect_url=/');
				return;
			}

			for (const cartItem of cart) {
				const product = await getProductIsArchived(cartItem.product.id);

				if (product?.isArchived) {
					const updatedCart = cart.filter(
						(item) => item.product.id !== product.id
					);
					setCart(updatedCart);
					localStorage.setItem('cart', JSON.stringify(updatedCart));

					toast.info(
						`Product "${product.title}" is not available at this time`
					);
				}
			}

			const res = await createCheckoutSession(cart);
			if (res?.url) {
				router.push(res.url);
			}
		} catch (err) {
			console.error(`[ERROR_HANDLE_CHECKOUT]: ${err}`);
		}
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					size='sm'
					className='rounded-full px-5'
				>
					<ShoppingBag className='w-5 h-5 mr-1.5' />
					<span className='font-bold text-xs'>{cart?.length || 0}</span>
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
							{cart?.map((product, productIndex) => (
								<React.Fragment key={productIndex}>
									<CartProduct product={product} />

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
							disabled={isPending}
							isLoading={isPending}
							loadingText='Processing'
							onClick={() => {
								if (!cart.length) {
									toast.error('Cart is empty.');
									return;
								}

								startTransition(() => {
									handleCheckout();
								});
							}}
						>
							checkout
							<div
								aria-hidden='true'
								className='w-[14px] h-[2px] bg-white'
							/>
							<span className='tracking-widest'>
								{formatPrice(totalPrice)} usd
							</span>
						</Button>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default Cart;
