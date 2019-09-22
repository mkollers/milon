import { Component, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';

@Component({
  selector: 'milon-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @HostBinding('class.milon-header') hostClass = true;

  constructor() { }
}
