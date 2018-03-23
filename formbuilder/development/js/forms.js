let FormBuilderSection;

window.FormBuilderSection = Garnish.Base.extend({
    $container: null,
    $titlebar: null,
    $fieldsContainer: null,
    $optionsContainer: null,
    $previewContainer: null,
    $actionMenu: null,
    $collapserBtn: null,
    $sectionToggleInput: null,
    $menuBtn: null,
    $status: null,
    modal: null,
    collapsed: false,
    optionCollapsed: true,
    type: null,

    // $addTemplateBtn: null,

    init(el, type) {
        let menuBtn;
        this.type = type
        this.$container = $(el);
        this.$menuBtn = this.$container.find('.actions > .settings');
        this.$collapserBtn = this.$container.find('.actions > .bodytoggle');
        this.$sectionToggleInput = this.$container.find('.section-toggle');
        this.$titlebar = this.$container.find('.titlebar');
        this.$fieldsContainer = this.$container.find('.body');
        this.$optionsContainer = this.$container.find('.body-options');
        this.$previewContainer = this.$container.find('.preview');
        this.$status = this.$container.find('.actions > .status');

        // this.$addTemplateBtn = this.$container.find('.add-template-btn')
        
        menuBtn = new Garnish.MenuBtn(this.$menuBtn);
        this.$actionMenu = menuBtn.menu.$container;
        menuBtn.menu.settings.onOptionSelect = $.proxy(this, 'onMenuOptionSelect');
        
        if (Garnish.hasAttr(this.$container, 'data-collapsed')) {
          this.collapse();
        }

        this._handleTitleBarClick = function(ev) {
          ev.preventDefault();
          return this.toggle();
        };

        this.addListener(this.$collapserBtn, 'click', this.toggle);
        this.addListener(this.$titlebar, 'doubletap', this._handleTitleBarClick);

        // if (this.type == 'email') {
        //     this.addListener(this.$addTemplateBtn, 'click', this.addEmailTemplateModal);
        // }
    },

    toggle() {
        if (this.collapsed) {
            return this.expand();
        } else {
            this.$sectionToggleInput.prop('checked', true);
            return this.collapse(true);
        }
    },
    
    collapse(animate) {
        let $customTemplates;
        let $fields;
        let previewHtml;
        let title;
        
        this.$sectionToggleInput.prop('checked', true);
        if (this.collapsed) {
            return;
        }

        this.$container.addClass('bodycollapsed');
        previewHtml = '';
        title = this.$titlebar.find('.tout-title').text();

        this.$previewContainer.html(previewHtml);
        this.$fieldsContainer.velocity('stop');
        this.$container.velocity('stop');
        
        if (animate) {
            this.$fieldsContainer.velocity('fadeOut', {
                duration: 'fast'
            });

            this.$container.velocity({
                height: '100%'
            }, 'fast');
        } else {
            this.$previewContainer.show();
            this.$fieldsContainer.hide();
            this.$container.css({
                height: '100%'
            });
        }

        setTimeout($.proxy((function() {
            this.$actionMenu.find('a[data-action=collapse]:first').parent().addClass('hidden');
            return this.$actionMenu.find('a[data-action=expand]:first').parent().removeClass('hidden');
        }), this), 200);

        return this.collapsed = true;
    },

    expand() {
        let collapsedContainerHeight;
        let expandedContainerHeight;
        this.$sectionToggleInput.prop('checked', false);
        if (!this.collapsed) {
            return;
        }
        this.$container.removeClass('bodycollapsed');
        this.$fieldsContainer.velocity('stop');
        this.$container.velocity('stop');
        collapsedContainerHeight = this.$container.height();
        this.$container.height('auto');
        this.$fieldsContainer.show();
        expandedContainerHeight = this.$container.height();
        this.$container.height(collapsedContainerHeight);
        
        this.$fieldsContainer.hide().velocity('fadeIn', {
            duration: 'fast'
        });

        this.$container.velocity({
            height: expandedContainerHeight
        }, 'fast', $.proxy((function() {
            return this.$container.height('auto');
        }), this));

        setTimeout($.proxy((function() {
            this.$actionMenu.find('a[data-action=collapse]:first').parent().removeClass('hidden');
            return this.$actionMenu.find('a[data-action=expand]:first').parent().addClass('hidden');
        }), this), 200);

        return this.collapsed = false;
    },
    disable() {
        this.$fieldsContainer.find('.enable-notification-section').prop('checked', false);
        this.$status.removeClass('on');
        this.$status.addClass('off');
        setTimeout($.proxy((function() {
            this.$actionMenu.find('a[data-action=disable]:first').parent().addClass('hidden');
            return this.$actionMenu.find('a[data-action=enable]:first').parent().removeClass('hidden');
        }), this), 200);

        return this.collapse(true);
    },

    enable() {
        this.$fieldsContainer.find('.enable-notification-section').prop('checked', true);
        this.$status.removeClass('off');
        this.$status.addClass('on');
        return setTimeout($.proxy((function() {
            this.$actionMenu.find('a[data-action=disable]:first').parent().removeClass('hidden');
            return this.$actionMenu.find('a[data-action=enable]:first').parent().addClass('hidden');
        }), this), 200);
    },

    "delete"() {
        return this.$container.remove();
    },

    settings() {
        if (!this.modal) {
            return this.modal = new SettingsModal(this);
        } else {
            return this.modal.show();
        }
    },

    updateSectionSettings() {
        return $.each(this.modal.$modalInputs, $.proxy((function(i, input) {
            let value;
            value = $(input).val();
            if (value !== '') {
                return this.$container.prepend($(input).addClass('hidden'));
            }
        }), this));
    },

    onMenuOptionSelect(option) {
        let $option;
        $option = $(option);

        switch ($option.data('action')) {
            case 'collapse':
                return this.collapse(true);
            case 'expand':
                return this.expand();
            case 'disable':
                return this.disable();
            case 'enable':
                this.enable();
                return this.expand();
            case 'delete':
                return this["delete"]();
            case 'settings':
                return this.settings();
        }
    },

    // addEmailTemplateModal() {
    //     new window.EmailTemplateElementModal('roundhouse\\emailbuilder\\elements\\EmailNotification', {}, this)
    // }
})


