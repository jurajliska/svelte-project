<script>
    //components
    import Wave from "../components/Wave.svelte";
    import TheBook from "../components/TheBook.svelte";

    //imports
    import { tweened } from "svelte/motion";
	import { cubicOut, circOut } from "svelte/easing";
    import { shuffleArray } from "../functions.js"
 
    //images
    import hem from "../assets/hemingway.png";
    import gun from "../assets/gun.png";
    import anchor from "../assets/anchor.png"
    import audio from "../assets/dsshotgn.wav"

    import booky from "../books.js";


    //vars
    let waving = true
    let animationEnded = false
    let bookHasBeenRead = false
    let books = booky

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