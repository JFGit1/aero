import { motion } from 'framer-motion';

const LayoutMotion = ({ children }) => (
	<>
		<motion.div
			initial={{ y: -300 }}
			animate={{ y: 0 }}
			exit={{ y: 400 }}
			transition={{ ease: [0.46, 0.03, 0.52, 0.96], duration: 1 }}>
			{children}
		</motion.div>
	</>
);
export default LayoutMotion;
