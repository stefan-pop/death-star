import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../services/api-calls.service';


@Component({
	selector: 'app-second-screen',
	templateUrl: './second-screen.component.html',
	styleUrls: ['./second-screen.component.css']
})
export class SecondScreenComponent implements OnInit {
	
	peopleList: Array<any> = [];	// <- Array of persons retrieved from database.
	name: string = '';		// <- Name of a searched person that is typed in the input.
	hint: string = '';		// <- Rendered when there are no mathches in the suggestions list.
	resultCount: number | undefined;	// <- length of the matched suggestions.
	enemyList: Array<any> = [];		// <- Array of persons added to the second list.
	filteredEnemyList: Array<{}> = [];		// <- Same like "enemyList" but without duplicates. This is passed to EnemiesComponent.

	constructor( private apiCalls: ApiCallsService ) { }

	ngOnInit(): void {
	}

	// Populate the list with suggestions
	onChange(inputVal: string) {
		this.name = inputVal; 
		if (this.name) {
			this.apiCalls.getPersons(this.name).subscribe(data => {
				this.peopleList = data.results;
				this.resultCount = data.count;
				if (data.count == 0) {
					this.hint = 'No more matches!'
				}
			})
		} else {
			this.peopleList = [];
		}
	}

	// Add enemy from suggestions list to the enemy list (second list)
	addEnemy(enemy: any) {
		this.enemyList.push(enemy);
		// Remove duplicates and store only unique values
		this.filteredEnemyList = [...this.enemyList.reduce((map, obj) => map.set(obj.name, obj) , new Map()).values()];
	}



}
