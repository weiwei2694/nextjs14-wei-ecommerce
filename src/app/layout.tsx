import React from 'react';
import { Recursive } from 'next/font/google';

import './globals.css';

const recursive = Recursive({ subsets: ['latin'] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='en'>
			<body className={recursive.className}>{children}</body>
		</html>
	);
};

export default RootLayout;
