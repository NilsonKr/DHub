import React from 'react';
//UI
import { motion, Variants } from 'framer-motion';
import { Box } from '@chakra-ui/react';

const variants: Variants = {
  hidden: {
    opacity: 0,
    translateY: '50px',
  },
  entrance: {
    opacity: 1,
    translateY: '0px',
    transition: {
      delay: 0.3,
      duration: 1,
    },
  },
};

export const ConnectAnimation = (Component: React.FC<any>): React.FC<any> => {
  return (props) => {
    return (
      <Box
        position='absolute'
        top='100px'
        left='50%'
        transform='translateX(-50%)'
        minW='65%'
        zIndex='1'
      >
        <motion.div variants={variants} animate='entrance' initial='hidden'>
          <Component {...props} />
        </motion.div>
      </Box>
    )
  }
}
