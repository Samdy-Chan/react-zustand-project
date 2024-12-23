// 导入 zustand 状态管理库创建 store 的方法 create
import { create } from 'zustand';

// 如果安装了 redux 浏览器开发者插件，还可以导入 zustand 的中间件函数 devtools，
// 可以在调用 zustand 的修改状态变量方法时，在 redux 浏览器的插件中观察状态变量的变化等情况
import { devtools } from 'zustand/middleware';

// 定义 channelStore（包括状态变量和操作方法）的数据类型
export type ChannelStoreType = {
  channelList: { id: number; name: string }[];
  getChannelList: () => Promise<void>;
};

// 创建并导出 channel 模块的 store 对象
export const useChannelStore = create(
  // 如果安装了 redux 浏览器开发者插件，还可以使用 zustand 的中间件函数 devtools，
  // 可以在调用 zustand 的修改状态变量方法时，在 redux 浏览器的插件中观察状态变量的变化等情况
  devtools<ChannelStoreType>((set) => {
    // zustand.create 方法的回调函数需要返回一个包含初始化状态数据和操作状态数据方法的对象
    return {
      // 初始化状态数据
      channelList: [],

      // 异步获取 channelList 数据的方法
      getChannelList: async () => {
        // zustand 状态管理库的异步方法也和同步方法一样，也在这里直接定义就可以了，比 redux 方便很多
        const res = await fetch('http://localhost:8888/channels');
        const data: ChannelStoreType['channelList'] = await res.json();
        console.log('channelList data:', data);

        // 保存获取到的 channelList 数据到状态变量中
        set((state) => ({ channelList: data }));
      },
    };
  })
);
