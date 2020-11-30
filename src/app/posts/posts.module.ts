import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { PostComponent } from './post/post.component';
import { CommentsComponent } from './comments/comments.component';
import { ComponentsModule } from '../core/components/components.module';

@NgModule({
  declarations: [PostsComponent, PostComponent, CommentsComponent],
  imports: [CommonModule, PostsRoutingModule, ComponentsModule],
})
export class PostsModule {}
