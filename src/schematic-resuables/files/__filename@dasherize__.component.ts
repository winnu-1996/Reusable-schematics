
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-<%= dasherize(filename) %>',
    templateUrl: './<%= dasherize(filename) %>.component.html',
    styleUrls: ['./<%= dasherize(filename) %>.component.scss']
})

export class <%= classify(filename) %> Component implements OnInit {

    constructor(){ }

    ngOnInit() { }

}