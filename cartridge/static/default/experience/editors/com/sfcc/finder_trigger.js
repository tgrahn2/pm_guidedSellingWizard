(() => {
    let localization;
    let inputEl;
    let buttonEl;
    let buttonEdit;

    subscribe('sfcc:ready', async ({value, config, isDisabled, isRequired, dataLocale, displayLocale}) => {
        console.log('finder-trigger::sfcc:ready', dataLocale, displayLocale, isDisabled, isRequired, value, config);

        // Extract `localization` data from `config`
        // ({ localization = {} } = config);
        ({options = {}, localization = {}} = config);

        // Initialize the DOM
        const template = obtainTemplate(options);
        const clone = document.importNode(template.content, true);
        document.body.appendChild(clone);

        // Obtain DOM elements and apply event handlers
        inputEl = document.querySelector('input');
        buttonEl = document.querySelector('#newPage');
        buttonEl.addEventListener('click', handleBreakoutOpen);

        delete options.config[1];


        /**
         * Edit button clicked in the component editor view.  This should populate
         * the breakout form with this page info of the included page number
         */
        let buttons = document.querySelectorAll('.edit');
        buttons.forEach((btn) => {
            btn.addEventListener('click', function (e) {
                console.log(e.target);

                const {titleBreakout} = localization;

                var pageNumber = e.target.getAttribute('data-count');


                // const val = event.target.value;
                // emit({
                //     type: 'sfcc:value',
                //     payload: val ? { value: val } : null
                // });

                // we use the "emit" function to tell page designer that we want to open the "sfcc:breakout" element.
                emit({
                    type: 'sfcc:breakout',
                    payload: {
                        id: 'finder_breakout',   // this is the editor we want opened. (/static/default/experience/editors/com/sfcc/finder_breakout.js )
                        title: titleBreakout,
                        action: 'EDIT',
                        pageNumber: 4
                    }
                }, handleBreakoutClose);

            });
        });


        document.querySelector('.edit').addEventListener('click', handleBreakoutEdit(e));

        document.querySelector('.delete').addEventListener('click', function () {
            options.config[0].remove();
        }, false);

        buttonDelete = document.querySelector('.delete');
        buttonDelete.addEventListener('click', handleBreakoutDelete(options));

        // Update <input> value - when you select a unicorn... its name gets selected here: TJG
        inputEl.value = obtainDisplayValue(value);
    });

    function obtainTemplate(options) {
        const {placeholder, buttonBreakout} = localization;


        const template = document.createElement('template');
        template.innerHTML = `
            <div class="slds-grid slds-grid_vertical-align-center">
              <div class="slds-col slds-grow">  
              `;


        options.config.forEach(function (e) {
            template.innerHTML += `

                    <div class="slds-page-header slds-page-header_record-home" id="${e.pageNumber}">
                    <div class="slds-page-header__row">
                    <div class="slds-page-header__col-title">
                    <div class="slds-media">
                    <div class="slds-media__figure">
                    <span class="slds-icon_container slds-icon-standard-opportunity">
                    <svg class="slds-icon slds-page-header__icon" aria-hidden="true">
                    <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#opportunity"></use>
                    </svg>
                    </span>
                    </div>
                    <div class="slds-media__body">
                    <div class="slds-page-header__name">
                    <div class="slds-page-header__name-title">
                    <h1>
                    <span class="slds-page-header__title slds-truncate">${e.pageTitle}</span>
                    </h1>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    <div class="slds-page-header__col-actions">
                    <div class="slds-page-header__controls">
                  
                    <div class="slds-page-header__control">
                    <ul class="slds-button-group-list">
                    <li>
                    <button class="slds-button slds-button_neutral edit" data-count="${e.pageNumber}">Edit</button>
                    </li>
                    <li>
                    <button class="slds-button slds-button_neutral delete" data-count="${e.pageNumber}">Delete</button>
                    </li>
                    <li>
                    
                    </li>
                    </ul>
                    </div>
                    </div>
                    </div>
                    </div>
                    <div class="slds-page-header__row">
              
                    <ul class="slds-page-header__detail-row">
                    <li class="slds-truncate">
                    <div class="slds-text-title slds-truncate">Question:</div>
                    <div class="slds-truncate">${e.pageQuestion}</div>
                    </li>
                    </ul>
                    </div>
                    </div>
            `;
        });

        template.innerHTML += `

        <div class="slds-col slds-grow-none">
        <button type="button" id="newPage" class="slds-button slds-button_neutral slds-button_stretch">${buttonBreakout}</button>
            
<!--            <button type="button" class="slds-button slds-button_neutral">${buttonBreakout}</button>-->
            </div> 

            </div></div><br>`;


        return template;
    }

    function obtainDisplayValue(value) {
        return typeof value === 'object' && value != null && typeof value.value === 'string' ? value.value : null;
    }


    function handleBreakoutOpen() {
        const {titleBreakout} = localization;

        // we use the "emit" function to tell page designer that we want to open the "sfcc:breakout" element.
        emit({
            type: 'sfcc:breakout',
            payload: {
                id: 'finder_breakout',   // this is the editor we want opened. (/static/default/experience/editors/com/sfcc/finder_breakout.js )
                title: titleBreakout
            }
        }, handleBreakoutClose);
    }


    function handleBreakoutDelete(options) {
        const {titleBreakout} = localization;


    }


    function handleBreakoutClose({type, value}) {
        if (type === 'sfcc:breakoutApply') {
            handleBreakoutApply(value);
        } else {
            handleBreakoutCancel();
        }
    }

    function handleBreakoutCancel() {
        console.log('finder-trigger::sfcc:breakoutCancel');

        // Grab focus
        buttonEl && buttonEl.focus();
    }

    function handleBreakoutApply(value) {
        console.log('finder-trigger::sfcc:breakoutApply');

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