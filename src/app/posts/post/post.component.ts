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
  constructor() {}

  ngOnInit(): void {}

  delete(id: number): void {
    this.deletePost.emit(id);
  }
}
