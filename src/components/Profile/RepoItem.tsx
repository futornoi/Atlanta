import React from 'react';
import './RepoItem.scss'

interface IRepoItem {
  repoName: string;
  forksCount: number;
  starsCount: number;
  repoLink: string
}

const RepoItem:React.FC<IRepoItem> = ({repoLink, repoName, forksCount, starsCount}) => {
  return (
    <a href={repoLink} target={"_blank"} className="repoItem userItem">
      <h3 className="repoItem-name userItem-name">{repoName}</h3>
      <div className="repoItem-statistic">
        <span>{forksCount} Forks</span>
        <span>{starsCount} Stars</span>
      </div>
    </a>
  );
};

export default RepoItem;
