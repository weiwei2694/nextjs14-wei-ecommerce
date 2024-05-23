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

import { updateSizeValidation } from '../../_utils/validations';
import { updateSize } from '../../_utils/actions';

import type { Size } from '@prisma/client';

import { toast } from 'sonner';

const Form = ({ size: currentSize }: { size: Size }) => {
	const router = useRouter();

	const defaultValues = {
		id: currentSize.id,
		name: currentSize.name,
		value: currentSize.value,
	};

	const form = useForm<z.infer<typeof updateSizeValidation>>({
		resolver: zodResolver(updateSizeValidation),
		defaultValues,
	});

	const onSubmit = async (values: z.infer<typeof updateSizeValidation>) => {
		const { name, value } = values;

		// There is nothing that needs to be updated, if the data is still the same
		if (name === currentSize.name && currentSize.value === value) {
			toast.success('Size updated.');
			router.push('/dashboard/sizes?page=1');
			return;
		}

		try {
			const { success, data } = await updateSize({
				id: currentSize.id,
				name,
				value,
			});

			if (success && data) {
				form.reset({
					name: data.name,
					value: data.value,
				});

				toast.success('Size updated.');
				router.push('/dashboard/sizes?page=1');
			}
		} catch (err) {
			console.error(`[ERROR_UPDATE_SIZE]: ${err}`);

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
