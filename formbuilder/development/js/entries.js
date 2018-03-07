Craft.FileUploadsIndex = Garnish.Base.extend({
    $container: $('.upload-details'),
    elementIndex: null,

    init(elementIndex, container, settings) {
        let $elements;
        this.elementIndex = elementIndex;
        this.$container = $(container);
        this.setSettings(settings, Craft.BaseElementIndexView.defaults);
        this.$loadingMoreSpinner = $('<div class="centeralign hidden">' + '<div class="spinner loadingmore"></div>' + '</div>').insertAfter(this.$container);
        this.$elementContainer = this.getElementContainer();
        
        $elements = this.$elementContainer.children();

        if (this.settings.context === 'index') {
            this.addListener(this.$elementContainer, 'dblclick', function(ev) {
                var $element;
                let $target;
                $target = $(ev.target);
                
                if ($target.hasClass('element')) {
                    $element = $target;
                } else {
                    $element = $target.closest('.element');
                }
                
                if ($element.length) {
                    this.createElementEditor($element);
                }
            });
        }
    },

    getElementContainer() {
        this.$table = this.$container.find('table:first');
        this.$table.children('tbody:first');
    },

    createElementEditor($element) {
        new Craft.ElementEditor($element, {
            onSaveElement: $.proxy((response => Craft.cp.displayNotice(Craft.t('form-builder', 'Asset updated'))), this)
        });
    }
});

Garnish.$doc.ready(() => {
    if (Craft.elementIndex) {
        Craft.elementIndex.on('updateElements', function(e) {
            let elementsCount;
            let selectedSource;
            let unreadItems;

            Craft.postActionRequest('form-builder/entries/get-unread-entries', $.proxy(((response, textStatus) => {
                if (response.success) {
                    window.FormBuilder.unreadCount = response.count;
                    
                    if (response.count > 0) {
                        return $('.total-entry-count').html(response.count);
                    } else {
                        return $('.total-entry-count').html('');
                    }
                }
            }), this));

            selectedSource = e.target.instanceState.selectedSource;

            if (e.target.view._totalVisible === 0) {
                e.target.view.$elementContainer.html($(`<tr><td colspan="6">${Craft.t("form-builder", "No entries available")}</td></tr>`));
            }

            // Update unread count utility nav
            Craft.postActionRequest('form-builder/entries/get-unread-entries', $.proxy(((response, textStatus) => {
                if (textStatus === 'success') {
                    $('#sources .entry-count').html('')

                    $.each(response.grouped, (key, entries) => {
                        $('[data-key="form:'+key+'"]').find('.entry-count').html(entries.length)
                    })

                    if (response.totalCount > 0) {
                        $('.fb-unread-container .fb-badge').addClass('show')
                        $('.fb-unread-container .fb-badge .count').html(response.totalCount)
                        $('#unread-notifications').find('.body').html(response.template)
                    } else {
                        $('.fb-unread-container .fb-badge').removeClass('show')
                        $('.fb-unread-container .fb-badge .count').html('')
                        $('#unread-notifications').find('.body').html('<p class="no-content">'+Craft.t('form-builder', 'No unread submissions.')+'</p>')
                    }
                }
            }), this))


            // if (selectedSource != '*') {
                // Update unread count per form group
                // Craft.postActionRequest('form-builder/entries/get-unread-entries-by-source', { source: selectedSource }, $.proxy(((response, textStatus) => {
                //     console.log(response)
                //     if (textStatus === 'success') {
                        // $.each(response.grouped, (key, entries) => {
                        //     console.log('Form: ', key)
                        //     console.log('Entries: ', entries)
                        // })
                        // if (response.totalCount > 0) {
                        //     $('[data-key="'+selectedSource+'"]').find('.entry-count').html(response.totalCount)
                        // } else {
                        //     $('[data-key="'+selectedSource+'"]').find('.entry-count').html('')
                        // }
                    // }
                // }), this))
            // } else {

            // }

        });
    }

    $('.submission-action-trigger').on('click', function(e) {
        e.preventDefault();
        
        let $menu;
        let entryId;
        let fileIds;
        let formId;
        let type;

        type = $(this).data('type');
        formId = $(this).data('form-id');
        entryId = $(this).data('entry-id');
        fileIds = $(this).data('file-ids');
        $menu = $('<div class="tout-dropdown"/>').html('<ul class="form-item-menu">' + '</ul>');

        if (type === 'submission') {
            $('<li><a href="#" class="delete-submission">Delete Submission</a></li>').appendTo($menu.find('ul'));
        } else if (type === 'form') {
            $(`<li><a href="${window.FormBuilder.adminUrl}/forms/${formId}">View Form</a></li>`).appendTo($menu.find('ul'));
        } else if (type === 'uploads') {
            $(`<li><a href="${window.FormBuilder.adminUrl}/entries" class="delete-all-files">Delete All</a></li>`).appendTo($menu.find('ul'));
            $(`<li><a href="${window.FormBuilder.adminUrl}/entries" class="download-all-files">Download All</a></li>`).appendTo($menu.find('ul'));
        }

        new Garnish.HUD($(this), $menu, {
            hudClass: 'hud fb-hud submissionhud',
            closeOtherHUDs: false
        });

        $menu.find('.delete-submission').on('click', function(e) {
            e.preventDefault();
            let data;
            data = {
              id: entryId
            };

            if (confirm(Craft.t("form-builder", "Are you sure you want to delete this entry?"))) {
                Craft.postActionRequest('form-builder/entries/delete', data, $.proxy(((response, textStatus) => {
                    if (textStatus === 'success') {
                        Craft.cp.displayNotice(Craft.t('form-builder', 'Entry deleted'));
                        window.location.href = `${window.FormBuilder.adminUrl}/entries`;
                    }
                }), this));
            }
        });

        $menu.find('.delete-all-files').on('click', function(e) {
            let data;
            e.preventDefault();
            data = {
              fileId: fileIds
            };

            if (confirm(Craft.t("form-builder", "Are you sure you want to delete all files?"))) {
                Craft.postActionRequest('assets/deleteFile', data, $.proxy(((response, textStatus) => {
                    let hudID;
                    if (response.success) {
                        for (hudID in Garnish.HUD.activeHUDs) {
                            Garnish.HUD.activeHUDs[hudID].hide();
                        }

                        $('.upload-details').parent().velocity('fadeOut', {
                            duration: '100'
                        });

                      return setTimeout((() => $('.upload-details').parent().remove()), 100);
                    }
                }), this));
            }
        });

        $menu.find('.download-all-files').on('click', function(e) {
            e.preventDefault();
            let data;
            Craft.cp.displayNotice(Craft.t('form-builder', 'Downloading...'));
            data = {
              ids: fileIds,
              formId
            };

            Craft.postActionRequest('form-builder/entries/downloadAllFiles', data, $.proxy(((response, textStatus) => {
                let hudID;
                let results;
                if (response.success) {
                    window.location = `/actions/form-builder/entries/downloadFiles?filePath=${response.filePath}`;
                    Craft.cp.displayNotice(Craft.t('form-builder', 'Download Successful'));
                } else {
                    Craft.cp.displayError(Craft.t('form-builder', response.message));
                }

                results = [];

                for (hudID in Garnish.HUD.activeHUDs) {
                    results.push(Garnish.HUD.activeHUDs[hudID].hide());
                }

                return results;
            }), this));
        });

    });
});