import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccessTokenService } from '@shared/data-access/services/access-token.service';

@Component({
  selector: 'milon-request-finals-page',
  templateUrl: './request-finals-page.component.html',
  styleUrls: ['./request-finals-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestFinalsPageComponent {
  fg: FormGroup;
  message: string;
  isTerminated = new Date('2019-12-14T14:30.00.000Z') < new Date();
  isNotStarted = new Date('2019-12-10T13:00:00.000Z') > new Date();

  constructor(
    private _accessTokenService: AccessTokenService,
    private _changeDetectorRef: ChangeDetectorRef,
    fb: FormBuilder
  ) {
    this.fg = fb.group({
      email: fb.control('', [Validators.required, Validators.email])
    });
  }

  async submit() {
    this.fg.disable();
    try {
      const email: string = this.fg.value.email;
      await this._accessTokenService.register(email, 'https://www.boostaward.de/abstimmung/');
      this.message = 'Wir haben Ihnen soeben eine E-Mail gesendet.';
    } catch (err) {
      let message = 'Hoppla, da ist etwas schief gelaufen...';
      switch (err.code) {
        case 'permission-denied':
          message = 'Die E-Mail ist gerade auf dem Weg zu Ihnen.';
          break;
        default:
          console.error(err);
          break;
      }
      this.message = message;
    }
    this.fg.enable();
    this._changeDetectorRef.markForCheck();
  }

}
