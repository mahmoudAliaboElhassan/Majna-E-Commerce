import React, { useCallback, useState } from "react";

function UseDialogeModal(Component) {
  const [open, setOpen] = useState(false);
  const openDialog = useCallback(() => setOpen(true), []);
  const DialogComponent = useCallback(() => {
    if (!open) return null;
    if (Component) {
      return <Component onClose={() => setOpen(false)} {...props} />;
    }
  }, [open, Component]);
  return [DialogComponent, openDialog];
}

export default UseDialogeModal;
