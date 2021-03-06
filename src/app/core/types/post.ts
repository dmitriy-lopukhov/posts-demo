import { Opaque } from '.';

export type PostId = Opaque<'PostId', number>;

export type Post = {
  id: PostId;
  body: string;
  title: string;
  userId: number;
};

export const assertPostId = (input: number) => {
  return input as PostId;
};
