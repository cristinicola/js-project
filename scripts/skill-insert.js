/* exported savePage, sort, changesCheck, scrollToTop  */

const xhttp = new XMLHttpRequest();
xhttp.open('GET', 'https://api.myjson.com/bins/l5l8v'); // we load json from a host, because Chrome isn't loading due security rules
/* xhttp.open('GET', 'newJson.json'); */
xhttp.onload = function () {
    const ourData = JSON.parse(xhttp.responseText);
    renderHTML(ourData);
    sortData = ourData;

};

xhttp.send();

let sortData;

function sort (sortType) { // sorting function

    for (let i = 0; i <= sortData.length; i++) {

        if (sortType === "skillUp" + i) {
            event.preventDefault();

            const skillUp = sortData[document.getElementById("sortSkillUpButton" + i).getAttribute("tableId")].requiredSkills;

            for (let j = 0; j < skillUp.length; j++) {

                const a = skillUp[j];
                const b = skillUp[j + 1];

                skillUp.sort(function (a, b) {
                    return 2 * (a.name > b.name) - 1;
                });

            }

            document.getElementById("all-skills").innerHTML = '';
            renderHTML(sortData);

        } else if (sortType === "skillDown" + i) {
            event.preventDefault();

            const skillDown = sortData[document.getElementById("sortSkillDownButton" + i).getAttribute("tableId")].requiredSkills;

            for (let j = 0; j < skillDown.length; j++) {

                const a = skillDown[j];
                const b = skillDown[j + 1];

                skillDown.sort(function (a, b) {
                    return 2 * (a.name < b.name) - 1;
                });

            }
            document.getElementById("all-skills").innerHTML = '';
            renderHTML(sortData);

        } else if (sortType === "averageUp") {

            event.preventDefault();

            const averageUp = sortData[document.getElementById("sortAverageUpButton" + i).getAttribute("tableId")].requiredSkills;

            for (let j = 0; j < averageUp.length; j++) {

                const a = averageUp[j];
                const b = averageUp[j + 1];

                averageUp.sort(function (a, b) {
                    return a.value - b.value;
                });
            }
            document.getElementById("all-skills").innerHTML = '';
            renderHTML(sortData);

        } else if (sortType === "averageDown") {
            event.preventDefault();

            const averageDown = sortData[document.getElementById("sortAverageDownButton" + i).getAttribute("tableId")].requiredSkills;

            for (let j = 0; j < averageDown.length; j++) {

                const a = averageDown[j];
                const b = averageDown[j + 1];

                averageDown.sort(function (a, b) {
                    return b.value - a.value;
                });
            }
            document.getElementById("all-skills").innerHTML = '';
            renderHTML(sortData);
        }

    }
}

function forRows(data, i, j, tableDiv) { //generate table rows
    /* table row */
    const rowDiv = document.createElement("div");
    rowDiv.className = "tableJuniorChild";

    /* div for image and description - used for hover */
    const entireToolTip = document.createElement("div");
    entireToolTip.setAttribute("class", "entireToolTipDiv");
    rowDiv.appendChild(entireToolTip);

    /* image */
    const infoImg = document.createElement("img");
    infoImg.setAttribute("class", "info");
    infoImg.src = 'images/i.png';
    entireToolTip.appendChild(infoImg);

    /* skill name */
    const rowDivSkillName = document.createElement("div");
    rowDivSkillName.setAttribute("class", "rowDivSkillName");
    rowDivSkillName.textContent = data[i].requiredSkills[j].name;
    rowDiv.appendChild(rowDivSkillName);

    /* input error */
    const errorInputDiv = document.createElement("div");
    errorInputDiv.setAttribute("class", "errorInput");
    errorInputDiv.setAttribute("id", "errorInputid" + i + j);
    rowDiv.appendChild(errorInputDiv);

    /* input */
    const rowDivSkillValue = document.createElement("input");
    rowDivSkillValue.setAttribute("id", "valueInserted" + i + j);
    rowDivSkillValue.setAttribute("class", "valueInserted");
    rowDivSkillValue.setAttribute("errorMsg", "errorInputid" + i + j);
    rowDivSkillValue.textContent = data[i].requiredSkills[j].value;
    rowDivSkillValue.value = data[i].requiredSkills[j].value;
    rowDiv.appendChild(rowDivSkillValue);

    /* text tooltip */
    const tooltipDescription = document.createElement("div");
    tooltipDescription.setAttribute("class", "tooltipDescription");
    tooltipDescription.textContent = data[i].requiredSkills[j].description;
    entireToolTip.appendChild(tooltipDescription);
    tableDiv.appendChild(rowDiv);
    return {rowDiv, entireToolTip, infoImg, rowDivSkillName, errorInputDiv, rowDivSkillValue, tooltipDescription};
}

