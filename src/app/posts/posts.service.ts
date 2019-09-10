import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

const BACKEND_URL: string = environment.apiURL + '/posts/';

@Injectable({
    providedIn: 'root',
})
export class PostsService {
    private postUpdated = new Subject();

    constructor(private http: HttpClient) {}

    getPosts(pageNumber: number, sortingType: string, timeInterval: number) {
        const queryParams: string = '?page=${pageNumber}&sorting=${sortingType}&interval=' +
            '${timeInterval}';
        this.http.get<{message: string, posts: any}>(BACKEND_URL + queryParams).subscribe(
            (postData) => {
                console.log(postData);
            });
    }

    getPostUpdateListener() {
	return this.postUpdated.asObservable();
    }
}
