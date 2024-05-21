'use client';

import React from 'react';
import { Inter } from 'next/font/google';

import { Ellipsis, Pencil, Trash } from 'lucide-react';

import {
	Table as TableShadcnUI,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { GetColors } from './types';

const inter = Inter({ subsets: ['latin'] });

const Table = ({ colors }: { colors: GetColors }) => {
	return (
		<>
			{colors && colors.length ? (
				<TableShadcnUI>
					<TableHeader>
						<TableRow>
							<TableHead>#</TableHead>
							<TableHead>Id</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Value</TableHead>
							<TableHead>Date</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{colors.map((color, colorIndex) => (
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
											<DropdownMenuItem className='cursor-pointer'>
												<Trash className='w-4 h-4 mr-3' /> Delete
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</TableShadcnUI>
			) : null}
		</>
	);
};

export default Table;
