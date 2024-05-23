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
	FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

import { saveProductValidation } from '../_utils/validations';
import { saveProduct } from '../_utils/actions';

import { toast } from 'sonner';

import type { Category, Color, Size } from '@prisma/client';

const Form = ({
	categories,
	colors,
	sizes,
}: {
	categories: Category[];
	colors: Color[];
	sizes: Size[];
}) => {
	const router = useRouter();

	const defaultValues = {
		title: '',
		price: '',
		description: '',
		categoryId: '',
		colorId: '',
		sizeId: '',
		isFeatured: false,
		isArchived: false,
	};

	const form = useForm<z.infer<typeof saveProductValidation>>({
		resolver: zodResolver(saveProductValidation),
		defaultValues,
	});

	const onSubmit = async (values: z.infer<typeof saveProductValidation>) => {
		const {
			title,
			price,
			description,
			categoryId,
			colorId,
			sizeId,
			isFeatured,
			isArchived,
		} = values;

		try {
			const { success } = await saveProduct({
				title,
				price,
				description,
				categoryId,
				colorId,
				sizeId,
				isFeatured,
				isArchived,
			});

			if (success) {
				form.reset(defaultValues);

				toast.success('Product created.');
				router.push('/dashboard/products?page=1');
			}
		} catch (err) {
			console.error(`[ERROR_SAVE_PRODUCT]: ${err}`);

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
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input
										placeholder='Title'
										autoFocus
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='price'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price</FormLabel>
								<FormControl>
									<Input
										placeholder='Price'
										type='number'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='categoryId'
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<Select onValueChange={field.onChange}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Select a category' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories.map((category, _) => (
												<SelectItem
													key={category.id}
													value={category.id}
												>
													<span className='capitalize'>{category.name}</span>
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<FormField
						control={form.control}
						name='colorId'
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Color</FormLabel>
									<Select onValueChange={field.onChange}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Select a color' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{colors.map((color, _) => (
												<SelectItem
													key={color.id}
													value={color.id}
												>
													<span className='capitalize'>{color.name}</span>
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<FormField
						control={form.control}
						name='sizeId'
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Size</FormLabel>
									<Select onValueChange={field.onChange}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Select a size' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{sizes.map((size, _) => (
												<SelectItem
													key={size.id}
													value={size.id}
												>
													<span className='capitalize'>{size.name}</span>
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<FormField
						control={form.control}
						name='isFeatured'
						render={({ field }) => (
							<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'>
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className='space-y-1 leading-none'>
									<FormLabel>Featured</FormLabel>
									<FormDescription>
										This product will appear on the home page.
									</FormDescription>
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='isArchived'
						render={({ field }) => (
							<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'>
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className='space-y-1 leading-none'>
									<FormLabel>Archived</FormLabel>
									<FormDescription>
										This product will not appear anywhere in the store.
									</FormDescription>
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Description'
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
