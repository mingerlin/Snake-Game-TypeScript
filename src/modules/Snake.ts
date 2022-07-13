//定义蛇类Snake
class Snake {
  //表示蛇的元素
  head: HTMLElement;
  //蛇的身体
  bodies: HTMLCollection;
  //获取蛇的容器
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById("snake")!;
    this.head = document.querySelector("#snake > div") as HTMLElement;
    this.bodies = this.element.getElementsByTagName("div"); //这个返回的是个collection
  }

  //获取蛇的坐标（蛇头X）
  get X() {
    return this.head.offsetLeft;
  }
  //获取蛇的坐标（蛇头Y）
  get Y() {
    return this.head.offsetTop;
  }

  //设置蛇头的位置
  set X(value: number) {
    if (this.X === value) {
      return;
    }
    //X的值的合法范围0-290之间
    if (value < 0 || value > 290) {
      //进入判断说明蛇撞墙了,抛出一个异常
      throw new Error("Snake died!");
    }

    //修改x时，是在修改水平坐标，蛇在左走时，不能往右走，反之亦然
    if (
      this.bodies[1] &&
      (this.bodies[1] as HTMLElement).offsetLeft === value
    ) {
      //如果发生掉头，让蛇继续移动
      if (value > this.X) {
        //如果新值vlaue大于旧值X，则说明蛇在向右走，应该使蛇继续行走
        value = this.X - 10;
      } else {
        value = this.X + 10;
      }
    }

    //移动身体
    this.moveBody();
    this.head.style.left = value + "px";

    //检查有没有撞到自己
    this.checkHeadBody();
  }
  set Y(value: number) {
    if (this.Y === value) {
      return;
    }
    //Y的值的合法范围0-290之间
    if (value < 0 || value > 290) {
      //进入判断说明蛇撞墙了,抛出一个异常
      throw new Error("Snake died!");
    }

    //修改y时，是在修改水平坐标，蛇在上走时，不能往下走，反之亦然
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      //如果发生掉头，让蛇继续移动
      if (value > this.Y) {
        //如果新值vlaue大于旧值Y，则说明蛇在向上走，应该使蛇继续行走
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }

    //移动身体
    this.moveBody();
    this.head.style.top = value + "px";

    //检查有没有撞到自己
    this.checkHeadBody();
  }

  //蛇增加身体的方法
  addBody() {
    //向element中添加一个div
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }

  //蛇增加身体的方法
  moveBody() {
    //将后边的身体设置为前边身体的位置
    //ie
    //第4节=第3节的位置； 第3节=第2节的位置；第2节=蛇头的位置；
    //遍历获取所有的身体
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前面身体的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      // 将这个值设置到当前身体上
      (this.bodies[i] as HTMLElement).style.left = X + "px";
      (this.bodies[i] as HTMLElement).style.top = Y + "px";
    }
  }

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

  checkHeadBody() {
    //获取所有的身体，检查其是否和蛇头的坐标发生重叠
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        //说明蛇头撞到身体，游戏结束
        throw new Error("hit yourself!");
      }
    }
  }
}
export default Snake;

//测试代码
