import del from 'del';
import config from '../config';

const clean = () => del(config.dest.dest);

export default clean;
