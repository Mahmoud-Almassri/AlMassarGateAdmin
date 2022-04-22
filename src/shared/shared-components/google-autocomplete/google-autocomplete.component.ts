import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
declare var google;

@Component({
    selector: 'app-google-autocomplete',
    templateUrl: './google-autocomplete.component.html',
    styleUrls: ['./google-autocomplete.component.css']
})
export class GoogleAutocompleteComponent implements OnInit {

    @Input() adressType: string;
    @Output() setAddress: EventEmitter<any> = new EventEmitter();
    @ViewChild('addresstext') addresstext: any;

    autocompleteInput: string;
    queryWait: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.getPlaceAutocomplete();
    }

    private getPlaceAutocomplete() {
        const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
            {
                componentRestrictions: { country: 'JO' },
                fields: ["address_components", "geometry"],
            });
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            const place = autocomplete.getPlace();
            this.invokeEvent(place);
        });
    }

    invokeEvent(place: Object) {
        this.setAddress.emit(place);
    }

}
