import React from 'react';

import { cn } from '@/lib/utils';

const Barrier = ({ className }: { className?: string }) => {
	return (
		<div className={cn(className, 'h-10 w-px bg-zinc-200 hidden lg:block')} />
	);
};

export default Barrier;
