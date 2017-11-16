module.exports = {
  apps : [{
    name        : "vgram",
    script      : "./bin/www.js",
    watch       : true,
    env_development: {
      "NODE_ENV": "development",
    },
    env_production: {
      "NODE_ENV": "production"
    }
  },{
    name       : "vgram-cluster",
    script     : "./bin/www.js",
    instances  : 0,
    exec_mode  : "cluster",
    env_development: {
      "NODE_ENV": "development",
    },
    env_production: {
      "NODE_ENV": "production"
    }
  }]
};
