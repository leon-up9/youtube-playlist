import React, { FC } from "react";
import "./PlayerItem.scss";

interface PlayerItemProps {
  img: string;
  title: string;
  onClick?: () => void;
  removeButton?: JSX.Element;
}

const PlayerItem: FC<PlayerItemProps> = ({
  img,
  title,
  onClick,
  removeButton,
}) => {
  return (
    <>
      <div className="player-item" onClick={onClick}>
        <div className="player-item-thumbnail">
          <img src={img} alt="logo" className="player-item-image" />
        </div>
        <div className="player-item-info">
          <h3 className="title">{title}</h3>
        </div>
        {removeButton}
      </div>
    </>
  );
};

export default PlayerItem;
