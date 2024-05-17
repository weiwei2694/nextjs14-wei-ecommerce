'use client';

import React from 'react';
import { Button, buttonVariants } from './ui/button';
import { ArrowRightIcon, WalletCards } from 'lucide-react';
import Link from 'next/link';
import { LogoutLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import type { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';

import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
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
		<nav className='sticky z-[100] top-0 bg-white/50 backdrop-blur-lg transition-all border-b border-gray-200'>
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

						<ul className='flex items-center space-x-8'>
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
						<Button
							size='sm'
							className='rounded-full bg-zinc-900 hover:bg-zinc-900/90 transition-all duration-200 px-5'
						>
							<WalletCards className='w-5 h-5 mr-1.5' />
							<span className='font-bold text-xs'>12</span>
						</Button>
						<div className='h-10 w-px bg-zinc-200 hidden sm:block' />
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
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
