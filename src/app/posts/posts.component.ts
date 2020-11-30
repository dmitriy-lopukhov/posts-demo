import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostsService } from '../core/services/posts.service';
import { Post } from '../core/types/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit {
  posts$: Observable<Post[]>;
  constructor(private postsService: PostsService) {
    this.posts$ = this.postsService.getPosts();
  }

  ngOnInit(): void {}
}
