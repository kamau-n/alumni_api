module.exports = {
  apps: [
    {
      name: 'alumni_api',
      script: 'npm',
      args: 'build:deploy',
      exec_mode: 'cluster',
      instances: 2
    }
  ]
}
