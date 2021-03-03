

$(document).ready(function () {
    var $button = $('#button');
    var isMenuOpen = false;

    $button.on('click', function () {
        isMenuOpen = !isMenuOpen;

        $button.attr('aria-expanded', isMenuOpen);
    });


    // Accordion toggle expand and collapsed

    $(".toggle-accordion").on("keypress click", function (e) {
        var faqAccordion = $('.accordion-faq li span');
        if (e.which === 13 || e.which === 32 || e.type === 'click') {
            e.preventDefault();
            $(this).toggleClass('active');
        }
        if ($(this).text() == "Collapse All") {
            faqAccordion.each(function (index, element) {
                collapse(element);
                $('.toggle-accordion').attr('aria-expanded', 'false');

            })

        }
        else {
            faqAccordion.each(function (index, element) {
                expand(element);
                $('.toggle-accordion').attr('aria-expanded', 'true');
            })

        }

        $(this).text(function (i, text) {
            return text === "Collapse All" ? "Expand All" : "Collapse All";
        })



    });

    function expand(el) {
        $(el).next(".accordion-data").slideDown();
        $(el).addClass('active');
        $(el).attr('aria-expanded', 'true');

        $(el).next(".accordion-data").attr('aria-hidden', 'false');
    }


    function collapse(el) {
        $(el).next(".accordion-data").slideUp();
        $(el).removeClass('active');
        $(el).attr('aria-expanded', 'false');

        $(el).next(".accordion-data").attr('aria-hidden', 'true');

    }

    function expandCollapse(el) {
        $(el).next(".accordion-data").slideToggle();
        $(el).toggleClass('active');
        $(el).attr('aria-expanded', function (i, attr) {
            return attr == 'true' ? 'false' : 'true'
        });
        $(el).next(".accordion-data").attr('aria-hidden', function (i, attr) {
            return attr == 'true' ? 'false' : 'true';
        });
    }

    $(function () {
        var faqAccordion = $('.accordion-faq li span');
        $(faqAccordion).on('keypress click', function (e) {
            if (e.which === 13 || e.which === 32 || e.type === 'click') {
                e.preventDefault();
                expandCollapse(this);
            }
        })

    });

    // Navigation active menu link

    $('.nav-active-class li a').each(function () {
        var path = window.location.pathname;
        var href = $(this).attr('href');
        if (path.includes(href)) {
            $(this).addClass('active').siblings().removeClass('active');
            $(this).attr('aria-current', 'page').siblings().removeAttr('aria-current');
        }
    })

    //Search button

    $('#searchsubmit').click(function () {
        var search_input_val = $('#search-field').val();
        window.location.href = 'search-results.html' + "?q=" + search_input_val;
        return false;
    })

    //Search functionality

    function renderResults(searchResults) {
        var response = $(`<ul class="search-list">  </ul>`);
        if (searchResults.length) {
            $.each(searchResults, function (k, value) {
                var result_item = $(` <li class="pad-30">
                <h2> <a href="${value.url}" class="link-primary-um link-primary-underline">${value.heading}</a></h2>
                <span>${value.desc}</span>
             </li>`);
                response.append(result_item);
            });
            $("#search-list").append(response);
        }
        else {
            var not_found = $(`<h3>No Results Found.</h3> <a href="#search-field" class="link-primary-um">Search for another keyword <i class="fa fa-chevron-right fa-1"
            aria-hidden="true"></i></a>`);
            $("#search-list").append(not_found);
        }

    }

    if (typeof results != "undefined") {
        var new_result = [];
        var urlParams = new URLSearchParams(window.location.search);
        var query = urlParams.get('q');
        $.each(results, function (key, value) {
            var results_keywords = value.keywords;
            $.each(results_keywords, function (key1, value1) {
                if (value1.toLowerCase().includes(query.toLowerCase()) || query.toLowerCase().includes(value1.toLowerCase())) {
                    new_result.push(value);
                }
            })


        });
        console.log(new_result);
        renderResults(new_result);

    }


    handleFormSubmission();

});




// feedback form

function handleFormSubmission() {
    $('.form-feedback input').on('keyup', function (e) {
        $(this).addClass('edited');
    });
    $('.form-feedback textarea').on('keyup', function (e) {
        $(this).addClass('edited');
    });

    $('.form-feedback [type="submit"]').on('click.formValidation', function (e) {
        e.preventDefault();
        shouldPrevent = false;
        errorList = [];


        $form = $(this).parents('form');
        $inputs = $form.find('input[required], textarea[required]');

        $inputs.each(function (index, input) {
            errorMessageSelector = 'label[for="' + $(input).attr('id') + '"] .error-message';
            $form.find(errorMessageSelector).removeAttr('aria-live');
            error = $form.find(errorMessageSelector);
            error.css('display', 'none');

            if (!input.validity.valid) {
                error.css('display', 'inline-block');
                shouldPrevent = true;
                errorList.push(error);


            }
            else {
                error.css('display', 'none');

            }
        });

        if (!$form[0].checkValidity()) {
            e.preventDefault();
            errorList[0].attr('aria-live', 'assertive');
        }
        else {
            e.preventDefault();
            ($form[0]).reset();
            $("#feedback-form").hide();
            $("#success-message").removeClass("displayNone").addClass("displayBlock");
            $("#success-message h2").focus();
            $("#success-message h2").attr('role', 'alert');
            $("#success-message h2").attr('aria-live', 'assertive');

        }
    });
}




