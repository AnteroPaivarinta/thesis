export const mockObject = {
  get: jest.fn((url) => {
    console.log('=')
    if (url === '/something') {
          return Promise.resolve({
              data: 'data'
          });
      } else {
        return Promise.resolve({
          data: 'data'
      });
      }
  }),
  post: jest.fn((url) => {
      if (url === '/something') {
          return Promise.resolve({
              data: 'data'
          });
      }
      if (url === '/something2') {
          return Promise.resolve({
              data: 'data2'
          });
      }
  })
};


export default () => mockObject;