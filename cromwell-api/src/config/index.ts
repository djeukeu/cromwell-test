import convict from 'convict';
import * as dotenv from 'dotenv';

dotenv.config();

const conf = convict({
  config: {
    port: { format: 'port', default: 4001, env: 'PORT' },
    env: {
      format: ['production', 'development', 'staging'],
      default: 'development',
      env: 'APP_ENV',
    },
    app_name: {
      format: 'String',
      default: 'genius-home-gateway-api',
      env: 'APP_NAME',
    },
    secret_key: {
      format: 'String',
      default: '',
      env: 'JWT',
    },
  },
});

conf.validate({ allowed: 'strict' });
export default conf.get('config');
