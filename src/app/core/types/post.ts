import { Opaque } from '.';

export type PostId = Opaque<'PostId', number>;
export type UserId = Opaque<'UserId', number>;

export type Post = {
  id: PostId;
  body: string;
  title: string;
  userId: UserId;
};

export const assertPostId = (input: number) => {
  return input as PostId;
};
export const assertUserId = (input: number) => {
  return input as UserId;
};
