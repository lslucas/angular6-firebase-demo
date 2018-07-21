import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
//import * as firebase from 'firebase/app';
//import 'rxjs/add/operator/map'
//import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router:Router
  ) {
    this.afAuth.authState.subscribe((auth) => {
      if (auth) {
        this.authState = auth
        // there must be a better way to do that. On my simple ES6 firebase-demo (go see on github) 
        // the login works perfectly without the need of storing manually the user state... 
        // this is very anoying :@ perhaps something on the angularfire2 that I missed
        // altought I saw somewere that angularfire2 no longer stores this information
        // without this line bellow you can authenticate, but when you reload the session doens't persists
        // you go back to login page
        localStorage.setItem('authenticated', 'true');
      }
    });    
  }

  get authenticated(): boolean {
    //return this.authState !== null;
    return localStorage.getItem('authenticated') ? true : false;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState.user : null;
  }

  get currentUserObservable(): any {
    return this.afAuth.authState
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.user.uid : '';
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.authState) { return 'Guest' }
    else if (this.currentUserAnonymous) { return 'Anonymous' }
    else { return this.authState['displayName'] || this.authState['email'] }
  }

  //// Social Auth ////
  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider()
    return this.socialSignIn(provider);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.socialSignIn(provider);
  }

  twitterLogin(){
    const provider = new firebase.auth.TwitterAuthProvider()
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) =>  {
          this.authState = credential.user
          this.updateUserData()
      })
      .catch(error => console.dir(error));
  }

  //// Anonymous Auth ////
  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
    .then((user) => {
      this.authState = user
      this.updateUserData()
    })
    .catch(error => console.log(error));
  }

  //// Email/Password Auth ////
  emailSignUp(email:string, password:string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        this.updateUserData()
      })
      .catch(error => alert(error));
  }

  emailLogin(email:string, password:string) {
     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
       .then((user) => {
         this.authState = user
         this.updateUserData()
       })
       .catch(error => console.dir(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    var auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }

  //// Sign Out ////
  signOut(): void {
    console.info('logout done!');
    localStorage.removeItem('authenticated');
    this.afAuth.auth.signOut();
    this.router.navigate(['/'])
  }

  //// Helpers ////
  private updateUserData(): void {
    // check state
    console.info('updateUserData');
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          console.log('user email ' + firebaseUser.email);
        } else {
          console.log('something wrong');
        }
    });    

    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features
      let path = `users/${this.currentUserId}`; // Endpoint on firebase
      let data = {
        email: this.authState.user.email,
        name: this.authState.user.displayName
      }
 
      this.db.object(path).update(data)
      .catch(error => console.dir(error));
  }
  
}
