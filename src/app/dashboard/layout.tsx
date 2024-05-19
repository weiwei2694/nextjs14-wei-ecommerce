import Navbar from '@/components/dashboard/Navbar';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Navbar />
			<main className='min-h-screen'>{children}</main>
		</>
	);
};

export default Layout;
