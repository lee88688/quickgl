import * as timeoutApi from '../src/polyfill/setTimeout';

describe('setTimeout', () => {
  beforeAll(() => {
    (global as any).timeoutArr = [];
  });

  it('setTimeout', async () => {
    let done = false;
    timeoutApi.setTimeout(() => {
      done = true;
    }, 100);

    await new Promise(resolve => {
      setTimeout(() => {
        const executed = timeoutApi.execTimeoutFn();
        expect(executed).toBe(true);
        resolve(null);
      }, 100);
    });

    expect(done).toBe(true);
  });

  it('setTimeout 0', async () => {
    let done = false;
    timeoutApi.setTimeout(() => {
      done = true;
    }, 0);

    await new Promise(resolve => {
      setTimeout(() => {
        const executed = timeoutApi.execTimeoutFn();
        expect(executed).toBe(true);
        resolve(null);
      }, 0);
    });

    expect(done).toBe(true);
  });

  it('clearTimeout', async () => {
    let done = false;
    const timeout = timeoutApi.setTimeout(() => {
      done = true;
    }, 100);

    await new Promise(resolve => {
      setTimeout(() => {
        const executed = timeoutApi.execTimeoutFn();
        expect(executed).toBe(false);
        timeoutApi.clearTimeout(timeout);
        resolve(null);
      }, 50);
    });

    await new Promise(resolve => setTimeout(() => {
      const executed = timeoutApi.execTimeoutFn();
      expect(executed).toBe(false);
      resolve(null);
    }, 51));

    expect(done).toBe(false);
  });
});