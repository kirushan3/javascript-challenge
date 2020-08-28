// from data.js
var tableData = data;

// YOUR CODE HERE!

// Referencing html function

var tbody = d3.select("tbody");

// Build the table using the arrow function
function buildTable(tableData){
    // Clear any data if present
    tbody.html("");

    //loop thru data table to place the values
    tableData.forEach(dataEntry =>{
        var row = tbody.append("tr");
        Object.entries(dataEntry).forEach(([key,value]) => {
        var cell = row.append("td");
        cell.text(value);
        });
    });
}

// Filter the data by date
var button = d3.select("#filter-btn");
button.on("click", function() {
    // Prevent webiste to refresh
    d3.event.preventDefault();

    // Select the input element and get the Raw HTML

    var inputFilterDate = d3.select("#datetime");
    var inputFilterCity = d3.select("#cityname");
    var inputFilterState = d3.select("#stateinitials");

    var inputDate = inputFilterDate.property("value").trim()
    var inputCity = inputFilterCity.property("value").toLowerCase().trim()
    var inputState = inputFilterState.property("value").toLowerCase().trim()

    console.log(inputDate);
    console.log(tableData);
    
    // Elaborated Filter 
    var filteredDate = tableData.filter(tableData => tableData.datetime === inputDate);
    var filteredCity = tableData.filter(tableData => tableData.city === inputCity);
    var filteredState = tableData.filter(tableData => tableData.state === inputState);
    var filteredCDS = tableData.filter(tableData => tableData.city === inputCity && tableData.datetime === inputDate && tableData.state === inputState)
    var filteredDS = tableData.filter(tableData => tableData.datetime === inputDate && tableData.state === inputState)
    var filteredCD = tableData.filter(tableData => tableData.city === inputCity  && tableData.datetime === inputDate )
    var filteredCS = tableData.filter(tableData => tableData.city === inputCity && tableData.state === inputState)
    
    console.log(filteredDate);

    // add filters to the table
    tbody.html("");

    var result = {
        filteredCDS, filteredDS, filteredCD, filteredCS, filteredDate, filteredCity,filteredState
        
    }

    if (result.filteredCDS.length != 0){
        buildTable(filteredCDS);
    }
        else if(result.filteredDS.length !=0){
            buildTable(filteredDS);
        }
        else if(result.filteredCD.length !=0){
            buildTable(filteredCD);
        }
        else if(result.filteredCS.length !=0){
            buildTable(filteredCS);
        }
        else if(result.filteredDate.length !=0){
            buildTable(filteredDate);
        }
        else if(result.filteredCity.length !=0){
            buildTable(filteredCity);
        }
        else if(result.filteredState.length !=0){
            buildTable(filteredState);
        }

        else {
            tbody.append("tr").append("td").text("No Data - Try something else")
        }

});


buildTable(tableData);

var resetButton = d3.select('#reset-btn')
resetButton.on("click", function() {
    tbody.html("");
    buildTable(tableData)
    console.log("table reset")
})


