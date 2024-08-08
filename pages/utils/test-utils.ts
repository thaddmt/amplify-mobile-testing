export function getMockedFunction<T extends (...args: any[]) => any>(fn: T) {
  return fn as jest.MockedFunction<T>;
}
