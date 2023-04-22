import React from 'react';
import PropTypes from 'prop-types';
import NextHead from 'next/head';

export default function Seo({ title, desc, img }) {
	return (
		<NextHead>
			<title>{title}</title>
			<meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
			<meta name='robots' content='max-image-preview:large' />
			<link rel='shortcut icon' href='../../../images/favicon.png' type='image/x-icon' />
			<meta name='title' content={title} />
			<meta name='description' content={desc} />

			<meta property='og:type' content='website' />
			<meta property='og:title' content={title} />
			<meta property='og:description' content={desc} />
			<meta property='og:image' itemProp='image' content={img} />

			<meta property='twitter:card' content='summary_large_image' />
			<meta property='twitter:title' content={title} />
			<meta property='twitter:description' content={desc} />
			<meta property='twitter:image' content={img} />
		</NextHead>
	);
}

Seo.propTypes = {
	title: PropTypes.string.isRequired,
	desc: PropTypes.string,
	img: PropTypes.string,
};
