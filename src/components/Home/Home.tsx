import React, { ChangeEvent, useEffect, useState } from 'react';
import Title from "../Title";
import "./Home.scss";
import DefaultInput from "../DefaultInput";
import UserItem from "./UserItem";
import { gitHubApi, IProfile, IUsersResponse } from "../../api/GitHub";
import useDebounce from "../../hooks/useDebouce";

const Home: React.FC = () => {
  const { getUsers, searchUsers } = gitHubApi;

  const [loading, setLoading] = useState<boolean>(false);
  const [usersInfo, setUsersInfo] = useState<IProfile[] | []>([]);

  const [inputValue, setInputValue] = useState<string>('');
  const debouncedValue = useDebounce(inputValue, 500);

  const handleChangeInput = () => (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const getUserInfo = async (array: IUsersResponse['items']) => {
    let userArr = []
    for (const person of array) {
      const user = await getUsers(person.login);
      userArr.push(user)
    }
      setUsersInfo(userArr);
  }

  const initialUsers = async () => {
    setLoading(true);
    try {
      if(debouncedValue) {
        const usersData: IUsersResponse = await searchUsers(debouncedValue)
        await getUserInfo(usersData.items)
      } else {
        setUsersInfo([]);
          localStorage.removeItem("search");
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setInputValue(localStorage.getItem("search") || '')
  }, []);


  useEffect(() => {
    initialUsers()
  }, [debouncedValue])

  const isEmpty = !usersInfo?.length;

  const userElement = usersInfo?.map(user => (
    <UserItem key={user.id} searchValue={inputValue} rep_count={user.public_repos} name={user?.login} avatar={user?.avatar_url}/>
  ))
  return (
    <section className="main">
      <Title className="main-title" children="GitHub Searcher"/>
      <DefaultInput
        className="main-searchInput"
        type="text"
        placeholder="Search for User"
        value={inputValue}
        onChange={handleChangeInput}
      />
      <div className="main__user-list">
        {loading
          ? <h2>Loading...</h2>
          : isEmpty
            ? <h2>Такого пользователя нету</h2>
            : userElement
        }
      </div>
    </section>
  );
};

export default Home;
