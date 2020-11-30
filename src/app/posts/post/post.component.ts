import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/core/types/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: Post | null = null;
  @Output() deletePost = new EventEmitter<number>();
  @Output() loadComments = new EventEmitter<number>();
  expanded = false;

  constructor() {}

  ngOnInit(): void {}

  delete(id: number): void {
    this.deletePost.emit(id);
  }

  toggleComments(id: number): void {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.loadComments.emit(id);
    }
  }
}
