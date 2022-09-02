import { atom } from "recoil";
import { IVideo } from "../domain/IVideo";

const videoListState = atom<IVideo[]>({
    key: 'videoList',
    default: [],
  });

export default videoListState;