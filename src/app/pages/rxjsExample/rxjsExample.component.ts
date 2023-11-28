import { Component, VERSION } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject, Subscription } from "rxjs";
import {
  concatMap,
  exhaustMap,
  mergeMap,
  switchMap,
  tap
} from "rxjs/operators";
import { ObsService } from "./obs.service";

@Component({
  selector: 'app-rxjsexample',
  templateUrl: './rxjsExample.component.html',
  styleUrls: ['./rxjsExample.component.scss']
})
export class RxjsExampleComponent {
  title = "Angular " + VERSION.major;

  sub = new Subject<string>();
  private subscription: Subscription;

  form: FormGroup;

  constructor(private obsService: ObsService, fb: FormBuilder) {
    this.form = fb.group({
      operator: ["", Validators.required]
    });

    this.form.valueChanges.subscribe(({ operator }) => {
      this.deregister();

      switch (operator) {
        case "switchMap": {
          console.log("using switchMap:");
          this.registerWithSwitchMap();
          break;
        }
        case "concatMap": {
          console.log("using concatMap:");
          this.registerWithConcatMap();
          break;
        }
        case "mergeMap": {
          console.log("using mergeMap:");
          this.registerWithMergeMap();
          break;
        }
        case "exhaustMap": {
          console.log("using exhaustMap:");
          this.registerWithExhaustMap();
          break;
        }
        default:
        // code block
      }
    });
  }

  fireEvent() {
    this.sub.next("first");
    this.sub.next("second");
    this.sub.next("3");
    this.sub.next("4");
    this.sub.next("5");

    console.log("-------");
  }

  private registerWithSwitchMap() {
    this.subscription = this.sub
      .asObservable()
      .pipe(
        tap(value => console.log("--> sent out", value)),
        switchMap(value => this.obsService.anyLongRunningOp(value))
      )
      .subscribe(value => console.log("<-- received", value));
  }

  private registerWithConcatMap() {
    this.subscription = this.sub
      .asObservable()
      .pipe(
        tap(value => console.log("--> sent out", value)),
        concatMap(value => this.obsService.anyLongRunningOp(value))
      )
      .subscribe(value => console.log("<-- received", value));
  }

  private registerWithMergeMap() {
    this.subscription = this.sub
      .asObservable()
      .pipe(
        tap(value => console.log("--> sent out", value)),
        mergeMap(value => this.obsService.anyLongRunningOp(value))
      )
      .subscribe(value => console.log("<-- received", value));
  }

  private registerWithExhaustMap() {
    this.subscription = this.sub
      .asObservable()
      .pipe(
        tap(value => console.log("--> sent out", value)),
        exhaustMap(value => this.obsService.anyLongRunningOp(value))
      )
      .subscribe(value => console.log("<-- received", value));
  }

  private deregister() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
