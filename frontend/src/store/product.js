import {create} from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({products}),
  createProduct: async(newProduct)=>{
    if(!newProduct.name || !newProduct.image || !newProduct.price){
        return {success:false,message:"please fill all fields."}
    }
    const res = await fetch("/api/products",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(newProduct)
    })
    const data = await res.json();
    set((state)=>({products:[...state.products,data.data]}));
    return {success:true,message:"Product added successfully."};
  }
}))

/*
// 引入 Zustand 的 create 函数
const { create } = require("zustand");

// 定义一个产品管理的“存储”
const useProductStore = create(function(set) {
  // 返回一个对象，包含数据和方法
  return {
    // 产品列表，初始为空
    products: [],

    // 设置产品列表的方法
    setProducts: function(newProducts) {
      set({ products: newProducts }); // 更新 products 的值
    },

    // 创建新产品的方法
    createProduct: async function(newProduct) {
      // 检查输入是否完整
      if (!newProduct.name || !newProduct.image || !newProduct.price) {
        return {
          success: false,
          message: "Please fill all fields."
        };
      }

      // 发送请求到后端 API
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct) // 把对象转成 JSON 字符串
      });

      // 解析后端返回的数据
      const data = await response.json();

      // 更新本地的产品列表，把新产品加进去
      set(function(state) {
        return {
          products: state.products.concat(data.data) // 用 concat 添加新产品
        };
      });

      // 返回成功信息
      return {
        success: true,
        message: "Product added successfully."
      };
    }
  };
});

// 导出这个存储，让其他文件可以用
module.exports = useProductStore;

*/