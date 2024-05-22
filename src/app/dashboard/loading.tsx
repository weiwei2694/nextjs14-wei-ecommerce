import { LoaderCircle } from 'lucide-react';
import React from 'react';

const Loading = () => {
	return (
		<div className='min-h-[calc(100vh-4rem-1px)] grid place-items-center'>
			<LoaderCircle className='w-10 h-10 animate-spin text-zinc-500 opacity-50' />
		</div>
	);
};

export default Loading;
