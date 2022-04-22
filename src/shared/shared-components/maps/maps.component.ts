import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { YesNoDialogComponent, DialogData } from '../yes-no-dialog/yes-no-dialog.component';


interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable?: boolean;
}
@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
    public latitude:number;
    public longitude:number;
    constructor(public dialogRef: MatDialogRef<YesNoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        //this.latitude=this.data.lat;
        //this.longitude=this.data.lng;
        console.log(this.data);
        
        this.latitude = this.convertToNumber(this.data.latitude, 18);
        this.longitude = this.convertToNumber(this.data.longitude, 18);

        console.log(this.data)
        // To add the marker to the map, call setMap();
    }
    public convertToNumber(theform: string, lenth) {
        var num = theform;
        var with2Decimals = num.toString().match(/^-?\d+(?:\.\d{0,10})?/)[0];
        console.log(with2Decimals)
        //this.numberT=parseFloat(theform).toFixed(theform.split('.')[1].length);
    
        return Number(with2Decimals);
      }

}
