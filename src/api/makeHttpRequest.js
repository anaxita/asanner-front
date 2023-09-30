export const makeHttpRequest = async (method, uri, payload = null) => {
  const accessToken = localStorage.getItem('access_token');

  try {
    const options = {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: payload ? JSON.stringify(payload) : null,
    };

    let responseData;
    const response = await fetch(import.meta.env.VITE_API_URL + uri, options);

    console.log('response.status: ', response.status);
    if (response.status === 401) {
      const refreshResponse = await fetch(import.meta.env.VITE_API_URL + '/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: localStorage.getItem('refresh_token') }),
      });

      if (!refreshResponse.ok) {
        localStorage.clear();
        window.location.href = '/login';
        return;
      }
      const responseData = await response.json();
      localStorage.setItem('refresh_token', responseData.refresh_token);
      localStorage.setItem('access_token', responseData.access_token);

      console.log('retry', method, uri);
      return makeHttpRequest(method, uri, payload);
    }

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
