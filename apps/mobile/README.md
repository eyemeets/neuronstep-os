
# NeuronStep App

**NeuronStep** is an AI-powered mobile application that generates, validates, and analyzes educational curricula. Built for students, educators, content creators, and anyone who values structured learning, NeuronStep uses the "gpt-4o-mini" model to create dynamic course content and provide feedback based on educational frameworks like Bloom’s Taxonomy and Cognitive Load Theory.

### Server Repository

The server for this project can be found at the following GitHub repository:

[os-neuronstep-server](https://github.com/eyemeets/os-neuronstep-server)

This repository contains all the necessary backend code and APIs that power the NeuronStep application. Make sure to check the README in the repository for setup instructions, configuration details, and deployment guidelines.

## Features

- **Curriculum Validation:** Verify learning objectives and align them with educational standards.
- **Curriculum Generation:** Automatically generate chapters, subtopics, and assessment strategies.
- **Custom Feedback:** Receive AI-driven recommendations based on Bloom's Taxonomy and Cognitive Load Theory.
- **Mobile Friendly:** Built for mobile devices using React Native and Expo.
- **Real-time User Input Feedback:** Forms with validation using `react-hook-form` and `yup`.

## Technologies Used

- **React Native & Expo** - Framework for building mobile applications.
- **Firebase** - Backend services including authentication, Firestore, and more.
- **TailwindCSS** - Styling for rapid UI development via utility-first CSS.
- **Zustand** - Lightweight state management for authentication and global state.
- **React Native Paper** - Material Design components for React Native.
- **NativeWind** - For integrating TailwindCSS with React Native Paper components.
- **React Hook Form & Yup** - Handling forms and validation.
- **Jest** - Testing framework with support for Expo and TypeScript.

### Key Dependencies:

- `@react-navigation/native` and `@react-navigation/stack` for app navigation.
- `react-native-paper` for material UI components.
- `firebase` for backend functionality.
- `expo` and various Expo tools (e.g., `expo-font`, `expo-splash-screen`) for mobile development.
- `zustand` for managing global state.

## Prerequisites

- **Node.js** (v16+)
- **pnpm** as the package manager (or npm/yarn).

## Getting Started

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/eyemeets/express-ts-starter.git
   cd express-ts-starter
```

2. Install dependencies:

```bash
   pnpm install
```

3. Start the development server:

```bash
   pnpm start
```

### Running on Specific Platforms:

- Android: \`pnpm android\`
- iOS: \`pnpm ios\`
- Web: \`pnpm web\`

### Build the Project:

```bash
pnpm build
```

## File Structure

```bash
app/
  ├── _layout.tsx               # Main layout for the app
  └── auth/                     # Authentication views
       ├── login.tsx            # Login screen
       ├── register.tsx         # Registration screen
  └── user/                     # User views
       ├── objective.tsx           # Objective screen
       ├── chapters.tsx         # Chapters view
       └── content.tsx          # Course content view

assets/
  └── fonts/                    # Custom fonts (Excon, Lora, Outfit)

css/
  └── fonts.ts                  # Font configuration file
```

### Firebase Configuration

Make sure to configure Firebase correctly in \`fb.config.ts\`:

```ts
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

## Scripts

- \`pnpm start\`: Start the development server.
- \`pnpm reset-project\`: Reset the project by clearing caches.
- \`pnpm android\`: Run the app on an Android emulator/device.
- \`pnpm ios\`: Run the app on an iOS simulator/device.
- \`pnpm web\`: Start the web version of the app.
- \`pnpm test\`: Run unit tests.

## Custom Components

- **Custom Button** - Dynamic button component supporting theming and className prop.
- **Custom Dialog** - Reusable dialog component for displaying dynamic messages (errors, confirmation).
- **Custom Helper Text** - Animated text that smoothly handles keyboard interactions.

## Testing

The project uses **Jest** and **Expo** for testing. To run tests:

```bash
pnpm test
```

## Contributing

We welcome contributions! Feel free to submit a pull request or reach out for discussions or improvements.
