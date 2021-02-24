var addListExpandHandler = function () {
    $('body').on('click', '.a-list *[data-toggle="collapse"]', function () {
        // This script runs before the bootstrap collapse handler, so the collapsed-class will still be
        // present even though the content is about to be expanded
        if ($(this).hasClass('collapsed')) {
            $(this).closest('li').addClass('a-expanded');
            $(this).closest('li').siblings().removeClass('a-expanded');
        } else {
            $(this).closest('li').removeClass('a-expanded');
        }
    });
};

/* globals $ */
var feedbackToggle = function () {
    if ($('.a-js-feedbackToggle').length > 0) {
        $('.a-js-feedbackToggle').closest('fieldset').next().hide();
        $('.a-js-feedbackToggle').closest('fieldset').next().next()
            .hide();
        $('.a-js-feedbackToggle').closest('fieldset').next().next()
            .next()
            .hide();
        $('.a-js-feedbackToggle').each(function () {
            $(this).find('input[type=radio]').change(function () {
                if ($(this).val() === 'radio1' && $(this).is(':checked')) {
                    $(this).closest('fieldset').next().show();
                    $(this).closest('fieldset').next().next()
                        .hide();
                    $(this).closest('fieldset').next().next()
                        .next()
                        .hide();
                } else if ($(this).val() === 'radio2' && $(this).is(':checked')) {
                    $(this).closest('fieldset').next().hide();
                    $(this).closest('fieldset').next().next()
                        .show();
                    $(this).closest('fieldset').next().next()
                        .next()
                        .show();
                }
            });
            $(this).closest('form').find('button').on('click', function () {
                $(this).closest('fieldset').next().show();
                $(this).closest('fieldset').next().next()
                    .hide();
                $(this).closest('fieldset').next().next()
                    .next()
                    .hide();
            }.bind(this));
        });
    }
};

/* globals AltinnDropdown */
/* globals AltinnDropdown:true */
AltinnDropdown = {
    init: function () {
        var that = this;
        $('body').on('click', '[data-toggle="altinn-dropdown"] .a-dropdown-item', function () {
            var $dropdownElement = $(this).closest('[data-toggle="altinn-dropdown"');
            if ($(this).data('value')) {
                $dropdownElement.find('.a-js-altinnDropdown-value').val($(this).data('value'));
            }

            $dropdownElement.find('.a-dropdown-toggle').html($(this).html());
        });
    }
};

/* globals $ */
var handleFocus = function () {
    // If state on input is 'focus', add class to a-input: 'a-input-focus'
    $('body').on('focus', 'input.form-control', function () {
        $(this).parent().addClass('a-input-focus');
    });

    $('body').on('blur', 'input.form-control', function () {
        $(this).parent().removeClass('a-input-focus');
    });

    $('.a-radioButtons-stackedList').find('input[type=radio]').change(function () {
        var me = $(this);
        if (me.is(':checked')) {
            me.parent().addClass('a-js-radioParentGray');
            $('input[type=radio]').each(function () {
                if ($(this).attr('id') !== me.attr('id') &&
                    $(this).attr('name') === me.attr('name')) {
                    $(this).parent().removeClass('a-js-radioParentGray');
                }
            });
        }
    });
};

var setupTruncateLines = function () {
    setTimeout(function () {
        // Max two lines for all screen sizes
        $('.a-js-truncate-2').truncate({
            lines: 2
        });
        // Max two lines for screen sizes less than 768
        // Intit with 3 lines instead of 2 for IE11
        if (!!window.MSInputMethodContext
            && !!document.documentMode
            && window.innerWidth < 768) {
            $('.a-js-truncate-2-sm-down').truncate({
                lines: 3
            });
        } else {
            $('.a-js-truncate-2-sm-down').truncate({
                lines: 2
            });
        }
    }, 1);

    $(window).resize(function () {
        // Max two lines for all screen sizes
        $('.a-js-truncate-2').truncate('collapse');
        $('.a-js-truncate-2').truncate('update');

        // Max two lines for screen sizes less than 768
        if (window.innerWidth < 768) {
            $('.a-js-truncate-2-sm-down').truncate('collapse');
            $('.a-js-truncate-2-sm-down').truncate('update');
        } else {
            $('.a-js-truncate-2-sm-down').truncate('expand');
        }
    });

    $('.a-collapsePanel-body').on('shown.bs.collapse', function () {
        var el = $(this).siblings('.a-collapsePanel-heading').find('.a-js-truncate-2-sm-down');
        if (window.innerWidth < 768) {
            el.truncate('expand');
        }
    });

    $('.a-collapsePanel-body').on('hide.bs.collapse', function () {
        var el = $(this).siblings('.a-collapsePanel-heading').find('.a-js-truncate-2-sm-down');
        if (window.innerWidth < 768) {
            el.truncate('collapse');
        }
    });
};

