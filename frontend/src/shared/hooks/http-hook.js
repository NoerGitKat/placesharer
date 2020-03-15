import { useState, useCallback, useRef, useEffect } from 'react';

const useHttpRequest = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	// Cancel ongoing HTTP Requests
	const activeHttpRequests = useRef([]);

	const sendRequest = useCallback(async (url, method = 'GET', body, headers = {}) => {
		setIsLoading(true);
		try {
			// Add signal to ref
			const httpAbortCtrl = new AbortController();
			activeHttpRequests.current.push(httpAbortCtrl);

			const response = await fetch(url, { method, body, headers, signal: httpAbortCtrl.signal });

			const responseData = await response.json();

			if (!response.ok) {
				setIsLoading(false);
				throw new Error(responseData.msg);
			}
			setIsLoading(false);

			return responseData;
		} catch (err) {
			setIsLoading(false);
			setError(err.message || 'Something went wrong, please try again');
			return error;
		}
	}, []);

	const clearError = () => {
		setError(null);
	};

	useEffect(() => {
		// Clean up function
		return () => {
			// Aborts after every signal
			activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
		};
	}, []);

	return { isLoading, error, clearError, sendRequest };
};

export default useHttpRequest;
