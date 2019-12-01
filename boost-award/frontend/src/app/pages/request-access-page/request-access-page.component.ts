import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccessTokenService } from '@shared/data-access/services/access-token.service';

@Component({
  selector: 'milon-request-access-page',
  templateUrl: './request-access-page.component.html',
  styleUrls: ['./request-access-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestAccessPageComponent {
  fg: FormGroup;
  message: string;
  isTerminated = new Date('2019-12-01T22:00:00.000Z') < new Date();

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
      await this._accessTokenService.register(email);
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
