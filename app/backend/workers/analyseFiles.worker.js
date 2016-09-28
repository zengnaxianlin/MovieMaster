import { dialog } from 'electron';
import tool from './tool';

const mediaFilterExt = ['rmvb', 'mp4', 'mkv', 'avi', 'mp3'];

const openDirDialog = (options, callback) => {
  options = Object.assign({
    properties: ['openDirectory'],
  }, options);
  dialog.showOpenDialog(options, (path) => {
    if (path) {
      callback(path[0]);
    }
  });
};

export function analyse() {
  openDirDialog({ title: '打开文件夹~~~' }, (dir) => {
    tool.readDirRecur({
      root: dir,
      extfilters: mediaFilterExt,
    }, (file) => {
      console.log('redDirRecur---------->');
    }).then((data)=> {
      while (data.length !== [].concat.apply([], data).length) {
        data = [].concat.apply([], data);
      }
      data = data.filter((item) => {
        return item;
      });
      return data;
    }).then((files) => {
      // files 一个数组 元素是每个文件的完整路径
      eventBus.emit('loadLocalFiles', {paths: files});
      return files;
    });
  });
}
