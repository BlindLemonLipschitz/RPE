var chart = [];
var mode = true;
var lift = {
    rpe: 1,
    rpeDesired: 1,
    repsPerformed: 1,
    repsDesired: 1,
    weightLifted: 1,
    e1rm: 1,
    e1rmCalc: function () {

        let intensity = (rpe_chart[lift.repsPerformed][lift.rpe]) / 100;
        let calc = Math.round(lift.weightLifted / intensity);
        lift.e1rm = calc;
        return calc;
    },
    weightNeeded: () => {
        let intensity = (rpe_chart[lift.repsDesired][lift.rpeDesired]) / 100;
        return Math.round(intensity * lift.e1rm);
    }
}
var rpe_chart = {
    1: {
        10: 100,
        9.5: 97.8,
        9.0: 95.5,
        8.5: 93.9,
        8.0: 92.9,
        7.5: 90.7,
        7.0: 89.2,
        6.5: 87.8,
        6.0: 86.3
    },
    2: {
        10: 95.5,
        9.5: 93.9,
        9.0: 92.2,
        8.5: 90.7,
        8.0: 89.2,
        7.5: 87.8,
        7.0: 86.3,
        6.5: 85,
        6.0: 83.7
    },
    3: {
        10: 92.2,
        9.5: 90.7,
        9.0: 89.2,
        8.5: 87.8,
        8.0: 86.3,
        7.5: 85,
        7.0: 83.7,
        6.5: 82.4,
        6.0: 81.1
    },
    4: {
        10: 89.2,
        9.5: 87.8,
        9.0: 86.3,
        8.5: 85,
        8.0: 83.7,
        7.5: 82.4,
        7.0: 81.1,
        6.5: 79.9,
        6.0: 78.6
    },
    5: {
        10: 86.3,
        9.5: 85,
        9.0: 83.7,
        8.5: 82.4,
        8.0: 81.1,
        7.5: 79.9,
        7.0: 78.6,
        6.5: 77.4,
        6.0: 76.2
    },
    6.0: {
        10: 83.7,
        9.5: 82.4,
        9.0: 81.1,
        8.5: 79.9,
        8.0: 78.6,
        7.5: 77.4,
        7.0: 76.2,
        6.5: 75.1,
        6.0: 73.9
    },
    7.0: {
        10: 81.1,
        9.5: 79.9,
        9.0: 78.6,
        8.5: 77.4,
        8.0: 76.2,
        7.5: 75.1,
        7.0: 73.9,
        6.5: 72.3,
        6.0: 70.7
    },
    8.0: {
        10: 78.6,
        9.5: 77.4,
        9.0: 76.2,
        8.5: 75.1,
        8.0: 73.9,
        7.5: 72.3,
        7.0: 70.7,
        6.5: 69.4,
        6.0: 68
    },
    9.0: {
        10: 76.2,
        9.5: 75.1,
        9.0: 73.9,
        8.5: 72.3,
        8.0: 70.7,
        7.5: 69.4,
        7.0: 68,
        6.5: 66.7,
        6.0: 65.3
    },
    10: {
        10: 73.9,
        9.5: 72.3,
        9.0: 70.7,
        8.5: 69.4,
        8.0: 68,
        7.5: 66.7,
        7.0: 65.3,
        6.5: 64,
        6.0: 62.6
    },
    11: {
        10: 70.7,
        9.5: 69.4,
        9.0: 68,
        8.5: 66.7,
        8.0: 65.3,
        7.5: 64,
        7.0: 62.6,
        6.5: 61.3,
        6.0: 59.9
    },
    12: {
        10: 68,
        9.5: 66.7,
        9.0: 65.3,
        8.5: 64,
        8.0: 62.6,
        7.5: 61.3,
        7.0: 59.9,
        6.5: 58.6,
        6.0: 57.4
    }
};
//var weightLifted = 0;
var onerm = 0;
var choosenRpe = 0;
window.onload = CreateTableFromJSON();
window.onload = checkFunc(true);
slider = document.getElementById('onerm');
slider.addEventListener('input', () => {
    document.getElementById('weight').innerHTML = `${slider.value} lbs`;
    // weightLifted = slider.value;
    onerm = slider.value;
    // document.getElementById('choosenWeight').innerText = slider.value;
    if (mode) {
        lift.e1rm = slider.value;

    } else {
        lift.weightLifted = slider.value;
    }


});
function removeFromList(item)
{   
    console.log(item)
    this.parentNode.parentNode.removeChild(this.parentNode)
}

