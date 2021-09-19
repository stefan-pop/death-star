import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-first-screen',
	templateUrl: './first-screen.component.html',
	styleUrls: ['./first-screen.component.css']
})
export class FirstScreenComponent implements OnInit {

	constructor() { }

	entries: any = JSON.parse(sessionStorage.getItem('entries')!);

	ngOnInit(): void {
		
	}

	clearEntries() {
		if (!this.entries) {
			alert('Keine Einträge momentan!')
		} else {
			let result = confirm("Bist du sicher?");
			if (result) {
				sessionStorage.clear();
				this.entries = null;
			}
		}
	}

}
