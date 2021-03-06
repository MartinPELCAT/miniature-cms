export const formData2Object = (datas: FormData) => {
  const obj: { [key: string]: any } = {};
  datas.forEach((val, key) => (obj[key] = val));
  return obj;
};
