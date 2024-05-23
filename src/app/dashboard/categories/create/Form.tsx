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

import { saveCategoryValidation } from '../_utils/validations';
import { saveCategory } from '../_utils/actions';

import { toast } from 'sonner';

const Form = () => {
	const router = useRouter();

	const defaultValues = {
		name: '',
	};

	const form = useForm<z.infer<typeof saveCategoryValidation>>({
		resolver: zodResolver(saveCategoryValidation),
		defaultValues,
	});

	const onSubmit = async (values: z.infer<typeof saveCategoryValidation>) => {
		const { name } = values;

		try {
			const { success } = await saveCategory({ name });

			if (success) {
				form.reset(defaultValues);

				toast.success('Category created.');
				router.push('/dashboard/categories');
			}
		} catch (err) {
			console.error(`[ERROR_SAVE_CATEGORY]: ${err}`);

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
