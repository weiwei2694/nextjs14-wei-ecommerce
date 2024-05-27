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

import { saveCategoryValidation } from '../_utils/validations';
import { saveCategory } from '../_utils/actions';

import { toast } from 'sonner';

import { useUploadThing } from '@/lib/uploadthing';

import { ImagePlus, Trash } from 'lucide-react';

const Form = () => {
	const router = useRouter();

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

	const defaultValues = {
		name: '',
		title: '',
	};

	const form = useForm<z.infer<typeof saveCategoryValidation>>({
		resolver: zodResolver(saveCategoryValidation),
		defaultValues,
	});

	const onSubmit = async (values: z.infer<typeof saveCategoryValidation>) => {
		const { name, title } = values;

		if (!file) {
			toast.error('Please select an image.');

			return;
		}

		try {
			const res = await startUpload([file]);
			const url = res?.[0].url as string;

			const { success } = await saveCategory({ name, title, url });

			if (success) {
				form.reset(defaultValues);
				setFile(null);
				setPreview(null);

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
