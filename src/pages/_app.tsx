import { motion, AnimatePresence } from 'framer-motion'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import router, { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AnimatePresence mode='wait'>
      <motion.div
           key={router.route}
            initial="initialState"
            animate="animateState"
            exit="exitState"
            transition={{
              duration: 0.95,
            }}
            variants={{
              initialState: {
                opacity: 0,
              },
              animateState: {
                opacity: 1,
              },
              exitState: {
                backgroundColor: 'white',
                filter: `invert()`,
                opacity: 0
              },
            }}
      >

   <Component {...pageProps} />
   </motion.div>
   </AnimatePresence>
  )
}
