import React from 'react';

import { Toaster } from 'sonner';

import './globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='en'>
			<body>
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
