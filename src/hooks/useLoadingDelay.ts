import { useEffect, useState } from "react";

const useLoadingDelay = () => {
  const [loading, setLoading] = useState(true);

  const delay = (delay: number) => {
    return new Promise((resolve) => setTimeout(resolve, delay));
  };

  useEffect(() => {
    (async () => {
      await delay(500);
      setLoading(false);
    })();
  }, []);

  return loading;
};

export default useLoadingDelay;
