import React, {useEffect, useState} from 'react';
import axios from 'axios';

export function Test() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/api') // リクエストを飛ばす
      .then(response => {
        // 成功した場合は、posts を更新する
        setPosts(response.data);
        console.log(response.data);
      })
      .catch(() => {
        // 失敗
        console.log('通信に失敗しました');
      });
  }, []);

  return (
    <>
      <h1>test page</h1>
      <p>{posts.body}</p>
      <p>{posts.datetime}</p>
    </>
  );
}