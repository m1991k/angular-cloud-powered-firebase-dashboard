import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading :boolean= false

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  async onSubmit(form: NgForm){
    this.loading=true
    const  {email,password,lastName,firstName} =form.value;

    console.log(email,password,lastName,firstName)
    try{
      const credential =await this.afAuth.createUserWithEmailAndPassword(email,password)
      await credential.user.updateProfile({
        displayName: `${firstName} ${lastName}`
      })      
      form.reset()

      const uid = credential.user.uid
      this.router.navigate([`/profile/${uid}}`])

    }catch(error){
      console.log(error)
    }

    this.loading=false
 }

}


