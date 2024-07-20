<script>
    export let chosenBook

</script>

<style>
    h2 {
		color: #ff3e00;
		font-size: 4.5em;
		font-weight: 100;
		font-weight: 900;
		text-transform: uppercase;
		text-shadow: 3px 3px 0 #000;
		-webkit-text-stroke: 2px #710000;
		letter-spacing: -2px;

		position: absolute;
		margin-top: 0;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
		top: 23vh;
	}

	h2 small {
		color: #d2c312;
		font-size: 0.65em;
	}

	h2 small::before {
		text-transform: lowercase;
		font-size: 0.75em;
	}
</style>

<h2>
    <span>{chosenBook.title}</span>

    {#if chosenBook.page}
        <small>{chosenBook.page}</small>
    {/if}
</h2>