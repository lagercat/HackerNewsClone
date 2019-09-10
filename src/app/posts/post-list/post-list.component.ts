import { Component , OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
    pageNumber = 1;
    sortingType = 'new';
    timeInterval =  0;
    posts: Post[];
    private postsSub: Subscription;

    constructor(public postsService: PostsService) {}

    ngOnInit() {
        this.postsSub = this.postsService.getPostUpdateListener()
            .subscribe((posts: Post[]) => {
                this.posts = posts;
            });
        this.postsService.getPosts(this.pageNumber, this.sortingType, this.timeInterval);
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }
}
