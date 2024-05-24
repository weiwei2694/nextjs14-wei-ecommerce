'use client';

import React, { useTransition } from 'react';

import {
	Table as TableShadcnUI,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import DataEmpty from '@/components/dashboard/DataEmpty';
import NextPrev from '@/components/dashboard/NextPrev';

import { toast } from 'sonner';

import type { GetProducts } from './_utils/types';
import { deleteProduct } from './_utils/actions';
import Product from './Product';

const Table = ({ products, page }: { products: GetProducts; page: number }) => {
	const [isPending, startTransition] = useTransition();

	const handleDelete = async (id: string) => {
		if (isPending) return;

		try {
			const { success } = await deleteProduct({ id });

			if (success) {
				toast.success('Product deleted.');
			}
		} catch (err) {
			console.error(`[ERROR_DELETE_PRODUCT]: ${err}`);

			if (typeof err === 'string') {
				if (
					err === 'You do not have access to this area' ||
					err === 'Product not found.'
				) {
					toast.error(err);
				}
			} else {
				toast.error('Something went wrong.');
			}
		}
	};

	return products && products.data && products.data.length ? (
		<div className='flex flex-col gap-5'>
			<TableShadcnUI>
				<TableHeader>
					<TableRow>
						<TableHead className='hidden md:table-cell'>Id</TableHead>
						<TableHead>Title</TableHead>
						<TableHead>Price</TableHead>
						<TableHead className='hidden md:table-cell'>Archived</TableHead>
						<TableHead className='hidden md:table-cell'>Featured</TableHead>
						<TableHead>Category</TableHead>
						<TableHead>Size</TableHead>
						<TableHead>Color</TableHead>
						<TableHead className='hidden md:table-cell'>Date</TableHead>
						<TableHead>Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.data.map((product, _) => (
						<Product
							key={product.id}
							product={product}
							handleDelete={handleDelete}
							isPending={isPending}
							startTransition={startTransition}
						/>
					))}
				</TableBody>
			</TableShadcnUI>
			<NextPrev
				page={page}
				hasNext={products.hasNext}
				path='/dashboard/products'
			/>
		</div>
	) : (
		<DataEmpty href='/dashboard/products/create' />
	);
};

export default Table;
