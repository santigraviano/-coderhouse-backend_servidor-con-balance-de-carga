module.exports = {
  apps: [
    {
      name: 'App #1',
      script: './src/app.js',
      args: "--port=8082"
    },
    {
      name: 'App #2',
      script: './src/app.js',
      args: "--port=8083"
    },
    {
      name: 'App #3',
      script: './src/app.js',
      args: "--port=8084"
    },
    {
      name: 'App #4',
      script: './src/app.js',
      args: "--port=8085"
    }
  ]
}