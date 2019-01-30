/* exported sort, addNewSkill, modalForSkillInsertEdit, deleteSkill, scrollToTop   */

const xhttp = new XMLHttpRequest();
xhttp.open('GET', 'https://api.myjson.com/bins/m5aa9');
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

            const upSkill = sortData[document.getElementById("sortSkillUpButton" + i).getAttribute("tableId")].requiredSkills;

            for (let j = 0; j < upSkill.length; j++) {

                const a = upSkill[j];
                const b = upSkill[j + 1];

                upSkill.sort(function (a, b) {
                    return 2 * (a.name > b.name) - 1;
                });
            }

            document.getElementById("all-skills").innerHTML = '';
            renderHTML(sortData);

        } else if (sortType === "skillDown" + i) {
            event.preventDefault();

            const downSkill = sortData[document.getElementById("sortSkillDownButton" + i).getAttribute("tableId")].requiredSkills;

            for (let j = 0; j < downSkill.length; j++) {

                const a = downSkill[j];
                const b = downSkill[j + 1];

                downSkill.sort(function (a, b) {
                    return 2 * (a.name < b.name) - 1;
                });
            }
            document.getElementById("all-skills").innerHTML = '';
            renderHTML(sortData);
        }
    }
}

//------------------------------ RenderHTML - Main function for render-------------------------------

function forRows(i, j, data) { //generate table rows
    /* table row */
    const rowDiv = document.createElement("div");
    rowDiv.className = "tableJuniorChild";
    rowDiv.setAttribute("id", "tableJuniorChildId" + i + j);

    /* skill name */
    const rowDivSkillName = document.createElement("div");
    rowDivSkillName.setAttribute("class", "rowDivSkillName");

    rowDivSkillName.textContent = data[i].requiredSkills[j].name;
    rowDiv.appendChild(rowDivSkillName);

    /*description text */
    const descriptionText = document.createElement("div");
    descriptionText.setAttribute("class", "descriptionText");
    descriptionText.textContent = data[i].requiredSkills[j].description;
    rowDiv.appendChild(descriptionText);

    /*images for delete and edit*/
    const editDelDiv = document.createElement("div");
    editDelDiv.setAttribute("class", "editDelDiv");

    const penImg = document.createElement("img");
    penImg.setAttribute("class", "pen");
    penImg.setAttribute("onclick", "modalForSkillInsertEdit('editSkill" + i + j + "');");
    penImg.src = 'images/pen.png';
    editDelDiv.appendChild(penImg);

    const binImg = document.createElement("img");
    binImg.setAttribute("class", "bin");
    binImg.setAttribute("onclick", "deleteSkill('delete" + i + j + "');");
    binImg.setAttribute("id", "delete" + i + j);
    binImg.src = 'images/bin.png';
    editDelDiv.appendChild(binImg);
    return {rowDiv, rowDivSkillName, descriptionText, editDelDiv, penImg, binImg};
}

function renderHTML (data) { // we generate the entire table dynamically

    if (document.getElementById("all-skills") !== null) {

        document.getElementById("all-skills").innerHTML = "";
    }

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
        sortDiv.appendChild(sortSkill);

        const sortSkillText = document.createElement("div");
        sortSkillText.className = "sortSkillText";
        sortSkill.appendChild(sortSkillText);

        const descriptionTitle = document.createElement("div");
        descriptionTitle.className = "descriptionTitle";
        sortDiv.appendChild(descriptionTitle);

        sortSkillText.innerHTML = "Skillset";
        descriptionTitle.innerHTML = "Description";

        if (i === 0) {
            seniority.innerHTML = "Junior";

        } else if (i === 1) {
            seniority.innerHTML = "Mid";

        } else {
            seniority.innerHTML = "Senior";

        }
        for (let j = 0; j < data[i].requiredSkills.length; j++) {

            const {rowDiv, rowDivSkillName, descriptionText, editDelDiv, penImg, binImg} = forRows(i, j, data);

            rowDiv.appendChild(editDelDiv);
            tableDiv.appendChild(rowDiv);
        }
        document.getElementById("all-skills").appendChild(seniority);
        document.getElementById("all-skills").appendChild(borderTable);
        document.getElementById("all-skills").appendChild(sortDiv);
        document.getElementById("all-skills").appendChild(tableDiv);
    }
}

function addNewSkill () { // check if inputs from modular window are empty, when we add a new skill

    const skillNameInput = document.getElementById("skillName");
    const skillDescriptionInput = document.getElementById("skillDescription");

    if ((skillNameInput.value === '') || (skillDescriptionInput.value === '')) { 

        if (skillNameInput.value === '') {

            skillNameInput.style.border = "1px solid red";
            document.getElementById("emptySkillNameId").style.display = "block";

        } else {

            skillNameInput.style.border = "1px solid #d3d3d3";
            document.getElementById("emptySkillNameId").style.display = "none";
        }

        if (skillDescriptionInput.value === '') {

            document.getElementById("emptySkillDescriptionId").style.display = "block";
            skillDescriptionInput.style.border = "1px solid red";

        } else {

            skillDescriptionInput.style.border = "1px solid #d3d3d3";
            document.getElementById("emptySkillDescriptionId").style.display = "none";
        }

    } else {
        for (let i = 0; i <= sortData.length; i++) {
            if (document.getElementById('selectForSkill').value === "value" + i) { // check if select options form are junior, mid si senior
                forAddNewSkill(i);
            }
            const modal = document.getElementById("myModal");
            modal.style.display = "none";
            renderHTML(sortData);
            window.console.log(sortData);

        }
    }

}

