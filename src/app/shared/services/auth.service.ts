import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData: any;
  private connectedUser: any;

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth, public afd: AngularFireDatabase , public router: Router, public ngZone: NgZone) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']).then(() => window.location.reload());
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  SignUp(email: string, password: string, pseudo: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        if(result.user){
          let user = {
            pseudo: pseudo,
            uid: result.user.uid,
            email: result.user.email
          }
          this.writeUserData(user);
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['dashboard']).then(() => window.location.reload());
    });
  }

  get isLoggedIn(): boolean {
    const user = this.getLocalStorageItem('user');
    return user !== null;
  }

  public getLocalStorageItem(key: string){
    return JSON.parse(localStorage.getItem(key)!);
  }

  public writeUserData(user: any) {
    this.afs.doc('users/' + user.uid).set(user).catch(error => {
      console.log(error.message)
    });
  }

  public getCollectionDataByUID(collectionName: string, uid: string) {
    return this.afs.doc(`${collectionName}/${uid}`).valueChanges().pipe(map((result) => {
      return result;
    }));
  }

  public createAlert(uid: string, name: string, type: string, price: string, tokenId: string | null){
    return this.afs.collection('alerts').add({
      uid: uid,
      name: name,
      type: type,
      price: price,
      tokenId: tokenId
    });
  }

  public getAlerts(){
    const collectionRef = this.afs.collection('alerts');
    return collectionRef.valueChanges();
  }

}