/* globals mobileNavigation */
var wasDark = $('header').hasClass('a-darkBackground');
var action = function (e) {
    if ($(e.target).closest('.a-globalNav-main').length === 0 &&
        $(e.target).closest('.navbar-toggler').length === 0) {
        if ($('.a-globalNav-main').is(':visible')) {
            $('.navbar-toggler').attr('data-jsexpanded', 'false');
            $('.a-globalNav-main').hide();
            $('body').css('background-color', '');
            if (wasDark) {
                $('header').addClass('a-darkBackground');
                $('.a-globalNav-logo').find('img')
                    .attr('src', $('.a-globalNav-logo').find('img').attr('src').replace('blue', 'white'));
            }
            $('.a-page').children(':not(header)').removeClass('a-js-hidden');
        }
    } else if ($(e.target).closest('.navbar-toggler').length > 0) {
        if ($('.a-globalNav-main').is(':visible')) {
            $('.navbar-toggler').attr('data-jsexpanded', 'false');
            $('.a-globalNav-main').hide();
            $('body').css('background-color', '');
            if (wasDark) {
                $('header').addClass('a-darkBackground');
                $('.a-globalNav-logo').find('img')
                    .attr('src', $('.a-globalNav-logo').find('img').attr('src').replace('blue', 'white'));
            }
            $('.a-page').children(':not(header)').removeClass('a-js-hidden');
        } else {
            $('.navbar-toggler').attr('data-jsexpanded', 'true');
            $('.a-globalNav-main').show();
            $('body').css('background-color', '#fff');
            if (wasDark) {
                $('header').removeClass('a-darkBackground');
                $('.a-globalNav-logo').find('img')
                    .attr('src', $('.a-globalNav-logo').find('img').attr('src').replace('white', 'blue'));
            }
            $('.a-page').children(':not(header)').addClass('a-js-hidden');
        }
    }
};
function menuHandler() {
    // enable tabbing and mouse click on mobile menu btn
    if ($('body').width() < 768) {
        $('body').on('click', action);
    }
}
menuHandler();
$(window).on('resize', function () {
    $('body').off('click', action);
    menuHandler();
});

var toggleInstant = function () {
    $('.a-panelAccordion').on('click', '*[data-toggle="instant"]', function () {
        var $target = $(this.dataset.target);
        if ($target.is(':visible')) {
            $(this).attr('aria-expanded', false);
            $target.hide();
            $(this).removeClass('a-open');
        } else {
            $(this).attr('aria-expanded', true);
            $target.show();
            $(this).addClass('a-open');
        }
    });
};

/* globals $ */
var mobileNavigation = function () {
    $('.a-globalNav .dropdown').on('show.bs.dropdown', function (e) {
        var that = this;
        setTimeout(function () {
            $(that).find('.a-dropdown-languages').addClass('expand');
            $(that).find('.a-dropdown-languages a').removeAttr('tabindex');
            $(that).find('.a-dropdown-languages a').removeAttr('aria-hidden');
        }, 0);
    });

    $('.a-globalNav .dropdown').on('hide.bs.dropdown', function (e) {
        $(this).find('.a-dropdown-languages').removeClass('expand');
        $(this).find('.a-dropdown-languages a').attr('tabindex', '-1');
        $(this).find('.a-dropdown-languages a').attr('aria-hidden', 'true');
    });
};

