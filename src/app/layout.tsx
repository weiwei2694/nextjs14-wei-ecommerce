import React from 'react';
import { Recursive } from 'next/font/google';

import { Toaster } from 'sonner';

import './globals.css';

const recursive = Recursive({ subsets: ['latin'] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='en'>
			<body className={recursive.className}>
				{children}

				<Toaster
					position='top-center'
					richColors
				/>
			</body>
		</html>
	);
};

export default RootLayout;
