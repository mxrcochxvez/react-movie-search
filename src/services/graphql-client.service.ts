import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { bearerTokenService } from "./bearer-token.service";

const bearerToken = await bearerTokenService.getBearerToken();

const client = new ApolloClient({
	link: new HttpLink({
		uri: 'https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/graphql',
		headers: {
			'Authorization': `Bearer ${bearerToken}`,
		},
	}),
	cache: new InMemoryCache(),
});

export default client;
