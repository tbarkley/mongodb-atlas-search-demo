<template>
<Dialog 
     id="movie_modal"
     v-if="movie"
     :style="{'min-width':'50vw', 'max-width':'55vw', 'min-height':'90vh', 'background-image': 'url(' + getMoviePoster() + ')', 'background-size': 'cover','background-position' : 'center', 'background-color':'#2c902f'}"
    :visible="display"

    :dismissableMask="true"
    @update:visible="toggleDisplay"
>

    
    <div class="mask" style="background-color: rgba(0, 0, 0, 0.9);
    position: relative;
    left: 0px;
    margin-top: -10em;
    padding: 16em;">
       
    </div>
    <div 
        style="background-color:rgba(0,0,0,1);position:relative;left:0;padding:3em;"
        class="flex
        align-items-top
        justify-content-between">
        <div style="padding:1em;max-width:35em;">
            <span class="meta">{{movie.year}}</span> <span v-if="movie.rated" class="meta rating">{{movie.rated}}</span><span class="meta">{{formatRunTime()}}</span>
            <h3>{{movie.title}}</h3>
            <span v-if="movie.fullplot" class="meta">{{movie.fullplot}}</span><span v-else>{{movie.plot}}</span>
        </div>
        <div style="padding:1em;">
            <span class="label">Directors:</span> {{displayMeta('directors')}}<br><br>
            <span class="label">Cast:</span> {{displayMeta('cast')}}<br><br>
            <span class="label">Genres:</span> {{displayMeta('genres')}}<br><br>
            <span class="label">Maturity Rating:</span> <span v-if="movie.rated" class="meta rating">{{movie.rated}}</span><span v-else>N/A</span><br><br>
        </div>
    </div>
<!-- 
	<template #footer>
		<Button label="No" icon="pi pi-times" class="p-button-text"/>
        <Button label="Yes" icon="pi pi-check" autofocus />
	</template> -->
</Dialog>
</template>

<script>
import moment from 'moment';

export default {
    props : {
        movie : Object,
        display: Boolean,
        toggleDisplay : Function
    },
    methods : {
        getMoviePoster() {
            if(!this.movie.poster) {
                return '/layout/images/no_img.png'
            }
            return this.movie.poster;
        },
        displayMeta(key) {
            
            if(!this.movie[key]) return;

            if(this.movie[key].length == 1 || !this.movie[key].join) {
                return this.movie[key][0];
            } else {
                return this.movie[key].join(", ");
            }
            
        },
        formatRunTime() {
            if(!this.movie.runtime) return;
            let formatLocal = (str)=>moment.utc(moment.duration(this.movie.runtime, "minutes").asMilliseconds()).format(str)
            let hours = formatLocal("H") + "h"
            let mins  = formatLocal("m") + "m"
            if(hours == "0h") return `${mins}`;
            return `${hours} ${mins}`;
        }
    }
}
</script>

<style lang="scss">
.label {
    color: rgb(90, 90, 90);
}
.meta {
    font-size: 1.2rem;
    margin-right: .5rem;
}
.rating {
    padding:.1rem .5rem;
    border:1px solid rgb(187, 187, 187);
}
.mask {

  -webkit-mask-image: -webkit-gradient(linear, center top, center bottom, 
			color-stop(0.50,  rgba(0,0,0,0)),
			color-stop(1.00,  rgba(0,0,0,1)));
  mask-image: -webkit-gradient(linear, center top, center bottom, 
			color-stop(0.50,  rgba(0,0,0,0)),
			color-stop(1.00,  rgba(0,0,0,1)));
}
</style>
