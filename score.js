let data = [];
const priedicionPoint = 300;
// const k = 3;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  data.push([dropPosition, bounciness, size, bucketLabel])
}

function runAnalysis() {

  const testSetSize = 100;
  const [testSet, trainingSet] = splitDataSet(data, testSetSize);

  // let numberCurrected = 0;
  //   testSet.map((val, i) => {
  //     bucket = knn(trainingSet, testSet[i][0]);
  //     if(bucket == testSet[i][3]) 
  //     numberCurrected ++;
  //   })
  //   console.log("Accuracy :", numberCurrected / testSetSize);
  _.range(1, 20).forEach((k) => {
    const accuracy = _.chain(testSet)
      .filter(testPoint => knn(trainingSet, testPoint[0], k) == testPoint[3])
      .size()
      .divide(testSetSize)
      .value();

    console.log("ac", accuracy, "k", k );

  })
}


function knn(dataSet, point, k) {
  return _.chain(dataSet)
    .map(row => [distance(row[0], point), row[3]])
    .sortBy(row => row[0])
    .slice(0, k)
    .countBy(row => row[1])
    .toPairs()
    .sortBy(row => row[1])
    .last()
    .first()
    .parseInt()
    .value();
}

function splitDataSet(dataSet, testCount) {
  const shuffled = _.shuffle(dataSet);
  const testSet = _.slice(shuffled, 0, testCount);
  const trainigSet = _.slice(shuffled, testCount);
  return [testSet, trainigSet];
}

function distance(pointA, pointB) {
  
  return _.chain(pointA)
          .zip(pointB)
          .map(([a, b]) => (a - b)**2)
          .sum()
          .value()**0.5;
}



