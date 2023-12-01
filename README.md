
# code-assignment

This assignment creates a carousel of 50 states in the US with following features:

1. A backend database of states in TypeScript
2. A frontend screen using React Native for iOS that has:
   - User can scroll horizontally and navigate through the carousel
   - A progress bar is displayed as user scrolls through the carousel
   - State box selection is highlighted

### To run the project locally:
1. Clone the repository:
```git clone https://github.com/nikita-jare/code-assignment.git```

2. Start the server:
```cd server
npm install
npx tsc
node dist/server.js
```

3. Run the Client:
```cd client/StateCarousel
npm install
npx react-native run-ios
```