// window.EmailTemplateElementModal = Craft.BaseElementSelectorModal.extend({
//     $templateContainer: null,
//     parent: null,

//     init(elementType, settings, parent) {
//         this.parent = parent
//         this.base(elementType, settings)
//         this.$templateContainer = parent.$container.find('.template-element')
//     },

//     onSelectionChange() {
//         this.base()
//     },

//     onSelect(elementInfo) {
//         Craft.postActionRequest('form-builder/integrations/get-template-html', {elementId: elementInfo[0].id, siteId: elementInfo[0].siteId}, function (data) {
//             this.$templateContainer.html(data.html)

//             new window.EmailTemplateElement(elementInfo[0], data.html, this.parent)

//         }.bind(this))
//     }
// })

// window.EmailTemplateElement = Garnish.Base.extend({
//     $element: null,
//     $previewHtmlBtn: null,

//     elementId: null,
//     siteId: null,

//     init(element, html, parent) {
//         this.$element = $(html)
//         this.$previewHtmlBtn = parent.$container.find('.preview-html')
//         this.elementId = element.id
//         this.siteId = element.siteId

//         console.log(this.$previewHtmlBtn)

//         this.addListener(this.$previewHtmlBtn, 'click', this.previewHtmlTemplate);
//     },

//     previewHtmlTemplate(e) {
//         e.preventDefault()

//         Craft.postActionRequest('email-builder/notification/preview-notification', {notificationId: this.elementId, siteId: this.siteId}, function (data) {
//             templateModal = new TemplatePreviewModel(data.template)
//             templateModal.show()
//         }.bind(this))
//     }
// })

// TemplatePreviewModel = Garnish.Modal.extend({
//     $iframeContainer: null,
//     $iframe: null,

//     init(template) {
//         let body
//         this.base()

//         this.$formContainer = $('<form class="modal fitted formbuilder-modal has-sidebar">').appendTo(Garnish.$bod)
//         this.setContainer(this.$formContainer)

//         body = $([
//             '<header>', 
//                 '<span class="modal-title">', 'Form Attributes', '</span>', 
//                 '<div class="instructions">', 'Global form attributes', '</div>', 
//             '</header>', 
//             '<div class="body">', 
//             '</div>',
//             '<footer class="footer">', 
//                 '<div class="buttons">', 
//                     `<input type="button" class="btns btn-modal cancel" value="${Craft.t('form-builder', 'Cancel')}">`, 
//                     `<input type="submit" class="btns btn-modal submit" value="${Craft.t('form-builder', 'Save')}">`, 
//                 '</div>', 
//             '</footer>' 
//         ].join('')).appendTo(this.$formContainer);

//         $bodyContainer = this.$formContainer.find('.body')

//         this.$iframeContainer = $('<div class="template-iframe-container"/>').appendTo(Garnish.$bod)
//         this.$iframe = $('<iframe class="template-iframe" frameborder="0"/>').appendTo(this.$iframeContainer)

//         this.$iframe[0].contentWindow.document.open()
//         this.$iframe[0].contentWindow.document.write(template)
//         this.$iframe[0].contentWindow.document.close()


//     }
// })

Garnish.$doc.ready(() => {
    $('.section-collapsible').each((i, el) => {
        new window.FormBuilderSection(el, $(el).data('type'))
    });

    if (Craft.elementIndex) {
        Craft.elementIndex.on('selectSource', function(e) {
            let groupId;
            groupId = e.target.$source.data('id');

            if (groupId) {
                $('#new-form-btn').attr("href", Craft.getCpUrl() + ("/form-builder/forms/new?groupId=" + groupId));
            } else {
                $('#new-form-btn').attr('href', Craft.getCpUrl() + '/form-builder/forms/new?groupId=1');
            }
        });
    }

    if ($('.fb-forms').length > 0) {
        new Clipboard('.copy-handle', {
            target: function(trigger) {
                var handle;
                handle = $(trigger).data('handle');
                Craft.cp.displayNotice(Craft.t("form-builder", "Form handle `" + handle + "` copied"));
            }
        });

        new Clipboard('.twig-snippet', {
            text: function(trigger) {
                var handle, snippet;
                handle = $(trigger).data('handle');
                snippet = '{{ craft.formBuilder.form("' + handle + '") }}';
                Craft.cp.displayNotice(snippet + Craft.t('form-builder', ' copied'));
                return snippet;
            }
        });
    }

    $('.delete-form').on('click', function(e) {
        let data;
        e.preventDefault();
        data = {
            id: $(this).data('id')
        };

        if (confirm(Craft.t('form-builder', "Are you sure you want to delete this form and all its entries?"))) {
            Craft.postActionRequest('form-builder/forms/delete', data, $.proxy(((response, textStatus) => {
                if (textStatus === 'success') {
                    Craft.cp.displayNotice(Craft.t('Form deleted'));
                    window.location.href = `${window.FormBuilder.adminUrl}/forms`;
                }
            }), this));
        }
    });
});