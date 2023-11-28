import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ObsService {
  anyLongRunningOp(value: string) {
    return timer(2000).pipe(mapTo(value));
  }
}