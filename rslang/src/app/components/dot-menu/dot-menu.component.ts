import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EbookDataService } from 'src/app/ebook/services/ebook-data.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dot-menu',
  templateUrl: './dot-menu.component.html',
})
export class DotMenu implements OnInit, OnDestroy {
  isUserAuthenticated = false;

  private authStatusSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private ebookDataService: EbookDataService,
  ) { }

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.getUserAuthenticationStatus();
    this.authStatusSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isUserAuthenticated = isAuthenticated;
      });
  }

  goToPage(event: Event): Promise<boolean> {
    this.ebookDataService.updatedDataSelectionGame({
      fromEbook: false,
    });
    const target = event.target as HTMLElement;
    const path = this
      .router
      .createUrlTree(['games', target.dataset.path])
      .toString();
    return this.router.navigate([path]);
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }

  onLogout(): void {
    this.authService.logoutUser();
  }
}
