<script>
    //components
    import Wave from "../components/Wave.svelte";
    import TheBook from "../components/TheBook.svelte";

    //imports
    import { tweened } from "svelte/motion";
	import { cubicOut, circOut } from "svelte/easing";
    import { shuffleArray, gunAudio } from "../functions.js"

    //images
    import hem from "../assets/hemingway.png";
    import gun from "../assets/gun.png";
    import anchor from "../assets/anchor.png"
    import audio from "../assets/dsshotgn.wav"

    import books from "../books.js";

    //localStorage
    Storage.prototype.setStuff = function (key, value) {
          this.setItem(key, JSON.stringify(value))
    }

    Storage.prototype.getStuff = function (key) {
        var value = this.getItem(key)
        return value && JSON.parse(value)
    }

    if( !localStorage.getStuff("unreadBooks") ){
        localStorage.setStuff("unreadBooks", books)
        localStorage.setStuff("readBooks", [])
    }
    //localStorage.clear()

    //vars
    let localBooks = localStorage.getStuff("unreadBooks")
    let waving = true
    let animationEnded = false
    let bookHasBeenRead = false
    
    //countdown
    const progress = tweened(0, {
		duration: 2500,
		easing: circOut
	});

    //randomize (choose random book)
    const chooseBook = () => {
        localBooks = localStorage.getStuff("unreadBooks")
        shuffleArray(localBooks)

        //console.log(localBooks)

        animationEnded = false
        bookHasBeenRead = false

        let index = $progress === 0 ? localBooks.length -1 : 0

        progress.set(index).then(() => {
            animationEnded = true
            gunAudio()
        })
    }

    //Move book from unread to read
    const readBook = () => {
        let readBooks = localStorage.getStuff("readBooks")
        let unreadBooks = localStorage.getStuff("unreadBooks")

        bookHasBeenRead = true

        readBooks.push(chosenBook)
        unreadBooks = unreadBooks.filter(item => item.id !== chosenBook.id)

        localStorage.setStuff("readBooks", readBooks)
        localStorage.setStuff("unreadBooks", unreadBooks)
    }

    $: chosenBook = localBooks[Math.floor($progress)] || localBooks[0]
</script>

<style>
    label{
        position: absolute;
        top: 1em;
        left: 1em;
        font-size: 0.7em;
    }
</style>

<header>
    <h1>HEMINGWAYOVÁTOR-ROTÁTOR</h1>


    <label for="waving">
        <input type="checkbox" id="waving" bind:checked={waving}>
        waving
    </label>
</header>

<main>
    <TheBook {chosenBook} {animationEnded} {bookHasBeenRead} />
    <audio src={audio}></audio>

    <section class="controls">
        <img on:click={chooseBook} src={gun} alt="cool ass gun">
        <img on:click={readBook} src={anchor} alt="sweet anchor">
    </section>
    
</main>

<footer class="water">
    <Wave where = "back" animation="big" {waving} />
    <Wave where = "midle" animation="tiny" {waving} />
    <img class="hem" src={hem} alt="my boy ham"/>
    <Wave where = "front" animation="small" {waving} />
    
</footer>