<template>
<Dialog 
    :visible="display"
    :modal="true"
    :dismissableMask="true"
    @update:visible="toggleDisplay"
>
    <template #header>
        <h3>{{movie.title}}</h3>
	</template>

    <template #content>
        {{movie.plot}}
    </template>

	<template #footer>
		<Button label="No" icon="pi pi-times" class="p-button-text"/>
        <Button label="Yes" icon="pi pi-check" autofocus />
	</template>
</Dialog>
</template>

<script>
export default {
    props : {
        movie : Object,
        display: Boolean,
        toggleDisplay : Function
    }
}
</script>

<style lang="scss" scoped>

</style>