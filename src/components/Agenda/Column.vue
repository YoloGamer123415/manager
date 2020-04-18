<template>
    <div
        class="Column"
        :style="{
            height: `${height}px`
        }"
    >
        <div class="date">

        </div>

        <div class="calendar">
            <div class="timeline" />

            <div class="appointments-line" ref="appointments">
                <Appointment
                    id="IDK"
                    title="Haha goeie test"
                    description="Haha goeie test ofzo idk wat dit is."
                    :color="{
                        foreground: 'rgb(246, 191, 38)', // the color of the circle in the circle on the timeline, if not set, same as background
                        background: 'rgb(3, 155, 229)'   // the color of the little circle on the timeline
                    }"
                    :time="{
                        start: new Date((new Date).getFullYear(), (new Date).getMonth(), (new Date).getDate(), 1),
                        end: new Date((new Date).getFullYear(), (new Date).getMonth(), (new Date).getDate(), 2)
                    }"
                />

                <Appointment
                    id="IDK2"
                    title="En een andere"
                    location="Weer geen idee"
                    :color="{
                        background: 'green'
                    }"
                    :time="{
                        start: new Date((new Date).getFullYear(), (new Date).getMonth(), (new Date).getDate(), 3),
                        end: new Date((new Date).getFullYear(), (new Date).getMonth(), (new Date).getDate(), 5)
                    }"
                />

                <Appointment
                    id="IDK2"
                    title="En een hele lange"
                    description="Waarom gebruik ik hier eigenlijk geen lorum ipsum? Dat zou het vullen van tekst echt tien keer makkelijker maken. Maar nee, ik bedenk het weer om zelf stukken tekst in elkaar te typen die nergens op slaan om op deze manier toch aan genoeg tekst te komen, wat eigenlijk best dom is, want ik kan dus makkelijk lorum ipsum gebruiken... En toen moest je er een echt hele lange van maken, zelfs zo lang, dat het niet meer in het fucking ding past. Maar laat ik je eens vertellen, dat is nou nog niet zo gemakkelijk om te verkrijgen. Eerst moet je op een manier een hele lap tekst bedenken die je er kan typen, daarna moet je het daadwerkelijk ook uittypen, wat echt heel leuk is, want dat duurt echt niet fucking lang om te doen ofzo. Oh en had ik je al verteld hoe leuk het is om typfouten te maken? Nee? Nou, moet jij eens luisteren: het is verschrikkelijk. Je moet een precies aantal keer op de backspace knop drukken, want als je er te vaak op drukt, moet je dus de verwijderde letters opnieuw typen. Dan ben je dus eigenlijk twee keer zo lang bezig, wat natuurlijk compleet overbodig is. Daarom raad ik het aan om voortaan gewoon lorum ipsum te gebruiken, want dit is echt een nachtmerrie. Ik ben een beetje inspiratie loos, dus ik ga denk ik nu even kijken of ik al genoeg heb. Haha, guess what. Het is nog niet genoeg. Het was ongeveer op de lengte waarvan ik zit van, hmm, ja dit kan wel als maximale lengte en dan moet je voor de rest maar scrollen ofzo, geen idee hoe ik dat wil gaan doen. Waarschijnlijk op de manier die ik net zei, want dat spreekt het meeste voorzich. Dan maak ik de title gewoon weer sticky, alleen het enige probleem dat ik kan bedenken dat een echt probleem kan worden is dat de gekleurde balkjes die dus links van het doosje staan ook mee gaan scrollen, waaardoor je ze dus wegscrolled en ze niet meer ziet, wat fucking jammer is, want dat willen we natuurlijk niet. Maar goed, we gaan het zien, want als het goed is heb ik deze keer wel genoeg woorden, dus laten we hopen dat het goed komt en ik niet nog een keer fucking teksten uit mijn hoofd moet gaan bedenken en deze dan opschrijven, of nou ja typen."
                    location="Weer geen idee"
                    :color="{
                        background: 'var(--color-main)'
                    }"
                    :time="{
                        start: new Date((new Date).getFullYear(), (new Date).getMonth(), (new Date).getDate(), 5, 15),
                        end: new Date((new Date).getFullYear(), (new Date).getMonth(), (new Date).getDate(), 5, 45)
                    }"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Appointment from "@/components/Agenda/Appointment";

const HOUR_HEIGHT = 250;
// const MINUTE_HEIGHT_MODIFIER = HOUR_HEIGHT / 60;

export default {
    name: 'Column',
    components: {Appointment},
    data() {
        return {
            height: 24 * HOUR_HEIGHT
        }
    }
}
</script>

<style lang="scss" scoped>
$bar-width: .2em;

div.Column {
    position: relative;
    width: 100%;

    &:not(:last-of-type) {
        margin-right: 1em;
    }

    div.date {
        
    }

    div.calendar {
        display: grid;
        grid-template-columns: 75px auto;
        height: 100%;

        div.timeline {
            position: relative;
            height: 100%;

            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: calc(50% - #{$bar-width} / 2);
                bottom: 0;
                width: $bar-width;
                background-color: var(--current-theme-text);
                opacity: .8;
            }
        }

        div.appointments-line {
            height: 100%;
            margin-left: 1em;
        }
    }
}
</style>
