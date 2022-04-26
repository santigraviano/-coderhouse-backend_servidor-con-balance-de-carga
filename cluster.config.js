module.exports = {
  name: "App cluster",
  script: "./src/app.js",
  args: "--port 8081",
  instances: "max",
  exec_mode: "cluster"
}