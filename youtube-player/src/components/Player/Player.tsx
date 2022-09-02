import { FC, useCallback } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { useRecoilState, useRecoilValue } from "recoil";
import { IVideo } from "../../domain/IVideo";
import { videoListState, selectedVideoState } from "../../recoil";
import api from "../../service";
import "./Player.scss";

const Player: FC = () => {
  const [videoList, setVideoList] = useRecoilState(videoListState);
  const selectedVideo = useRecoilValue<IVideo>(selectedVideoState);

  const onVideoEnd = useCallback(() => {
    api.removeVideo(videoList[0].id).then(() => {
      setVideoList((prev) => {
        return [...prev.slice(1)];
      });
    });
  }, [setVideoList, videoList]);

  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 0,
    },
  };

  const onPlayerError: YouTubeProps["onError"] = () => {
    alert("Error accrued");
  };

  if (videoList.length === 0) {
    return <YouTube opts={{ height: "100%" }} />;
  }

  return (
    <div className="player">
      <YouTube
        videoId={selectedVideo?.id}
        id={selectedVideo?.id}
        onEnd={onVideoEnd}
        opts={opts}
        onError={onPlayerError}
      />
    </div>
  );
};

export default Player;
