export default function SetHTML({ content, className }) {
	return (
		<div
			className={className}
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	);
}
