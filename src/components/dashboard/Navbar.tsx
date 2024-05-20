'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import { ArrowRightIcon, Menu } from 'lucide-react';

import NavbarParent from '@/components/NavbarParent';
import Logo from '@/components/Logo';
import Barrier from '@/components/Barrier';
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTrigger,
} from '@/components/ui/sheet';
import { buttonVariants } from '@/components/ui/button';

const lists = [
	{
		name: 'Overview',
		href: '/dashboard',
	},
	{
		name: 'Orders',
		href: '/dashboard/orders',
	},
	{
		name: 'Products',
		href: '/dashboard/products',
	},
	{
		name: 'Colors',
		href: '/dashboard/colors',
	},
	{
		name: 'Sizes',
		href: '/dashboard/sizes',
	},
	{
		name: 'Categories',
		href: '/dashboard/categories',
	},
];

const NavListMobile = ({ pathname }: { pathname: string }) => {
	return (
		<div
			aria-hidden='true'
			className='lg:hidden'
		>
			<Sheet>
				<SheetTrigger
					className={buttonVariants({
						size: 'sm',
						variant: 'ghost',
					})}
				>
					<Menu className='w-5 h-5' />
				</SheetTrigger>
				<SheetContent
					side='top'
					className='flex flex-col space-y-4'
				>
					<SheetHeader>
						<ul className='flex flex-col items-start space-y-4'>
							{lists.map((list) => (
								<li key={list.name}>
									<Link
										href={list.href}
										className={cn(
											'text-zinc-900 tracking-tight text-sm ',
											pathname === list.href ? 'font-semibold' : 'font-normal'
										)}
									>
										{list.name}
									</Link>
								</li>
							))}
						</ul>
					</SheetHeader>
					<SheetFooter className='!mt-0 !pt-0'>
						<Link
							className={buttonVariants({
								size: 'default',
								variant: 'default',
								className:
									'bg-zinc-900 hover:bg-zinc-900/90 transition-all duration-200 w-full',
							})}
							href='/'
						>
							Home
							<ArrowRightIcon className='ml-1.5 h-5 w-5' />
						</Link>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
	);
};

const Navbar = () => {
	const pathname = usePathname();

	return (
		<NavbarParent>
			<div className='flex items-center space-x-8'>
				<Logo />

				<ul className='hidden lg:flex items-center space-x-8'>
					{lists.map((list) => (
						<li key={list.name}>
							<Link
								href={list.href}
								className={cn(
									'text-zinc-900 tracking-tight text-sm',
									pathname === list.href ? 'font-semibold' : 'font-normal'
								)}
							>
								{list.name}
							</Link>
						</li>
					))}
				</ul>
			</div>

			<div className='flex items-center space-x-4'>
				<Link
					href='/dashboard/settings'
					className={buttonVariants({
						size: 'sm',
						className:
							'rounded-full bg-zinc-900 hover:bg-zinc-900/90 transition-all duration-200 px-5',
					})}
				>
					Settings
				</Link>

				<Barrier />

				<Link
					href='/dashboard/settings'
					className={buttonVariants({
						size: 'sm',
						variant: 'ghost',
						className: 'hidden lg:inline-flex',
					})}
				>
					Home <ArrowRightIcon className='ml-1.5 h-5 w-5' />
				</Link>

				<NavListMobile pathname={pathname} />
			</div>
		</NavbarParent>
	);
};

export default Navbar;
