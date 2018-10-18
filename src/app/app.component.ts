import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firebase-demo';

  courseList: AngularFireList<any>;
  courses$: Observable<any[]>;
  course$;
  author$;
  constructor(
    private db: AngularFireDatabase
  ) {
    this.courseList = db.list('courses');
    this.courses$ = this.courseList.snapshotChanges()
    .pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val() }))
        )
    );
    this.course$ = db.object('courses/1').valueChanges();
    this.author$ = db.object('authors/1').valueChanges();
}
  add(course: HTMLInputElement) {
    this.courseList.push({
      name: course.value,
      price: 150,
      isLive: true,
    });
    course.value = '';
  }
  update(key, course: HTMLInputElement) {
    this.courseList.update(key, {
      name: course.value
    });
    course.value = '';
  }
  remove(key) {
    this.courseList.remove(key);
  }
  removeAll() {
    this.courseList.remove();
  }
}
