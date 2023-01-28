export const signIn = (email: string, password: string) => {
    return fetch(`${process.env.REACT_APP_API_URL}/auth/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.accessToken) {
                localStorage.setItem('user', JSON.stringify(data));
            }
            return data;
        });
}