/* globals
  setupExpandContent
*/
$('body').on('show.bs.collapse', '.a-collapsePanel-body', function (e) {
    var that = this;
    if ($(e.target).hasClass('a-collapsePanel-body')) {
        setTimeout(function () {
            var $collapsePanelHeader = $(that).siblings('.a-js-index-heading').first();
            var $msgIconWrapper = $collapsePanelHeader.find('.a-inboxHeadingContent')
                .find('.a-msgIconSecondary')
                .closest('.a-msgIconWrapper');

            $msgIconWrapper.find('.reg')
                .hide()
                .siblings('.a-msgIconSecondary')
                .show();

            $msgIconWrapper.find('span').attr('aria-hidden', true);
            $msgIconWrapper.find('span:last-of-type').removeAttr('aria-hidden');

            $('.a-collapsePanel').removeClass('expanded');
            $(that).closest('.a-collapsePanel').addClass('expanded');
            $('.a-js-index-heading').addClass('dim');
            $('.a-collapsePanel.expanded').find('.a-js-index-heading').removeClass('dim');
            setupExpandContent();
        }, 0);
    }
});

$('body').on('hide.bs.collapse', '.a-collapsePanel-body', function (e) {
    var that = this;
    if ($(e.target).hasClass('a-collapsePanel-body')) {
        setTimeout(function () {
            var $collapsePanelHeader = $(that).siblings('.a-js-index-heading').first();
            $collapsePanelHeader.find('.a-inboxHeadingContent').removeClass('a-msgUnread');
            $(that).closest('.a-collapsePanel').removeClass('expanded');
            if ($('.a-collapsePanel.expanded').length === 0) {
                $('.a-js-index-heading').removeClass('dim');
            } else {
                $collapsePanelHeader.addClass('dim');
            }
        }, 0);
    }
});

var setupOnKeypress = function () {
    $('body').on('keydown', '.a-clickable, .a-selectable', function (e) {
        var key = e.which;
        if ($(e.target).hasClass('a-clickable') || $(e.target).hasClass('a-selectable')) {
            if (key === 13) {
                $(this).click();
                return false;
            }
        }
        return true;
    });
};

$('.a-dropdown-personswitchList').on('click', 'button[data-toggle="collapse"]', function (event) {
    event.preventDefault();
    event.stopPropagation();
    $($(this).data('target')).collapse('toggle');
});

/* globals $ */
var popoverLocalInit = function () {
    var options = {
        html: true,
        placement: function (context, source) {
            var position = $(source).offset();
            $(context).addClass($(source).attr('data-popover-class'));
            if ($(source).hasClass('a-js-popoverBig')) {
                return 'bottom';
            }
            if (position.left < 125) {
                return 'right';
            }
            if (position.left > ($(document).width() - $(source).width() - 125)) {
                return 'left';
            }
            return 'bottom';
        },
        content: function () {
            if ($(this).attr('data-popover-content')) {
                return $('#' + $(this).data('popover-content')).html();
            }
            return false;
        },
        template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><div class="popover-content"></div></div>'
    };

    $('[data-toggle="popover"]').popover(options);

    $('.a-js-togglePopoverIcons').each(function () {
        // $(this).find('i').eq(1).hide();
        $(this).find('.a-js-popoverIconExpanded').hide();
    });

    $('.a-js-popoverIconExpanded').on('click', function () {
        $('.a-js-popoverIconExpanded').hide();
        $('.a-js-popoverIconInitial').show();
        // $(this).hide();
        // $('.a-js-popoverIconInitial').show();
    });
    $('.a-js-popoverIconInitial').on('click', function () {
        $(this).hide();
        $(this).parent().find('.a-js-popoverIconExpanded').show();
    });
};

