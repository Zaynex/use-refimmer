import produce, { Draft } from "immer";
import { useState, useCallback, useRef } from "react";

export function useRefImmer<S = any>(initialValue: S) : [{current: S}, (f: (draft: Draft<S>) => void | S) => void]

export function useRefImmer(initValue) {
  const [val, updateValue] = useState(initValue);
  const refValue = useRef(val);
  return [
    refValue,
    useCallback(update => {
      const newValue = produce(refValue.current, update);
      refValue.current = newValue;
      updateValue(newValue);
    }, [])
  ];
}