function forAddNewSkill (e) { // function called in the above ELSE and is used to add a new object our array of objects
    const skillNameInput = document.getElementById("skillName");
    const skillDescriptionInput = document.getElementById("skillDescription");
    const randomNumber = Math.floor(Math.random() * 1001); // generate a random number to use it as a id value in our object
    const newObj = new Object();
    newObj.id = randomNumber;
    newObj.name = skillNameInput.value;
    newObj.description = skillDescriptionInput.value;
    newObj.value = "";
    sortData[e].requiredSkills.unshift(newObj);
}

function saveSkill (i, j) { //function used to save the edited element in our object/table
    const forSaveSkill = document.getElementById("saveSkillId");
    const skillNameInput = document.getElementById("skillName");
    const skillDescriptionInput = document.getElementById("skillDescription");
    forSaveSkill.setAttribute("i", i);
    forSaveSkill.setAttribute("j", j);

    forSaveSkill.addEventListener("click", function () {

        if ((skillNameInput.value === '') || (skillDescriptionInput.value === '')) {

            if (skillNameInput.value === '') {

                skillNameInput.style.border = "1px solid red";
                document.getElementById("emptySkillNameId").style.display = "block";

            } else {

                skillNameInput.style.border = "1px solid #d3d3d3";
                document.getElementById("emptySkillNameId").style.display = "none";
            }

            if (skillDescriptionInput.value === '') {

                document.getElementById("emptySkillDescriptionId").style.display = "block";
                skillDescriptionInput.style.border = "1px solid red";

            } else {

                skillDescriptionInput.style.border = "1px solid #d3d3d3";
                document.getElementById("emptySkillDescriptionId").style.display = "none";
            }

        } else {

            for (i = 0; i < sortData.length; i++) {

                for (j = 0; j < sortData[i].requiredSkills.length; j++) {
                    const y = sortData[this.getAttribute("i")].requiredSkills[this.getAttribute("j")];

                    y.name = skillNameInput.value;
                    y.description = skillDescriptionInput.value;
                }
            }

            const modal = document.getElementById("myModal");

            modal.style.display = "none";

            renderHTML(sortData);

        }

    });
}

function deleteSkill (buttonDelete) { //delete skill when we press the button

    for (let i = 0; i < sortData.length; i++) {

        for (let j = 0; j < sortData[i].requiredSkills.length; j++) {

            if (buttonDelete === "delete" + i + j) {

                // [not a task] modal for delete to confirm is we want or don't want to delete a skill, for safety. 

                const textForDelete = document.getElementById("textForDelete");
                const fullText = sortData[i].requiredSkills[j].name.bold();
                const croppedText = fullText.substring(0, 55) + "...";

                if (fullText.length > 55) {
                    textForDelete.innerHTML = "Are you sure you want to delete skill " + croppedText + "?";
                } else {
                    textForDelete.innerHTML = "Are you sure you want to delete skill " + fullText + "?";
                }

                const modal = document.getElementById("myModal-delete");
                modal.style.display = "block";
                const cancel = document.getElementById("cancelButon-delete");
                const yesButton = document.getElementById("yes-delete");

                cancel.onclick = function (event) {
                    modal.style.display = "none";
                };

                yesButton.onclick = function (event) {
                    modal.style.display = "none";
                    sortData[i].requiredSkills.splice(j, 1);
                    renderHTML(sortData);
                };

            }

        }
    }

}

function modalForSkillInsertEdit (buttonPressed) { // modal for add and edit skill

    const skillNameInput = document.getElementById("skillName");
    const skillDescriptionInput = document.getElementById("skillDescription");
    skillNameInput.style.border = "1px solid #d3d3d3";
    document.getElementById("emptySkillNameId").style.display = "none";
    skillDescriptionInput.style.border = "1px solid #d3d3d3";
    document.getElementById("emptySkillDescriptionId").style.display = "none";

    for (let i = 0; i < sortData.length; i++) {

        for (let j = 0; j < sortData[i].requiredSkills.length; j++) {

            if (buttonPressed === "addNewSkill") {

                if (document.getElementById("saveSkillId")) {
                    document.getElementById("saveSkillId").removeAttribute("i");
                    document.getElementById("saveSkillId").removeAttribute("j");
                    document.getElementById("saveSkillId").id = "saveSkillId2";
                    document.getElementById("saveSkillId2").setAttribute("onclick", "addNewSkill();");

                }

                const modal = document.getElementById("myModal");
                modal.style.display = "block";
                const cancel = document.getElementsByClassName("cancel")[0];
                document.getElementById("headerText").innerHTML = "Add new skill";

                const skillName = document.getElementById("skillName");
                skillName.value = "";

                const skillDescription = document.getElementById("skillDescription");
                skillDescription.value = "";

                cancel.onclick = function (event) {

                    modal.style.display = "none";
                };

            } else if (buttonPressed === "editSkill" + i + j) { //used to edit just a single skill, not all

                if (document.getElementById("saveSkillId2")) {
                    document.getElementById("saveSkillId2").removeAttribute("onclick");
                    document.getElementById("saveSkillId2").id = "saveSkillId";
                }

                const skillNameHeader = document.getElementById("headerText");
                skillNameHeader.textContent = "Edit " + sortData[i].requiredSkills[j].name;

                const skillName = document.getElementById("skillName");
                skillName.value = sortData[i].requiredSkills[j].name;

                const skillDescription = document.getElementById("skillDescription");
                skillDescription.value = sortData[i].requiredSkills[j].description;

                saveSkill(i, j);

                const modal = document.getElementById("myModal");
                modal.style.display = "block";
                const cancel = document.getElementsByClassName("cancel")[0];

                cancel.onclick = function (event) {

                    modal.style.display = "none";

                };
            }
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