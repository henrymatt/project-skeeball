import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { HttpCacheService } from '../services/http-cache.service';

@Injectable()
export class CacheInterceptorModel implements HttpInterceptor {

  constructor(private cacheService: HttpCacheService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(req.method !== 'GET') {
      this.cacheService.invalidateCache();
      return next.handle(req);
    }

    const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);

    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle(req)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            this.cacheService.put(req.url, event);
          }
        })
      );

  }
}
