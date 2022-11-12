const data = `{
    "Batch 2019-2023": [
      {
        "Name": "Aryan Raj",
        "Roll": "19EEJCS007",
        "Email": "aryaraj132@gmail.com",
        "Github username": "aryaraj132"
      },
      {
        "Name": "Dummy 19-23",
        "Roll": "dummy 19-23",
        "Email": "dummy 19-23",
        "Github username": "dummy 19-23"
      }
    ],
    "Batch 2020-2024": [
      {
        "Name": "Dummy 20-24",
        "Roll": "dummy 20-24",
        "Email": "dummy 20-24",
        "Github username": "dummy 20-24"
      }
    ]
  }`  
var batch = "Batch 2019-2023";
// parse the text to extract the values
const arr = JSON.parse(data)
const values = arr[batch].map((key) => {
    return key
})
arr[batch].push({
    "Name": "Dummy 19-23",
    "Roll": "dummy 19-23",
    "Email": "dummy 19-23",
    "Github username": "dummy 19-23"
})
console.log(arr)
let dataFetch = fetch('https://api.github.com/repos/GEC-Jhalawar/Support/util/StudentList.json', {
    method: 'GET',
}).then(response => response.json()).then(resdata => {
console.log(resdata);
});
// const { name, roll, email, github } = parseText(text)
// console.log(name, roll, email, github)