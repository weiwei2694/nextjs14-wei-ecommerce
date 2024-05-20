import React from 'react';
import { notFound } from 'next/navigation';

import Navbar from '@/components/dashboard/Navbar';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

const Layout = async ({ children }: { children: React.ReactNode }) => {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user || user.email !== process.env.ADMIN_EMAIL) {
		return notFound();
	}

	return (
		<>
			<Navbar />
			<main className='min-h-screen'>{children}</main>
		</>
	);
};

export default Layout;
