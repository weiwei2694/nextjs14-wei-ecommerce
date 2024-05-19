import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<nav>Nav</nav>
			<section>{children}</section>
		</div>
	);
};

export default Layout;
