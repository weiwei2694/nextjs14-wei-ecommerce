import React from 'react';

import { TableCell, TableRow } from '@/components/ui/table';

import type { GetOrder } from './_utils/types';
import { formatPrice } from '@/lib/utils';

const Order = ({ order }: { order: GetOrder }) => {
	const titleProduct = order.orderItems
		.map((item) => item.product.title)
		.join(', ');

	return (
		<TableRow>
			<TableCell className='hidden md:table-cell'>{order.id}</TableCell>
			<TableCell className='capitalize'>{titleProduct}</TableCell>
			<TableCell>{formatPrice(order.amount)}</TableCell>
			<TableCell>{order.total}</TableCell>
			<TableCell>{order.isPaid ? 'Paid' : 'Not paid'}</TableCell>
			<TableCell className='hidden md:table-cell'>
				{order.createdAt.toLocaleDateString()}
			</TableCell>
		</TableRow>
	);
};

export default Order;
