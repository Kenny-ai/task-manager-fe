import React, { useLayoutEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

const ModalLayout = ({ children, onSubmit }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");

  useLayoutEffect(() => {
    setHeight(formRef!.current!.clientHeight / 2 + "px");
    setWidth(formRef!.current!.clientWidth / 2 + "px");
  }, []);

  return (
    <form
      ref={formRef}
      className="max-w-[30rem] w-full h-screen ms:h-fit bg-color-white dark:bg-dark-secondary-bg px-8 py-6 shadow-md rounded-lg ms:absolute"
      // ms:left-[calc(50vw-240px)] ms:top-[calc(50vh-196px)]
      style={{ top: `calc(50vh - ${height})`, left: `calc(50% - ${width})` }}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default ModalLayout;
