import * as React from 'react';

export function useLocalStorageState<State>(
  key: string,
  initialState: State,
  {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  } = {},
) {
  const [state, setState] = React.useState(() => {
    const init = typeof initialState === 'function' ? initialState() : initialState;
    try {
      const valueInLocalStorage = window.localStorage.getItem(key);
      return valueInLocalStorage
        ? deserialize(valueInLocalStorage)
        : init;
    } catch (error) {
      return init;
    }
  });

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState] as const;
}
