import React, { ChangeEvent, useEffect, useState } from 'react';
import Title from "../Title";
import RepoItem from "./RepoItem";
import DefaultInput from "../DefaultInput";
import useDebounce from "../../hooks/useDebouce";
import './Profile.scss';
import { gitHubApi, IProfile, IUserRepo } from "../../api/GitHub";
import { useParams } from "react-router-dom";

const Profile:React.FC = () => {
  const { getUserProfile, getUserRepositories } = gitHubApi;
  const { login } = useParams<{login: string}>()

  const [loading, setLoading] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<IProfile | null>(null);
  const [userRepos, setUserRepos] = useState<IUserRepo[] | null>(null);

  const [inputValue, setInputValue] = useState<string>('');
  const handleChangeInput = () => (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }


  const initialProfile = async () => {
    setLoading(true);
    try {
      if (login) {
        const profileData: IProfile = await getUserProfile(login)
        const reposData: IUserRepo[] = await getUserRepositories(login)
        setUserProfile(profileData);
        setUserRepos(reposData);
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    initialProfile()
  }, [])

  const filteredRepos = () => userRepos?.filter(rep => rep.name.toLowerCase().startsWith(inputValue.toLowerCase().trim()))

  const userElement = filteredRepos()?.map(rep => (
    <RepoItem
      key={rep.id}
      repoLink={rep.html_url}
      repoName={rep.name}
      starsCount={rep.stargazers_count}
      forksCount={rep.forks_count}
    />
  ))

  return (
    <section className="profile main">
      <Title className="profile-title main-title" children="GitHub Searcher"/>
      <div className="profile__content">
        <div className="profile__content-avatar">
          <img src={userProfile?.avatar_url} alt="user avatar"/>
        </div>
        <ul className="profile__content-contacts">
          <li>Name: {userProfile?.login}</li>
          {userProfile?.email && <li>Email: {userProfile?.email}</li>}
          {userProfile?.location && <li>Location: {userProfile?.location}</li>}
          <li>Join Date: {userProfile?.created_at}</li>
          <li>Followers: {userProfile?.followers}</li>
          <li>Following: {userProfile?.following}</li>
          <li>{userProfile?.bio}</li>
        </ul>
      </div>
      <DefaultInput
        className="profile-searchInput main-searchInput"
        type="text"
        placeholder="Search for User"
        value={inputValue}
        onChange={handleChangeInput}
      />
      <div className="profile__user-list main__user-list">
        {loading ? <h2>Loading...</h2> : userElement}
      </div>
    </section>
  );
};

export default Profile;
