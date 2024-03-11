

// passWORD
// 4c5598d58d49eed16aa216ad74c8d17bdecb630f709c9854fb6d9e7b0e1f4a0c


// 1st time has + Salt
// b7f2ca5ffb6c457bca76dfc6d8312797dfeeac6e6d1d49025c70a0f975d3b230
// 2nd Time
// 7ef6e1769bf061c5e5280af8439968b1215ae97806862c5b20fb3e69b3d5e0d5
// passWORD + salt
// 42693c4c610af6f2fa962aa742df4e1f31607498939765b733b13f0bb611a749



var fullPassword = 1234 +  password + saltX
var fullPassword = 4321 +  password + saltX
var fullPassword = 2431 +  password + saltX
var fullPassword = 1234 +  password + saltX
const { createHash } = require('crypto');

function hash(string) {
    console.log("the original password was " + password)
    console.log("the hash of the original password was \n" + createHash('sha256').update(password).digest('hex'))
 console.log("The hash of both is \n" + createHash('sha256').update(string).digest('hex'));

var outputText =fs.createWriteStream("salt.txt")
outputText.once('open',function(xxx){

//outputText.write(saltX)-

})

}

hash(fullPassword)








// console.log("The Random Salt is Random " + saltX)
// let saltX = (Math.random() + 1).toString(36).substring(6)
// 