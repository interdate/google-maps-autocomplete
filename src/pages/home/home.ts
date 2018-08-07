import {Component, NgZone} from "@angular/core";
import {NavController} from "ionic-angular";
import {GoogleMap} from "@ionic-native/google-maps";

declare var google: any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    map: GoogleMap;
    autocomplete;
    autocompleteItems;
    GoogleAutocomplete;

    constructor(public navCtrl: NavController, private zone: NgZone) {

        this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
        this.autocomplete = {input: ''};
        this.autocompleteItems = [];
    }

    updateSearchResults(){
        if (this.autocomplete.input == '') {
            this.autocompleteItems = [];
            return;
        }
        this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
            (predictions, status) => {
                this.autocompleteItems = [];
                this.zone.run(() => {
                    console.log(predictions);
                    predictions.forEach((prediction) => {
                        this.autocompleteItems.push(prediction);
                    });
                });
            });
    }

    ionViewDidLoad() {

    }
}
