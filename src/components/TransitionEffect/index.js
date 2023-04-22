import React from 'react';
import { motion } from 'framer-motion';

const TransitionEffect = () => {
	return (
		<>
			<motion.div
				className='fixed top-0 z-[99] h-screen w-screen origin-top bg-orange'
				initial={{ scaleY: '0%' }}
				animate={{ scaleY: '0%' }}
				exit={{ scaleY: ['0%', '100%'] }}
				transition={{ duration: 0.8, ease: [1, 0, 0.47, 0.77] }}
			/>
			<motion.div
				className='fixed bottom-0 z-[99] h-screen w-screen origin-bottom bg-orange'
				initial={{ scaleY: '100%' }}
				animate={{ scaleY: '0%' }}
				transition={{ duration: 0.5, ease: [0.365, 0.215, 0.215, 0.955] }}
			/>
			<motion.div
				className='fixed bottom-0 z-[98] h-screen w-screen origin-bottom bg-white'
				initial={{ scaleY: '100%' }}
				animate={{ scaleY: '0%' }}
				transition={{
					delay: 0.1,
					duration: 0.5,
					ease: [0.365, 0.215, 0.215, 0.955],
				}}
			/>
			<motion.div
				className='fixed bottom-0 z-[97] h-screen w-screen origin-bottom bg-gray opacity-95'
				initial={{ scaleY: '100%' }}
				animate={{ scaleY: '0%' }}
				transition={{
					delay: 0.3,
					duration: 0.7,
					ease: [0.365, 0.215, 0.215, 0.955],
				}}
			/>
			{/* <motion.div
				className='fixed top-0 bottom-0 right-full z-30 h-screen w-screen bg-sky-300'
				initial={{ x: '100%', width: '100%' }}
				animate={{ x: '0%', width: '0%' }}
				transition={{ delay: 0.3, duration: 0.6, ease: 'easeInOut' }}
			/> */}
		</>
	);
};

export default TransitionEffect;
