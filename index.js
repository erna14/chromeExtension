
let myLeads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLeads(myLeads)
}

function renderLeads(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++){
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    } 
    ulEl.innerHTML = listItems
}

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""

    //save myLeads array to localStorage
    localStorage.setItem("myLeads", JSON.stringify(myLeads))

    renderLeads(myLeads)

    console.log(localStorage.getItem("myLeads"))
})

tabBtn.addEventListener("click", function() {
    //Grabs the URL of the current tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLeads(myLeads)
    })

})

//with the deleteBtn function we are clearing out the localStorage 
//setting an empty array and calling the renderLeads() function in order
//to clear out the DOM
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    renderLeads(myLeads)
    console.log(myLeads)
})
