import { motion } from 'framer-motion';

const pageVariants = {
    initial: {
        opacity: 0,
        y: 10,
        scale: 0.98,
    },
    in: {
        opacity: 1,
        y: 0,
        scale: 1,
    },
    out: {
        opacity: 0,
        y: -10,
        scale: 1.02,
    },
};

const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.3,
};

export default function PageTransition({ children }) {
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="h-full w-full"
        >
            {children}
        </motion.div>
    );
}
