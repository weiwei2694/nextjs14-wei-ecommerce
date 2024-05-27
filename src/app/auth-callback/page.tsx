'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { getAuthStatus } from './actions';

const Page = () => {
	const router = useRouter();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	useEffect(() => {
		const getStatus = async () => {
			const { success } = await getAuthStatus();
			setIsSuccess(success);
		};

		getStatus();
	}, []);

	if (isSuccess) {
		router.push('/');
	}

	return (
		<div className='grid place-items-center my-20'>
			<div className='flex flex-col items-center gap-2'>
				<h3 className='font-semibold text-xl'>Logging you in...</h3>
				<p>You will be redirected automically.</p>
			</div>
		</div>
	);
};

export default Page;
