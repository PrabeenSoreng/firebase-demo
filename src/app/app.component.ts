import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firebase-demo';
  // courses: Observable<any[]>;
  courses: any[];
  constructor(
    db: AngularFireDatabase
  ) {
    db.list('courses').valueChanges()
      .subscribe(courses => {
        this.courses = courses;
        console.log(this.courses);
      });
  }
}
