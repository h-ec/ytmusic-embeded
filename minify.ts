import path from 'path';
import { OBFMC } from 'obfuscate-my-code';

const obf: OBFMC = new OBFMC();
obf.silentLog = true; // Default is false
obf.obfuscate('js', path.join(__dirname, '/dist/'), 'node');
obf.obfuscate('js', path.join(__dirname, '/dist/web/'), 'browser');
obf.minifyDir(path.join(__dirname, '/dist/web'));