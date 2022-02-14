import { Component, OnDestroy } from '@angular/core';

@Component({
	selector: 'loading',
	template: `		<div id="pause" class="d-flex align-items-center justify-content-center">
									<!--<div id="spinner"></div>-->
                                    <p-progressSpinner ></p-progressSpinner>
                                    <div style="font-weight=bold; font-size=120px ; color:white"> veuillez patientez ... </div>
								</div>  `,
	styleUrls: ['loading.scss']
})

export class LoadingComponent {

}