var forceFocusTriggerElement;
var popoverGlobalInit = function () {
    $('body').on('show.bs.popover', '[data-toggle="popover"].a-js-tabable-popover', function (e) {
        var triggerElement = this;
        $(triggerElement).closest('.a-modal').scrollTop(0);
    });

    $('body').on('shown.bs.popover', '[data-toggle="popover"].a-js-tabable-popover', function (e) {
        var triggerElement = this;
        setTimeout(function () {
            $(triggerElement).after($($(triggerElement).data('bs.popover').tip));
            $(triggerElement).closest('.a-modal').one('scroll', function () {
                $('[data-toggle="popover"]').popover('hide');
            });
        }, 0);
    });

    $('body').on('shown.bs.popover', '[data-toggle="popover"].a-js-popover-forceFocus', function (e) {
        $('body').append($('<button class="sr-only a-js-popoverTrick">ignoreme</button>'));
        forceFocusTriggerElement = this;
        $(forceFocusTriggerElement).one('blur', function () {
            var that = this;
            if (forceFocusTriggerElement) {
                $($(this).data('bs.popover').tip).find('button,input,a,textarea').filter(':visible:first').focus();
            }
        });
    });

    $('body').on('hidden.bs.popover', '[data-toggle="popover"].a-js-popover-forceFocus', function (e) {
        $('body').find('.a-js-popoverTrick').remove();
    });

    // hides popover when the cehckbutton is checked
    $('body').on('focus', '[data-toggle="popover"].sr-only', function (e) {
        if ($(this).is(':checked')) {
            $(this).popover('hide');
        } else {
            $(this).popover('show');
        }
    });

    // show/hide popover on checkbutton change
    $('body').on('change', 'a-switch[data-toggle=popover]', function () {
        if ($(this).is(':checked')) {
            $(this).popover('hide');
        } else {
            $(this).popover('show');
        }
    });

    // Hide all existing popovers when opening a new popover
    $('body').on('click', '[data-toggle="popover"]', function (e) {
        $('[data-toggle="popover"]').not(this).popover('hide');
    });

    // Hide all existing popovers when focusing a new element
    // which is not the open popover or any of its content
    $('body').on('blur', '[data-toggle="popover"], .popover *', function (e) {
        setTimeout(function () {
            var $focused = $(':focus');
            if ((($focused.length !== 0 || forceFocusTriggerElement)
                && !$focused.hasClass('popover')
                && !$focused.parents('.popover').length >= 1) || $focused.hasClass('a-js-popoverTrick')) {
                if (forceFocusTriggerElement) {
                    $(forceFocusTriggerElement).focus();
                    forceFocusTriggerElement = false;
                }
                // disable blur when in modal to allow use of non-original scrollbar
                if ($('.modal.show').length > 0) {
                    $('.popover-big[data-toggle="popover"]').popover('hide');
                }
            }
        }, 0);
    });

    // Hide popovers when clicking on something else than the trigger element
    // and the popover itself
    $('body').on('click', function (e) {
        if ($(e.target).data('toggle') !== 'popover'
            && $(e.target).parents('[data-toggle="popover"]').length === 0
            && $(e.target).parents('.popover.show').length === 0) {
            $('[data-toggle="popover"]').popover('hide');
            forceFocusTriggerElement = false;
            $(this).parent().find('.a-js-popoverIconInitial').show();
            $(this).parent().find('.a-js-popoverIconExpanded').hide();
        }
    });

    function resetTranslate() {
        $('.popover-big').attr('style', $('.popover-big').attr('style').replace(/translateX\(.*?\)/, 'translateX(0px)'));
    }

    function adjustBig() {
        var modalHeight;
        var padding;
        if ($('.popover-big').length > 0) {
            if ($('.modal.show').length > 0) {
                // Add padding to make sure modal is big enough to contain popover
                modalHeight = $('.modal-dialog').height() + $('.modalPage').height();
                padding = ($('.popover').offset().top + $('.modal').scrollTop() + $('.popover').height() + 5) - modalHeight;
                $('.modalPage').css('padding-bottom', padding + 'px');
                // tranlate is somehow added by Bootstrap later when in modal??
                setTimeout(resetTranslate, 0);
            } else {
                resetTranslate();
            }
        }
    }

    $('body').on('shown.bs.popover', '.a-js-persistPopover', function () {
        $('.popover-arrow').html('<style>.popover-big:after { left: ' + ($(this).offset().left + 10.5) + 'px !important; }</style>');
        $('html, body').animate({
            scrollTop: $('.a-js-persistPopover').offset().top - 50
        }, 250);

        // bind scroll wheel to modal popover
        if ($('.modal.show').length > 0) {
            $('.popover-big').bind('wheel', function (e) {
                var scrollTo;
                if (e.originalEvent.deltaY > 0 || e.originalEvent.deltaY < 0) {
                    scrollTo = (e.originalEvent.deltaY) + $('.modal').scrollTop();
                    $('.modal').scrollTop(scrollTo);
                }
            });
        }

        adjustBig();
    });

    // clean up modal page fix
    $('body').on('hidden.bs.popover', 'a-js-persistPopover', function (e) {
        $('.modalPage').css('padding-bottom', '0px');
    });

    $(window).scroll(adjustBig);
    $('.modal').scroll(adjustBig);
    $(window).resize(adjustBig);
};

