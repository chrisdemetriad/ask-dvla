# ASK DVLA

## Overview

The ASK DVLA is a React Native application designed to provide detailed information about vehicles based on their registration numbers. Utilizing a user-friendly interface and efficient API calls, the app offers a convenient way for users to access a variety of vehicle-related data.

## Features

- **Vehicle Data Retrieval**: Users can enter a vehicle's registration number to retrieve and display information such as make, year of manufacture, color, engine capacity, fuel type, and more.
- **Status Checks**: The app provides current MOT (Ministry of Transport test) and tax status of the vehicle, including expiry dates.
- **Navigation**: Implemented using React Navigation with a bottom tab navigator for easy access to different sections of the app.
- **External Linking**: For vehicles not currently taxed, the app offers a direct link to the UK Government's vehicle tax service.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- React Native development environment (including Android Studio or Xcode for emulator/simulator setup)

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:chrisdemetriad/ask-dvla.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ask-dvla
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

### Running the App

1. To start the app in a development environment, run:

   ```bash
   npm start
   ```

   or

   ```bash
   yarn start
   ```

2. To launch the app in an iOS simulator, run:

   ```bash
   npm run ios
   ```

   or

   ```bash
   yarn ios
   ```

3. To launch the app in an Android emulator, run:
   ```bash
   npm run android
   ```
   or
   ```bash
   yarn android
   ```

## Testing

The app will include unit tests written with React Testing Library and eventually end-to-end tests using Detox. To run the tests:

1. For unit tests:
   ```bash
   npm test
   ```
2. For Detox E2E tests:
   ```bash
   detox build -c ios.sim.debug
   detox test -c ios.sim.debug
   ```

## Contributing

Contributions to the ASK DVLA are welcome. Please read our contributing guidelines (coming soon) for details on submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE.md).
