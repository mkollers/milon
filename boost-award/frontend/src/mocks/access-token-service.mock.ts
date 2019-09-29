import { of } from 'rxjs';

export class AccessTokenServiceMock {
    getByToken = () => of(undefined);
    register = () => Promise.reject();
    vote = () => Promise.reject();
}
