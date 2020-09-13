(() => {
    subscribe('sfcc:ready', async ({ payload, config, isDisabled, isRequired, dataLocale, displayLocale }) => {
        console.log('sfcc:ready', dataLocale, displayLocale, payload, config);

        console.error("#################### TEST ################")
        const selectedValue = typeof payload === 'object' && payload !== null && typeof payload.value === 'string' ? payload.value : null;
        const pageTitleValue = typeof payload === 'object' && payload !== null && typeof payload.pageTitleZ === 'string' ? payload.pageTitleZ : null;

        const { options = {}, localization = {} } = config;
        const configPageTitle = config.pageTitleZ;

        let isValid = true;

        // Append basic DOM
        const template = obtainTemplate(localization, pageTitleValue);
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

        // set value of page title here!
        // const val2 = document.getElementById("blaStuff").value;
        document.getElementById("blaStuff").value = pageTitleValue;


        // Apply change listener
        selectEl.addEventListener('change', event => {
            const val = event.target.value;
            const val3 = document.getElementById("blaStuff").value;
            config.pageTitleZ = val3;

            emit({
                type: 'sfcc:value',
                payload: val ? { value: val, pageTitleZ: val3 } : null
            });
        });

        /*document.querySelector('input').addEventListener('change', event => {
            const val = event.target.value;
            emit({
                type: 'sfcc:value',
                // payload: val ? { value: val } : null
                payload: {
                    pageTitleZ: val,
                    value: selectedValue
                }
            });
        });*/
    });

    function obtainTemplate({ placeholder, description, group1, group2 }, pageTitle) {
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
              
              <input id="blaStuff" type="text" name="pageTitleZ" value=""/>
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