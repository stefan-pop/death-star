import { Component, Input, OnInit } from '@angular/core';
import { ApiCallsService } from '../services/api-calls.service';


@Component({
	selector: 'app-enemies',
	templateUrl: './enemies.component.html',
	styleUrls: ['./enemies.component.css']
})
export class EnemiesComponent implements OnInit {

	@Input() filteredEnemyList: Array<any> = []; 	 // <- Persons added to the second list without duplicates.

	volumes: Array<any> = [];  		// <- Contains all volumes of the planets of the persons in the second list.
	uniqueVolumes: Array<any> = [];   	// <- Same like "volumes" but without duplicates.
	volumesSum: number | undefined;			// <- Total of "uniqueVolumes".


	entryList: Array<any> = [];		// <- An array of objects like -> { persons: [persons in the second list], volume: "total of volumes for "persons" key"}
	uniqueEntries: Array<any> = [];		// <- Same like "entryList" but without duplicates. 
										// <- Serves only as additional safety measure. A user can't click more than once on "Übernehmen" becuse he is redirected to FirstScreen.


	constructor(private apiCalls: ApiCallsService) { }

	ngOnInit(): void {
	}

	// Calculate the total of volumes without duplicates
	calculateVolumes() {
		this.filteredEnemyList?.forEach(enemy => {
			this.apiCalls.getDiameter(enemy.homeworld).toPromise().then(planet => {
				if (planet.diameter != 'unknown') {
					let diameter = parseInt(planet.diameter);
					let volume = (4/3)* Math.PI * Math.pow((diameter/2), 3);
					this.volumes.push(volume);
				}
				// remove duplicates in case more persons share the same planet.
				this.uniqueVolumes = [...new Set(this.volumes)];

				// Add all volumes to obtain the final result.
				this.volumesSum = this.uniqueVolumes.reduce((acc, next) => acc + next, 0);

			}).catch( error => console.log(error));
		})
	}


	// Store/Append a calculated entry in browser's storage.
	saveEntry() {
		const sessionStorageContent = sessionStorage.getItem('entries');

		if (sessionStorageContent === null) {
			this.entryList = [];
		} else {
			this.entryList = JSON.parse(sessionStorageContent);
		}

		let entry = {
			persons: this.filteredEnemyList.map(enemy => enemy.name),
			volume: this.volumesSum
		};

		// Store only entries that have AT LEAST one person with a valid volume.
		if (entry.persons.length > 0 && entry.volume != undefined) {
			this.entryList.push(entry);
			sessionStorage.setItem('entries', JSON.stringify(this.entryList));
		}
	}
}
