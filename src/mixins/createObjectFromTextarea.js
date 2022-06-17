export default {
    methods: {
        createObjectFromTextarea(element) {
            let currentObject;
            let currentValue = element.value.replace(/[\n]/gm, ',');
            let contentFromInput = currentValue.split(",");
            contentFromInput.forEach(function(part, index) {
                this[index] = this[index].split(": ");
                }, contentFromInput);
            const entriesFromInput = new Map(contentFromInput);
            currentObject = Object.fromEntries(entriesFromInput);
            this.formData[element.id] = currentObject;
        }
    }
};