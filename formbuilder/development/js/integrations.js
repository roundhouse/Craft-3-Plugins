IntegrationsElementModal = Craft.BaseElementSelectorModal.extend({
    $integrationContainer: null,
    type: null,
    index: null,
    form: null,

    init(elementType, stettings, type, form) {
        this.type = type
        this.form = form
        this.base(elementType, settings)
        this.index = Math.floor(Math.random() * 10000 + 1)
        
        this.$integrationContainer = $('#formbuilder-integrations-container')
    },

    onSelectionChange() {
        this.base()
    },

    onSelect(elementInfo) {
        Craft.postActionRequest('formbuilder-integrations/integrations/add-integration', {
            index: 'new'+this.index,
            elementId: elementInfo[0].id,
            type: this.type,
            form: this.form,
        }, $.proxy((function(response, textStatus) {
            if (response.success) {
                this.$integrationContainer.append(response.markup)

                new IntegrationSection(response.markup, this.type, this.form, 'new'+this.index)
            }
        }), this))

        // Craft.postActionRequest('form-builder/integrations/add-notification', {
        //     index: this.index,
        //     elementId: elementInfo[0].id,
        //     type: this.type,
        //     form: this.form
        // }, $.proxy(function (response, textStatus) {
        //     if (response.success) {
        //         this.$notificationsContainer.append(response.markup);

        //         new NotificationSection(response.markup, this.type, this.form, this.index);
        //     }
        // }, this));
    }
});

IntegrationSection = Garnish.Base.extend({
    $container: null,
    type: null,
    form: null,

    init(el, type, form, index) {
        this.$container = $('#integration-'+ type +'-' + index)
        this.type = type
        this.form = form
        options = this.$container.find('.option-item')

        new window.FormBuilderSection($('#integration-'+ type +'-' + index), type)

        options.each((i, el) => new window.Option(el))

    }
})

Garnish.$doc.ready(() => {

    // let $integrationContainer = $('#formbuilder-integrations-container')

    $('.integrate-item-btn').on('click', e => {
        e.preventDefault()
        let index = Math.floor((Math.random() * 10000) + 1)
        let type = e.currentTarget.dataset.type
        let form = e.currentTarget.dataset.context
        let elementType = e.currentTarget.dataset.element;

        new IntegrationsElementModal(elementType, {}, type, form)

        // Craft.postActionRequest('formbuilder-integrations/integrations/add-integration', {
        //     index: 'new'+index,
        //     type: type,
        //     form: form,
        // }, $.proxy((function(response, textStatus) {
        //     if (response.success) {
        //         $integrationContainer.append(response.markup)

        //         new IntegrationSection(response.markup, type, form, 'new'+index)
        //     }
        // }), this));
    })
});