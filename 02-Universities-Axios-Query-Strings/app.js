let url = "http://universities.hipolabs.com/search?country=";

let loadingButton = document.querySelector("#loadingButton");   // for replacing search button with loading button
loadingButton.style.display = "none";   // for replacing search button with loading button

let searchButton = document.querySelector("#searchButton");

searchButton.addEventListener("click", async () => {

    searchButton.style.display = "none"   // for replacing search button with loading button
    loadingButton.style.display = "inline";   // for replacing search button with loading button

    let inputCountry = document.querySelector("#inputCountry");
    let country = inputCountry.value;

    let inputState = document.querySelector("#inputState");
    let state = inputState.value;

    let inputUniversity = document.querySelector("#inputUniversity");
    let university = inputUniversity.value;


/////////      callback for data as per user input    
    
    let oldCollegesArray = await getColleges(country, university);  //  data store in array as per result of callback from API function

    let collegesArray = oldCollegesArray.filter( (college) => String(college["state-province"]).toLowerCase().includes(state.toLowerCase()) );  //  as API doesn't have state-province filter, we make our own and store in new data in new array



/////  start  /////  searched input heading

    let searchedText = document.querySelector(".searchedText h6");

    if (country == "") {

        country = "All";
    }

    if (state == "") {

        state = "All";
    }

    searchedText.innerHTML = `Results for Country: "${country.toUpperCase()}" & State: "${state.toUpperCase()}"`;

/////  end  /////  searched input heading    

    inputCountry.value = "";    //  remove text from input after clicking on search button
    inputState.value = "";    //  remove text from input after clicking on search button
    inputUniversity.value = "";    //  remove text from input after clicking on search button

    show(collegesArray);   //   callback for displaying data

});



/////  start  /////  getting API data  -    as per user input function definition

async function getColleges(country, university) {

    try {
        let res = await axios.get(`${url}${country}&name=${university}`);
        return res.data;

    } catch (error) {
        console.log("Error:- ", error);
        return [];
    }
}

/////  end  /////  getting API data  -    as per user input function definition



/////  start  /////     displaying data on web page function definition

function show(collegesArray) {

    let ul = document.querySelector("#list");

    if (collegesArray == []) {
        
        ul.innerText = "No Data Found";
        
    } else {
        
        ul.innerText = "";  // old data removed
    }
    
    for (const college of collegesArray) {

        let li = document.createElement("li");  // as per array items new element creation
        li.classList.add("card");   // we have set css property in external css file

        let a = document.createElement("a");  // as per array items new element creation
        a.classList.add("card-link");   // we have set css property in external css file
        a.target = "_blank" //  Opening a link on a browsing context (like a new tab or window)
        a.rel = "noopener noreferrer";  //  noopener = prevents "reverse tabnabbing" attack, noreferrer = not sending the Referer header
        a.href = `${college["web_pages"][0]}`;   //   link of new web page
        a.innerText = `${college.name}`; // setting value in new element

        ul.appendChild(li);  // as per array items new element placing in html
        li.appendChild(a);  // as per array items new element placing in html
    }

    searchButton.style.display = "inline";   // for replacing loading button with search button
    loadingButton.style.display = "none";   // for replacing loading button with search button
}

/////  end  /////     displaying data on web page function definition



////////////////////////////////////////////////////////////////////////////////////////////////

///// start /////   Fetching Data and Populating the datalist

async function allDataAPI() {
    
    let datalistOptionsCountry = document.querySelector("#datalistOptionsCountry");
    let datalistOptionsState = document.querySelector("#datalistOptionsState");
 
    try {
        
        let res = await axios.get(url);
        let data = res.data;
        console.log(data);


        let uniqueCountries = new Set();
        let uniqueStates = new Set();

/////  start  /////  Iterate over each item in the fetched data
    
        data.forEach(item => {
            
            // For country
            if (!uniqueCountries.has(item.country)) {

                uniqueCountries.add(item.country);

                let optionCountry = document.createElement("option"); // Create a new <option> element
                optionCountry.value = item.country; // Populating option of datalist for country

                datalistOptionsCountry.appendChild(optionCountry); // Append the <option> element to the datalist
            }

            // For state-province
            if (item["state-province"] && !uniqueStates.has(item["state-province"])) {

                uniqueStates.add(item["state-province"]);

                let optionState = document.createElement("option"); // Create a new <option> element
                optionState.value = item["state-province"]; // Populating option of datalist for state

                datalistOptionsState.appendChild(optionState); // Append the <option> element to the datalist
            }
        });

/////  end  /////  Iterate over each item in the fetched data        

    } catch (error) {
     
        console.log("Error - ", error);
    }
}

allDataAPI();

///// end /////   Fetching Data and Populating the datalist
