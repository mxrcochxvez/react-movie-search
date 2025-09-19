# React Movie Search
This project is deployed using [Netlify](https://netlify.com/) @ [React Movie Search](https://marco-react-movies-search.netlify.app/).

## Running the Project

1. Clone the repo	
	 ```bash
	 git clone https://github.com/mxrcochxvez/react-movie-search.git
	 cd react-movie-search
	```
2. Install Dependencies
	```bash
	npm install
	```
3. Run the Dev server
	```bash
	npm run dev
	```
4. Visit [http://localhost:3000](http://localhost:3000)

## What I'm Most Proud Of

- **Architecture clarity**: Separating `movies/` and `shared/` showed a scalable approach while still keeping things lightweight.
- **Clean UI components**: I kept the UI functional but made sure the layout and cards were easy to scan, with hover effects and gradient overlays for readability.
- **Reusable GraphQL service**: I abstracted the Apollo client into a reusable service, which makes the app more flexible if endpoints or auth flows change.
- **Testability with Singletons**: I used the singleton pattern for service classes (e.g. `MoviesService`, `GraphQLService`), which makes them easy to inject,
mock, or replace in tests without rewriting client code. This helps ensure the architecture is both maintainable and test-friendly as the project grows.
- **Choosing GraphQL over REST**: I opted for the GraphQL API because it is more type-explicit and pairs well with TypeScript. It also scales well, is fast,
and gave me more precise control over the data being fetched. An added benefit was that it allowed me to bypass some of the automatic caching behaviors of
Next.js's [`fetch` API](https://nextjs.org/docs/app/api-reference/functions/fetch), making my data flow more predictable.

## What I struggled with & learned
I struggled with preserving query parameters across pagination and filtering. Initially, navigating to the next page would clear the search or genre filters.
Debugging this taught me how to properly use `URLSearchParams` in Next.js to carry state through the URL. This was a simple but important lesson in building stateful websites with the App Router.

I also didn't know I needed to update the Next.js config for CDN images. At first, images from external sources (like Amazon's CDN) would fail because their hostnames weren't
whitelisted. Fixing this in `next.config.js` was a good reminder that frameworks often enforce some defaults for app security, and you need to explicitly configure them for real-world APIs.

Lastly realizing that in Next.js App Router, `searchParams` is async and needs to be `await`ed. It's such a small detail and only resulted in console warnings, but it tripped me up until I
dug deeper into the docs. It reminded me how important it is to slow down and read the framework-specific differences when jumping into new patterns.

## Project Structure

For this project, part of the architecture is already clearly defined in the [nextjs](https://nextjs.org/docs) documentation. I decided
to opt for bootstrapping the project using `npx create` with the the new [app router](https://nextjs.org/docs/app) for the architecture. In nextjs
there are multiple ways to handle page-routing, but I decided to have some fun and try out the new (but suggested) way of accomplishing routing
with the app router.

Here's a project overview:

- app
	- layout.tsx - Root layout
	- page.tsx - Home page
	- globals.css - Global styles

- public - Static assets

- src
	- movies - Movies feature
		- components - Movie UI (card, grid, filter)
		- services - Business logic (movies.service.ts)
		- queries - GraphQL queries
		- types - TypeScript models
	- shared - Reusable modules
		- components - Generic UI (pagination, navbar)
		- services - Core services (auth, GraphQL client)

### Why This Structure?

I opted for a **domain-first architecture**. Instead of lumping all components and services together, each domain (like `movies/`) owns its:

- **components** (UI specific to movies),
- **queries** (GraphQL queries relevant to movies),
- **services** (business logic and API access),
- **types** (strong TypeScript models).

This makes the codebase more modular and scalable. For example, if I added `users/` or `reviews/`, they'd follow the same pattern, which keeps things consistent.

The `shared/` folder contains shared content such as generic components like the Navbar and Pagination with core services like the GraphQL client and the bearer token service.
This helps developers understand that there is __shared__ logic/visuals that would need to be used across the application.

---

## Scalability & Trade-offs

- **Scales well with new features**: Adding a new domain like `reviews` or `auth` doesn't affect existing modules.
- **Clear separation**: `movies/` is client-facing, while `shared/` leans more server-side (services, authentication).
- **Trade-off**: For a small project, this feels like "over-engineering".

---

## Next Improvements

- **Better auth handling**: Right now, bearer token fetching is done at server initialization. I'd want to add a retry/refresh mechanism so the app never breaks if the token expires.
- **Improved pagination**: Right now, the total count is inferred from the length of the returned nodes. Ideally, I'd fetch the total count from the API to display “Page X of Y.”
- **UI polish**: Add skeleton loaders and error states for a smoother user experience.
- **Testing**: Introduce unit tests for services and integration tests for search + filter workflows.
- **GraphQL Codegen**: Automate type generation from the schema to avoid manually maintaining `movies.types.ts`.
