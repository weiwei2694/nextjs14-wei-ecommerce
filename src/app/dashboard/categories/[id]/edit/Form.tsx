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

import { updateCategoryValidation } from '../../_utils/validations';
import { updateCategory } from '../../_utils/actions';

import type { Category } from '@prisma/client';

import { toast } from 'sonner';

const Form = ({ category: currentCategory }: { category: Category }) => {
	const router = useRouter();

	const defaultValues = {
		id: currentCategory.id,
		name: currentCategory.name,
	};

	const form = useForm<z.infer<typeof updateCategoryValidation>>({
		resolver: zodResolver(updateCategoryValidation),
		defaultValues,
	});

	const onSubmit = async (values: z.infer<typeof updateCategoryValidation>) => {
		const { name } = values;

		// There is nothing that needs to be updated, if the data is still the same
		if (name === currentCategory.name) {
			toast.success('Category updated.');
			router.push('/dashboard/categories?page=1');

			return;
		}

		try {
			const { success, data } = await updateCategory({
				id: currentCategory.id,
				name,
			});

			if (success && data) {
				form.reset({
					name: data.name,
				});

				toast.success('Category updated.');
				router.push('/dashboard/categories?page=1');
			}
		} catch (err) {
			console.error(`[ERROR_UPDATE_CATEGORY]: ${err}`);

			if (typeof err === 'string') {
				if (
					err === 'Color not found.' ||
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
