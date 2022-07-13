import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

//游戏控制器，控制其他的所有类
class GameControl {
  //定义三个属性
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;

  //创建一个属性来存储蛇的移动方向（也就是按键的方向）
  direction: string = "";

  //创建一个属性用来记录游戏是否结束
  isLive = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel(10, 2); //每两分升一级

    this.init();
  }

  //游戏初始化方法，调用后游戏即开始
  init() {
    //绑定键盘按键按下的事件
    document.addEventListener("keydown", this.keydownHandler.bind(this)); //bind的作用是创建新函数,这时候的this指向整个class，如果没有bind，this指向document
    //调用run方法，使蛇移动
    this.run();
  }

  //创建一个键盘按下的相应函数
  keydownHandler(event: KeyboardEvent) {
    //需要检查event.key是否合法（用户是否按了正确的键）
    this.direction = event.key;
  }

  //创建一个控制蛇移动的方法
  run() {
    /*根据方向this.direction来使蛇的位置改变
     * 向上top减少
     * 向下top增加
     * 向左left减少
     * 向右left增加
     */
    //根据按键方向来修改蛇的方向
    let X = this.snake.X;
    let Y = this.snake.Y;

    switch (this.direction) {
      case "ArrowUp":
      case "Up": //case of ie
        Y -= 10;
        break;
      case "ArrowDown":
      case "Down": //case of ie
        Y += 10;
        break;
      case "ArrowLeft":
      case "Left": //case of ie
        X -= 10;
        break;
      case "ArrowRight":
      case "Right": //case of ie
        X += 10;
        break;
    }

    //检查蛇是否吃到食物
    this.checkEat(X, Y);

    //修改蛇的X和Y值
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e: any) {
      //进入到catch，说明游戏结束
      alert(e.message + " Game Over");
      this.isLive = false;
    }

    //开启一个定时调用
    this.isLive &&
      setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30); //最高等级最快就是30ms
  }

  //定义一个方法用来检查蛇是否吃到食物
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      //食物的位置要进行重置
      this.food.change();
      //分数增加
      this.scorePanel.addScore();
      //   蛇要增加一节
      this.snake.addBody();
    }
  }
}
export default GameControl;
