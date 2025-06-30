
 export interface Org {
   login:string; 
    url: string;
    repos_url: string;
    events_url: string;
    name: string;
    company: string | null;
    blog: string;
    location: string;
    email: string;
    twitter_username: string;
    is_verified: boolean;
    has_organization_projects: boolean;
    has_repository_projects: boolean;
    public_repos: number;
    followers: number;
    following: number;
    html_url: string;
    created_at: string;
    updated_at: string;
    type: string;
}
export interface Organisations {
    login: string;
    url: string;
    avatar_url: string;
    description: string | null;
}