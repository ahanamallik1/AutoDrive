import { useState } from "react";

// Custom hook to manage the visibility state of a suggestion list.
export const useSuggestedList = () => {
  const [show, setShow] = useState(false);
  const showList = () => setShow(true);
  const hideList = () => setShow(false);
  return { show, setShow, showList, hideList };
};
