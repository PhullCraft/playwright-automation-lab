/*
const fruits: string [] = ["Apple","Banana","Chickoo","Drangonfruit"];

console.log(fruits[2]);
console.log("number of fruit is ",fruits.length);
fruits.push("watermelon");
console.log("for loop starts here");
for(const fruit of fruits){
    console.log(fruit);
}
*/

const seats:string [][] = [
    ["A1","A2","A3"],
    ["B1","B2","B3"],
    ["C1","C2","C3"]
]

console.log(seats[2][1]);
console.log("Row count is ",seats.length);
console.log("Number of seat at first Index is ", seats[0].length);
seats.push(["D1","D2","D3"]);
console.log("printing every seat through loop")
for(const row of seats){
    for(const seat of row){
        console.log(seat);
    }

}