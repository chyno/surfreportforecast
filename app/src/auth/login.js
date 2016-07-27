//import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';

//@inject(AuthService)
export class Login{
    constructor(){
       // this.auth = auth;
    };

   

    email='';
    password='';
    login(){
        /*
        return this.auth.login(this.email, this.password)
        .then(response=>{
            console.log("success logged " + response);
        })
        .catch(err=>{
            console.log("login failure");
        });
        */
    };

    authenticate(name){
        /*
        return this.auth.authenticate(name, false, null)
        .then((response)=>{
            console.log("auth response " + response);
        });
        */
    }
}