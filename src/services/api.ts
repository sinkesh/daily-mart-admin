export {};

export const api = {
  get: (url: string) => {
    console.log(`GET ${url}`);
    return Promise.resolve({ data: [] });
  },
  post: (url: string, body: any) => {
    console.log(`POST ${url}`, body);
    return Promise.resolve({ data: body });
  },
};
