import React, { FC, useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { videoListState } from "../../recoil";
import api from "../../service";
import PlayerItem from "../PlayerItem/PlayerItem";
import "./PlayerList.scss";
import DraggableList from "../DraggableList/DraggableList";

const PlayerList: FC = () => {
  const [videoList, setVideoList] = useRecoilState(videoListState);
  const [newUrl, setNewUrl] = React.useState<string>("");

  const addNewUrl = useCallback(() => {
    if (newUrl.length > 0) {
      api
        .addVideo(newUrl)
        .then((newItem) => {
          setVideoList((prev) => [...prev, newItem]);
          setNewUrl("");
        })
        .catch(() => {
          alert("Error adding video");
        });
    } else alert("Please enter a url");
  }, [newUrl, setVideoList]);

  useEffect(() => {
    api.getVideos().then((res) => {
      setVideoList(res);
    });
  }, [setVideoList]);

  const removeVideo = useCallback(
    (id: string) => {
      api
        .removeVideo(id)
        .then(() => {
          setVideoList((prev) => prev.filter((item) => item.id !== id));
        })
        .catch(() => {
          alert("Error removing video");
        });
    },
    [setVideoList]
  );

  const handleDrop = (result: any) => {
    setVideoList(result);
  };

  return (
    <div className="player-list-container">
      <div className="player-form-wrapper">
        <div className="player-form">
          <input
            type="text"
            placeholder="Enter youtube url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.currentTarget.value)}
          />
          <button onClick={addNewUrl} className="add-button">
            Add
          </button>
        </div>
      </div>

      <div className="player-list">
        <DraggableList items={videoList} onDragEnd={handleDrop}>
          {(item: any) => (
            <PlayerItem
              img={item.imgSrc}
              title={item.title}
              key={item.id}
              removeButton={
                <button
                  className="remove-button"
                  onClick={() => removeVideo(item.id)}
                >
                  X
                </button>
              }
            />
          )}
        </DraggableList>
      </div>
    </div>
  );
};

export default PlayerList;
