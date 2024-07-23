<script>
    //components
    import Wave from "../components/Wave.svelte";
    import TheBook from "../components/TheBook.svelte";

    //imports
    import { tweened } from "svelte/motion";
	import { cubicOut, circOut } from "svelte/easing";
    import { shuffleArray } from "../functions.js"
    //import { books } from "../lib/index.js"

    import { browser } from "$app/environment"
    import { writable } from "svelte/store" 


    //images
    import hem from "../assets/hemingway.png";
    import gun from "../assets/gun.png";
    import anchor from "../assets/anchor.png"
    import audio from "../assets/dsshotgn.wav"

    import books from "../books.js";

    //localStorage
    // Storage.prototype.setStuff = function (key, value) {
    //     this.setItem(key, JSON.stringify(value))
    // }

    // Storage.prototype.getStuff = function (key) {
    //     var value = this.getItem(key)
    //     return value && JSON.parse(value)
    // }

    // if( !localStorage.getStuff("unreadBooks") ){
    //     localStorage.setStuff("unreadBooks", books)
    //     localStorage.setStuff("readBooks", [])
    // }

    let cat    

    if (browser){
        window.localStorage.setItem("myCato", "Tomas");
        cat = localStorage.getItem("myCat");
    }
    

    const defaultValue = 'summer';
    const initialValue = browser ? window.localStorage.getItem('theme') ?? defaultValue : defaultValue;
    const theme = writable(initialValue);

    theme.subscribe((value) => {
        if (browser) {
            window.localStorage.setItem('theme', value);
        }
    });





    //vars
    let waving = true
    let animationEnded = false
    let bookHasBeenRead = false
    //let booky = books

    function gunAudio(){
        const audio = document.querySelector("audio")
        audio.play()
    }
    
    //countdown
    const progress = tweened(0, {
		duration: 2500,
		easing: circOut
	});

    //randomize (choose random book)
    const chooseBook = () => {
        shuffleArray(books)
        animationEnded = false
        bookHasBeenRead = false

        let index = $progress === 0 ? books.length -1 : 0

        progress.set(index).then(() => {
            animationEnded = true
            gunAudio()
        })
    }

    //Move book from unread to read
    const readBook = () => {
        bookHasBeenRead = true
    }

    $: chosenBook = books[Math.floor($progress)] || books[0]
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

    <h2>{cat}</h2>

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