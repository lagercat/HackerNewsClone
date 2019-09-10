import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';
import { environment } from '../../environments/environment';

const BACKEND_URL: string = environment.apiURL + '/posts/';

@Injectable({
    providedIn: 'root',
})
export class PostsService {
    private postUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) {}

    getPosts(pageNumber: number, sortingType: string, timeInterval: number) {
        const queryParams: string = `?page=${pageNumber}&sorting=${sortingType}&interval=` +
            `${timeInterval}`;
        this.http.get<{message: string, posts: any}>(BACKEND_URL + '/read/' + queryParams)
            .pipe(map(postData => {
                return {
                    posts: postData.posts.map(post => {
                        return {
                            _id: post._id,
                            author: post.author,
                            content: post.content,
                            date: new Date(post.date),
                            points: post.date,
                            title: post.title,
                            contentType: post.contentType,
                        };
                    })
                };
            }))
            .subscribe((postData) => {
                this.postUpdated.next([...postData.posts]);
            });
    }

    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }
}
