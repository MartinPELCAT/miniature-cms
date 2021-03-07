import axios, { Method } from "axios";
import { FormEvent, useRef, useState } from "react";
import { formData2Object } from "src/utils/form-utils";

type FormOptions = { action: string; method: Method };

export const useForm = ({ action, method }: FormOptions) => {
  const ref = useRef<HTMLFormElement>(null);
  const [datas, setDatas] = useState<any>(null);
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    try {
      e.preventDefault();
      const formData = formData2Object(new FormData(e.currentTarget));
      const { data } = await axios({ method, url: action, data: formData });
      setDatas(data);
    } catch (error) {
      setErrors(error);
    }
    setIsLoading(false);
  };

  return { handleSubmit, datas, ref, errors, isLoading };
};
