import React, { useState } from 'react';

// 以模块导入样式，可以防止类名重名问题，保证每个类名在整个应用全局都是唯一的
import styles from './index.module.scss';
// console.log('styles:', styles);

// 导入 counterStore 和 channelStore 相当于 redux 的 reducers 函数，用于获取状态变量和操作状态变量的方法
import { useCounterStore, useChannelStore, type CounterStoreType, type ChannelStoreType } from '@/store';

const TestZustand: React.FC = () => {
  // 获取 counterStore 的状态变量和操作状态变量的方法
  const { count, incrCount, decrCount, asyncIncrCount }: CounterStoreType = useCounterStore();

  // 获取 channelStore 的状态变量和操作状态变量的方法
  const { channelList, getChannelList }: ChannelStoreType = useChannelStore();

  const [decrVal, setDecrVal] = useState(1);

  const fetchChannelList = async () => {
    await getChannelList();
  };

  return (
    <div className={styles.testBox}>
      {/* counterStore 模块 */}
      <div className={styles.counterStoreBox}>
        <h2>countStore 模块</h2>
        <button onClick={() => decrCount(decrVal)}>-指定值</button>
        <input
          type="number"
          value={decrVal}
          style={{ width: 40, marginLeft: 6 }}
          onInput={(e) => setDecrVal(+(e.target as HTMLInputElement).value)} // 前+号用于数字字符转数值型
        />
        <span className={styles.age}>年龄：{count}</span>
        <button onClick={() => incrCount()}>+1</button>
        <button onClick={asyncIncrCount}>异步等一等再加+1</button>
      </div>

      {/* channelStore 模块 */}
      <div className={styles.channelStoreBox}>
        <h2>channelStore 模块</h2>
        <button onClick={async () => await fetchChannelList()}>后端请求异步获取 channel 列表数据</button>
        {/* 渲染 channelList 数据 */}
        <ul>
          {channelList.map((channel) => {
            return <li key={channel.id}>{channel.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default TestZustand;
