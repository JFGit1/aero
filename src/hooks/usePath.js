import React from 'react';
import { useRouter } from 'next/router';

export const usePath = ({ children, href }) => {
	const router = useRouter();
	const isCurrentPage = router.asPath === href ? 'font-bold' : 'font-normal';

	/* const handleClick = e => {
		e.preventDefault();
		router.push(href);
	}; */

	return <> </>;
};
