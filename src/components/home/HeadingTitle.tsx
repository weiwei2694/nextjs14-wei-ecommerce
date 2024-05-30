import React from 'react';

const HeadingTitle = ({ title }: { title: string }) => {
	return (
		<h1 className='font-extrabold text-3xl text-zinc-900 capitalize'>
			{title}
		</h1>
	);
};

export default HeadingTitle;
