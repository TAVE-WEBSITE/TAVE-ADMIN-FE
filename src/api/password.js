import client from './client';

export async function postEmailAuth(email, reset = false) {
    try {
        const response = await client.post(
            '/normal/authenticate/email',
            {
                email: email,
                number: '',
            },
            {
                params: { reset },
            }
        );
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function postVerifyAuthCode(nickname, email, number) {
    try {
        const response = await client.post('/normal/verify/number', {
            nickname,
            email,
            number,
        });
        return response;
    } catch (error) {
        return Promise.reject(error.response?.data || error);
    }
}

export async function putResetPassword(nickname, password, validatedPassword) {
    try {
        const response = await client.put('/normal/reset/password', {
            nickname,
            password,
            validatedPassword,
        });
        return response;
    } catch (error) {
        return Promise.reject(error.response?.data || error);
    }
}
