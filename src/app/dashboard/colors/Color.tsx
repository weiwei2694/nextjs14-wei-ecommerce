import React, { useState } from 'react';
import { Inter } from 'next/font/google';

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

import type { Color } from '@prisma/client';

import { Ellipsis, Pencil, Trash } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

const Color = ({
	color,
	colorIndex,
	handleDelete,
	isPending,
	startTransition,
}: {
	color: Color;
	colorIndex: number;
	handleDelete: (id: string) => Promise<void>;
	isPending: boolean;
	startTransition: React.TransitionStartFunction;
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			<TableRow key={color.id}>
				<TableCell>{colorIndex + 1}</TableCell>
				<TableCell>{color.id}</TableCell>
				<TableCell className='capitalize'>{color.name}</TableCell>
				<TableCell>
					<div
						className='w-5 h-5 rounded-full border border-gray-200'
						style={{
							backgroundColor: color.color.toLowerCase(),
						}}
					/>
				</TableCell>
				<TableCell>{color.createdAt.toLocaleDateString()}</TableCell>
				<TableCell>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Ellipsis className='w-5 h-5 text-zinc-900' />
						</DropdownMenuTrigger>
						<DropdownMenuContent className={inter.className}>
							<DropdownMenuItem className='cursor-pointer'>
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
							<DialogTitle>
								Are you sure, want to delete this color?
							</DialogTitle>
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
								onClick={() => startTransition(() => handleDelete(color.id))}
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

export default Color;