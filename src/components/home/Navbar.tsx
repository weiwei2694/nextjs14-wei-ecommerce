'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';

import { ArrowRightIcon, Menu } from 'lucide-react';

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
import NavbarParent from '@/components/NavbarParent';
import Cart from '@/components/home/Cart';
import Logo from '@/components/Logo';
import Barrier from '../Barrier';

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

const LogoutAndLogin = ({ user }: { user: KindeUser | null }) => {
	return (
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
	);
};

const NavListMobile = ({
	pathname,
	isAdmin,
}: {
	pathname: string;
	isAdmin: boolean;
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
					className={cn(inter.className, 'flex flex-col space-y-4')}
				>
					<SheetHeader>
						<ul className='flex flex-col items-start space-y-4'>
							{isAdmin ? (
								<li>
									<Link
										href='/dashboard'
										className={cn(
											'text-zinc-900 tracking-tight text-sm',
											pathname === '/dashboard'
												? 'font-semibold'
												: 'font-normal'
										)}
									>
										Dashboard
									</Link>
								</li>
							) : null}
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
						<LogoutLink
							className={buttonVariants({
								size: 'default',
								variant: 'default',
								className: 'w-full',
							})}
						>
							Log Out
							<ArrowRightIcon className='ml-1.5 h-5 w-5' />
						</LogoutLink>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
	);
};

const Navbar = ({
	user,
	isAdmin,
}: {
	user: KindeUser | null;
	isAdmin: boolean;
}) => {
	const pathname = usePathname();

	return (
		<NavbarParent isSticky>
			<div className='flex items-center space-x-8'>
				<Logo />

				<ul className='hidden lg:flex items-center space-x-8'>
					{isAdmin ? (
						<li>
							<Link
								href='/dashboard'
								className={cn(
									'text-zinc-900 tracking-tight text-sm',
									pathname === '/dashboard' ? 'font-semibold' : 'font-normal'
								)}
							>
								Dashboard
							</Link>
						</li>
					) : null}
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
				<Barrier />
				<LogoutAndLogin user={user} />
				<NavListMobile
					isAdmin={isAdmin}
					pathname={pathname}
				/>
			</div>
		</NavbarParent>
	);
};

export default Navbar;
