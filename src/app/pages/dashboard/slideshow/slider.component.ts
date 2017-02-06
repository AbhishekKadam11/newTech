/**
 * Created by Tareq Boulakjar. from angulartypescript.com
 */
import {Component} from '@angular/core';

import {Slide} from './slide.component';
import {Carousel} from './carousel.component';


/*Angular 2 Carousel - Gallery*/
@Component({
    selector: 'my-slider',
    template: require('./imageslide.html'),

    directives: [Slide,Carousel],
})
export class Angular2Carousel  {
    //The time to show the next photo
    private NextPhotoInterval:number = 3000;
    //Looping or not
    private noLoopSlides:boolean = true;
    //Photos
    private slides:Array<any> = [];

    constructor() {
            this.addNewSlide();
    }

    private addNewSlide() {
         this.slides.push(
            {image:'./assets/img/c0.jpg'},
            {image:'./assets/img/c1.jpg'},
            {image:'./assets/img/c2.jpg'},
            {image:'./assets/img/c3.jpg'}
        );
    }

    private removeLastSlide() {
        this.slides.pop();
    }
}
