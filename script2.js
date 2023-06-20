const box = document.getElementById('box');
const addItem = document.getElementById('add-item');
const buttonAdd = document.getElementById('button-add');

buttonAdd.addEventListener('click', () => {
  box.style.display = 'none';
  addItem.style.display = 'flex';
});