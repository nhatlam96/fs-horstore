module.exports = {
  // ... andere Jest-Konfigurationsoptionen ...
  transformIgnorePatterns: [
    '/node_modules/(?!@ngrx|ngx-socket-io)',
  ],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
      // Fügen Sie die folgende Option hinzu
      esModuleInterop: true,
    },
  },
};
