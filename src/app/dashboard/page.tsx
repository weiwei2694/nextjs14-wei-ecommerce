import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { notFound } from 'next/navigation';
import React from 'react';

const Page = async () => {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user || user.email !== process.env.ADMIN_EMAIL) {
		return notFound();
	}

	return <div>Page</div>;
};

export default Page;
