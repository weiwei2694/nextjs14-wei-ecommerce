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

import { sizeValidation } from '../_utils/validations';
import { saveSize } from '../_utils/actions';

import { toast } from 'sonner';

const Form = () => {
	const router = useRouter();

	const defaultValues = {
		name: '',
		value: '',
	};

	const form = useForm<z.infer<typeof sizeValidation>>({
		resolver: zodResolver(sizeValidation),
		defaultValues,
	});

	const onSubmit = async (values: z.infer<typeof sizeValidation>) => {
		const { name, value } = values;

		try {
			const { success, message } = await saveSize({ name, value });

			if (success && !message) {
				form.reset(defaultValues);

				toast.success('Size created.');
				router.push('/dashboard/sizes');
				return;
			}

			if (!success && message === 'Size name already exists.') {
				form.setError('name', { message });
				return;
			}

			if (!success && message === 'Size value already exists.') {
				form.setError('value', { message });
				return;
			}
		} catch (err) {
			console.error(`[ERROR: DASHBOARD_SIZE_CREATE]: ${err}`);

			if (
				typeof err === 'string' &&
				err === 'You do not have access to this area'
			) {
				toast.error(err);
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
						loadingText='Created'
						type='submit'
					>
						Create
					</Button>
				</div>
			</form>
		</FormShadcnUI>
	);
};

export default Form;
