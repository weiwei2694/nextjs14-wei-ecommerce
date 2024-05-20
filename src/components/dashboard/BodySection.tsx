import React from 'react';

const BodySection = ({ children }: { children?: React.ReactNode }) => {
	return <div className='flex flex-col gap-5 pb-5'>{children}</div>;
};

export default BodySection;
