// 导入 zustand 状态管理库创建 store 的方法 create
import { create } from 'zustand';

// 定义counterStore（包括状态变量和操作方法）的数据类型
export type CounterStoreType = {
  count: number;
  incrCount: Function;
  decrCount: (val?: number) => void;
  asyncIncrCount: () => Promise<void>;
};

// 创建并导出 counter 模块的 store 对象
export const useCounterStore = create<CounterStoreType>((set, get) => {
  // zustand.create 方法的回调函数需要返回一个包含初始化状态数据和操作状态数据方法的对象
  return {
    // 初始化状态数据
    count: 0,

    // 增加状态数据的方法
    incrCount: () => {
      // 如果需要引用原本 state 状态 count 的值，set 函数里需要传入 state
      //   set((state) => ({ count: state.count + 1 }));
      set((state) => ({ count: get().count + 1 })); // 或使用 get().count 引用 state.count 的值
      // 如果不需要引用原本 state.count 的值，set 函数无须传入 state 参数
      // set(() => ({ count: 10 }));
    },

    // 递减状态数据的方法
    decrCount: (val = 1) =>
      set((state) => {
        if (state.count - val <= 0) {
          alert('年龄不能<=0，不能再减了');
          // 即使不操作也必须返回状态变量原数据，否则页面可能渲染不正确
          return { count: state.count };
        }
        return { count: state.count - val };
      }),

    // 异步方法：等一等再加，异步修改状态数据的方法
    asyncIncrCount: async () => {
      // 在同步方法 asyncIncrCount 内定义异步[等一等再加]方法
      const waitIncr = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(set((state) => ({ count: state.count + 1 })));
          }, 1000); // 2秒后再增加 state.count 状态变量
        });
      };

      // 调用异步[等一等再加]方法
      await waitIncr();
    },

    /** 在 zustand 的 create 函数这里，还可以同时定义更多的状态变量和相关的方法，如下： */
    // count2: 1,
    // incrCount2: () => {},
    // decrCount2: () => {},
  };
});
