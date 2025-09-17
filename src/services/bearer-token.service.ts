interface BearerToken {
	token: string
}

export const bearerTokenService = {
	getBearerToken,
}

function getBearerToken(): Promise<BearerToken> {
	return fetch('https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/auth/token')
		.then(response => response.json());
}
