import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { GridPattern } from '@/components/GridPattern'
import { SectionHeading } from '@/components/SectionHeading'
import authorImage from '@/images/me.png'

function GithubIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" color="black"  {...props}><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
  )
}

export function Author() {
  return (
    
    <section className="flex justify-center items-center h-screen ">

    <div className="absolute inset-x-0 bottom-0 top-1/2 text-black [mask-image:linear-gradient(transparent,white)]">
      <GridPattern x="50%" y="100%" />
    </div>

    <div className=" mx-auto max-w-4xl pt-16 px-3 mt-40 mb-32 sm:px-6 sm:mt-0 sm:mb-0">

      <div className=" mb-5 mt-5 sm:mb-0 relative h-full bg-transparent before:rounded-3xl before:sm:rounded-6xl  before:absolute before:inset-0  before:border-2 before:hover:bg-transparent before:border-transparent ">



        <div className="bg-gray-100 border border-2 border-black pt-px rounded-3xl  md:rounded-4xl transition  shadow-[5px_5px_0px_0px_rgba(0,0,0,90.0)] sm:shadow-[13px_13px_0px_0px_rgba(0,0,0,90.0)]">



          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}
 initial={{ scale: 2 }}
 animate={{ rotate: 0, scale: 1 }}
 transition={{
   type: "spring",
   stiffness: 160,
   damping: 40
 }}
  className="relative mx-auto -mt-16 h-44 w-44 overflow-hidden rounded-full bg-slate-200 md:float-right md:h-64 md:w-64 md:[shape-outside:circle(40%)] lg:mr-20 lg:h-60 lg:w-60">
            <Image
              className="absolute inset-0 h-full w-full object-cover"
              src={authorImage}
              alt=""
              sizes="(min-width: 1024px) 18rem, (min-width: 768px) 16rem, 11rem" />
          </motion.div>


          <motion.div initial={{ scale: 0 }}
 animate={{ rotate: 0, scale: 1 }}
 transition={{
   type: "spring",
   stiffness: 260,
   damping: 40
 }} className="mt-0 sm:mt-4 px-4 py-10 sm:px-10 sm:py-16 md:py-20 lg:px-20 lg:py-6">


            <SectionHeading number="IP" id="author-title">
              127.0.0.1
            </SectionHeading>
            <p className="mt-8 font-display text-5xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              <span className="block text-blue-600">I'am Mishab –</span>Well, now you can call<br></br>me a dev😜
            </p>
            <p className="mt-4 text-lg tracking-tight text-slate-700 text-2xl">
              I have archived many skills including digital content designing, web/app designing and development and many more...


            </p>
            {/* <p className="mt-8 mb-0 sm:mb-5">
              <Link
                href="https://github.com/imishab" target="_blank"
                className="inline-flex items-center text-base font-medium tracking-tight"
              >
                <GithubIcon className="h-10 w-10 fill-current" />
                <span className="ml-4 text-black">Follow on Github</span>
              </Link>
            </p> */}

<a
  className="group mt-6 mb-0 w-full sm:mb-5 relative rounded-lg  inline-block focus:outline-none focus:ring"
  href="https://poki.com/" target="_blank"
>
  <span
    className="absolute inset-0 translate-x-0 translate-y-0 rounded-lg  bg-blue-400 transition-transform group-hover:translate-y-2 group-hover:translate-x-2"
  ></span>

  <span
    className="relative inline-block w-full rounded-lg bg-black  px-8 py-3 text-sm font-bold tracking-widest"
  >
   <center>Let's Have Some Fun?</center>
  </span>
</a>
          </motion.div>
        </div>



      </div>

    </div>
  </section>
  )
}
