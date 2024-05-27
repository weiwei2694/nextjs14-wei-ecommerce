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
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

import { updateCategoryValidation } from '../../_utils/validations';
import { updateCategory } from '../../_utils/actions';

import type { Category } from '@prisma/client';

import { toast } from 'sonner';

import { useUploadThing } from '@/lib/uploadthing';

import { ImagePlus, Trash } from 'lucide-react';

const Form = ({ category: currentCategory }: { category: Category }) => {
	const router = useRouter();

	const [showCurrentImage, setShowCurrentImage] = React.useState<boolean>(true);
	const [file, setFile] = React.useState<File | null>(null);
	const [preview, setPreview] = React.useState<string | null>(null);
	const fileInputRef = React.useRef<HTMLInputElement | null>(null);

	const { startUpload } = useUploadThing('imageOne');

	const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
		const currentFile = e.target.files?.[0];
		if (!currentFile) return null;

		if (currentFile.size < 4 * 1024 * 1024) {
			setPreview(URL.createObjectURL(currentFile));
			setFile(currentFile);
		} else {
			toast.error('Maximum file size is 4MB');
		}
	};

	const emptyDefaultValues = {
		id: '',
		name: '',
		title: '',
	};
	const defaultValues = {
		id: currentCategory.id,
		name: currentCategory.name,
		title: currentCategory.title,
	};

	const resetForm = () => {
		form.reset(emptyDefaultValues);
		setFile(null);
		setPreview(null);
		setShowCurrentImage(false);
	};

	const form = useForm<z.infer<typeof updateCategoryValidation>>({
		resolver: zodResolver(updateCategoryValidation),
		defaultValues,
	});

	const onSubmit = async (values: z.infer<typeof updateCategoryValidation>) => {
		const { name, title } = values;

		if (!showCurrentImage && !file && !preview) {
			toast.error('Please select an image.');

			return;
		}

		// There is nothing that needs to be updated, if the data is still the same
		if (
			name === currentCategory.name &&
			title === currentCategory.title &&
			showCurrentImage
		) {
			resetForm();

			toast.success('Category updated.');
			router.push('/dashboard/categories?page=1');

			return;
		}

		try {
			let url: string = currentCategory.billboard; // default url
			if (file && preview) {
				const res = await startUpload([file!]);
				url = res?.[0].url as string;
			}

			const { success, data } = await updateCategory({
				id: currentCategory.id,
				name,
				url,
				title,
			});

			if (success && data) {
				resetForm();

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
		<>
			<div className='flex flex-col space-y-3'>
				<Label
					htmlFor='images'
					className='w-fit'
				>
					Images{' '}
					<Badge className='ml-1.5'>PNG, JPG, JPEG, WEBP - MAX 4MB</Badge>
				</Label>

				{file && preview ? (
					<div className='relative w-fit'>
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
								onClick={() => {
									setFile(null);
									setPreview(null);
								}}
							>
								<Trash className='w-4 h-4' />
							</Button>
						</div>
					</div>
				) : null}

				{showCurrentImage && currentCategory.billboard ? (
					<div className='relative w-fit'>
						<img
							src={currentCategory.billboard}
							alt='preview img'
							className='w-[220px] h-[220px] rounded-lg object-cover'
						/>

						<div className='absolute top-3 right-3'>
							<Button
								size='sm'
								variant='destructive'
								disabled={isLoading}
								onClick={() => setShowCurrentImage(false)}
							>
								<Trash className='w-4 h-4' />
							</Button>
						</div>
					</div>
				) : null}

				<input
					type='file'
					hidden
					accept='image/png, image/jpg, image/jpeg, image/webp'
					id='images'
					name='images'
					multiple={false}
					onChange={handlePreview}
					ref={fileInputRef}
				/>

				<Button
					className='w-fit'
					variant='secondary'
					disabled={isLoading}
					onClick={() => fileInputRef.current?.click()}
				>
					<ImagePlus className='mr-1.5 w-4 h-4' />
					Upload an Image
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
