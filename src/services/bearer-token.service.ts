export interface BearerTokenResponse {
	token: string;
}

export const bearerTokenService = {
	getBearerToken,
}

async function getBearerToken(): Promise<string> {
	const repsonse = await fetch('https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/auth/token');

	if (!repsonse.ok) {
		throw new Error(`Failed to fetch bearer token: ${repsonse.status} ${repsonse.statusText}`);
	}

	const data = (await repsonse.json()) as BearerTokenResponse;

	if (!data?.token) {
		throw new Error('Invalid token response');
	}

	return data.token;
}
