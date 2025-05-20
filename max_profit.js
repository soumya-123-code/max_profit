function maxProfit(n) {
  var buildings = [
    {name: 'T', time: 5, earning: 1500},
    {name: 'P', time: 4, earning: 1000},
    {name: 'C', time: 10, earning: 3000}
  ];

  var dp = [];
  var choice = [];

  for (var i = 0; i <= n; i++) {
    dp[i] = 0;
    choice[i] = null;
  }

  for (var time = n - 1; time >= 0; time--) {
    var maxEarn = dp[time];
    var bestChoice = null;

    for (var i = 0; i < buildings.length; i++) {
      var b = buildings[i];
      var finishTime = time + b.time;
      if (finishTime <= n) {
        var earn = (n - finishTime) * b.earning + dp[finishTime];
        if (earn > maxEarn) {
          maxEarn = earn;
          bestChoice = b.name;
        }
      }
    }

    dp[time] = maxEarn;
    choice[time] = bestChoice;
  }

  var time = 0;
  var count = {T: 0, P: 0, C: 0};

  while (time < n && choice[time] !== null) {
    var bName = choice[time];
    var b = null;

    for (var i = 0; i < buildings.length; i++) {
      if (buildings[i].name === bName) {
        b = buildings[i];
        break;
      }
    }

    count[bName] = count[bName] + 1;
    time = time + b.time;
  }

  return {
    earnings: dp[0],
    solution: count
  };
}

console.log(maxProfit(7));
console.log(maxProfit(8));
console.log(maxProfit(13));
