import React from 'react';
import { notFound } from 'next/navigation';
import { Inter } from 'next/font/google';

import Navbar from '@/components/dashboard/Navbar';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

const inter = Inter({ subsets: ['latin'] });

const Layout = async ({ children }: { children: React.ReactNode }) => {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user || user.email !== process.env.ADMIN_EMAIL) {
		return notFound();
	}

	return (
		<div className={inter.className}>
			<Navbar />
			<main className='min-h-[calc(100vh-4rem-1px)] max-w-7xl mx-auto px-9 2xl:px-3'>
				{children}
			</main>
		</div>
	);
};

export default Layout;
