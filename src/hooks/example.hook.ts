import { useState, useEffect } from "react";

export const useExampleHook = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    console.log("Loaded example hook");
  }, []);

  return state;
};
