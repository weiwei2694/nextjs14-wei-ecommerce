import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';

import { TableCell, TableRow } from '@/components/ui/table';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import type { Size } from '@prisma/client';

import { Ellipsis, Pencil, Trash } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

const Size = ({
	size,
	handleDelete,
	isPending,
	startTransition,
}: {
	size: Size;
	handleDelete: (id: string) => Promise<void>;
	isPending: boolean;
	startTransition: React.TransitionStartFunction;
}) => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			<TableRow>
				<TableCell className='hidden md:table-cell'>{size.id}</TableCell>
				<TableCell className='capitalize'>{size.name}</TableCell>
				<TableCell className='uppercase'>{size.value}</TableCell>
				<TableCell className='hidden md:table-cell'>
					{size.createdAt.toLocaleDateString()}
				</TableCell>
				<TableCell>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Ellipsis className='w-5 h-5 text-zinc-900' />
						</DropdownMenuTrigger>
						<DropdownMenuContent className={inter.className}>
							<DropdownMenuItem
								onClick={() => router.push(`/dashboard/sizes/${size.id}/edit`)}
								className='cursor-pointer'
							>
								<Pencil className='w-4 h-4 mr-3' />
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setIsOpen(true)}>
								<Trash className='w-4 h-4 mr-3' /> Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</TableCell>
			</TableRow>

			<Dialog
				open={isOpen}
				onOpenChange={setIsOpen}
			>
				<DialogContent className={inter.className}>
					<DialogHeader className='flex flex-col gap-5'>
						<div className='flex flex-col gap-2'>
							<DialogTitle>Are you sure, want to delete this size?</DialogTitle>
							<DialogDescription>
								This action cannot be undone. This will permanently delete your
								data from servers.
							</DialogDescription>
						</div>
						<DialogFooter className='flex gap-2'>
							<Button
								type='button'
								disabled={isPending}
								onClick={() => setIsOpen(false)}
								variant='destructive'
							>
								Cancel
							</Button>
							<Button
								type='button'
								onClick={() => startTransition(() => handleDelete(size.id))}
								disabled={isPending}
								loadingText='Deleted'
								isLoading={isPending}
							>
								Delete
							</Button>
						</DialogFooter>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default Size;
