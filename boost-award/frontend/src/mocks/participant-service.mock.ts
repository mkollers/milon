import { ParticipantService } from '@shared/data-access/services/participant.service';
import { of } from 'rxjs';

export class ParticipantServiceMock extends ParticipantService {
    getAll = () => of(undefined);
}
