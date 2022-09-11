const checkKeyLength = (key: string, value: any, limit: number) => {
  let result;
  if (typeof value != `string`) {
    result = { status: 400, message: `${key} has an invalid type` };
  }
  if (value.length > limit) {
    result = { status: 413, message: `${key} length too large` };
  }

  return result;
};

export default checkKeyLength;
