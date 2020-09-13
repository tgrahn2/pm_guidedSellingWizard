(() => {
            // TJG: config is the output of the "magical.js" config file and ALSO config dataq from the "finder.json" component metadata config file.
    subscribe('sfcc:ready', async ({ value, config, isDisabled, isRequired, dataLocale, displayLocale }) => {
        console.log('sfcc:ready', dataLocale, displayLocale, value, config);

        const selectedValue = typeof value === 'object' && value !== null && typeof value.value === 'string' ? value.value : null;
        const { options = {}, localization = {} } = config;
        let isValid = true;

        // Append basic DOM
        const template = obtainTemplate(localization);
        const clone = document.importNode(template.content, true);
        document.body.appendChild(clone);

        // Set props
        const selectEl = document.querySelector('select');
        selectEl.required = isRequired;
        selectEl.disabled = isDisabled;

        // Set <options> from JSON config
        const optgroupEls = selectEl.querySelectorAll('optgroup');
        setOptions(options.config || [], optgroupEls[0], selectedValue);

        // Set <options> from init()
        setOptions(options.init || [], optgroupEls[1], selectedValue);

        // Apply change listener
        selectEl.addEventListener('change', event => {
            const val = event.target.value;
            emit({
                type: 'sfcc:value',
                payload: val ? { value: val } : null
            });
        });
    });

    function obtainTemplate({ placeholder, description, group1, group2 }) {
        const template = document.createElement('template');
        template.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div class="slds-select_container" title="${description}">
                <select class="slds-select">
                  <option value="">-- ${placeholder} --</option>
                  <optgroup label="${group1}"></optgroup>
                  <optgroup label="${group2}"></optgroup>
                </select>
              </div>
            </div>`;
        return template;
    }

    function setOptions(options, optgroupEl, selectedValue) {
        options.forEach(option => {
            const optionEl = document.createElement('option');
            optionEl.text = option;
            optionEl.value = option;
            optionEl.selected = option === selectedValue;

            optgroupEl.appendChild(optionEl);
        });
    }
})();