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
    map?(tes:any): any,
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
};

export interface photoData {
    fileName: string;
    latitude: number;
    longitude: number;
    uri: string;
  }

interface cameraInfo {
    photoData: photoData;
  }

export interface Photo {
    photos: cameraInfo[];
  }

export interface PhotosListProps {
    comments: Photos[];
};

export interface Album{
    find: any;
    userId: number,
    id: number,
    title: string,
};

export interface AlbumListProps {
    comments: Album[];
};

export interface photosGeoLoc{
    photoAddress: string,
    photoCity: string,
    index:number
}

export interface PhotoAddress{
    photoCity: photosGeoLoc[],
}