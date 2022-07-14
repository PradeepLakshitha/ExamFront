import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})


export class ViewCategoriesComponent implements OnInit {

  categories = [
    {

      cat_title: '',
      cat_description: '',
    }
  ];

  
 // categories: Category[]= [];




  constructor(private _category: CategoryService) { }

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
        return this.categories;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!!', 'Error in Loading categories', 'error');
      }
    );
  }

}