function renderHTML (data) { // we generate the entire table dynamically

    for (let i = 0; i < data.length; i++) {

        const tableDiv = document.createElement("div");
        tableDiv.className = "tableJunior";
        tableDiv.setAttribute("id", "table" + i);
        const seniority = document.createElement("div");
        seniority.className = "senName";

        /* border above the table */
        const borderTable = document.createElement("div");
        borderTable.className = "borderTableSkill";

        const sortDiv = document.createElement("div");
        sortDiv.className = "sortDiv";

        /* for sorting by skill */
        const sortSkill = document.createElement("div");
        sortSkill.className = "sortSkill";

        //up skill
        const sortSkillUp = document.createElement("i");
        sortSkillUp.className = "fa fa-caret-up caret-up1";
        sortSkillUp.setAttribute("id", "sortSkillUp");
        const sortSkillUpButton = document.createElement("a");
        sortSkillUpButton.setAttribute("href", "");
        sortSkillUpButton.setAttribute("id", "sortSkillUpButton" + i);
        sortSkillUpButton.setAttribute("tableId", i);
        sortSkillUpButton.setAttribute("onclick", "sort('skillUp" + i + "');");
        sortSkillUpButton.appendChild(sortSkillUp);
        sortSkill.appendChild(sortSkillUpButton);

        //down skill
        const sortSkillDown = document.createElement("i");
        sortSkillDown.className = "fa fa-caret-down caret-down1";
        sortSkillDown.setAttribute("id", "sortSkillDown");
        const sortSkillDownButton = document.createElement("a");
        sortSkillDownButton.setAttribute("href", "");
        sortSkillDownButton.setAttribute("id", "sortSkillDownButton" + i);
        sortSkillDownButton.setAttribute("tableId", i);
        sortSkillDownButton.setAttribute("onclick", "sort('skillDown" + i + "');");
        sortSkillDownButton.appendChild(sortSkillDown);
        sortSkill.appendChild(sortSkillDownButton);

        const sortSkillText = document.createElement("div");
        sortSkillText.className = "sortSkillText";
        sortSkill.appendChild(sortSkillText);
        sortDiv.appendChild(sortSkill);

        /* for sorting by average */
        const sortValue = document.createElement("div");
        sortValue.className = "sortValue";

        //up average
        const sortValueUp = document.createElement("i");
        sortValueUp.className = "fa fa-caret-up caret-up2";
        sortValueUp.setAttribute("id", "sortValueUp");
        const sortValueUpButton = document.createElement("a");
        sortValueUpButton.setAttribute("href", "#");
        sortValueUpButton.setAttribute("id", "sortValueUpButton" + i);
        sortValueUpButton.setAttribute("tableId", i);
        sortValueUpButton.setAttribute("onclick", "sort('averageUp" + i + "');");

        sortValueUpButton.appendChild(sortValueUp);
        sortValue.appendChild(sortValueUpButton);

        //down average
        const sortValueDown = document.createElement("i");
        sortValueDown.className = "fa fa-caret-down caret-down2";
        sortValueDown.setAttribute("id", "sortValueDown");
        const sortValueDownButton = document.createElement("a");
        sortValueDownButton.setAttribute("href", "#");
        sortValueDownButton.setAttribute("id", "sortValueDownButton" + i);
        sortValueDownButton.setAttribute("tableId", i);
        sortValueDownButton.setAttribute("onclick", "sort('averageDown" + i + "');");
        sortValueDownButton.appendChild(sortValueDown);
        sortValue.appendChild(sortValueDownButton);

        const sortValueText = document.createElement("div");
        sortValueText.className = "sortValueText";
        sortValue.appendChild(sortValueText);
        sortDiv.appendChild(sortValue);

        sortSkillText.innerHTML = "Skillset";
            sortValueText.innerHTML = "Average";

        if (i === 0) {
            seniority.innerHTML = "Junior";
            
        } else if (i === 1) {
            seniority.innerHTML = "Mid";
            
        } else {
            seniority.innerHTML = "Senior";
            
        }

        for (let j = 0; j < data[i].requiredSkills.length; j++) {

            const {rowDiv, entireToolTip, infoImg, rowDivSkillName, errorInputDiv, rowDivSkillValue, tooltipDescription} = forRows(data, i, j, tableDiv);

            /*check inputs*/
            checkInputs(rowDivSkillValue);

        }
        document.getElementById("all-skills").appendChild(seniority);
        document.getElementById("all-skills").appendChild(borderTable);
        document.getElementById("all-skills").appendChild(sortDiv);
        document.getElementById("all-skills").appendChild(tableDiv);

    }
}

