import { OnRegistrationWrite } from './functions/on-registration-write';
import { OnVotesWrite } from './functions/on-votes-write';
import { initialize } from './initialize';

initialize();
exports.OnRegistrationWrite = OnRegistrationWrite;
exports.OnVotesWrite = OnVotesWrite;