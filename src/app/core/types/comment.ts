import { Opaque } from '.';
import { PostId } from './post';

export type CommentId = Opaque<'CommentId', number>;

export type Comment = {
  id: CommentId;
  body: string;
  email: string;
  name: string;
  postId: PostId;
};
