
function determineDate() {
  import('moment')
    .then(moment => moment().format('LLLL'))
    .then(str => console.log(str))
    .catch(err => console.log('Failed to load moment', err));
}

function component (_text) {
  var element = document.createElement('div');

  /* lodash is required for the next line to work */
  element.innerHTML = _text 

  return element;
}

document.body.appendChild(component('hello'));
document.body.appendChild(component(determineDate()));
