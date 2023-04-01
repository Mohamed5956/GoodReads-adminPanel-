import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Ipopular } from 'src/app/models/ipopular';
import { PopularService } from 'src/app/services/popular.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carosual',
  templateUrl: './carosual.component.html',
  styleUrls: ['./carosual.component.css']
})
export class CarosualComponent implements OnInit {
  image = `${environment.APIBaseURL}/assets/uploads/book`;
  popularList:Array<Ipopular>
  constructor(private popularService:PopularService){
    this.popularList=[]

  }
  ngOnInit(){
    this.popularService.getPopular().subscribe(popularList => {
      this.popularList = popularList
    })
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    margin: 8,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 8,
      },
    },
    nav: true,
  };
}
