const SCRIPT_ENV = process.env.SCRIPT_ENV || 'local';

const obj = {
  local: 'src/env/.env.local',
  prod: 'src/env/.env.prod',
};

export default obj[SCRIPT_ENV];
