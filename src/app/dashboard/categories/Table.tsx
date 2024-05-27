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

import type { GetCategories } from './_utils/types';
import { deleteCategory } from './_utils/actions';
import Category from './Category';

const Table = ({
	categories,
	page,
}: {
	categories: GetCategories;
	page: number;
}) => {
	const [isPending, startTransition] = useTransition();

	const handleDelete = async (id: string) => {
		if (isPending) return;

		try {
			const { success } = await deleteCategory({ id });

			if (success) {
				toast.success('Category deleted.');
			}
		} catch (err) {
			console.error(`[ERROR_DASHBOARD_DELETE_CATEGORY]: ${err}`);

			if (typeof err === 'string') {
				if (
					err === 'You do not have access to this area' ||
					err === 'Category not found.'
				) {
					toast.error(err);
				}
			} else {
				toast.error('Something went wrong.');
			}
		}
	};

	return categories && categories.data && categories.data.length ? (
		<div className='flex flex-col gap-5'>
			<TableShadcnUI>
				<TableHeader>
					<TableRow>
						<TableHead className='hidden md:table-cell'>Id</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Billboard</TableHead>
						<TableHead className='hidden md:table-cell'>Date</TableHead>
						<TableHead>Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{categories.data.map((category, _) => (
						<Category
							key={category.id}
							category={category}
							handleDelete={handleDelete}
							isPending={isPending}
							startTransition={startTransition}
						/>
					))}
				</TableBody>
			</TableShadcnUI>
			<NextPrev
				page={page}
				hasNext={categories.hasNext}
				path='/dashboard/categories'
			/>
		</div>
	) : (
		<DataEmpty href='/dashboard/categories/create' />
	);
};

export default Table;
