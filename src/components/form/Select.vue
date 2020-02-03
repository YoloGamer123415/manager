<template>
    <div class="Select">
        <select
            class="fake-select"
            ref="fakeSelect"
            :name="name"
            :id="id"
        >
            <slot />
        </select>
        
        <div
            class="real-select"
            ref="realSelect"
        />
    </div>
</template>

<script>
export default {
    name: "Select",
    props: {
        name: {
            type: String,
            required: false
        },
        id: {
            type: String,
            required: true
        }
    },
    mounted() {
        const fakeSelect = this.$refs.fakeSelect;
        const realSelect = this.$refs.realSelect;
        let optionsArr = [];
        
        for (let i = 0; i < fakeSelect.options.length; i++)
            optionsArr.push({
                text: fakeSelect.options[i].text,
                value: fakeSelect.options[i].value
            });
        
        let customSelectSelected = document.createElement('div');
        customSelectSelected.classList.add('custom-select-selected');
        customSelectSelected.setAttribute('data-selected', fakeSelect.options[fakeSelect.selectedIndex].value);
        customSelectSelected.innerText = fakeSelect.options[fakeSelect.selectedIndex].text;
        
        realSelect.appendChild(customSelectSelected);
        
        let selectOptions = document.createElement('div');
        selectOptions.classList.add('select-options');
        
        realSelect.appendChild(selectOptions);

        for (let i = 0; i < optionsArr.length; i++) {
            let customSelectOption = document.createElement('div');
            customSelectOption.classList.add('custom-select-option');
            customSelectOption.setAttribute('data-value', optionsArr[i].value);
            customSelectOption.innerHTML = optionsArr[i].text;
            
            selectOptions.appendChild(customSelectOption);
        }
    }
}
</script>

<style lang="scss">
/* met scoped werkt t niet met element.appendChild :( */

div.Select {
    select.fake-select {
        display: none;
    }
    
    div.real-select {
        div.custom-select-selected {
            background-color: red;
        }
        
        div.select-options {
            background-color: green;
            
            div.custom-select-option {
                background-color: blue;
            }
        }
    }
}
</style>
