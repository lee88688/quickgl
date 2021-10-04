import { setTimeout, clearTimeout, execTimeoutFn } from './setTimeout';

const anyGlobal: any = global;

anyGlobal.setTimeout = setTimeout;
anyGlobal.clearTimeout = clearTimeout;
anyGlobal.execTimeoutFn = execTimeoutFn;