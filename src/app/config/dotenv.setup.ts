import 'dotenv/config';

const getEnviroment = (k: string): string => {
  return String(process.env[k]);
};

const getNumberEnv = (k: string): number => {
  return Number(getEnviroment(k));
};

const getBoolEnv = (k: string): boolean => {
  return Boolean(getEnviroment(k));
};

export default {
  getEnviroment,
  getNumberEnv,
  getBoolEnv,
};
