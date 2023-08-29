export const makeHttpRequest = async (method, uri, payload = null) => {
  try {
    const options = {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: payload ? JSON.stringify(payload) : null,
    };

    let responseData;
    const response = await fetch(import.meta.env.VITE_API_URL + uri, options);

    if (response.headers.get('Content-Type') === 'application/json') {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    if (response.ok) {
      return { data: responseData, error: null, status: response.status };
    } else {
      return { data: null, error: responseData.error || 'Something went wrong.', status: response.status };
    }
  } catch (error) {
    console.log('error: ', error);
    return { data: null, error: 'Something went wrong.' };
  }
};
