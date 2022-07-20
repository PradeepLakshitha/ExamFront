import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.css']
})
export class SidebarUserComponent implements OnInit {

  constructor(private _category:CategoryService, private _matSnak:MatSnackBar) { }

  categories='';

  ngOnInit(): void {
    this._category.categories().subscribe((data:any)=>{
      this.categories=data;
    },
    (error)=>{
      this._matSnak.open('Error loading categories from server','',{
        duration:3000,
      });
    });
  }

}
