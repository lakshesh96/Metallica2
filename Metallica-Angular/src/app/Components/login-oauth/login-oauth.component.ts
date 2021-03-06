import { Component, OnInit, OnChanges } from '@angular/core';
import {Login} from '../../Models/login';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { GlobalService } from '../../Services/GlobalService/global.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Headers} from '@angular/http';
import { HttpParams } from '@angular/common/http';
import {Md5} from 'ts-md5/dist/md5';
declare var $:any;


@Component({
  selector: 'app-login-oauth',
  templateUrl: './login-oauth.component.html',
  styleUrls: ['./login-oauth.component.css']
})
export class LoginOauthComponent implements OnInit {

	login:FormGroup;
	loading = false;
	returnUrl: string;

	url:string = "/token";

	UserId = null;
	x:boolean =true;

	AccessToken:string;	
	headers:Headers;

	//Alert Modal Variables
	title:string;
	body:string;
	bodyDetails:string;
	alertSource:string;
	alertHidden:boolean = true;

	constructor(private globalService:GlobalService, private route: ActivatedRoute, private router: Router) { 
		
	}

	ngOnInit() {
		this.login = new FormGroup({
			UserName: new FormControl('', [Validators.required,Validators.maxLength(20)]),
			Password: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/)])
		});

		if(this.UserId) 
			this.x=false;
		else
			this.x = true;


		if(sessionStorage.getItem("AccessToken"))
		{
			this.throwAlert("Already Logged In","User session already exists!","Press OK to continue","Success");
		}
	}

	onSubmit({ value, valid }: { value: Login, valid: boolean }) {
		this.loading = true;
		let hashPass = Md5.hashStr(value.Password);
		let params = `username=${value.UserName}&password=${hashPass}&grant_type=password`;
		this.headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
		try {
			this.globalService.LoginPost(params,this.url,this.headers).subscribe(
				response => {
					console.log("At Login response");					
					this.AccessToken = response.access_token;
					sessionStorage.setItem("AccessToken",this.AccessToken.toString());
					if(this.AccessToken != null)
						this.loadReferenceData(value.UserName);
				},
				error => {
					this.throwAlert("Authentication Failed","Please check your UserName and Password or","Contact your Server Admin","Error");
				},
				()=> { }
			);
		} catch(Exception){
			this.throwAlert("Authentication Failed","Please check your UserName and Password or","Contact your Server Admin","Error");
		}
	}


	loadReferenceData(username) {
		this.globalService.GetMethod("/api/RefData/" + username).subscribe(
			response => {
				console.log("At loadingReference");
				this.globalService.setReferenceData(response);
				console.log("At loadingReference 2");				
				this.throwAlert("Successfully Logged In","Welcome "+ username,"","Success");
			},
			error => console.error(error),
			() => { }
		);
	}

	throwAlert(title,body,bodyDetails,alertSource){
		console.log("At throw alert 1");						
		this.alertHidden = false;
		this.title = title;
		this.body = body;
		this.bodyDetails = bodyDetails;
		this.alertSource = alertSource;
	}

	closeAlertRoute(value) {
		console.log("At close alert");		
		if(value)
			this.router.navigateByUrl('Main');
	}

}
