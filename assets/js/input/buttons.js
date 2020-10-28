function saveGrid() {
  // If capped off at the max undo, set undoState to the limit and shift array
  if (undoState > maxUndo - 1) {
    undoState = maxUndo - 1;
    for (let i = 0; i < maxUndo; i++) {
      savedGrids[i] = savedGrids[i + 1];
    }
  }
  select('#undo-button').addClass('undo-on');
  select('#undo-button').style('opacity: 1;')
  savedGrids[undoState] = [];
  for (let i = 0; i < rowLen * colLen; i++) {
    savedGrids[undoState][i] = pixels[i];
  }
  undoState += 1;
}


function sendImage() {
  background(bg);
  drawPixels();
  let a = canvas.toDataURL("image/jpeg");
  select('#preview-image').style('background-image', 'url("' + str(a) + '")');
  drawGrid(showGrid);
}


function controlButtons() {
  select('#undo-button').mousePressed(undoButton);
  select('#undo-button').style('opacity: .15;')
  select('#clear-button').mousePressed(clearButton);
  select('#grid-button').mousePressed(gridButton);
  // select('#load-button').mousePressed(loadButton);
  select('#save-button').mousePressed(saveButton);

  function undoButton() {
    if (undoState > 0) {
      undoState = undoState - 1;
      for (let i = 0; i < rowLen * colLen; i++) {
        pixels[i] = savedGrids[undoState][i];
      }
    }
    if (undoState == 0) {
      select('#undo-button').removeClass('undo-on');
      select('#undo-button').style('opacity: .15;')
    }

    sendImage();
    localStorage.setItem("pixels", JSON.stringify(compress(pixels)));
    redraw();
  }

  function clearButton() {
    saveGrid();
    for (let i = 0; i < rowLen; i++) {
      for (let j = 0; j < colLen; j++) {
        pixels[(rowLen * j) + i] = [bg[0], bg[1], bg[2]];
      }
    }
    sendImage();
    localStorage.setItem("pixels", JSON.stringify(compress(pixels)));
    redraw();
  }

  function gridButton() {
    if (showGrid == true) {
      showGrid = false;
      select('#grid-button').addClass('active-button');
    } else {
      showGrid = true;
      select('#grid-button').removeClass('active-button');
    }
    redraw();
  }

  function loadButton() {
    saveGrid();
    var user = firebase.auth().currentUser;

    if (user) {
      var uid = firebase.auth().currentUser.uid;
      var path = database.ref('backers/' + uid);
      path.once('value', gotData, errData);

      function gotData(data) {
        // get the value of the current plot and updated pixels
        let storedPixels = decompress(data.val().pixels);
        if (storedPixels.length == pixels.length) {
          updateLoadedPixels(storedPixels);
          alert('Successfully loaded data loaded from Server')
          canvasReleased();
          return;
        }
        alert('Sorry, your saved data is incompatible with the current canvas.')
      }

      function errData(data) {
        alert('Sorry. Something went wrong. Could Not read data from server.')
      }
    }
  }

  function saveButton() {
    for (let i = 0; i < rowLen; i++) {
      for (let j = 0; j < colLen; j++) {
        gridImg.noStroke();
        gridImg.fill(pixels[index(i, j)]);
        gridImg.stroke(pixels[index(i, j)]);
        gridImg.rect(i * 7, j * 5, 7, 5);
      }
    }

    // var user = firebase.auth().currentUser;
    //
    // if (user) {
    //   var uid = firebase.auth().currentUser.uid;
    //   write(uid);
    // } else {
    //alert('Thank you for your submission!');
      save(gridImg, 'stringandloop-input.png');
    // }
  }
}


