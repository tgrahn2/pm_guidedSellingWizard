(() => {
    let localization;
    let inputEl;
    let buttonEl;

    subscribe('sfcc:ready', async ({ value, config, isDisabled, isRequired, dataLocale, displayLocale }) => {
        console.log('magical-trigger::sfcc:ready', dataLocale, displayLocale, isDisabled, isRequired, value, config);

        // Extract `localization` data from `config`
        ({ localization = {} } = config);

        // Initialize the DOM
        const template = obtainTemplate();
        const clone = document.importNode(template.content, true);
        document.body.appendChild(clone);

        // Obtain DOM elements and apply event handlers
        inputEl = document.querySelector('input');
        buttonEl = document.querySelector('button');
        buttonEl.addEventListener('click', handleBreakoutOpen);

        // Update <input> value - when you select a unicorn... its name gets selected here: TJG
        inputEl.value = obtainDisplayValue(value);
    });

    function obtainTemplate() {
        const { placeholder, buttonBreakout } = localization;
        const template = document.createElement('template');
        template.innerHTML = `
<div class="slds-grid slds-grid_vertical-align-center">
  <div class="slds-col slds-grow">
    <input type="text" disabled class="slds-input" placeholder="${placeholder}">
  </div>
  <div class="slds-col slds-grow-none">
    <button type="button" class="slds-button slds-button_neutral">${buttonBreakout}</button>
  </div>
</div>`;
        return template;
    }

    function obtainDisplayValue(value) {
        return typeof value === 'object' && value != null && typeof value.value === 'string' ? value.value : null;
    }

    function handleBreakoutOpen() {
        const { titleBreakout } = localization;

        // we use the "emit" function to tell page designer that we want to open the "sfcc:breakout" element.
        emit({
            type: 'sfcc:breakout',
            payload: {
                id: 'magical_breakout',   // this is the editor we want opened. (/static/default/experience/editors/com/sfcc/magical_breakout.js )
                title: titleBreakout
            }
        }, handleBreakoutClose);
    }

    function handleBreakoutClose({ type, value }) {
        if (type === 'sfcc:breakoutApply') {
            handleBreakoutApply(value);
        } else {
            handleBreakoutCancel();
        }
    }

    function handleBreakoutCancel() {
        console.log('magical-trigger::sfcc:breakoutCancel');

        // Grab focus
        buttonEl && buttonEl.focus();
    }

    function handleBreakoutApply(value) {
        console.log('magical-trigger::sfcc:breakoutApply');

        // Update <input> value
        inputEl.value = obtainDisplayValue(value);

        // Emit value update to Page Designer
        emit({
            type: 'sfcc:value',
            payload: value
        });

        // Grab focus
        buttonEl && buttonEl.focus();
    }
})();