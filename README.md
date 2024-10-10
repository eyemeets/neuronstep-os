
# NeuronStep Open Source

This is the **monorepo** for the **NeuronStep** project, which includes both the [**NeuronStep Mobile App**](./apps/mobile) and the [**NeuronStep Server**](./apps/backend).

NeuronStep is a Retrieval Augmented Generation (RAG) system that validates course requests, analyzes them, and generates complete curricula. It creates curriculum plans with topics, subtopics, and content blocks tailored to any language, learning preference, or style, allowing users to fine-tune courses to their specific needs.

The monorepo structure allows for shared development between the mobile app and server, leveraging common packages and ensuring consistency across the project.

## Monorepo Structure

```
root/
├── apps/
│   ├── mobile/          # NeuronStep mobile app built with React Native and Expo
│   └── backend/         # NeuronStep server using Express for API and backend services
├── packages/            # Shared components, utilities, and services across mobile and server
├── README.md            # This file
```

## Features

### Mobile App (NeuronStep Mobile)
- **React Native** & **Expo**: Cross-platform mobile app framework.
- **Firebase**: For authentication, Firestore, and other backend services.
- **TailwindCSS**: Utility-first CSS for React Native with NativeWind.
- **Zustand**: Lightweight state management.
- **React Native Paper**: Material Design components.

### Server (NeuronStep Backend)
- **Node.js & Express**: Backend framework handling APIs and server logic.
- **OpenAI API**: For AI-based course generation, validation, and analysis.
- **Replicate**: Stable Diffusion-based image generation.
- **Zod**: Type-safe schema validation for incoming API requests.
- **Tesseract.js**: OCR processing for document analysis.
- **PDF-Parse**: Extracting content from PDF files.

## Prerequisites

- **Node.js** (v16+)
- **pnpm** as the package manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/eyemeets/neuronstep-os.git
cd neuronstep-os
```

2. Install dependencies using `pnpm`:

```bash
pnpm install
```

## Running the Apps

### Mobile App

1. Navigate to the `apps/mobile` directory:

```bash
cd apps/mobile
```

2. Start the Expo development server:

```bash
pnpm start
```

3. To run the app on a specific platform:

```bash
pnpm android  # for Android
pnpm ios      # for iOS
pnpm web      # for Web
```

### Server

1. Navigate to the `apps/server` directory:

```bash
cd apps/server
```

2. Start the development server:

```bash
pnpm dev
```

The server will be running at `http://<your-ip>:8080`.

## Shared Packages

The `packages` directory contains shared utilities, components, or configurations that are used across both the mobile and server applications. This ensures code reusability and consistency.

## Environment Variables

Both the mobile app and server require environment variables for API keys (e.g., OpenAI, Replicate, Firebase). Ensure to add the required variables to the respective `.env` files in each app.

- **Mobile**: `apps/mobile/.env`
- **Server**: `apps/server/.env`

Example for OpenAI in the server's `.env` file:

```bash
OPENAI_API_KEY=your-api-key
```

## Testing

This monorepo uses **Vitest** for server testing and **Jest** for mobile app testing.

### Running Tests

To run server tests:

```bash
cd apps/server
pnpm test
```

To run mobile app tests:

```bash
cd apps/mobile
pnpm test
```

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue for discussion.

## License

This project is open-source under the ISC License.
