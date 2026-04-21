let dataset = [];

fetch("Campus_Food_Habits_Survey.xlsx")
.then(res => res.arrayBuffer())
.then(data => {

let workbook = XLSX.read(data);

let sheet = workbook.Sheets[workbook.SheetNames[0]];

dataset = XLSX.utils.sheet_to_json(sheet);

console.log(dataset); // check dataset in browser console

showTable(dataset);

});


function showTable(data){

let table = document.getElementById("table");

table.innerHTML="";

data.forEach(student => {

let name = student["Full Name"] || "";
let branch = student["Branch"] || "";
let year = student["Year of Study"] || "";
let food = student["Which food item you order the most?"] || "";
let app = student["Which food delivery app do you mostly use?"] || "";

let row = `
<tr>
<td>${name}</td>
<td>${branch}</td>
<td>${year}</td>
<td>${food}</td>
<td>${app}</td>
</tr>
`;

table.innerHTML += row;

});

}


function searchStudent(){

let value = document.getElementById("search").value.toLowerCase().trim();

let results = dataset.filter(student => {

let name = (student["Full Name"] || "").toLowerCase();

return name.includes(value);

});

showTable(results);

if(results.length > 0){

let s = results[0];

document.getElementById("studentName").innerText = s["Full Name"];
document.getElementById("food").innerText = s["Which food item you order the most?"];
document.getElementById("app").innerText = s["Which food delivery app do you mostly use?"];

}else{

document.getElementById("studentName").innerText = "No Student Found";
document.getElementById("food").innerText = "-";
document.getElementById("app").innerText = "-";

}

}