export type Post = {
    post_id: string;
    raw_body: string;
    timestamp: string;
    image: string;
    title: string;
}

export type User = {
    user_id : string ;
    username : string ;
    display_name? : string ;
    bio? : string ;
    email? : string ;
}

export interface JWT {
    iss : string ;
    exp : string ;
    nbf : string ;
    iat : string ;
}