console.log("starting...");
var instancesListEl = document.getElementById("is-instances-list");
var addInstanceEl = document.getElementById("is-add-instance-trigger");
var removeInstanceEl = document.getElementById("is-remove-instance-trigger");
var wrapperEl = document.querySelector(".masto-wrapper");
var instancesListData = JSON.parse(localStorage.getItem("instances")) || ["mastodon.social"];
var currentInstance = localStorage.getItem("last_instance") || instancesListData[0];


function addInstanceToList(instance) {
    var option = document.createElement("option");
    option.text = instance;
    instancesListEl.add(option);
}

function askAndAddInstance() {
    var instance = prompt("Adding new instance. Please enter the domain of the instance (eg: mastodon.social)")

    if (instance) {
        saveNewInstance(instance);
    }
}

function saveNewInstance(instance) {
    instancesListData.push(instance);
    localStorage.setItem("instances", JSON.stringify(instancesListData))
    refreshInstancesList();
    launchInstance(instance);
}

function removeCurrentInstanceFromList() {
    var ok = confirm("Are you sure you want to remove " + instancesListEl.value);
    if (ok) {
        remove(instancesListData, instancesListEl.value);
        localStorage.setItem("instances", JSON.stringify(instancesListData))
        refreshInstancesList();
    }
}

function remove(arr, what) {
    var found = arr.indexOf(what);

    while (found !== -1) {
        arr.splice(found, 1);
        found = arr.indexOf(what);
    }
}

function refreshInstancesList() {
    instancesListEl.innerHTML = "";
    instancesListData.forEach(function(instance) {
        addInstanceToList(instance);
    });
}

function launchInstance(instance) {
    wrapperEl.setAttribute("src", "loading.html");
    // Needed to display some page while loading happens...
    setTimeout(function() {
        instancesListEl.value = instance;
        currentInstance = ("https://" + instance);
        wrapperEl.setAttribute("src", currentInstance);
        localStorage.setItem("last_instance", currentInstance);
    }, 200);
}

// Hook instance list events

instancesListEl.addEventListener("change", function(ev) {
    launchInstance(ev.target.value);
    console.log(ev);
});

addInstanceEl.addEventListener("click", askAndAddInstance);
removeInstanceEl.addEventListener("click", removeCurrentInstanceFromList);

refreshInstancesList();

if (currentInstance.indexOf("https://") == -1) {
    currentInstance = "https://" + currentInstance;
}

wrapperEl.setAttribute("src",  currentInstance);
instancesListEl.value = currentInstance.replace(/^https?\:\/\//i, "");