function checkInputs (rowDivSkillValue) { // check if inputs are filled, integers and between 0 and 100
    rowDivSkillValue.addEventListener("keyup", function validateMyInput (event) {

        const intgr = new RegExp("^0*(?:[0-9][0-9]?|100)$");
        const digits = new RegExp("^[0-9]*$");

        if (this.value === "") {
            const x = document.getElementById(this.getAttribute("errorMsg"));
            x.innerHTML = "Please fill it, do not leave this input empty";
            this.style.border = "1px solid red";

            x.style.visibility = "visible";
        } else if (!digits.test(this.value)) {

            const x = document.getElementById(this.getAttribute("errorMsg"));
            x.innerHTML = "Only integers, not characters, please";
            this.style.border = "1px solid red";

            x.style.visibility = "visible";

        } else if (!intgr.test(this.value)) {

            if (this.value === 0) {
                this.style.border = "1px solid red";
                const x = document.getElementById(this.getAttribute("errorMsg"));

                x.style.visibility = "visible";
                x.innerHTML = "Larger than 0, please";

            } else if (this.value > 100) {
                this.style.border = "1px solid red";
                const x = document.getElementById(this.getAttribute("errorMsg"));

                x.style.visibility = "visible";
                x.innerHTML = "Smaller than 100, please";

            } else {
                const x = document.getElementById(this.getAttribute("errorMsg"));
                this.style.border = "1px solid #d7d7d7";
                x.style.visibility = "hidden";

            }

        } else {
            const x = document.getElementById(this.getAttribute("errorMsg"));
            this.style.border = "1px solid #d7d7d7";
            x.style.visibility = "hidden";

        }

    });
}

function changesCheck () { //check for changes when we leave the page

    for (let i = 0; i < sortData.length; i++)
        for (let j = 0; j < sortData[i].requiredSkills.length; j++) {

            const thisInput = document.getElementById("valueInserted" + i + j);
            if (thisInput.value !== sortData[i].requiredSkills[j].value) {

                const modal = document.getElementById("myModal");
                modal.style.display = "block";
                const cancel = document.getElementsByClassName("cancel")[0];

                cancel.onclick = function (event) {

                    modal.style.display = "none";
                };
            } else {
                window.location.href = "index.html";
            }
            return false;
        }
}

function savePage () { // check if inputs are empty when we press the SAVE button

    for (let i = 0; i < sortData.length; i++)
        for (let j = 0; j < sortData[i].requiredSkills.length; j++) {

            const thisInput = document.getElementById("valueInserted" + i + j);
            if (thisInput.value === '') {

                const divPrompt = document.getElementById("errorInputid" + i + j);

                divPrompt.innerHTML = "Please fill it, do not leave this input empty";
                divPrompt.style.visibility = "visible";
                thisInput.style.border = "1px solid red";

            }
        }
}

/*-[not a task]----functions for "Go on top of the page" + animation [not a task] (i was bothered to scroll everytime when i checked if some functions are working).--*/

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtnUp").style.display = "block";
    } else {
        document.getElementById("myBtnUp").style.display = "none";
    }
}

function scrollToTop (scrollDuration) {
    const cosParameter = window.scrollY / 2;
    let scrollCount = 0;
    let oldTimestamp = performance.now();

    function step (newTimestamp) {
        scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
        if (scrollCount >= Math.PI) window.scrollTo(0, 0);
        if (window.scrollY === 0) return;
        window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}