const config = {
  // Ruta base de los archivos de prueba
  roots: ['<rootDir>/src'],

  // Transformar archivos TypeScript y JSX/TSX usando ts-jest
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // Configuración para resolver módulos
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Ignorar ciertos directorios para la ejecución de pruebas
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  // Carga de configuraciones previas a las pruebas
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  // Configuración para archivos estáticos como imágenes o estilos
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__mocks__/fileMock.ts',
  },

  // Salida de cobertura de pruebas
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],

  // Extensiones para los archivos de prueba
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],

  // Especifica el entorno de prueba (browser)
  testEnvironment: 'jsdom',
};

export default config;
