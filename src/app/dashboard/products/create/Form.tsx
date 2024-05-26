'use client';

import React, { useRef, useState } from 'react';
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
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

import { saveProductValidation } from '../_utils/validations';
import { saveProduct } from '../_utils/actions';

import { toast } from 'sonner';

import type { Category, Color, Size } from '@prisma/client';

import { useUploadThing } from '@/lib/uploadthing';

import { ImagePlus, Trash } from 'lucide-react';

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

	const [previews, setPreviews] = useState<string[] | null>(null);
	const [files, setFiles] = useState<File[] | null>(null);
	const [totalSizeMb, setTotalSizeMb] = useState<number>(0);
	const MAX_FILE_SIZE_MB = 4;
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const { startUpload } = useUploadThing('imageUploader');

	const handlePreviews = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = e.target.files;

		if (selectedFiles) {
			const newFiles = Array.from(selectedFiles);
			let totalSize = totalSizeMb * (1024 * 1024);

			for (const file of newFiles) {
				totalSize += file.size;
			}

			if (totalSize / (1024 * 1024) < MAX_FILE_SIZE_MB) {
				setFiles((prevFiles) => [...(prevFiles || []), ...newFiles]);

				const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
				setPreviews((prevPreviews) => [
					...(prevPreviews || []),
					...newPreviews,
				]);

				setTotalSizeMb(totalSize / (1024 * 1024));
			} else {
				toast.error(
					`Total file size exceeds ${MAX_FILE_SIZE_MB} MB. Please select files with total size below ${MAX_FILE_SIZE_MB} MB.`
				);
			}
		}
	};

	const handleDeletePreview = (index: number) => {
		setTotalSizeMb((prev) => prev - files![index].size / (1024 * 1024));

		setFiles((prevFiles) => (prevFiles || []).filter((_, i) => i !== index));
		setPreviews((prevPreviews) =>
			(prevPreviews || []).filter((_, i) => i !== index)
		);
	};

	const defaultValues = {
		title: '',
		price: '',
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
			categoryId,
			colorId,
			sizeId,
			isFeatured,
			isArchived,
		} = values;

		if (!files?.length) {
			toast.error('Please select at least one image.');

			return;
		}

		try {
			const { data, success } = await saveProduct({
				title,
				price,
				categoryId,
				colorId,
				sizeId,
				isFeatured,
				isArchived,
			});

			if (data && success) {
				await startUpload(files, {
					productId: data.id,
				});

				form.reset(defaultValues);
				setPreviews(null);
				setFiles(null);
				setTotalSizeMb(0);

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
		<>
			<div className='flex flex-col space-y-3'>
				<div className='flex justify-between items-center'>
					<Label
						htmlFor='images'
						className='w-fit'
					>
						Images{' '}
						<Badge className='ml-1.5'>PNG, JPG, JPEG, WEBP - MAX 4MB</Badge>
					</Label>

					<Button
						size='sm'
						disabled={true}
						className='pointer-events-none'
					>
						{totalSizeMb.toFixed(2)}MB / {MAX_FILE_SIZE_MB.toFixed(2)}MB
					</Button>
				</div>

				{files?.length && previews?.length ? (
					<div className='flex flex-wrap gap-5'>
						{previews.map((preview, previewIndex) => (
							<div
								key={previewIndex}
								className='relative w-fit'
							>
								<img
									src={preview}
									alt='preview img'
									className='w-[220px] h-[220px] rounded-lg object-cover'
								/>

								<div className='absolute top-3 right-3'>
									<Button
										size='sm'
										variant='destructive'
										disabled={isLoading}
										onClick={() => handleDeletePreview(previewIndex)}
									>
										<Trash className='w-4 h-4' />
									</Button>
								</div>
							</div>
						))}
					</div>
				) : null}

				<input
					type='file'
					hidden
					accept='image/png, image/jpg, image/jpeg, image/webp'
					id='images'
					name='images'
					multiple
					onChange={handlePreviews}
					ref={fileInputRef}
				/>

				<Button
					className='w-fit'
					variant='secondary'
					disabled={isLoading}
					onClick={() => fileInputRef.current?.click()}
				>
					<ImagePlus className='mr-1.5 w-4 h-4' />
					{files?.length && previews?.length
						? 'Add more Image'
						: 'Upload an Image'}
				</Button>
			</div>

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
		</>
	);
};

export default Form;
