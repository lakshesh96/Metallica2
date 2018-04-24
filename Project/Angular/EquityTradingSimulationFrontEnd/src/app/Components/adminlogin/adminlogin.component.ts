import { Component, OnInit } from '@angular/core';
import {Admin} from '../../Models/admin';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {GlobalService} from '../../Services/global.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  admin:FormGroup;
  //url = "http://localhost:52705/api/Admin";
  url:string = "api/Admin";
  value2:string;
  id:string;
  constructor(private globalService:GlobalService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.admin = new FormGroup({
      Username: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required])
    });
  }
  onSubmit({ value, valid }: { value: Admin, valid: boolean }) {
    //console.log(value,valid);

    //let data: any = {Username: value.Username, Password: value.Password}
    //console.log(value);
    //console.log(data);
    this.globalService.PostMethod(value,this.url).subscribe(
      response => {this.id=response.id;
        console.log(response.response);
        sessionStorage.setItem("AdminLogin",response.response);
        },
      error => console.error(error),
      () => {this.router.navigateByUrl('Admin/Stocks');},
    );
    console.log("I am here");
    console.log(this.value2);
    //console.log("hello");
    sessionStorage.setItem("AdminId",this.value2);
     
  }
}
