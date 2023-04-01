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
import { Iauthor } from 'src/app/models/iauthor';
import { Ibook } from 'src/app/models/ibook';

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
  paginated!: any[];
  currentPage!: number;
  pageSize!: number;
  totalPages!: number;
  pages: number[] = [];
  count: number = 0;

  constructor(
    private categoryService: CategoryService,
    private authorsService: AuthorService,
    private bookService: BookService,
    private popularService: PopularService,
    private reviewService: ReviewService,
  ) {
    this.allReviews = []
    this.popularList = []
    this.currentPage = 1;
    this.pageSize = 3;
    this.totalPages = 5;
    this.pages = [];
    this.paginated = [];
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
      this.paginated = this.popularList.slice(this.count, this.pageSize);
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

  calculatePages() {
    this.totalPages = Math.ceil(this.popularList.length / this.pageSize);
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  setPage(page: number) {
    this.currentPage = page;
    let start = this.currentPage *3-3
    let end = this.currentPage *3
    this.paginated = this.popularList.slice(this.currentPage *3-3,this.currentPage *3);
    this.count = this.currentPage *3-3;
    this.pageSize = this.currentPage *3;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
    this.count += 3;
    this.pageSize += 3;
    this.paginated=this.popularList.slice(this.count,this.pageSize)
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.count -= 3;
    this.pageSize -= 3;
    this.paginated = this.popularList.slice(this.count,this.pageSize);
  }
}
