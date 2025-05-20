class MarsLandProfit {
  constructor(totalTime) {
    this.totalTime = totalTime;
    this.buildings = [
      { type: 'T', time: 5, earning: 1500 },
      { type: 'P', time: 4, earning: 1000 },
      { type: 'C', time: 10, earning: 3000 }
    ];

    this.dp = [];
    this.choice = [];

    for (let i = 0; i <= totalTime; i++) {
      this.dp[i] = 0;
      this.choice[i] = null;
    }
  }

  calculate() {
    for (let t = this.totalTime - 1; t >= 0; t--) {
      let maxEarn = this.dp[t];
      let bestBuild = null;

      for (let i = 0; i < this.buildings.length; i++) {
        let b = this.buildings[i];
        let finish = t + b.time;

        if (finish <= this.totalTime) {
          let earn = (this.totalTime - finish) * b.earning + this.dp[finish];
          if (earn > maxEarn) {
            maxEarn = earn;
            bestBuild = b.type;
          }
        }
      }

      this.dp[t] = maxEarn;
      this.choice[t] = bestBuild;
    }
  }

  getSolution() {
    let t = 0;
    let result = { T: 0, P: 0, C: 0 };

    while (t < this.totalTime && this.choice[t] !== null) {
      let bType = this.choice[t];
      let bTime = 0;

      for (let i = 0; i < this.buildings.length; i++) {
        if (this.buildings[i].type === bType) {
          bTime = this.buildings[i].time;
          break;
        }
      }

      result[bType] = result[bType] + 1;
      t = t + bTime;
    }

    return result;
  }

  getMaxProfit() {
    this.calculate();
    return {
      earnings: this.dp[0],
      buildings: this.getSolution()
    };
  }
}


let profit7 = new MarsLandProfit(7);
console.log(profit7.getMaxProfit());

let profit8 = new MarsLandProfit(8);
console.log(profit8.getMaxProfit());

let profit13 = new MarsLandProfit(13);
console.log(profit13.getMaxProfit());
