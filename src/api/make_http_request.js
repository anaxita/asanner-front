export const makeHttpRequest = async (method, uri, payload = null) => {
    try {
        const options = {
            method: method.toUpperCase(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: payload ? JSON.stringify(payload) : null,
        };

        const response = await fetch(import.meta.env.VITE_API_URL + uri, options);
        const responseData = await response.json();

        if (response.ok) {
            return { data: responseData, error: null };
        } else {
            return { data: null, error: responseData.error || 'Something went wrong.' };
        }
    } catch (error) {
        return { data: null, error: 'An error occurred while making the request.' };
    }
};