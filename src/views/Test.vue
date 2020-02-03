<template>
    <div id="Test">
        <!--<Input
            id="goeie-test"
            required
            label="welp idk"
            example="Typ wat ofzo idk"
        />-->
        
        <Select
            id="goeie-test-select"
        >
            <option value="optie-1">Optie 1</option>
            <option value="optie-2">Optie 2</option>
            <option value="optie-3">Optie 3</option>
            <option value="optie-4">Optie 4</option>
            <option value="optie-5">Optie 5</option>
            <option value="optie-6">Optie 6</option>
        </Select>
    </div>
</template>

<script>
// import Input from "@/components/form/Input";
import Select from "@/components/form/Select";

export default {
    name: "Test",
    components: {
        Select,
        // Input
    }
}
</script>

<style lang="scss" scoped>
div#Test {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--current-theme-text);
}
</style>
