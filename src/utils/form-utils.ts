export const formData2Object = (datas: FormData) => {
  const obj: { [key: string]: any } = {};
  datas.forEach((val, key) => (obj[key] = val));
  return obj;
};

export const generateFormDatas = <T>(form: HTMLFormElement) => {
  const formData = new FormData(form);
  return formData2Object(formData) as T;
};
