"use client";

import React, {
  MouseEventHandler,
  ReactNode,
  useEffect,
  useState,
  useRef,
} from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import styles from "./modalPortal.module.scss";

interface Props {
  isOpen: boolean;
  onClose?: MouseEventHandler;
  children: ReactNode;
}

const ModalPortal = ({ isOpen, onClose, children }: Props) => {
  const [hasMounted, setHasMounted] = useState(false);
  const nodeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <></>;
  }

  return (
    <>
      {ReactDOM.createPortal(
        <CSSTransition
          in={isOpen}
          nodeRef={nodeRef}
          timeout={{ enter: 100, exit: 120 }}
          classNames={{
            enter: styles.modalEnter,
            exit: styles.modalExit,
          }}
          unmountOnExit
        >
          <aside ref={nodeRef} className={styles.container}>
            <div className={styles.overlay} onClick={onClose} />
            <div className={styles.wrapper}>{children}</div>
          </aside>
        </CSSTransition>,
        document.getElementById("modal-root") as HTMLDivElement,
      )}
    </>
  );
};

export default ModalPortal;
