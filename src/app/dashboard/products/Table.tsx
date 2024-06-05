'use client';

import React from 'react';

import {
	Table as TableShadcnUI,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import DataEmpty from '@/components/dashboard/DataEmpty';
import NextPrev from '@/components/dashboard/NextPrev';

import type { GetProducts } from './_utils/types';
import Product from './Product';

const Table = ({ products, page }: { products: GetProducts; page: number }) => {
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
