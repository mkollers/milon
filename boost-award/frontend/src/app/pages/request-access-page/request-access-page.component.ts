import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccessTokenService } from '@shared/data-access/services/access-token.service';

@Component({
  selector: 'milon-request-access-page',
  templateUrl: './request-access-page.component.html',
  styleUrls: ['./request-access-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestAccessPageComponent {
  fg: FormGroup;

  constructor(
    private _accessTokenService: AccessTokenService,
    private _snackbar: MatSnackBar,
    fb: FormBuilder
  ) {
    this.fg = fb.group({
      email: fb.control('', [Validators.required, Validators.email])
    });
  }

  async submit() {
    try {
      const email: string = this.fg.value.email;
      await this._accessTokenService.register(email);
      this._snackbar.open('Wir haben Ihnen soeben eine E-Mail gesendet.', '', { duration: 15000 });
    } catch (err) {
      console.error(err);
      const message = 'Hoppla, da ist etwas schief gelaufen...';
      this._snackbar.open(message, '', { duration: 15000 });
    }
  }

}
