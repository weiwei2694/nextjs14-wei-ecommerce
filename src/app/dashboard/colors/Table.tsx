'use client';

import React, { useTransition } from 'react';

import {
	Table as TableShadcnUI,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { toast } from 'sonner';

import type { GetColors } from './_utils/types';
import { deleteColor } from './_utils/actions';
import Color from './Color';

const Table = ({ colors }: { colors: GetColors }) => {
	const [isPending, startTransition] = useTransition();

	const handleDelete = async (id: string) => {
		if (isPending) return;

		try {
			const { success } = await deleteColor({ id });

			if (success) {
				toast.success('Color deleted.');
			}
		} catch (err) {
			console.error(`[ERROR_DASHBOARD_DELETE_COLOR]: ${err}`);

			if (typeof err === 'string') {
				if (
					err === 'You do not have access to this area' ||
					err === 'Color not found.'
				) {
					toast.error(err);
				} else {
					toast.error('Something went wrong.');
				}
			}
		}
	};

	return colors && colors.length ? (
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
					<Color
						key={color.id}
						color={color}
						colorIndex={colorIndex}
						handleDelete={handleDelete}
						isPending={isPending}
						startTransition={startTransition}
					/>
				))}
			</TableBody>
		</TableShadcnUI>
	) : null;
};

export default Table;
