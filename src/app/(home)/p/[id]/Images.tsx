import React from 'react';
import Image from 'next/image';

import { ScrollBar, ScrollArea } from '@/components/ui/scroll-area';

import type { Image as ImagePrisma } from '@prisma/client';

import { cn } from '@/lib/utils';

const Images = ({
	className,
	images,
	activeImage,
	setActiveImage,
}: {
	className?: string;
	images: ImagePrisma[];
	activeImage: ImagePrisma;
	setActiveImage: React.Dispatch<React.SetStateAction<ImagePrisma>>;
}) => {
	return (
		<ScrollArea
			className={cn(
				className,
				'w-full whitespace-nowrap rounded-lg border p-4'
			)}
		>
			<div className='flex gap-3'>
				{images.map((image, imageIndex) => (
					<div
						key={imageIndex}
						onClick={() => setActiveImage(image)}
						className='shrink-0'
					>
						<Image
							src={image?.url}
							alt='image'
							width={100}
							height={100}
							className={`object-cover w-[100px] h-[100px] rounded-xl cursor-pointer ${
								image === activeImage ? 'border-2 border-black p-1' : null
							}`}
							priority
						/>
					</div>
				))}
			</div>

			<ScrollBar orientation='horizontal' />
		</ScrollArea>
	);
};

export default Images;
