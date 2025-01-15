import { types } from 'mobx-state-tree';

export const CardData = types.model({
    id: types.maybeNull(types.string),
    title: types.string,
    description: types.string,
    likes: types.maybeNull(types.number),
    userImg: types.maybeNull(types.string),
    userName: types.string,
    userHandle: types.string,
    datePosted: types.maybeNull(types.string),
    comments: types.maybeNull(types.number),
});
