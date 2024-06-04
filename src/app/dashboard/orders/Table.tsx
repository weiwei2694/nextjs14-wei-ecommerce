'use client';

import React from 'react';

import {
	Table as TableShadcnUI,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import NextPrev from '@/components/dashboard/NextPrev';

import type { GetOrders } from './_utils/types';
import Order from './Order';

const Table = ({ orders, page }: { orders: GetOrders; page: number }) => {
	return orders && orders.data && orders.data.length ? (
		<div className='flex flex-col gap-5'>
			<TableShadcnUI>
				<TableHeader>
					<TableRow>
						<TableHead className='hidden md:table-cell'>Id</TableHead>
						<TableHead>Products</TableHead>
						<TableHead>Amount</TableHead>
						<TableHead>Total</TableHead>
						<TableHead>Paid</TableHead>
						<TableHead className='hidden md:table-cell'>Date</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{orders.data.map((order, _) => (
						<Order
							key={order.id}
							order={order}
						/>
					))}
				</TableBody>
			</TableShadcnUI>
			<NextPrev
				page={page}
				hasNext={orders.hasNext}
				path='/dashboard/orders'
			/>
		</div>
	) : null;
};

export default Table;
