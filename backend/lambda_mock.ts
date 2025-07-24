export const createMockRes = () => {
  return {
    statusCode: 200,
    body: '',
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(data: any) {
      this.body = JSON.stringify(data);
    },
  };
}

export const formatRes = (res: any) => {
  return {
    statusCode: res.statusCode || 200,
    body: JSON.stringify(res.data),
    headers: { 'Content-Type': 'application/json' },
  };
}

