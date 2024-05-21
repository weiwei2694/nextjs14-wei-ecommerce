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

import { colorValidation } from '../../valitions';
import { updateColor } from '../../actions';

import type { Color } from '@prisma/client';

import { toast } from 'sonner';

const Form = ({ color: currentColor }: { color: Color }) => {
	const router = useRouter();

	const defaultValues = currentColor;

	const form = useForm<z.infer<typeof colorValidation>>({
		resolver: zodResolver(colorValidation),
		defaultValues,
	});

	const onSubmit = async (values: z.infer<typeof colorValidation>) => {
		const { name, color } = values;

		// There is nothing that needs to be updated, if the data is still the same
		if (name === currentColor.name && color === currentColor.color) {
			toast.success('Color updated.');
			router.push('/dashboard/colors');
			return;
		}

		if (!CSS.supports('color', color)) {
			form.setError('color', {
				message: 'Color is not supported.',
			});

			return;
		}

		try {
			const { success, data } = await updateColor({
				id: currentColor.id,
				name,
				color,
			});

			if (success && data) {
				form.reset({
					name: data.name,
					color: data.color,
				});

				toast.success('Color updated.');
				router.push('/dashboard/colors');
			}
		} catch (err) {
			console.error(`[ERROR: DASHBOARD_COLORS_CREATE]: ${err}`);

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
