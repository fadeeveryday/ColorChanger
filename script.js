const columns = document.querySelectorAll('.column')

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  if (event.code.toLowerCase() == 'space'){
    setRandomColors();
  }
})

document.addEventListener('click', (event) => {
  const type = event.target.dataset.type;
  
  if (type == 'lock') {
    const node = 
    event.target.tagName.toLowerCase() == "i"
    ? event.target
    : event.target.children[0];

    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock")
  } else if (type == 'copy') {
    copyToClickboard(event.target.textContent); 
  }
})

function generateRandomColor() {
  const hexCodes = '0123456789ABCDEF';
  let color = '';

  for(let i = 0; i < 6; i++) {
    let random = Math.random() * hexCodes.length;
    color +=  hexCodes[Math.floor(random )]
  }

  return '#' + color;
}

function copyToClickboard(text) {
  return navigator.clipboard.writeText();
}

function setRandomColors() {
  const colors = [];

  columns.forEach((col) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock');
    const color = generateRandomColor();
    const text = col.querySelector('h2')
    const button = col.querySelector('button')

    if(isLocked) {
      colors.push(text.textContent);
      return
    }

    colors.push(color);

    text.textContent = color;
    col.style.background = color; 

    // setTextColor(text, color);
    // setTextColor(button, color);
  })

  updateHashColors(colors);
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function updateHashColors(colors) {
  document.location.hash = colors.map((color) =>  {
    return color.substring(1).toString();
  })
  .join('-');
}

function getColorForHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
    .substring(1)
    .split("-")
    .map((color) => '#' + color);
  }
  return []
}

setRandomColors();