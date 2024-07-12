module.exports = {
  apps: [
    {
      name: 'alumni_api',
      script: 'npm',
      args: 'deploy',
      exec_mode: 'cluster',
      instances: 'max'
    }
  ]
}
