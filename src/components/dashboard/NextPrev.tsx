import React, { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

const NextPrev = ({
	page,
	hasNext,
	path,
}: {
	page: number;
	hasNext: boolean;
	path: string;
}) => {
	const router = useRouter();
	const [isPendingPrev, startTransitionPrev] = useTransition();
	const [isPendingNext, startTransitionNext] = useTransition();

	const handleNextPrevious = (type: string, page: number) => {
		if (type === 'next' && hasNext) {
			router.push(`${path}?page=${page + 1}`);
			return;
		}

		if (type === 'prev' && page === 1) {
			return;
		} else {
			router.push(`${path}?page=${page - 1}`);
		}
	};

	return (
		<div className='flex justify-center gap-5'>
			<Button
				variant='ghost'
				size='sm'
				onClick={() =>
					startTransitionPrev(() => handleNextPrevious('prev', page))
				}
				disabled={isPendingNext || isPendingPrev || page === 1}
				loadingText='Previous'
				isLoading={isPendingPrev}
			>
				Previous
			</Button>
			<Button
				variant='ghost'
				size='sm'
				onClick={() =>
					startTransitionNext(() => handleNextPrevious('next', page))
				}
				disabled={isPendingPrev || isPendingNext || !hasNext}
				loadingText='Next'
				isLoading={isPendingNext}
			>
				Next
			</Button>
		</div>
	);
};

export default NextPrev;
