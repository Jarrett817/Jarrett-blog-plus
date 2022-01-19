import { v4 as uuidv4 } from 'uuid';
interface Response {
  data: {
    enddate: string;
    url: string;
    bmiddle_pic: null;
    original_pic: null;
    thumbnail_pic: null;
  };
  status: {
    code: number;
    message: string;
  };
}

export function jsonp(path: string) {
  return new Promise<Response>((resolve, reject) => {
    const id = uuidv4();
    let functionName = 'jarrett' + id.replaceAll('-', '');
    (window as any)[functionName] = function (result: any) {
      resolve(result);
    };
    let script = document.createElement('script');
    script.src = `${path}&callback=${functionName}`;
    document.body.insertBefore(script, document.body.firstChild);
    script.onload = function (e) {
      if (e.currentTarget instanceof HTMLElement) {
        e.currentTarget!.remove(); //请求完了就干掉这个脚本
        delete (window as any)[functionName]; //请求完了就干掉这个随机函数
      }
    };
    script.onerror = function (e) {
      if (typeof e === 'string') return;
      if (e.currentTarget instanceof HTMLElement) {
        e.currentTarget!.remove();
        delete (window as any)[functionName];
        reject('no data');
      }
    };
  });
}
