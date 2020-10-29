import React from 'react';

export interface Post{
    userId: number,
    id: number,
    title: string,
    body: string
};

export interface PostListProps {
    posts: Post[];
};


export interface Comment{
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
};

export interface CommentListProps {
    comments: Comment[];
};


export interface Photos{
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
};

export interface PhotosListProps {
    comments: Photos[];
};

export interface Album{
    userId: number,
    id: number,
    title: string,
};

export interface AlbumListProps {
    comments: Album[];
};