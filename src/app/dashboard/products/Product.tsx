import React from 'react';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';

import { TableCell, TableRow } from '@/components/ui/table';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { Product } from './_utils/types';

import { Ellipsis, Pencil } from 'lucide-react';

import { formatPrice } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

const Product = ({ product }: { product: Product }) => {
	const router = useRouter();

	return (
		<TableRow>
			<TableCell className='hidden md:table-cell'>{product.id}</TableCell>
			<TableCell>{product.title}</TableCell>
			<TableCell>{formatPrice(product.price)}</TableCell>
			<TableCell className='hidden md:table-cell'>
				{product.isArchived ? 'True' : 'False'}
			</TableCell>
			<TableCell className='hidden md:table-cell'>
				{product.isFeatured ? 'True' : 'False'}
			</TableCell>
			<TableCell className='capitalize'>{product.category.name}</TableCell>
			<TableCell className='capitalize'>{product.size.name}</TableCell>
			<TableCell className='flex items-center gap-4 uppercase'>
				{product.color.color}
				<div
					className='w-5 h-5 rounded-full border border-gray-200'
					style={{
						backgroundColor: product.color.color.toLowerCase(),
					}}
				/>
			</TableCell>
			<TableCell className='hidden md:table-cell'>
				{product.createdAt.toLocaleDateString()}
			</TableCell>
			<TableCell>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Ellipsis className='w-5 h-5 text-zinc-900' />
					</DropdownMenuTrigger>
					<DropdownMenuContent className={inter.className}>
						<DropdownMenuItem
							onClick={() =>
								router.push(`/dashboard/products/${product.id}/edit`)
							}
							className='cursor-pointer'
						>
							<Pencil className='w-4 h-4 mr-3' />
							Edit
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</TableRow>
	);
};

export default Product;
