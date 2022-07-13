//定义食物类Food
class Food {
  //定义一个属性表示食物所对应元素
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById("food")!; //!at the end means: it's not possible to be null value
  }

  //定义一个获取食物x轴坐标的方法
  get X() {
    return this.element.offsetLeft;
  }

  //定义一个获取食物y轴坐标的方法
  get Y() {
    return this.element.offsetTop;
  }

  //修改食物位置
  change() {
    //生成一个随机的位置
    //食物的位置最小是0，最大是290
    //蛇移动一次就是一格=10px，所以食物坐标必须是整10
    // 0-29的数乘10
    let top = Math.round(Math.random() * 29) * 10;
    let left = Math.round(Math.random() * 29) * 10;
    this.element.style.left = left + "px";
    this.element.style.top = top + "px";
  }
}
export default Food;

//测试代码
// const food = new Food();
// console.log(food.X, food.Y);
// food.change();
// console.log(food.X, food.Y);
