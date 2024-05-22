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

import type { GetSizes } from './_utils/types';
import { deleteSize } from './_utils/actions';
import Size from './Size';

const Table = ({ sizes, page }: { sizes: GetSizes; page: number }) => {
	const [isPending, startTransition] = useTransition();

	const handleDelete = async (id: string) => {
		if (isPending) return;

		try {
			const { success } = await deleteSize({ id });

			if (success) {
				toast.success('Size deleted.');
			}
		} catch (err) {
			console.error(`[ERROR_DASHBOARD_DELETE_SIZE]: ${err}`);

			if (typeof err === 'string') {
				if (
					err === 'You do not have access to this area' ||
					err === 'Color not found.'
				) {
					toast.error(err);
				}
			} else {
				toast.error('Something went wrong.');
			}
		}
	};

	return sizes && sizes.data && sizes.data.length ? (
		<div className='flex flex-col gap-5'>
			<TableShadcnUI>
				<TableHeader>
					<TableRow>
						<TableHead className='hidden md:table-cell'>Id</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Value</TableHead>
						<TableHead className='hidden md:table-cell'>Date</TableHead>
						<TableHead>Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{sizes.data.map((size, _) => (
						<Size
							key={size.id}
							size={size}
							handleDelete={handleDelete}
							isPending={isPending}
							startTransition={startTransition}
						/>
					))}
				</TableBody>
			</TableShadcnUI>
			<NextPrev
				page={page}
				hasNext={sizes.hasNext}
				path='/dashboard/sizes'
			/>
		</div>
	) : (
		<DataEmpty href='/dashboard/sizes/create' />
	);
};

export default Table;
