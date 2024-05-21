import React, { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

const NextPrev = ({ page, hasNext }: { page: number; hasNext: boolean }) => {
	const router = useRouter();
	const [isPendingPrev, startTransitionPrev] = useTransition();
	const [isPendingNext, startTransitionNext] = useTransition();

	const handleNextPrevious = (type: string, page: number) => {
		if (type === 'next' && hasNext) {
			router.push(`/dashboard/colors?page=${page + 1}`);
			return;
		}

		if (type === 'prev' && page === 1) {
			return;
		} else {
			router.push(`/dashboard/colors?page=${page - 1}`);
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
				loadingText='Prev'
				isLoading={isPendingPrev}
			>
				Previus
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
