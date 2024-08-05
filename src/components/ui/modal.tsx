import { motion, AnimatePresence } from "framer-motion";
import { Fragment } from "react";

const Modal = ({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  return (
    <AnimatePresence>
      {open && (
        <Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed h-dvh w-full top-0 left-0 bg-black bg-opacity-60 z-[61]"
            onClick={() => setOpen(false)}
          />
          {children}
        </Fragment>
      )}
    </AnimatePresence>
  );
};

export default Modal;
