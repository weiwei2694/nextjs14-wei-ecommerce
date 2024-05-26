'use client';

import React, { useState, useRef, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ImagePlus, Info, LoaderCircle, Trash } from 'lucide-react';

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
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { updateProductValidation } from '../../_utils/validations';
import { deleteProductImage, updateProduct } from '../../_utils/actions';
import type { Product } from '../../_utils/types';

import { toast } from 'sonner';

import { useUploadThing } from '@/lib/uploadthing';

import type { Category, Color, Image, Size } from '@prisma/client';

import useTotalSizeMb from '@/hooks/useTotalSizeMb';

const inter = Inter({ subsets: ['latin'] });

const Form = ({
	product: currentProduct,
	categories,
	sizes,
	colors,
}: {
	product: Product;
	categories: Category[];
	sizes: Size[];
	colors: Color[];
}) => {
	const router = useRouter();
	const pathname = usePathname();

	// combines existing photo sizes and previews
	const { res: DEFAULT_TOTAL_SIZE_MB, isLoad } = useTotalSizeMb(
		currentProduct.images
	);
	const MAX_FILE_SIZE_MB = 4;
	const [totalSizeMb, setTotalSizeMb] = useState<number>(0);

	React.useEffect(() => {
		setTotalSizeMb(DEFAULT_TOTAL_SIZE_MB);
	}, [DEFAULT_TOTAL_SIZE_MB]);

	// previews
	const [previews, setPreviews] = useState<string[] | null>(null);
	const [files, setFiles] = useState<File[] | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	// existing image
	const [images, setImages] = useState<Image[]>(currentProduct.images);
	const [isPending, startTransition] = useTransition();

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

	const handleDeleteImage = async ({ id, url }: Image) => {
		try {
			const { success } = await deleteProductImage({ id, url });

			if (success) {
				setImages((prevImages) =>
					prevImages.filter((image) => image.id !== id)
				);

				// Recalculate total size manually
				const response = await fetch(url);
				const blob = await response.blob();
				const removedImageSizeMb = blob.size / (1024 * 1024);
				setTotalSizeMb((prev) => prev - removedImageSizeMb);
			}
		} catch (err) {
			console.error(`[ERROR_DELETE_PRODUCT_IMAGE]: ${err}`);

			if (typeof err === 'string') {
				if (
					err === 'Image not found.' ||
					err === 'You do not have access to this area'
				) {
					toast.error(err);
				}
			} else {
				toast.error('Something went wrong. Please try again later.');
			}
		}
	};

	const emptyDefaultValues = {
		title: '',
		price: '',
		categoryId: '',
		colorId: '',
		sizeId: '',
		isFeatured: false,
		isArchived: false,
	};
	const defaultValues = {
		id: currentProduct.id,
		title: currentProduct.title,
		price: String(currentProduct.price),
		categoryId: currentProduct.categoryId,
		colorId: currentProduct.colorId,
		sizeId: currentProduct.sizeId,
		isFeatured: currentProduct.isFeatured,
		isArchived: currentProduct.isArchived,
	};

	const form = useForm<z.infer<typeof updateProductValidation>>({
		resolver: zodResolver(updateProductValidation),
		defaultValues,
	});

	const resetFormState = () => {
		form.reset(emptyDefaultValues);
		setPreviews(null);
		setFiles(null);
		setTotalSizeMb(0);
		setImages([]);
	};

	const onSubmit = async (values: z.infer<typeof updateProductValidation>) => {
		const {
			id,
			title,
			price,
			categoryId,
			colorId,
			sizeId,
			isFeatured,
			isArchived,
		} = values;

		if (!files?.length && !images?.length) {
			toast.error('Please select at least one image.');

			return;
		}

		const isProductDataSame =
			currentProduct.title === title &&
			currentProduct.price === Number(price) &&
			currentProduct.categoryId === categoryId &&
			currentProduct.colorId === colorId &&
			currentProduct.sizeId === sizeId &&
			currentProduct.isFeatured === isFeatured &&
			currentProduct.isArchived === isArchived;

		try {
			// There is nothing that needs to be updated, if the data is still the same (except images)
			if (isProductDataSame) {
				if (files?.length && previews?.length) {
					await startUpload(files, {
						productId: currentProduct.id,
					});

					await updateProduct({ onlyUpdateImages: true });
				}

				resetFormState();
				toast.success('Product updated.');
				router.push('/dashboard/products?page=1');

				return;
			}

			if (files?.length && previews?.length) {
				await startUpload(files, {
					productId: currentProduct.id,
				});
			}

			const { success, data } = await updateProduct({
				id,
				title,
				price,
				categoryId,
				colorId,
				sizeId,
				isFeatured,
				isArchived,
			});

			if (success && data) {
				resetFormState();
				toast.success('Product updated.');
				router.push('/dashboard/products?page=1');
			}
		} catch (err) {
			console.error(`[ERROR_UPDATE_PRODUCT]: ${err}`);

			if (typeof err === 'string') {
				if (
					err === 'Product not found.' ||
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
		<>
			<div className='flex flex-col space-y-3'>
				<div className='flex flex-wrap justify-between sm:items-center gap-2.5'>
					<Label
						htmlFor='images'
						className='w-fit'
					>
						Images{' '}
						<Badge className='ml-1.5'>PNG, JPG, JPEG, WEBP - MAX 4MB</Badge>
					</Label>

					<div className='flex gap-2.5'>
						<Button
							size='sm'
							disabled={true}
							className='pointer-events-none'
						>
							{isLoad ? (
								<>{totalSizeMb.toFixed(2)}MB</>
							) : (
								<LoaderCircle className='w-4 h-4 animate-spin mr-1.5' />
							)}{' '}
							/ {MAX_FILE_SIZE_MB.toFixed(2)}MB
						</Button>

						<Dialog>
							<DialogTrigger asChild>
								<Button
									size='sm'
									variant='secondary'
								>
									<Info className='w-5 h-5 text-zinc-500' />
								</Button>
							</DialogTrigger>
							<DialogContent className={inter.className}>
								<DialogHeader className='text-start'>
									<div className='flex flex-col space-y-4'>
										<div className='flex flex-col space-y-1'>
											<DialogTitle>News Flash</DialogTitle>
											<DialogDescription>
												please read this, if you want to know important
												information
											</DialogDescription>
										</div>
										<div className='ps-4'>
											<ul className='list-disc text-sm space-y-1'>
												<li>
													Images that you have deleted are automatically
													permanently deleted from the server
												</li>
												<li>
													The image you just added will not be uploaded to the
													server if you do not press the update button
												</li>
												<li>
													If you delete all the images, the product will
													automatically be archived
												</li>
											</ul>
										</div>
									</div>
								</DialogHeader>
							</DialogContent>
						</Dialog>
					</div>
				</div>

				{images.length || (previews?.length && files?.length) ? (
					<div className='flex flex-wrap gap-5'>
						{previews?.length && files?.length
							? previews.map((preview, previewIndex) => (
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
							  ))
							: null}

						{images.length
							? images.map((image, previewIndex) => (
									<div
										key={previewIndex}
										className='relative w-fit'
									>
										<img
											src={image.url}
											alt='preview img'
											loading='lazy'
											className='w-[220px] h-[220px] rounded-lg object-cover'
										/>

										<div className='absolute top-3 right-3'>
											<Button
												size='sm'
												variant='destructive'
												disabled={isPending || isLoading}
												onClick={() => {
													if (images.length === 1) {
														form.setValue('isArchived', true);
													}

													startTransition(() => {
														if (images.length === 1) {
															updateProduct({
																id: currentProduct.id,
																title: currentProduct.title,
																price: String(currentProduct.price),
																categoryId: currentProduct.categoryId,
																sizeId: currentProduct.sizeId,
																colorId: currentProduct.colorId,
																isFeatured: currentProduct.isFeatured,
																isArchived: true,
																path: pathname,
															});
														}

														const promise = handleDeleteImage(image);
														const msg = {
															loading: 'Deleting image...',
															success: 'Image deleted.',
															error:
																'Something went wrong. Please try again later.',
														};

														toast.promise(promise, msg);
													});
												}}
											>
												<Trash className='w-4 h-4' />
											</Button>
										</div>
									</div>
							  ))
							: null}
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
					disabled={isPending || isLoading}
				/>

				<Button
					className='w-fit'
					variant='secondary'
					disabled={isPending || isLoading}
					onClick={() => fileInputRef.current?.click()}
				>
					<ImagePlus className='mr-1.5 w-4 h-4' />
					{images.length || (files?.length && previews?.length)
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
										<Select
											defaultValue={defaultValues.categoryId}
											onValueChange={field.onChange}
										>
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
										<Select
											defaultValue={defaultValues.colorId}
											onValueChange={field.onChange}
										>
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
										<Select
											defaultValue={defaultValues.sizeId}
											onValueChange={field.onChange}
										>
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
											defaultChecked={defaultValues.isFeatured}
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
											defaultChecked={defaultValues.isArchived}
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
							loadingText='Updated'
							type='submit'
						>
							Update
						</Button>
					</div>
				</form>
			</FormShadcnUI>
		</>
	);
};

export default Form;
