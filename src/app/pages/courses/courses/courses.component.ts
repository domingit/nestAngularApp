import {Component, OnInit} from '@angular/core';
import { Course} from '../../../shared/models/course';
import {BehaviorSubject, Observable, of} from "rxjs";
import {defaultDialogConfig} from '../shared/default-dialog-config';
import {EditCourseDialogComponent} from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {map, shareReplay, finalize} from 'rxjs/operators';
import {CoursesApi} from '../services/course.api';



@Component({
    selector: 'courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

    promoTotal$: Observable<number>;

    private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    readonly loading$: Observable<boolean> = this.loadingSubject.asObservable();

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;


    constructor(
      private dialog: MatDialog,
      private api: CoursesApi) {}

    ngOnInit() {
      this.reload();
    }

  reload() {
    this.loadingSubject.next(true);
    const courses$ = this.api.findAllCourses()
      .pipe(
        finalize(() => this.loadingSubject.next(false)),
        shareReplay()
      );

    this.beginnerCourses$ = courses$
      .pipe(
        map(courses => courses.filter(course => course.category == 'BEGINNER'))
      );


    this.advancedCourses$ = courses$
      .pipe(
        map(courses => courses.filter(course => course.category == 'ADVANCED'))
      );

    this.promoTotal$ = courses$
        .pipe(
            map(courses => courses.filter(course => course.promo).length)
        );

  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle:"Create Course",
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(data => {
        console.log('>>> ');
        if (data) {
          this.reload();
        }
      });
  }
}
