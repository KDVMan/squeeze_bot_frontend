import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent, RouterOutlet } from '@angular/router';
import { PreloaderComponent } from '@core/components/preloader/preloader.component';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { PreloaderService } from '@core/services/preloader.service';
import { filter, Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '@core/components/confirm-dialog/confirm-dialog.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	imports: [RouterOutlet, PreloaderComponent, ConfirmDialogComponent]
})
export class AppComponent implements OnInit, OnDestroy {
	private subscription: Subscription;
	private router = inject(Router);
	private iconService = inject(SvgIconRegistryService);
	private preloaderService = inject(PreloaderService);

	public ngOnInit(): void {
		this.loadSvg();

		this.subscription = this.router.events.pipe(
			filter(event => event instanceof RouterEvent)
		).subscribe(event => {
			this.navigationInterceptor(event);
		});
	}

	public ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe();
	}

	private navigationInterceptor(event: any): void {
		if (event instanceof NavigationStart) {
			this.preloaderService.show();
		} else if (event instanceof NavigationEnd) {
			this.preloaderService.hide();
		} else if (event instanceof NavigationCancel) {
			this.preloaderService.show();
		} else if (event instanceof NavigationError) {
			this.preloaderService.show();
		}
	}

	private loadSvg(): void {
		this.iconService.loadSvg('assets/icons/download.svg', 'download');
		this.iconService.loadSvg('assets/icons/select-up.svg', 'select-up');
		this.iconService.loadSvg('assets/icons/select-down.svg', 'select-down');
		this.iconService.loadSvg('assets/icons/sort.svg', 'sort');
		this.iconService.loadSvg('assets/icons/sort-up.svg', 'sort-up');
		this.iconService.loadSvg('assets/icons/sort-down.svg', 'sort-down');
		this.iconService.loadSvg('assets/icons/reset.svg', 'reset');
		this.iconService.loadSvg('assets/icons/favorite.svg', 'favorite');
		this.iconService.loadSvg('assets/icons/favorite-fill.svg', 'favorite-fill');
		this.iconService.loadSvg('assets/icons/settings.svg', 'settings');
		this.iconService.loadSvg('assets/icons/close.svg', 'close');
		this.iconService.loadSvg('assets/icons/toggle-on.svg', 'toggle-on');
		this.iconService.loadSvg('assets/icons/toggle-off.svg', 'toggle-off');
		this.iconService.loadSvg('assets/icons/delete.svg', 'delete');
		this.iconService.loadSvg('assets/icons/start.svg', 'start');
		this.iconService.loadSvg('assets/icons/stop.svg', 'stop');
	}
}
