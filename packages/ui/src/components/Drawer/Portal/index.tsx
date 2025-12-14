"use client";

import React, {
  MouseEventHandler,
  ReactNode,
  useEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import styles from "./drawerPortal.module.scss";

const Transition = CSSTransition as any;

interface Props {
  isOpen: boolean;
  onClose?: MouseEventHandler;
  position?: "left" | "right";
  children: ReactNode;
}

const DrawerPortal = ({ isOpen, onClose, children }: Props) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return <></>;
  }

  return (
    <>
      {ReactDOM.createPortal(
        <Transition
          in={isOpen}
          timeout={{ enter: 500, exit: 500 }}
          classNames={{
            enter: styles.drawerEnter,
            enterActive: styles.drawerEnterActive,
            enterDone: styles.drawerEnterDone,
            exit: styles.drawerExit,
            exitActive: styles.drawerExitActive,
            exitDone: styles.drawerExitDone,
          }}
          mountOnEnter
          unmountOnExit
        >
          <aside className={styles.container}>
            <div className={styles.overlay} onClick={onClose} />
            <div className={styles.wrapper}>{children}</div>
          </aside>
        </Transition>,
        document.getElementById("drawer-root") as HTMLDivElement,
      )}
    </>
  );
};

export default DrawerPortal;
