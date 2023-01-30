const get = (element_id) => { return document.getElementById(element_id); };

const closeButton = get('close-cb');
const maximizeButton = get('maxmimize-cb');
const minimizeButton = get('minimize-cb');

closeButton.addEventListener('click', () => process.app.close());
maximizeButton.addEventListener('click', () => process.app.maximize());
minimizeButton.addEventListener('click', () => process.app.minimize());