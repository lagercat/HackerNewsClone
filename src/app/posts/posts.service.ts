import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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

    constructor(private http: HttpClient, private router: Router) {}

    getPosts(pageNumber: number, sortingType: string, timeInterval: number) {
        const queryParams: string = `?page=${pageNumber}&sorting=${sortingType}&interval=` +
            `${timeInterval}`;
        this.http.get<{message: string, posts: any}>(BACKEND_URL + 'read/' + queryParams)
            .pipe(map(postData => {
                return {
                    posts: postData.posts.map(post => {
                        return {
                            _id: post._id,
                            author: post.author,
                            content: post.content,
                            date: new Date(post.date),
                            points: post.points,
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

    createPost(formTitle: string, formContent: string, formContentType: string) {
        formContentType = (formContentType === 'Text' ? '0' : '1');
        const payload = {
            title: formTitle,
            content: formContent,
            contentType: formContentType,
        };
        this.http.post<{message: string, post: Post}>(BACKEND_URL + 'create', payload)
        .subscribe((response) => {
            if ('post' in response) {
                this.router.navigate(['/']);
            } else {

            }
        });
    }
}
