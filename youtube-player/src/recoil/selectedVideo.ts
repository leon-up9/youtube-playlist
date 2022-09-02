import { selector } from "recoil";
import videoListState from "./videoList";

const selectedVideoState = selector({
  key: 'selectedVideoState',
  get: ({get}) => {
    const list = get(videoListState);
    return list[0];
    }
  },
);

export default selectedVideoState;