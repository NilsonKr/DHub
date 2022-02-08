import { useCallback } from 'react';

type DebounceFunction = (...args: any) => void;

export function useDebounce(
	callback: DebounceFunction,
	delay: number,
	ref?: any
): DebounceFunction {
	let debounce: NodeJS.Timeout;
	//Memoized debounce fn
	const fn: DebounceFunction = useCallback(
		(...args) => {
			clearTimeout(debounce);
			debounce = setTimeout(() => {
				callback(args);
			}, delay);
		},
		[ref]
	);

	return fn;
}