function toolButtons() {
  select('#pencil-button').mousePressed(pencilButton);
  select('#line-button').mousePressed(lineButton);
  select('#fill-button').mousePressed(fillButton);
  select('#dither-button').mousePressed(ditherButton);
  select('#mirrorx-button').mousePressed(mirrorXButton);
  select('#mirrory-button').mousePressed(mirrorYButton);


  function pencilButton() {
    tool = 0;
    preview = false;
    select('#pencil-button').addClass('active-button');
    select('#line-button').removeClass('active-button');
    select('#fill-button').removeClass('active-button');
    select('#modifier-holder').addClass('pencil-tool');
  }

  function lineButton() {
    tool = 1;
    select('#pencil-button').removeClass('active-button');
    select('#line-button').addClass('active-button');
    select('#fill-button').removeClass('active-button');
    removeModifier();
  }

  function fillButton() {
    tool = 2;
    select('#pencil-button').removeClass('active-button');
    select('#line-button').removeClass('active-button');
    select('#fill-button').addClass('active-button');
    removeModifier();
  }

  function removeModifier() {
    dither = false;
    mirrorX = false;
    mirrorY = false;
    select('#dither-button').removeClass('active-button');
    select('#mirrorx-button').removeClass('active-button');
    select('#mirrory-button').removeClass('active-button');

    select('#modifier-holder').removeClass('pencil-tool');
  }

  function ditherButton() {
    if (dither == false) {
      dither = true;
      pencilButton();
      select('#dither-button').addClass('active-button');
    } else {
      dither = false;
      select('#dither-button').removeClass('active-button');
    }
  }

  function mirrorXButton() {
    if (mirrorX == false) {
      mirrorX = true;
      pencilButton();
      select('#mirrorx-button').addClass('active-button');
    } else {
      mirrorX = false;
      select('#mirrorx-button').removeClass('active-button');
    }
  }

  function mirrorYButton() {
    if (mirrorY == false) {
      mirrorY = true;
      pencilButton();
      select('#mirrory-button').addClass('active-button');
    } else {
      mirrorY = false;
      select('#mirrory-button').removeClass('active-button');
    }
  }
}


function createPalette() {
  createSwatch(swatch1, 'swatch1', color1);
  createSwatch(swatch2, 'swatch2', color2);
  createSwatch(swatch3, 'swatch3', color3);
  createSwatch(swatch4, 'swatch4', color4);
  createSwatch(swatch5, 'swatch5', color5);
  createSwatch(swatch6, 'swatch6', color6);
  select('#swatch1').addClass('active-color');


  function createSwatch(element, name, color) {
    element = select('#' + str(name))
    element.style('background-color', 'rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + ')');
    let darker;
    if ((color[0] + color[1] + color[2]) / 3 > 80) {
      darker = str('rgb(' + (color[0] - 20) + ', ' + (color[1] - 20) + ', ' + (color[2] - 20) + ')');
    } else {
      darker = str('rgb(' + (color[0] + 60) + ', ' + (color[1] + 60) + ', ' + (color[2] + 60) + ')');
    }
    element.style('box-shadow', '0 0 0 2px ' + darker);
    element.mousePressed(swatchButton(color, name));
  }


  function swatchButton(color, name) {
    return function() {
      select('#swatch1').removeClass('active-color');
      select('#swatch2').removeClass('active-color');
      select('#swatch3').removeClass('active-color');
      select('#swatch4').removeClass('active-color');
      select('#swatch5').removeClass('active-color');
      select('#swatch6').removeClass('active-color');

      select('#' + str(name)).addClass('active-color');
      activeColor = color;
    }
  }
}


function brushButtons() {
  select('#brush1').mousePressed(brush1);
  select('#brush2').mousePressed(brush2);
  select('#brush3').mousePressed(brush3);
  select('#brush4').mousePressed(brush4);

  function resetBrushes() {
    select('#brush1').removeClass('active-button');
    select('#brush2').removeClass('active-button');
    select('#brush3').removeClass('active-button');
    select('#brush4').removeClass('active-button');
  }

  function brush1() {
    resetBrushes();
    brushSize = 1;
    select('#brush1').addClass('active-button');
  }

  function brush2() {
    resetBrushes();
    brushSize = 2;
    select('#brush2').addClass('active-button');
  }

  function brush3() {
    resetBrushes();
    brushSize = 3;
    select('#brush3').addClass('active-button');
  }

  function brush4() {
    resetBrushes();
    brushSize = 4;
    select('#brush4').addClass('active-button');
  }
}


function submit() {
  let checkedValue = document.getElementById('input-checkbox').checked;
  let inputAuthor = document.getElementById('input-author').value;
  let inputID = document.getElementById('input-id').value;

  print(checkedValue, inputAuthor, inputID);
  let filename = 'stringandloop-input.png';
  if (inputAuthor.length > 0) {
    filename = inputAuthor + '-' + filename;
  }
  if (checkedValue == false) {
    print('Please accept the terms and conditions')
  }
  if (checkedValue == true) {}
}


function hideModal() {
  var modal = document.getElementById('modal');

  if (event.target == modal) {
    select('#modal').style('display: none;');
    select('#modal').style('opacity: 0;');
    // Clear modal values
    document.getElementById('input-author').value = "";
    document.getElementById('input-id').value = "";
    document.getElementById('input-checkbox').checked = false;
  }
}
