import { useCallback, useState } from "react";

// use for browser tab-only session
// do not use for secure sites
// use only for testing purpose

function useLocalStore (key, initialValue = null) {
	const [ storedValue, setStoredValue ] = useState (() => {
		// lazy evaluation on mount
		try {
			const currentValue = window.localStorage.getItem (key);
			return currentValue ? JSON.parse (currentValue) : initialValue;
		} catch (error) {
			return initialValue;
		}
	});

	// memoized setter with updater-function support
	const setLocalStoreValue = useCallback ((input) => {
		try {
			// allow input value to be a function
			// so we have the same API as useState's setter
			// direct: setLocalStorageValue (value)
			// using updater pattern: setLocalStorageValue (value => value + 1)
			const item = (typeof input === "function") ? input (storedValue) : input;

			// Update React state
			setStoredValue (item);

			// Update local storage
			if (typeof window !== 'undefined') {
				window.localStorage.setItem (key, JSON.stringify (item));
			}
		} catch (error) {
			console.log ("error@hook-useLocalStorage-set:", error?.message);
		}
	}, [key, storedValue]);

	function unsetLocalStoreValue () {
		try {
			// Update React state
			setStoredValue (initialValue);

			// Update local storage
			if (typeof window !== 'undefined') {
				window.localStorage.removeItem (key);
			}
		} catch (error) {
			console.log ("error@hook-useLocalStorage-unset:", error?.message);
		}
	}

	return [ storedValue, setLocalStoreValue, unsetLocalStoreValue ];
}

export default useLocalStore;