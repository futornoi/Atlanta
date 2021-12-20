import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './UserItem.scss';

interface IUserItem {
  name: string
  avatar: string
  searchValue: string
  rep_count?: number
}

const UserItem: React.FC<IUserItem> = ({name, avatar, searchValue, rep_count}) => {
  const location = useLocation();

  const onSaveSearchValue = () => {
    localStorage.setItem("search", searchValue);
  }

  return (
    <NavLink onClick={onSaveSearchValue} to={location.pathname + '/' + name} className="userItem">
      <img className="userItem-img" src={avatar} alt="user avatar"/>
      <h3 className="userItem-name">{name}</h3>
      <span className="userItem-repositoriesCount">Repo: {rep_count ?? 0}</span>
    </NavLink>
  );
};

export default UserItem;
