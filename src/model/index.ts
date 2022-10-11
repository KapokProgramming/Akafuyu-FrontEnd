export type Post = {
    author:  string ;
    post_title:string;
    post_id: string;
    post_body: string;
    isFollowerOnlyPost: string ;
    timestamp: string;
}

export type DisplayPost = {
    author:  string ;
    author_id?: string ;
    post_title:string;
    post_body: string;
    star_count: number;
}

export type User = {
    user_id: string;
    username: string;
    display_name: string;
    bio: string;
    email: string;
}

export interface JWT {
    iss: string;
    exp: string;
    nbf: string;
    iat: string;
}