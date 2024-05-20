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

import { saveColor } from '../actions';

import { toast } from 'sonner';

const formSchema = z.object({
	name: z
		.string()
		.min(3, {
			message: 'Name must be at least 3 characters.',
		})
		.max(100, {
			message: 'Name must be less than 100 characters.',
		}),
	color: z
		.string()
		.min(3, {
			message: 'Color must be at least 3 characters.',
		})
		.max(10, {
			message: 'Color must be less than 10 characters.',
		}),
});

const defaultValues = {
	name: '',
	color: '',
};

const Form = () => {
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const { name, color } = values;

		if (!CSS.supports('color', color)) {
			form.setError('color', {
				message: 'Color is not supported.',
			});

			return;
		}

		try {
			const { success } = await saveColor({ name, color });

			if (success) {
				form.reset(defaultValues);

				toast.success('Color created.');
				router.push('/dashboard/colors');
			}
		} catch (err) {
			console.error(`[ERROR: DASHBOARD_COLORS_CREATE]: ${err}`);

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
