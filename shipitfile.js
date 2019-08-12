// shipitfile.js
module.exports = shipit => {
  // Load shipit-deploy tasks
  require('shipit-deploy')(shipit)

  shipit.initConfig({
    default: {
      deployTo: '/var/www/heartface/',
      repositoryUrl: ''
    },
    staging: {
      servers: 'root@dev-heartface.atleta.hu',
    },
  })
}