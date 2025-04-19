import { Component } from '@angular/core';
import { HeaderComponent } from '@app/components/header/header.component';
import { FooterComponent } from '@app/components/footer/footer.component';
import { SymbolListComponent } from '@app/components/symbol-list/symbol-list.component';
import { ChartComponent } from '@app/components/chart/chart.component';

@Component({
	selector: 'app-terminal',
	templateUrl: './terminal.component.html',
	styleUrl: './terminal.component.scss',
	imports: [
		HeaderComponent,
		FooterComponent,
		SymbolListComponent,
		ChartComponent
	]
})
export class TerminalComponent {
}
