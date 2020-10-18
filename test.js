function sum(num) {
  if (num === undefined) return this.count;

  this.count = this.count === undefined ? num : this.count + num;

  return sum;
}

console.log(sum(1)(2)(3)());