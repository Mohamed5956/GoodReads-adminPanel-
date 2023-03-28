import { Component, OnInit } from '@angular/core';
import { Icategory } from 'src/app/models/icategory';
import { Ireview } from 'src/app/models/ireview';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';
import { PopularService } from 'src/app/services/popular.service';
import { ReviewService } from 'src/app/services/review.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Ipopular } from 'src/app/models/ipopular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  BookImage = `${environment.APIBaseURL}/assets/uploads/book`
  AuthorImage = `${environment.APIBaseURL}/assets/uploads/author`
  categoriesCount = 0;
  userCount = 0;
  popularBooksCount = 0;
  popularAuthorsCount = 0;
  popularList: Array<Ipopular>;
  booksCount = 0;
  authorsCount = 0;
  allReviews: Array<Ireview>
  wantToReadBooksCount = 0;
  readedBooksCount = 0;
  readingBooksCount = 0;
  responsiveOptions!: any[];

  constructor(
    private categoryService: CategoryService,
    private authorsService: AuthorService,
    private bookService: BookService,
    private popularService: PopularService,
    private reviewService: ReviewService,
  ) {
    this.allReviews = []
    this.popularList = []
  }
  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categoriesCount = categories.length;
    });
    this.authorsService.getAllAuthors().subscribe(authors => {
      this.authorsCount = authors.length;
    });
    this.bookService.getAllBooks().subscribe(books => {
      this.booksCount = books.length;
    });
    this.popularService.getPopular().subscribe(popularList => {
      this.popularList = popularList
      console.log(this.popularList)
    })
    this.reviewService.getAllReviews().subscribe(reviews => {
      this.wantToReadBooksCount = reviews.filter(review => review.status == 'want to read').length
      this.readedBooksCount = reviews.filter(review => review.status == 'readed').length;
      this.readingBooksCount = reviews.filter(review => review.status == 'reading').length;
    });


    //carosual


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
