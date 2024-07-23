// Reexport your entry components here
import booky from "../books.js"

// Storage.prototype.setStuff = function(key, value) {
//     this.setItem(key, JSON.stringify(value))
// }

// Storage.prototype.getStuff = function (key) {
//     var value = this.getItem(key)
//     return value && JSON.parse(value)
// }

// if( !localStorage.getStuff("unreadBooks") ){
//     localStorage.setStuff("unreadBooks", booky)
//     localStorage.setStuff("readBooks", [])
// }

export let books = booky
