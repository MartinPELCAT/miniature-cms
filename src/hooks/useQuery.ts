import { AxiosPromise } from "axios";
import { useEffect, useState } from "react";

type FetchFunction = () => AxiosPromise<any>;
type HookOpts = {};

export const useQuery = <T>(query: FetchFunction, _options?: HookOpts) => {
  const [loading, setLoading] = useState(false);
  const [datas, setDatas] = useState<T | null>(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    fetchFunction();
  }, []);

  const fetchFunction = async () => {
    try {
      setLoading(true);
      const { data } = await query();
      setDatas(data);
    } catch (error) {
      setErrors(error);
    }
    setLoading(false);
  };

  return { loading, datas, errors };
};
