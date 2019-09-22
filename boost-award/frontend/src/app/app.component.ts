import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'milon-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostBinding('class.milon-root') hostClass = true;
}
