import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { bearerTokenService } from "./bearer-token.service";

export class GraphQLService {
	bearerToken: string;
	client: ApolloClient;
	query: ApolloClient['query'];
	mutate: ApolloClient['mutate'];

	constructor(bearerToken: string) {
		this.bearerToken = bearerToken;

		this.client = new ApolloClient({
			link: new HttpLink({
				uri: "https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/graphql",
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}),
			cache: new InMemoryCache(),
		});

		this.query = this.client.query.bind(this.client);
		this.mutate = this.client.mutate.bind(this.client);
	}
}

const bearerToken = await bearerTokenService.getBearerToken();
export const graphqlService = new GraphQLService(bearerToken);
