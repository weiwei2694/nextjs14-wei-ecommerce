'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form as FormShadcnUI,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { sizeValidation } from '../../_utils/validations';
import { updateSize } from '../../_utils/actions';

import type { Size } from '@prisma/client';

import { toast } from 'sonner';

const Form = ({ size: currentSize }: { size: Size }) => {
	const router = useRouter();

	const defaultValues = currentSize;

	const form = useForm<z.infer<typeof sizeValidation>>({
		resolver: zodResolver(sizeValidation),
		defaultValues,
	});

	const onSubmit = async (values: z.infer<typeof sizeValidation>) => {
		const { name, value } = values;

		// There is nothing that needs to be updated, if the data is still the same
		if (name === currentSize.name && currentSize.value === value) {
			toast.success('Size updated.');
			router.push('/dashboard/sizes');
			return;
		}

		try {
			const { success, data, message } = await updateSize({
				id: currentSize.id,
				name,
				value,
			});

			if (!message && success && data) {
				form.reset({
					name: data.name,
					value: data.value,
				});

				toast.success('Size updated.');
				router.push('/dashboard/sizes');
				return;
			}

			if (message === 'Name already exists.' && !success && !data) {
				form.setError('name', { message });
				return;
			}

			if (message === 'Value already exists.' && !success && !data) {
				form.setError('value', { message });
			}
		} catch (err) {
			console.error(`[ERROR: DASHBOARD_SIZE_CREATE]: ${err}`);

			if (typeof err === 'string') {
				if (
					err === 'Size not found.' ||
					err === 'You do not have access to this area'
				) {
					toast.error(err);
				}
			} else {
				toast.error('Something went wrong.');
			}
		}
	};

	const isLoading = form.formState.isSubmitting;

	return (
		<FormShadcnUI {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-5'
			>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										placeholder='Name'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='value'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Value</FormLabel>
								<FormControl>
									<Input
										placeholder='Value'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div>
					<Button
						disabled={isLoading}
						isLoading={isLoading}
						loadingText='Updated'
						type='submit'
					>
						Update
					</Button>
				</div>
			</form>
		</FormShadcnUI>
	);
};

export default Form;
