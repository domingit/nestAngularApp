import {Component, EventEmitter, Input, Output } from '@angular/core';
import {Course} from "../../../shared/models/course";
import { MatDialog } from "@angular/material/dialog";
import {EditCourseDialogComponent} from "../edit-course-dialog/edit-course-dialog.component";
import {defaultDialogConfig} from '../shared/default-dialog-config';
import {CoursesApi} from '../services/course.api';

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.scss']
})
export class CoursesCardListComponent {

    @Input()
    courses: Course[];

    @Output()
    courseChanged = new EventEmitter();

    constructor(
      private dialog: MatDialog,
      private api: CoursesApi) {
    }

    editCourse(course:Course) {

        const dialogConfig = defaultDialogConfig();

        dialogConfig.data = {
          dialogTitle:"Edit Course",
          course,
          mode: 'update'
        };

        this.dialog.open(EditCourseDialogComponent, dialogConfig)
          .afterClosed()
          .subscribe((data) => data ? this.courseChanged.emit(): null);

    }

  onDeleteCourse(course:Course) {
      this.api.deleteCourse(course._id)
        .subscribe(
          () => this.courseChanged.emit());
  }

}









