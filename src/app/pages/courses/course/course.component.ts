import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../../../shared/models/course';
import {Observable, Subject} from 'rxjs';
import {Lesson} from '../../../shared/models/lesson';
import {filter, switchMap, takeUntil, tap} from 'rxjs/operators';
import {CoursesApi} from '../services/course.api';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})


export class CourseComponent implements OnInit, OnDestroy {

  dataSource = new MatTableDataSource<Lesson>();
  readonly countPerPage = 3;

  course$: Observable<Course>;
  readonly totalCount = signal<number>(10); 

  readonly displayedColumns = ['seqNo', 'description', 'duration'];
  readonly currentPage = signal<number>(0);
  private _unsubscribe$ = new Subject<void>();

  @ViewChildren(MatPaginator)
  paginators: QueryList<MatPaginator>;

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(
    private api: CoursesApi,
    private route: ActivatedRoute) {}

  ngOnInit() {

    this._initData();
    this._loadLessonsPage();
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngAfterViewInit() {
    this.paginators.changes
      .pipe(
        filter(paginators => paginators.length > 0),
        switchMap(paginators => paginators.first.page),
        takeUntil(this._unsubscribe$)
      )
      .subscribe((page:PageEvent) => {
        this.currentPage.set(page.pageIndex);
        this._loadLessonsPage();
      }
    );
  }

  private _initData(): void {
    this.dataSource.paginator = this.paginator;

    const courseUrl = this.route.snapshot.paramMap.get("courseUrl") ?? '';
    this.course$ = this.api.findCourseByUrl(courseUrl);
  }

  private _loadLessonsPage() {
    this.course$.pipe(
      tap(course => this.totalCount.set(course.lessonsCount)),
      switchMap(course => this.fetchLesons(course)),
    ).subscribe(res => {
      this.dataSource.data = res;
      if (res.length < this.countPerPage) {
        this.totalCount.set(this.currentPage() * this.countPerPage + res.length);
      }
    });
    
  }

  fetchLesons(course: Course) {
    return this.api.findLessons(course._id, this.currentPage(), 3)
  }

}
