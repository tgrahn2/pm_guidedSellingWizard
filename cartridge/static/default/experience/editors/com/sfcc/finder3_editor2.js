(() => {
    subscribe('sfcc:ready', async ({ value, config, isDisabled, isRequired, dataLocale, displayLocale }) => {
        console.log('sfcc:ready', dataLocale, displayLocale, value, config);

        const pageTitleValue = typeof value === 'object' && value !== null && typeof value.pageTitle === 'string' ? value.pageTitle : null;
        const pageQuestionValue = typeof value === 'object' && value !== null && typeof value.pageQuestion === 'string' ? value.pageQuestion : null;
        const pageAttributeValue = typeof value === 'object' && value !== null && typeof value.pageAttribute === 'string' ? value.pageAttribute : null;

        const a1 = typeof value === 'object' && value !== null && value.answers !== null && value.answers.length > 0 ? value.answers :
             [
                {
                    answerText: "",
                    filter: "",
                    icon: ""
                },
                {
                    answerText: "",
                    filter: "",
                    icon: ""
                },
                {
                    answerText: "",
                    filter: "",
                    icon: ""
                },
                {
                    answerText: "",
                    filter: "",
                    icon: ""
                },
                {
                    answerText: "",
                    filter: "",
                    icon: ""
                },
                {
                    answerText: "",
                    filter: "",
                    icon: ""
                }
            ]



        const { options = {}, localization = {} } = config;
        let isValid = true;

        // Append basic DOM
        const template = obtainTemplate(localization);
        const clone = document.importNode(template.content, true);
        document.body.appendChild(clone);


        const pTitle = document.getElementById("pageTitle");
        // const pTitle = document.querySelector('input');
        pTitle.required = isRequired;
        pTitle.disabled = isDisabled;
        pTitle.value = pageTitleValue;

        const pQuestion = document.getElementById("pageQuestion");
        // const pTitle = document.querySelector('input');
        pQuestion.required = isRequired;
        pQuestion.disabled = isDisabled;
        pQuestion.value = pageQuestionValue;

        const pAttribute = document.getElementById("pageAttribute");
        // const pTitle = document.querySelector('input');
        pAttribute.required = isRequired;
        pAttribute.disabled = isDisabled;
        pAttribute.value = pageAttributeValue;

        document.getElementById("a0").value = a1[0].answerText;
        document.getElementById("a1").value = a1[1].answerText;
        document.getElementById("a2").value = a1[2].answerText;
        document.getElementById("a3").value = a1[3].answerText;
        document.getElementById("a4").value = a1[4].answerText;
        document.getElementById("a5").value = a1[5].answerText;

        document.getElementById("f0").value = a1[0].filter;
        document.getElementById("f1").value = a1[1].filter;
        document.getElementById("f2").value = a1[2].filter;
        document.getElementById("f3").value = a1[3].filter;
        document.getElementById("f4").value = a1[4].filter;
        document.getElementById("f5").value = a1[5].filter;

        document.getElementById("fa0").value = a1[0].icon;
        document.getElementById("fa1").value = a1[1].icon;
        document.getElementById("fa2").value = a1[2].icon;
        document.getElementById("fa3").value = a1[3].icon;
        document.getElementById("fa4").value = a1[4].icon;
        document.getElementById("fa5").value = a1[5].icon;

        const pAnswers = document.querySelectorAll('.answerText');
        const pFilters = document.querySelectorAll('.answerfilter');
        const pIcons = document.querySelectorAll('.answerfont');

        // event listener for pageTitle!
        pTitle.addEventListener('change', event => {
            const val = event.target.value;
            const val3 = document.getElementById("pageQuestion");
            const val4 = document.getElementById("pageAttribute");
            // const strUser = e.options[e.selectedIndex].value;

            // basically just put the document values down for the answers here, I"m
            // putting "a8" because there IS no "a8" and it'll just put the doc values down because nothing
            // has changed in the "answers" portion of the JSON.
            const answers = getAnswerJSON("a8", a1, val);

            emit({
                type: 'sfcc:value',
                payload: {
                    pageTitle: val,
                    pageQuestion: val3.value,
                    pageAttribute: val4.value,
                    answers: answers
                }
            });
        });

        // event listener for pageQuestion!
        pQuestion.addEventListener('change', event => {
            const val = event.target.value;
            const val3 = document.getElementById("pageTitle");
            const val4 = document.getElementById("pageAttribute");
            // const strUser = e.options[e.selectedIndex].value;
            const answers = getAnswerJSON("a8", a1, val);

            emit({
                type: 'sfcc:value',
                payload: {
                    pageTitle: val3.value,
                    pageQuestion: val,
                    pageAttribute: val4.value,
                    answers: answers
                }
            });
        });

        // event listener for pageAttribute!
        pAttribute.addEventListener('change', event => {
            const val = event.target.value;
            const val3 = document.getElementById("pageTitle");
            const val4 = document.getElementById("pageQuestion");
            // const strUser = e.options[e.selectedIndex].value;
            const answers = getAnswerJSON("a8", a1, val);

            emit({
                type: 'sfcc:value',
                payload: {
                    pageTitle: val3.value,
                    pageQuestion: val4.value,
                    pageAttribute: val,
                    answers: answers
                }
            });
        });

        pAnswers.forEach(item => {
            item.addEventListener('change', event => {

                const val = event.target.value;
                const val3 = document.getElementById("pageTitle");

                const val4 = document.getElementById("pageQuestion");
                const val5 = document.getElementById("pageAttribute");

                const attr = event.target.getAttribute("id");

                var num = attr.charAt(1);
                if(num === 0){

                }

                const answers = getAnswerJSON(attr, a1, val);

                // const strUser = e.options[e.selectedIndex].value;

                emit({
                    type: 'sfcc:value',
                    payload: {
                        pageTitle: val3.value,
                        pageQuestion: val4.value,
                        pageAttribute: val5.value,
                        answers: answers
                    }
                });

            })
        })

        pFilters.forEach(item => {
            item.addEventListener('change', event => {

                const val = event.target.value;
                const val3 = document.getElementById("pageTitle");

                const val4 = document.getElementById("pageQuestion");
                const val5 = document.getElementById("pageAttribute");

                const attr = event.target.getAttribute("id");

                var num = attr.charAt(1);
                if(num === 0){

                }

                const answers = getFiltersJSON(attr, a1, val);

                // const strUser = e.options[e.selectedIndex].value;

                emit({
                    type: 'sfcc:value',
                    payload: {
                        pageTitle: val3.value,
                        pageQuestion: val4.value,
                        pageAttribute: val5.value,
                        answers: answers
                    }
                });

            })
        })

        pIcons.forEach(item => {
            item.addEventListener('change', event => {

                const val = event.target.value;
                const val3 = document.getElementById("pageTitle");

                const val4 = document.getElementById("pageQuestion");
                const val5 = document.getElementById("pageAttribute");

                const attr = event.target.getAttribute("id");

                var num = attr.charAt(2); // because these attributes are named "fa3" instead of "f3"
                if(num === 0){

                }

                const answers = getIconsJSON(attr, a1, val);

                // const strUser = e.options[e.selectedIndex].value;

                emit({
                    type: 'sfcc:value',
                    payload: {
                        pageTitle: val3.value,
                        pageQuestion: val4.value,
                        pageAttribute: val5.value,
                        answers: answers
                    }
                });

            })
        })

    });

    function getAnswerJSON(id, existing, value) {

        var idNum = id.charAt(1);


        return [
            {
                answerText: idNum === 0 ? value : document.getElementById("a0").value,
                filter: document.getElementById("f0").value,
                icon: document.getElementById("fa0").value
            },
            {
                answerText: idNum === 1 ? value : document.getElementById("a1").value,
                filter: document.getElementById("f1").value,
                icon: document.getElementById("fa1").value
            },
            {
                answerText: idNum === 2 ? value : document.getElementById("a2").value,
                filter: document.getElementById("f2").value,
                icon: document.getElementById("fa2").value
            },
            {
                answerText: idNum === 3 ? value : document.getElementById("a3").value,
                filter: document.getElementById("f3").value,
                icon: document.getElementById("fa3").value
            },
            {
                answerText: idNum === 4 ? value : document.getElementById("a4").value,
                filter: document.getElementById("f4").value,
                icon: document.getElementById("fa4").value
            },
            {
                answerText: idNum === 5 ? value : document.getElementById("a5").value,
                filter: document.getElementById("f5").value,
                icon: document.getElementById("fa5").value
            }
        ]

    }

    function getFiltersJSON(id, existing, value) {

        var idNum = id.charAt(1);


        return [
            {
                answerText: document.getElementById("a0").value,
                filter: idNum === 0 ? value : document.getElementById("f0").value,
                icon: document.getElementById("fa0").value
            },
            {
                answerText: document.getElementById("a1").value,
                filter: idNum === 1 ? value : document.getElementById("f1").value,
                icon: document.getElementById("fa1").value
            },
            {
                answerText: document.getElementById("a2").value,
                filter: idNum === 2 ? value : document.getElementById("f2").value,
                icon: document.getElementById("fa2").value
            },
            {
                answerText: document.getElementById("a3").value,
                filter: idNum === 3 ? value : document.getElementById("f3").value,
                icon: document.getElementById("fa3").value
            },
            {
                answerText: document.getElementById("a4").value,
                filter: idNum === 4 ? value : document.getElementById("f4").value,
                icon: document.getElementById("fa4").value
            },
            {
                answerText: document.getElementById("a5").value,
                filter: idNum === 5 ? value : document.getElementById("f5").value,
                icon: document.getElementById("fa5").value
            }
        ]

    }

    function getIconsJSON(id, existing, value) {

        var idNum = id.charAt(1);


        return [
            {
                answerText: document.getElementById("a0").value,
                filter: document.getElementById("f0").value,
                icon: idNum === 0 ? value : document.getElementById("fa0").value
            },
            {
                answerText: document.getElementById("a1").value,
                filter: document.getElementById("f1").value,
                icon: idNum === 1 ? value : document.getElementById("fa1").value
            },
            {
                answerText: document.getElementById("a2").value,
                filter: document.getElementById("f2").value,
                icon: idNum === 2 ? value : document.getElementById("fa2").value
            },
            {
                answerText: document.getElementById("a3").value,
                filter: document.getElementById("f3").value,
                icon: idNum === 3 ? value : document.getElementById("fa3").value
            },
            {
                answerText: document.getElementById("a4").value,
                filter: document.getElementById("f4").value,
                icon: idNum === 4 ? value : document.getElementById("fa4").value
            },
            {
                answerText: document.getElementById("a5").value,
                filter: document.getElementById("f5").value,
                icon: idNum === 5 ? value : document.getElementById("fa5").value
            }
        ]

    }

    function obtainTemplate({ placeholder, description, group1, group2 }) {
        const template = document.createElement('template');
        template.innerHTML = `
        <div class="slds-box">
        
        <div class="slds-form-element is-required slds-card_container">
            <label class="slds-form-element__label" for="pageTitle">
            <abbr class="slds-required" title="required">*</abbr> <!-- -->Page Title</label>
            <div class="slds-form-element__control">
                <input type="text" id="pageTitle" class="slds-input" placeholder="" tabindex="-1">
             </div>
             <div id="error-message" class="slds-form-element__help"> </div>
        </div>
        
        <div class="slds-form-element is-required slds-card_container">
            <label class="slds-form-element__label" for="pageQuestion">
            <abbr class="slds-required" title="required">*</abbr> <!-- -->Page Question</label>
            <div class="slds-form-element__control">
                <input type="text" id="pageQuestion" class="slds-input" placeholder="" tabindex="-1">
             </div>
             <div id="error-message" class="slds-form-element__help"> </div>
        </div>
        
        <div class="slds-form-element is-required slds-card_container">
            <label class="slds-form-element__label" for="pageAttribute">
            <abbr class="slds-required" title="required">*</abbr> Attribute</label>
            <div class="slds-form-element__control">
                <input type="text" id="pageAttribute" class="slds-input" placeholder="" tabindex="-1">
             </div>
             <div id="error-message" class="slds-form-element__help"> </div>
        </div>  
        
        
                <p>Answers - Facet Name - fontAwesome</p>
                
                <div class="input-group">
                      <input type="text" id="a0" class="form-control input-sm answerText" size="10" />
                      <span class="input-group-addon" style="width: 0px;">-</span>
                      <input type="text" id="f0" size="10" class="form-control input-sm answerfilter"  />
                      <input type="text" id="fa0" size="10" class="form-control input-sm answerfont"  />
                </div> 
                <div class="input-group">
                      <input type="text" id="a1" class="form-control input-sm answerText" size="10" />
                      <span class="input-group-addon" style="width: 0px;">-</span>
                      <input type="text" id="f1" size="10" class="form-control input-sm answerfilter"  />
                      <input type="text" id="fa1" size="10" class="form-control input-sm answerfont"  />
                </div> 
                <div class="input-group">
                      <input type="text" id="a2" class="form-control input-sm answerText" size="10" />
                      <span class="input-group-addon" style="width: 0px;">-</span>
                      <input type="text" id="f2" size="10" class="form-control input-sm answerfilter"  />
                      <input type="text" id="fa2" size="10" class="form-control input-sm answerfont"  />
                </div> 
                <div class="input-group">
                      <input type="text" id="a3" class="form-control input-sm answerText" size="10" />
                      <span class="input-group-addon" style="width: 0px;">-</span>
                      <input type="text" id="f3" size="10" class="form-control input-sm answerfilter"  />
                      <input type="text" id="fa3" size="10" class="form-control input-sm answerfont"  />
                </div>
                <div class="input-group">
                      <input type="text" id="a4" class="form-control input-sm answerText" size="10" />
                      <span class="input-group-addon" style="width: 0px;">-</span>
                      <input type="text" id="f4" size="10" class="form-control input-sm answerfilter"  />
                      <input type="text" id="fa4" size="10" class="form-control input-sm answerfont"  />
                </div>
                <div class="input-group">
                      <input type="text" id="a5" class="form-control input-sm answerText" size="10" />
                      <span class="input-group-addon" style="width: 0px;">-</span>
                      <input type="text" id="f5" size="10" class="form-control input-sm answerfilter"  />
                      <input type="text" id="fa5" size="10" class="form-control input-sm answerfont"  />
                </div>
                
            
            
      
            
         </div>
`;
        return template;
    }

})();