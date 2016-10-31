// some cool tricks.
//
// try not to mutate at all.
//
// instead of pushing onto an array you can...
'use strict'
let i = "hello"

console.log('j${i}')

// const addCounter = (list) => {
//   return [...list, 0];
// };
//
// // and to remove
//
// const removeCounter = (list, index) => {
//   return [
//     ...list.slice(0, index),
//     ...list.slice(index + 1)
//   ];
// };
//
// const incrementCounter = (list, index) => {
//   return [
//     ...list.slice(0, index),
//     list[index] + 1,
//     ...list.slice(index + 1)
//   ]
// };
//
// const toggelTodo = (todo) => {
//   return Object.assign({}, todo, {
//     completed: !todo.completed
//   });
//
//   // or
//
//   return {
//     ...todo,
//     completed: !todo.completed
//   };
// };
//
// const todoBefore = {
//   id: 0,
//   text: 'stuff',
//   completed: true
// };
//
// const todoAfter = {
//   id: 0,
//   text: 'stuff',
//   completed: false
// };
