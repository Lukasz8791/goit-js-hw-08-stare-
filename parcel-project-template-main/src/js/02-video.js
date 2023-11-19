import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = new Player('vimeo-player');
const localStorageKey = 'videoplayer-current-time';

const saveTimeToLocalStorage = () => {
  vimeoPlayer.getCurrentTime().then(time => {
    localStorage.setItem(localStorageKey, time);
  });
};

const loadTimeFromLocalStorage = () => {
  const savedTime = localStorage.getItem(localStorageKey);
  if (savedTime !== null) {
    vimeoPlayer.setCurrentTime(parseFloat(savedTime));
  }
};

vimeoPlayer.on('timeupdate', throttle(saveTimeToLocalStorage, 1000));

vimeoPlayer.on('loaded', loadTimeFromLocalStorage);
