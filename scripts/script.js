var table = document.querySelectorAll('TR')
var selected = {
  exercise: '<div id="warning">Exercise not Selected</div>',
  reps: "",
  rpe: "",
  weight: "200",
  intensity: "",
  weightsNeededMode: true,
  calculate: function (inten = this.intensity) {
    if (this.weightsNeededMode) {
      return Math.round(inten * this.weight);
    } else {
      return Math.round(this.weight / inten);
    }
  }
}

// Slider Functions 
slider = document.getElementById('onerm');
function updateSliderLabel() {
  let text = (!selected.weightsNeededMode) ? "Enter Weight lifted: " : "Enter Your e1rm: ";
  document.getElementById('sliderLabel').innerHTML = `<b>${text}</b> ${slider.value}lbs`;
}
window.onload = updateSliderLabel();

slider.addEventListener('input', () => {
  selected.weight = slider.value;
  updateSliderLabel();
});

// Used for exercise selection + mode selection
function exerciseSelect(button) {
  let uncle = button.parentElement.previousElementSibling;
  uncle.innerHTML = button.innerHTML;
  if (uncle.id == "exercise") {
    selected.exercise = button.innerText;
    fillPerscription(selected.weightsNeededMode);
  } else {
    selected.weightsNeededMode = (button.innerText == "Calculate weight needed") ? true : false;
    updateSliderLabel();
    clearSelectedCells(true);
  };
};
// List Functions
function removeFromList(item) {
  console.log(item)
  //this.parentNode.parentNode.removeChild(this.parentNode)
  item.parentNode.parentNode.removeChild(item.parentNode)
}

function addToList() {
  let script = document.getElementById('perscription').innerHTML;
  let item = `<li class="list-group-item list-group-item-success">${script}<button type="button" onclick='removeFromList(this)' class="btn btn-danger btn-sm" id="remove">remove</button></li>`
  document.getElementById("list").insertAdjacentHTML('afterbegin',item);
}
function shareList() {
  let newStuff = Array.from(document.querySelectorAll('#list>li'));
  let message = {
    title: 'RPE Calculator',
    text: "",
  };
  let shareContents = newStuff.forEach(el => { message.text += el.innerText.replace('remove', '\n') });
  console.log(message);
  //navigator.share(message);
  if (navigator.share) {
    navigator.share(message).then(() => {
      console.log('Thanks for sharing!');
    })
      .catch(err => {
        console.log(`Couldn't share because of, ${err.message}`);
        alert(`Couldn't share because of ${err.message}`);
      });
  } else {
    console.log('web share not supported');
    alert('web share not supported');
  }
};


function fillPerscription(mode) {
  let script = document.getElementById('perscription');
  if (mode) {
    script.innerHTML = `<b>${selected.exercise}:</b>\n Use ${selected.calculate()} lbs X ${selected.reps} @ ${selected.rpe}`;
  } else {
    script.innerHTML = `<b>${selected.exercise} e1rm:</b> ${selected.calculate()} lbs`;
  }
}

function fillWeightRow(rep) {
  let row = document.getElementById('weight');
  row.innerHTML = `<th>Weight</th>
  <td id="empty"></td>
  <td id="6">${selected.calculate(rpe_chart[selected.reps][6] / 100)}</td>
  <td id="6.5">${selected.calculate(rpe_chart[selected.reps][6.5] / 100)}</td>
  <td id="7">${selected.calculate(rpe_chart[selected.reps][7] / 100)}</td>
  <td id="7.5">${selected.calculate(rpe_chart[selected.reps][7.5] / 100)}</td>
  <td id="8">${selected.calculate(rpe_chart[selected.reps][8] / 100)}</td>
  <td id="8.5">${selected.calculate(rpe_chart[selected.reps][8.5] / 100)}</td>
  <td id="9">${selected.calculate(rpe_chart[selected.reps][9] / 100)}</td>
  <td id="9.5">${selected.calculate(rpe_chart[selected.reps][9.5] / 100)}</td>
  <td id="10">${selected.calculate(rpe_chart[selected.reps][10] / 100)}</td>
  <td id="empty"></td>
  <td id="empty"></td>
  `;
  // clear weight row and fill with results from rpeChart[.reps]
  //Object.entries (key, value) { }
}
function clearSelectedCells(all = false) {
  let rpeRowSelect = document.getElementsByClassName('selected');
  if (all) {
    if (rpeRowSelect.length) {
      for (i = 0; i < rpeRowSelect.length; i++) {
        rpeRowSelect[i].className = '';
      }
    }
    console.log(rpeRowSelect)
    rpeRowSelect[0].className = '';
  }
  if (rpeRowSelect.length) {
    rpeRowSelect[0].className = '';
  }
}
table.forEach(element => {
  var selectedCells = element.getElementsByClassName('selected');
  // TODO: try event bubbling to reduce listeners
  element.addEventListener('click', function (e) {
    var td = e.target;
    let parent = td.parentElement.id;
    console.log(parent);

    if (selectedCells.length) {
      selectedCells[0].className = '';
    }
    // fill property values of selected object
    selected[td.parentElement.id] = td.innerText;

    switch (parent) {
      case 'reps':
        /* This clears the selected rpe row cell if the user goes back to 
        change the rep row cell selection*/
        // Vlet rpeRowSelect = document.getElementsByClassName('selected');
        // if (rpeRowSelect.length) {
        //   rpeRowSelect[0].className = '';
        // }
        clearSelectedCells();
        td.className = 'selected';
        fillWeightRow(td.innerText);
        fillPerscription(selected.weightsNeededMode);
        break;
      case 'rpe':
        td.className = 'selected';
        selected.intensity = rpe_chart[selected.reps][selected.rpe] / 100;
        fillPerscription(selected.weightsNeededMode);
        break;
      default:
        break;
    }

  })
})