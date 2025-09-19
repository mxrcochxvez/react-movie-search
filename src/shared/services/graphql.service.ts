import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { bearerTokenService } from "./bearer-token.service";

const URI = "https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/graphql";

export class GraphQLService {
	private bearerToken: string;
	private client: ApolloClient;

	constructor(bearerToken: string, uri: string) {
		this.bearerToken = bearerToken;

		this.client = new ApolloClient({
			link: new HttpLink({
				uri,
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}),
			cache: new InMemoryCache(),
		});
	}

	async query<T>(options: ApolloClient.QueryOptions) {
		try {
			return await this.client.query<T>(options);
		} catch (err: any) {
			if (this.isUnauthorizedError(err)) {
				this.bearerToken = await bearerTokenService.getBearerToken();
				this.resetClient();

				return this.client.query<T>(options);
			}
			throw err;
		}
	}

	private isUnauthorizedError(err: any): boolean {
		return (
			err?.networkError?.statusCode === 401 ||
			err?.message?.toLowerCase().includes("unauthorized")
		);
	}

	private resetClient() {
		this.client = new ApolloClient({
			link: new HttpLink({
				uri: URI,
				headers: {
					Authorization: `Bearer ${this.bearerToken}`,
				},
			}),
			cache: new InMemoryCache(),
		});
	}
}

const bearerToken = await bearerTokenService.getBearerToken();
export const graphqlService = new GraphQLService(bearerToken, URI);