function addToList(){
        let item = document.createElement("LI");
        item.setAttribute('class', 'list-group-item list-group-item-success');
        let deleteButton = document.createElement("button");
        let text = document.createTextNode(document.getElementById('perscription').innerText);
        item.appendChild(text);
        deleteButton.setAttribute('type', 'button');
        deleteButton.innerHTML = "remove";
        deleteButton.onclick = removeFromList;
        deleteButton.setAttribute('class', 'btn btn-danger btn-sm');
        item.appendChild(deleteButton);
        document.getElementById("list").appendChild(item);

}


//function check() {
//  document.getElementById("myCheck").checked = true;
//}
// document.getElementById("myCheck").addEventListener('onchange', (x) => {

//})

function checkFunc(x) {
    // var checkBox = document.getElementById("myCheck");
    if (x.id == "e1rmButton") {
        console.log(x.id);
        document.getElementById('sliderLabel').innerText = "Enter Your 1rm";
        //document.getElementById('desc').innerText = "Calculate Weight Needed";
        //document.getElementById('radio1rm').checked = false;
        document.getElementById("percent").innerText = "Weight Needed";
        document.getElementById("percent").style.fontFamily = "Verdana,bold";
        document.getElementById("percent").style.fontSize = "14px";
        mode = true;
    } else {
        mode = false;
        //document.getElementById('radio1rm').checked = true;
        document.getElementById('sliderLabel').innerText = "Enter Weight Lifted";
        document.getElementById("percent").innerHTML = "e1rm";


        //document.getElementById('desc').innerHTML = "Calculate E1rm";
    }

};
function shareList(){
let newStuff = Array.from(document.querySelectorAll('#list>li'));
let message = {
    title: "RPE Calculator",
    text: ""
};
let shareContents = newStuff.forEach(el => {message.text += el.innerText.replace('remove', '\n')});
console.log(message);
// message.text = message.text.remove('remove','');
navigator.share(message);
}
var tab = document.getElementById("rpe");
function CreateTableFromJSON() {
    var indexNumber = ''
    let headings = Object.keys(rpe_chart);
    headings.forEach((el) => {
        indexNumber = el;
        var x = document.createElement("TH");
        var t = document.createTextNode(`Reps ${el}`);
        x.appendChild(t);
        document.getElementById("myTr").appendChild(x);
        x.setAttribute("class", "repCell");
        x.addEventListener("click", () => {
            choosenReps = el;
            if (mode) {
                lift.repsDesired = el;
            } else {
                lift.repsPerformed = el;
            }
            // document.getElementById('choosenReps').innerText = choosenReps;
            Array.from(document.getElementsByClassName('repCell')).forEach(cell => {
                cell.style.backgroundColor = "#e3f2fd";
                cell.style.color = "black";
            })
            x.style.backgroundColor = "#007BFF";
            x.style.color = "#FFFFFF";

        })
        x.addEventListener("click", function actions() {
            var resultCell = document.querySelectorAll('#resultCell');
            if (resultCell) { resultCell.forEach(el => el.remove()) };
            for (let [key, value] of Object.entries(rpe_chart[el])) {
                let dRpe = document.createElement("TD");
                let textRpe = document.createTextNode(key);
                dRpe.appendChild(textRpe);
                dRpe.setAttribute("id", "resultCell");
                document.getElementById("r").appendChild(dRpe);
                dRpe.addEventListener("click", () => {
                    Array.from(document.querySelectorAll('#resultCell')).forEach(cell => {
                        cell.style.backgroundColor = "#e3f2fd";
                        cell.style.color = "black";
                    })
                    dRpe.style.backgroundColor = "#007BFF";
                    dRpe.style.color = "#FFFFFF";
                    choosenRpe = key;
                    if (mode) {
                        lift.rpeDesired = key;
                        document.getElementById('perscription').innerText = `${choosenReps} X ${lift.weightNeeded()} @ ${choosenRpe}\nfor: (e1rm: ${onerm})`;
                    } else {
                        lift.rpe = key;
                        document.getElementById('perscription').innerText = `(${choosenReps} X ${onerm} @ ${choosenRpe})\nE1rm = ${lift.e1rmCalc()}`;
                    }
                });
                var d = document.createElement("TD");
                d.setAttribute("class", "weightCell");

                if (mode) {
                    var text = document.createTextNode(Math.round((value / 100) * onerm));
                } else {
                    var text = document.createTextNode(Math.round(lift.weightLifted / (value / 100)));
                };
                d.appendChild(text);
                d.setAttribute("id", "resultCell");
                document.getElementById("percent").appendChild(d);
            };
        });
    });

}