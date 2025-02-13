export function asThenable<T>(value: T): Promise<T> {
    return {
      then: (onFulfilled: (value: T) => any, onRejected?: (reason: any) => any) =>
        Promise.resolve(value).then(onFulfilled, onRejected),
      catch: (onRejected?: (reason: any) => any) => Promise.resolve(value).catch(onRejected),
      finally: (onFinally?: () => void) => Promise.resolve(value).finally(onFinally),
      [Symbol.toStringTag]: "Promise",
    } as unknown as Promise<T>;
  }
  