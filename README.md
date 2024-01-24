# Smart Lightbulb Demo

This project demonstrates the evolution of a **lightbulb** as it grows in features and complexity. Each demo is accompanied with its corresponding **state machine**, which were created using the [Stately Studio](https://stately.ai), and are executed using [XState v5](https://stately.ai/docs/xstate).

## Links

- **Demo** : https://smart-lightbulb-demo.vercel.app/
- **State Machines** : https://stately.ai/registry/editor/4930e058-cdd2-411a-b414-0cb922713a48

## Development

### Install dependencies

```sh
pnpm install
```

Installs the required dependencies for project development.

### Run development server

```sh
pnpm dev
```

Starts [Vite](https://vitejs.dev/) dev server in the current directory and enters watch mode.

### Building & previewing project

```sh
pnpm build
```

Builds the project and outputs to the `./dist` folder.

```sh
pnpm preview
```

Locally runs the production build from its `./dist` folder.

## Testing

The project is configured with [Vitest](https://vitest.dev) on a bare minimal setup, for demo purpose.

Only the first version of the smart lightbulb machine has tests, which were generated in most part by the Stately Studio.

### Run tests locally

```sh
pnpm test
```

## Deployment

Deployment is automated with [Vercel](https://vercel.com).
