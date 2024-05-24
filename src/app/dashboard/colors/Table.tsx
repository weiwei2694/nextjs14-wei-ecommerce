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

import type { GetColors } from './_utils/types';
import { deleteColor } from './_utils/actions';
import Color from './Color';

const Table = ({ colors, page }: { colors: GetColors; page: number }) => {
	const [isPending, startTransition] = useTransition();

	const handleDelete = async (id: string) => {
		if (isPending) return;

		try {
			const { success } = await deleteColor({ id });

			if (success) {
				toast.success('Color deleted.');
			}
		} catch (err) {
			console.error(`[ERROR_DELETE_COLOR]: ${err}`);

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

	return colors && colors.data && colors.data.length ? (
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
					{colors.data.map((color, _) => (
						<Color
							key={color.id}
							color={color}
							handleDelete={handleDelete}
							isPending={isPending}
							startTransition={startTransition}
						/>
					))}
				</TableBody>
			</TableShadcnUI>
			<NextPrev
				page={page}
				hasNext={colors.hasNext}
				path='/dashboard/colors'
			/>
		</div>
	) : (
		<DataEmpty href='/dashboard/colors/create' />
	);
};

export default Table;
