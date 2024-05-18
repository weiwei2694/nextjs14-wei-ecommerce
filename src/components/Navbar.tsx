'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';

import { ArrowRightIcon, Menu } from 'lucide-react';

import Cart from './Cart';

import { cn } from '@/lib/utils';

import { LogoutLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import type { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';

import { buttonVariants } from './ui/button';
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTrigger,
} from '@/components/ui/sheet';

const inter = Inter({
	subsets: ['latin'],
});

// TEMPORARY
const lists = [
	{
		name: 'Suits',
		href: '/suits',
	},
	{
		name: 'Shirts',
		href: '/shirts',
	},
	{
		name: 'Glasses',
		href: '/',
	},
];

const Navbar = ({ user }: { user: KindeUser | null }) => {
	const pathname = usePathname();

	return (
		<nav className='sticky z-[100] top-0 bg-white/50 backdrop-blur border-b border-gray-200'>
			<div className='max-w-7xl mx-auto'>
				<div
					className={cn(
						inter.className,
						'flex items-center justify-between h-16 px-6 2xl:px-0'
					)}
				>
					<div className='flex items-center space-x-8'>
						<Link
							href='/'
							className='relative w-fit text-balance font-bold text-zinc-900 text-xl uppercase'
						>
							STORE
						</Link>

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
						<Cart />

						<div className='h-10 w-px bg-zinc-200 hidden lg:block' />

						<div
							aria-hidden='true'
							className='hidden lg:block'
						>
							{!user ? (
								<LoginLink
									className={buttonVariants({
										size: 'sm',
										variant: 'ghost',
									})}
									postLoginRedirectURL='/'
								>
									Sign In <ArrowRightIcon className='ml-1.5 h-5 w-5' />
								</LoginLink>
							) : (
								<LogoutLink
									className={buttonVariants({
										size: 'sm',
										variant: 'ghost',
									})}
								>
									Log Out
									<ArrowRightIcon className='ml-1.5 h-5 w-5' />
								</LogoutLink>
							)}
						</div>

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
									className={cn(inter.className, 'flex flex-col space-y-4')}
								>
									<SheetHeader>
										<ul className='flex flex-col items-start space-y-4'>
											{lists.map((list) => (
												<li key={list.name}>
													<Link
														href={list.href}
														className={cn(
															'text-zinc-900 tracking-tight text-sm ',
															pathname === list.href
																? 'font-semibold'
																: 'font-normal'
														)}
													>
														{list.name}
													</Link>
												</li>
											))}
										</ul>
									</SheetHeader>
									<SheetFooter className='!mt-0 !pt-0'>
										<LogoutLink
											className={buttonVariants({
												size: 'default',
												variant: 'default',
												className:
													'bg-zinc-900 hover:bg-zinc-900/90 transition-all duration-200 w-full',
											})}
										>
											Log Out
											<ArrowRightIcon className='ml-1.5 h-5 w-5' />
										</LogoutLink>
									</SheetFooter>
								</SheetContent>
							</Sheet>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