var setupExpandContent = function () {
    var expandContent = function () {
        $($(this).data('target')).addClass('a-expanded');
        $(this).hide();
    };

    $('*[data-toggle="altinn-expand"]').each(function () {
        var targetHeight;
        var $target = $($(this).data('target'));
        $target.removeClass('a-expandable-content');
        targetHeight = $target.outerHeight();
        $(this).off('click', expandContent);
        if (targetHeight > 320) {
            $target.addClass('a-expandable-content');
            $target.removeClass('a-expanded');
            $(this).on('click', expandContent);
            $(this).show();
        } else {
            $(this).hide();
        }
    });
};

/* globals enableIOS11Fix, disableIOS11Fix, iOS11BugWorkAround */

var enableIOS11Fix = function () {
    // We disable scrolling by hiding everything not in view
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    // It seems we don't need to set these, but I'm leaving there here for now
    // Should be reversed in the disableIOS11Fix function if we enable them
    // document.body.style.height = '100%';
    // document.body.style.width = '100%';
};

var disableIOS11Fix = function () {
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
};

var isAffectedPlatform = function () {
    // Needs to be updated if new versions are affected
    var ua = navigator.userAgent;
    var iOS = /iPad|iPhone|iPod/.test(ua);
    var iOS11 = /OS 11_/.test(ua);

    return (iOS && iOS11);
};

var iOS11BugWorkAround = function () {
    // Detect iOS 11_x affected by cursor position bug
    // Bug report: https://bugs.webkit.org/show_bug.cgi?id=176896
    if (isAffectedPlatform()) {
        // This should run in the parent page only, not in the modal
        if ($('body.a-stickyHelp-body').length === 0) {
            // We enable the fix only when the help button is clicked/tapped
            $('.a-stickyHelp-open').on('click', function () {
                enableIOS11Fix();
            });
        }

        // This should be running inside the iframe
        $('.a-stickyHelp-close').on('click', function () {
            // When the close button in the sticky help window is clicked/tapped
            // we disable the fix, otherwise the page will not scroll
            window.parent.disableIOS11Fix();
        });
    }
};


/*
  globals
  AltinnDropdown,
  AltinnModal,
  AltinnQuickhelp,
  addListExpandHandler,
  cardsToggle,
  codeLookup,
  contactForm,
  feedbackToggle,
  formatOrgNr,
  handleFocus,
  iOS11BugWorkAround,
  listenForAttachmentChanges,
  mobileNavigation,
  nameChecker,
  onConfirmDeletionClick,
  onFileInputChange,
  popoverGlobalInit,
  popoverLocalInit,
  setupAddRightsHandler,
  setupExpandContent,
  setupFormValidation,
  setupListRowSelect,
  setupOnKeypress,
  setupSelectableCheckbox,
  setupTruncateLines,
  setValidatorSettings,
  toggleFilter,
  toggleInstant,
  toggleSwitch,
  truncateBoxButtonNames,
  window,
*/
window.infoportalInit = function () {
    AltinnDropdown.init();
    handleFocus();  
    setupTruncateLines();
    toggleInstant();
    addListExpandHandler();
    setupExpandContent();
    mobileNavigation();
};
window.infoportalInit();
// $(document).foundation();

//# sourceMappingURL=maps/infoportal-frontpage.js.map