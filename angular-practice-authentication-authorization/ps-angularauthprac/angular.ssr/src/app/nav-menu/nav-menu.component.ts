import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {AuthService} from '../Services/auth.service';

@Component({
  selector: 'nav-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent {
  private auth = inject(AuthService);
  public username = this.auth.username;
  public authenticated = this.auth.isAuthenticated;
  public anonymous = this.auth.isAnonymous;
  public logoutUrl = this.auth.logoutUrl;
}
