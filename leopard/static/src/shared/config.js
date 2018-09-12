// @flow

export const WEB_PORT = process.env.PORT || 8080;
export const STATIC_PATH = '/static';
export const APP_NAME = 'Xenio Data Visualization';

export const WDS_PORT = 7000;
export const APP_CONTAINER_CLASS = 'js-app';
export const APP_CONTAINER_SELECTOR = `.${APP_CONTAINER_CLASS}`;
export const dateFormat = 'YYYY-MM-DD';
export const API_URL = process.env.NODE_ENV === 'production' ? 'http://ec2-54-149-60-69.us-west-2.compute.amazonaws.com:8000/query' : 'http://localhost:8000/query';
export const SERVICES_URL = 'https://93rv7lowc0.execute-api.us-west-2.amazonaws.com/dev/app';

