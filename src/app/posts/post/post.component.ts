import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Post, PostId } from 'src/app/core/types/post';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {
  @Input() post: Post | null = null;
  @Output() deletePost = new EventEmitter<PostId>();
  @Output() loadComments = new EventEmitter<PostId>();
  expanded = false;

  constructor() {}

  ngOnInit(): void {}

  delete(id: PostId): void {
    this.deletePost.emit(id);
  }

  toggleComments(id: PostId): void {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.loadComments.emit(id);
    }
  }
}
