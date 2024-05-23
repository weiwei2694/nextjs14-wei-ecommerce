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

import { saveColorValidation } from '../_utils/validations';
import { saveColor } from '../_utils/actions';

import { toast } from 'sonner';

const Form = () => {
	const router = useRouter();

	const defaultValues = {
		name: '',
		color: '',
	};

	const form = useForm<z.infer<typeof saveColorValidation>>({
		resolver: zodResolver(saveColorValidation),
		defaultValues,
	});

	const onSubmit = async (values: z.infer<typeof saveColorValidation>) => {
		const { name, color } = values;

		try {
			const { success } = await saveColor({ name, color });

			if (success) {
				form.reset(defaultValues);

				toast.success('Color created.');
				router.push('/dashboard/colors');
			}
		} catch (err) {
			console.error(`[ERROR_SAVE_COLOR]: ${err}`);

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
						name='color'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Color</FormLabel>
								<FormControl>
									<Input
										placeholder='Color'
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
