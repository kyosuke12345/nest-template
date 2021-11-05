import { format } from 'winston';
const LOG_FORMAT = format.combine(format.timestamp(), format.json());
export default LOG_FORMAT;
