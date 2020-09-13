(() => {
    let baseUrl;
    let localization;
    let options;
    let gridEl;

    subscribe('sfcc:ready', async ({value, config, isDisabled, isRequired, dataLocale, displayLocale}) => {
        console.log('finder-breakout::sfcc:ready', dataLocale, displayLocale, isDisabled, isRequired, value, config);

        // Extract essential data from `config`
        ({baseUrl = './', options = {}, localization = {}} = config);

        // Initialize the DOM
        const template = obtainTemplate(config, config.options.pageNumber);
        const clone = document.importNode(template.content, true);
        document.body.appendChild(clone);

        // Update initial validity
        const selectedValue = obtainDisplayValue(value);
        updateValidity(selectedValue);

        // Init and append unicorn DOM
        const {group1, group2} = localization;
        gridEl = document.querySelector('.slds-grid');
        options.config.forEach(appendItems(group1, selectedValue));
        options.init.forEach(appendItems(group2, selectedValue));

        // If applicable, focus the link element that represents the currently selected unicorn
        // --> 100ms delay due to an SLDS transition interference
        const selectedEl = document.querySelector(`a[data-value="${selectedValue}"]`);
        selectedEl && setTimeout(() => {
            selectedEl.scrollIntoView(false);
        }, 100);
    });

    function obtainTemplate(options, value) {
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Page NUMBER: ${value}</span>
              </div>
              <input type="text" class="form-control" placeholder="Title" aria-label="Title" aria-describedby="basic-addon1">
            </div>
            
            <div class="slds-grid slds-grid_vertical"></div>`.trim();

        var stuffs = '';
        for (const item in options.localization) {
            stuffs += item + ' BEGIN2!!!!<br>';
        }
        template.innerHTML += stuffs + ' END<br>';

        return template;
    };

    function obtainItemHeadTemplate(title) {
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="slds-col slds-box">${title}YO STUFFS22</div>`.trim();
        return template;
    }

    function obtainItemTemplate(option) {
        // Choose a random unicorn image -> Generate a number between 1 and 20
        const unicornImageId = Math.floor(Math.random() * 20) + 1;

        const template = document.createElement('template');
        template.innerHTML = `
<div class="slds-col">
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">Page Title</span>
      </div>
      <input type="text" class="form-control"  value="${option.pageTitle}" aria-describedby="basic-addon1">
    </div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon2">Page Question</span>
      </div>
      <input type="text" class="form-control"  value="${option.pageQuestion}" aria-describedby="basic-addon2">
    </div>
  
  <a href="javascript:void(0);" tabindex="-1" title="${option.pageTitle}" class="slds-box slds-box_link slds-box_x-small slds-media" data-value="${option.pageTitle}">
    <div class="slds-media__body slds-border_left slds-p-around_small">
      <h2 class="slds-truncate slds-text-heading_small" title="Share the knowledge">${option.pageTitle}</h2>
      <p class="slds-m-top_small">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda.</p>
    </div>
  </a>
</div>`.trim();

        return template;
    }

    function appendItems(title, selectedValue) {
        const itemHeadTemplate = obtainItemHeadTemplate(title);
        const itemHeadEl = document.importNode(itemHeadTemplate.content, true);
        gridEl.appendChild(itemHeadEl);

        return option => {
            // Init a media object inside a grid column to represent a unicorn
            const itemTemplate = obtainItemTemplate(option);

            // adds this node to the DOM.
            const itemEl = document.importNode(itemTemplate.content, true);

            // Init the link inside the media object
            const isSelected = selectedValue === option;
            const linkEl = itemEl.querySelector('a');
            linkEl.addEventListener('click', handleSelect);
            isSelected && linkEl.classList.add('slds-is-selected');

            // Append the grid column to the DOM
            gridEl.appendChild(itemEl);
        };
    }

    function handleSelect({currentTarget}) {
        const {value} = currentTarget.dataset;
        updateSelectedValue(value);
    }

    function updateValidity(value) {
        const isValid = typeof value !== 'undefined' && value != null;
        const {description} = localization;
        const payload = isValid ? isValid : {valid: isValid, message: description};

        emit({
            type: 'sfcc:valid',
            payload
        });

        return isValid;
    }

    function updateSelectedValue(value) {
        const oldSelectedEl = document.querySelector('a.slds-is-selected');
        oldSelectedEl && oldSelectedEl.classList.remove('slds-is-selected');

        const isValid = updateValidity(value);
        if (isValid) {
            const newSelectedEl = document.querySelector(`a[data-value="${value}"]`);
            newSelectedEl && newSelectedEl.classList.add('slds-is-selected');

            emit({
                type: 'sfcc:value',
                payload: {
                    value
                }
            });
        }
    }

    function obtainDisplayValue(value) {
        return typeof value === 'object' && value != null && typeof value.value === 'string' ? value.value : null;
    }
})();