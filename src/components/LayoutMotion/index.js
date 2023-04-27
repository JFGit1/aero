import { motion } from 'framer-motion';

const LayoutMotion = ({ children }) => (
	<motion.div
		initial={{ delay: 1, y: -20, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		exit={{ y: 20, opacity: 0 }}
		transition={{ ease: 'easeInOut', duration: 0.3 }}>
		{children}
	</motion.div>
);
export default LayoutMotion;
