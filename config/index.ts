/*
 * Name: app.js
 * Description: Env variables configuration file.
 * Author: cacaudev
 * Date: 07/10/2019
 */

"use strict";

const dotenv = require("dotenv");
dotenv.config({ path: "config/.env" });

/**
 * App node environment.
 * @static
 * @type {string}
 */
const env = process.env.NODE_ENV || "development";

/**
 * @type {Object}
 * @property {string} port - App port. Default is 3000.
 * @property {string} env - App env. Default is development.
 */

interface Config {
  "base": {
    env: string;
    port: string;
    api: {
      prefix: string;
    }
    "database": {
      name: string | undefined;
      user: string | undefined;
      password: string | undefined;
      dialect: string | undefined;
      host: string | undefined;
    },
    jwt_secret: string | undefined
  };
  "development": {
    port: string;
  };
  "test": {
    port: string;
  }
}


const app_config: Config = {
  "base": {
    env,
    port: process.env.PORT || "3000",
    api: {
      prefix: "/v1"
    },
    database: {
      name: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      dialect: process.env.DATABASE_DIALECT,
      host: process.env.DATABASE_HOST
    },
    jwt_secret: process.env.JWT_SECRET
  },
  "development": {
    port: process.env.PORT || "8080"
  },
  "test": {
    port: process.env.PORT || "5000"
  }
};

const config = Object.assign(app_config.base, app_config[env]);

export default config;
