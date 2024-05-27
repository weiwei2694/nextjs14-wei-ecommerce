'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Urbanist } from 'next/font/google';

import { ArrowRight, ArrowRightIcon, Menu } from 'lucide-react';

import { cn } from '@/lib/utils';

import { LogoutLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import type { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';

import { buttonVariants } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTrigger,
} from '@/components/ui/sheet';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Logo from '@/components/Logo';
import NavbarParent from '@/components/NavbarParent';
import Cart from '@/components/home/Cart';

import Barrier from '../Barrier';

import { Category } from '@prisma/client';

const urbanist = Urbanist({ subsets: ['latin'] });

const NavListMobile = ({
	pathname,
	user,
	lists,
}: {
	pathname: string;
	user: KindeUser | null;
	lists: Category[];
}) => {
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
					className={cn(urbanist.className, 'flex flex-col space-y-4')}
				>
					<SheetHeader>
						<ul className='flex flex-col items-start space-y-4'>
							{lists.map((list) => (
								<li key={list.id}>
									<Link
										href={`/${list.id}`}
										className={cn(
											'text-zinc-900 tracking-tight text-sm capitalize',
											pathname === `/${list.id}`
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
					{user ? null : (
						<SheetFooter className='!mt-0 !pt-0'>
							<LoginLink
								className={buttonVariants({
									size: 'default',
									variant: 'default',
									className: 'w-full',
								})}
							>
								Log in
								<ArrowRightIcon className='ml-1.5 h-5 w-5' />
							</LoginLink>
						</SheetFooter>
					)}
				</SheetContent>
			</Sheet>
		</div>
	);
};

const Navbar = ({
	user,
	isAdmin,
	lists,
	userIcon,
}: {
	user: KindeUser | null;
	isAdmin: boolean;
	lists: Category[];
	userIcon?: string | null;
}) => {
	const pathname = usePathname();

	return (
		<NavbarParent isSticky>
			<div className='flex items-center space-x-8'>
				<Logo />

				<ul className='hidden lg:flex items-center space-x-8'>
					{lists.map((list) => (
						<li key={list.id}>
							<Link
								href={`/${list.id}`}
								className={cn(
									'text-zinc-900 tracking-tight text-sm capitalize',
									pathname === `/${list.id}` ? 'font-semibold' : 'font-normal'
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
				<NavListMobile
					user={user}
					lists={lists}
					pathname={pathname}
				/>
				<Barrier />
				{user ? (
					<DropdownMenu>
						<DropdownMenuTrigger>
							<img
								src={userIcon || '/preview.webp'}
								alt='user icon'
								className='w-9 h-9 rounded-full hover:ring-4 ring-gray-200 transition-all'
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							side='bottom'
							sideOffset={10}
							className={cn(urbanist.className, 'me-6 2xl:me-0')}
						>
							{isAdmin ? (
								<DropdownMenuItem>
									<Link
										href='/dashboard'
										className='text-zinc-900 tracking-wide'
									>
										Dashboard
									</Link>
								</DropdownMenuItem>
							) : null}
							<DropdownMenuItem>
								<LogoutLink className='text-zinc-900 tracking-wide'>
									Log out
								</LogoutLink>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<LoginLink
						className={buttonVariants({
							size: 'sm',
							variant: 'ghost',
							className: 'hidden lg:inline-flex',
						})}
					>
						Log in
						<ArrowRight className='w-4 h-4 ml-1.5' />
					</LoginLink>
				)}
			</div>
		</NavbarParent>
	);
};

export default Navbar;
