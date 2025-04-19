import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderSearchComponent } from '@app/components/header/header-search/header-search.component';
import { HeaderBalanceComponent } from '@app/components/header/header-balance/header-balance.component';
import { HeaderHedgeComponent } from '@app/components/header/header-hedge/header-hedge.component';
import { HeaderLeverageComponent } from '@app/components/header/header-leverage/header-leverage-component';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	imports: [
		RouterLink,
		HeaderSearchComponent,
		HeaderBalanceComponent,
		HeaderHedgeComponent,
		HeaderLeverageComponent
	]
})
export class HeaderComponent {
}
