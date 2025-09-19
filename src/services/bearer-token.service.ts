export interface BearerTokenResponse {
	token: string;
}

const endpoint = 'https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/auth/token';

export class BearerTokenService {
	#endpoint: string;

	constructor(endpoint: string) {
		this.#endpoint = endpoint;
	}

	async getBearerToken(): Promise<string> {
		const response = await fetch(this.#endpoint);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch bearer token: ${response.status} ${response.statusText}`
			);
		}

		const data = (await response.json()) as BearerTokenResponse;

		if (!data?.token) {
			throw new Error('Invalid token response');
		}

		return data.token;
	}
}

export const bearerTokenService = new BearerTokenService(endpoint);
