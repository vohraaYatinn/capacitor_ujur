import {motion} from "framer-motion"

const transition = (OgComponent) => {
    return () => (
        <>
       
        <motion.div
        className="slide-in" initial={{ width: "100%" }} animate={{width: "0" }} exit={{ x:window.innerWidth, transition:{duration: 0.05} }}
        />
         <OgComponent />
        
        </>
        );
}
export default transition;