module.exports = {
  apps: [
    {
      name: 'alumni_api',
      script: 'pnpm',
      args: 'build:deploy',
      exec_mode: 'cluster',
      instances: 'max'
    }
  ]
}
