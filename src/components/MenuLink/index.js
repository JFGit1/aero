import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MenuLink({ label, url, ...rest }) {
	const path = usePathname();
	//console.log('path:', path);
	const isCurrentPage = path === url ? 'border-orange' : 'border-transparent';
	const menuDefaultClass =
		'bor border-b-2 py-3 text-black transition-all duration-300 hover:text-orange';

	return (
		<Link
			{...rest}
			href={url}
			scroll={false}
			prefetch={false}
			className={`${menuDefaultClass} ${isCurrentPage}`}>
			{label}
		</Link>
	);
}
