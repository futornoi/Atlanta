import { ApiCall } from "./api";

export interface IUserResponse {
  id: number
  login: string
}

export interface IUsersResponse {
  total_count: number | null,
  items: IUserResponse[] | [],
}

export interface IUserRepo {
  "id": 132935648,
  "name": "boysenberry-repo-1",
  "html_url": "https://github.com/octocat/boysenberry-repo-1",
  "description": "Testing",
  "created_at": "2018-05-10T17:51:29Z",
  "stargazers_count": 22,
  "forks_count": 8,
  "forks": 8,
  "watchers": 22,
}

export interface IProfile {
  avatar_url: string
  bio: string
  created_at: string
  email: null
  followers: number
  following: number
  html_url: string
  id: number
  location: null
  login: string
  name: string
  public_repos: number
  received_events_url: string
  repos_url: string
  site_admin: boolean
  starred_url: string
  updated_at: string
}

export const gitHubApi = {
  getUsers: async (value: string) => {
    return await ApiCall({method: 'get', url: `/users/${value}?per_page=5`})
  },
  searchUsers: async (value: string) => {
    return await ApiCall({method: 'get', url: `/search/users?q=${value}&per_page=5`})
  },
  getUserProfile: async (login: string) => {
    return await ApiCall({method: 'get', url: `/users/${login}`})
  },
  getUserRepositories: async (userName: string) => {
    return await ApiCall({method: 'get', url: `/users/${userName}/repos?per_page=100`})
  }
}