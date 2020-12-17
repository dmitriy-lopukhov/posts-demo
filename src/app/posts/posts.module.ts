import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { PostComponent } from './post/post.component';
import { CommentsComponent } from './comments/comments.component';
import { ComponentsModule } from '../core/components/components.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [PostsComponent, PostComponent, CommentsComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ComponentsModule,
    InfiniteScrollModule,
  ],
})
export class PostsModule {}
