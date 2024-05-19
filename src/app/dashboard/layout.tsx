import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<nav>Nav</nav>
			<main>{children}</main>
		</>
	);
};

export default Layout;
