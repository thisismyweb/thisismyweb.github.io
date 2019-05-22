function loadScriptsJS()
{
    Sys.Application.remove_load(loadScriptsJS);

    var windowSize;
    var setHeight = $(".dayOne .dayContent").height();
    //$(".fullSyllabus").height(setHeight + 170);

    if (window.location.hash)
    {
        var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
        //$("." + hash + " .dayLabel").click();

        switch (hash)
        {
            case "dayOne":
                dayOne();
                break;
            case "dayTwo":
                dayTwo();
                break;
            case "dayThree":
                dayThree();
                break;
            case "dayFour":
                dayFour();
        }
        // Fragment exists
    } else
    {
        // Fragment doesn't exist
    }


    $(".fullSyllabus").css("min-height", setHeight + 170);
    function checkWidth()
    {

        windowSize = $(window).outerWidth();
        var windowHeight = $(window).height();
        var topHeight = $(".mobile-top").height();
        var headerHeight = $(".header").height();
        var mobileTop = (topHeight + headerHeight);

        setHeight = $(".active .dayContent").height();
        syllHeight();


        if (windowSize < 768)
        {
            $(".navWrap").height(windowHeight - mobileTop);
            $(".hasDropdown").attr("data-toggle", "dropdown");
        } else
        {
            $(".navWrap").height(50);
            $(".hasDropdown").removeAttr("data-toggle", "dropdown");
        }

        if ($('.mobileMenu:visible').length)
        {
            $(".navigation").width(windowSize);
            $(".searchMenu").width(windowSize);
            $(".navigation").css('left', '-1000px');
            $(".searchMenu").css('left', '-1000px');
        } else
        {
            $(".navigation").css('left', '0px');
            $(".navigation").width();
        }

        if (windowSize < 992 && windowSize > 767)
        {
            $(".activeArrow.TwoA").css("left", "187px");
            $(".activeArrow.ThreeA").css("left", "374px");
            $(".activeArrow.FourA").css("left", "561px");
        } else if (windowSize < 1200 && windowSize > 991)
        {
            $(".activeArrow.TwoA").css("left", "245px");
            $(".activeArrow.ThreeA").css("left", "490px");
            $(".activeArrow.FourA").css("left", "735px");
        } else if (windowSize > 1200)
        {
            $(".activeArrow.TwoA").css("left", "292px");
            $(".activeArrow.ThreeA").css("left", "584px");
            $(".activeArrow.FourA").css("left", "876px");
        }
    }


    $(".mobileMenu").click(function ()
    {
        if ($(this).hasClass("collapsed"))
        {
            $(this).removeClass("collapsed");
            $(".navigation").animate({ left: "-15px" }, 'slow');
            $(this).addClass("opened");
            $(".MM").addClass("active");
            if ($(".mobileSearch").hasClass("opened"))
            {
                $(".searchMenu").animate({ left: "-1105px" }, 'slow');
                $(".mobileSearch").removeClass("opened");
                $(".mobileSearch").addClass("collapsed");
            }

        } else if ($(this).hasClass("opened"))
        {
            $(this).addClass("collapsed");
            $(".navigation").animate({ left: "-1105px" }, 'slow');
            $(this).removeClass("opened");
            $(".MM").removeClass("active");
        }
    });
    $(".mobileSearch").click(function ()
    {
        if ($(this).hasClass("collapsed"))
        {
            $(this).removeClass("collapsed");
            $(".searchMenu").animate({ left: "-15px" }, 'slow');
            $(this).addClass("opened");
            $(".MM").addClass("active");
            if ($(".mobileMenu").hasClass("opened"))
            {
                $(".navigation").animate({ left: "-1105px" }, 'slow');
                $(".mobileMenu").removeClass("opened");
                $(".mobileMenu").addClass("collapsed");
            }

        } else if ($(this).hasClass("opened"))
        {
            $(this).addClass("collapsed");
            $(".searchMenu").animate({ left: "-1105px" }, 'slow');
            $(this).removeClass("opened");
            $(".MM").removeClass("active");
        }
    });

    $(".MMclose").click(function ()
    {
        $(".navigation").animate({ left: "-1105px" }, 'slow');
        $(".mobileMenu").removeClass("opened");
        $(".mobileMenu").addClass("collapsed");
    });
    $(".MSclose").click(function ()
    {
        $(".searchMenu").animate({ left: "-1105px" }, 'slow');
        $(".mobileSearch").removeClass("opened");
        $(".mobileSearch").addClass("collapsed");
    });


    $(".showHide").click(function ()
    {
        $(this).siblings('.prerequisites').toggle("hide");
        if ($(this).hasClass('hide'))
        {
            $(this).text('View Prerequisites');
            $(this).removeClass('hide');
        } else
        {
            $(this).text('Hide Prerequisites');
            $(this).addClass('hide');
        }
    });
    $(".modalTrigger").click(function ()
    {
        var __x = $(this).siblings('.modal');
        if (__x.length > 0)
            if (__x.hasClass("hide"))
            {
                __x.removeClass("hide");
                __x.css("display", "block");
            }
        //$(this).siblings('.modal').toggle("hide");
        return false;
    });
    $(".close").click(function ()
    {
        $(this).parent('.modal').addClass("hide").css("display", "none");
        return false;
    });
    $(".legalTrigger").click(function ()
    {
        $('.modalContainer').toggle("hide");
    });
    $(".close").click(function ()
    {
        $('.modalContainer').hide();
    });
    $(".promoLink").click(function ()
    {
        $(this).addClass("hide");
        $('.addPromo').removeClass("hide");
    });

    $(".payPart").click(function ()
    {
        $('.paymentSchedule').removeClass("hide");
    });
    $(".payFull").click(function ()
    {
        $('.paymentSchedule').addClass("hide");
    });

    $(".addPayment").click(function ()
    {
        $('.addRow').removeClass("hide");
    });

    $(".closeRow").click(function ()
    {
        $(this).parent('.addRow').addClass("hide");
    });

    function clearActive()
    {
        $(".dayOne").removeClass("active");
        $(".dOne").removeClass("active");
        $(".dayTwo").removeClass("active");
        $(".dTwo").removeClass("active");
        $(".dayThree").removeClass("active");
        $(".dThree").removeClass("active");
        $(".dayFour").removeClass("active");
        $(".dFour").removeClass("active");
        $(".activeArrow").removeClass("OneA");
        $(".activeArrow").removeClass("TwoA");
        $(".activeArrow").removeClass("ThreeA");
        $(".activeArrow").removeClass("FourA");
    }
    function syllHeight()
    {
        $(".fullSyllabus").css("min-height", setHeight + 190);
    }
    function dayOne()
    {
        clearActive();
        setHeight = $(".dayOne .dayContent").height();
        syllHeight();
        $(".dayOne").addClass("active");
        $(".dOne").addClass("active");
        if (windowSize > 767)
        {
            $(".activeArrow").css("left", "0px");
            $(".activeArrow").addClass("OneA");
        }
    }
    function dayTwo()
    {
        clearActive();
        setHeight = $(".dayTwo .dayContent").height();
        syllHeight();
        $(".dayTwo").addClass("active");
        $(".dTwo").addClass("active");
        $(".activeArrow").css("left", "292px");
        $(".activeArrow").addClass("TwoA");
        if (windowSize < 1200 && windowSize > 991)
        {
            $(".activeArrow").css("left", "245px");
        } else if (windowSize < 992 && windowSize > 767)
        {
            $(".activeArrow").css("left", "187px");
        }
    }
    function dayThree()
    {
        clearActive();
        setHeight = $(".dayThree .dayContent").height();
        syllHeight();
        $(".dayThree").addClass("active");
        $(".dThree").addClass("active");
        $(".activeArrow").addClass("ThreeA");
        $(".activeArrow").css("left", "584px");
        if (windowSize < 1200 && windowSize > 991)
        {
            $(".activeArrow").css("left", "490px");
        } else if (windowSize < 992 && windowSize > 767)
        {
            $(".activeArrow").css("left", "374px");
        }
    }
    function dayFour()
    {
        clearActive();
        setHeight = $(".dayFour .dayContent").height();
        syllHeight();
        $(".dayFour").addClass("active");
        $(".dFour").addClass("active");
        $(".activeArrow").addClass("FourA");
        $(".activeArrow").css("left", "876px");
        if (windowSize < 1200 && windowSize > 991)
        {
            $(".activeArrow").css("left", "735px");
        } else if (windowSize < 992 && windowSize > 767)
        {
            $(".activeArrow").css("left", "561px");
        }
    }

    $(".dayOne .dayLabel").click(function ()
    {
        dayOne();
    });
    $(".dOne").click(function ()
    {
        dayOne();
    });
    $(".dayTwo .dayLabel").click(function ()
    {
        dayTwo();
    });
    $(".dTwo").click(function ()
    {
        dayTwo();
    });
    $(".dayThree .dayLabel").click(function ()
    {
        dayThree();
    });
    $(".dThree").click(function ()
    {
        dayThree();
    });
    $(".dayFour .dayLabel").click(function ()
    {
        dayFour();
    });
    $(".dFour").click(function ()
    {
        dayFour();
    });

    $('.slideWrapper').each(function ()
    {
        var slideNum = 1;
        var self = $(this);

        self.find(".nextSlide").click(function ()
        {
            self.find(".activeSlide").fadeOut("slow");
            if (slideNum < self.find(".slideshow").children().length)
            {
                self.find(".activeSlide").next().fadeIn("slow");
                self.find(".activeSlide").next().addClass("tempActive");
                slideNum = (slideNum + 1);
            } else
            {
                self.find(".slideshow li").first().fadeIn("slow");
                self.find(".slideshow li").first().addClass("tempActive");
                slideNum = (slideNum = 1);
            }
            self.find(".activeSlide").removeClass("activeSlide");
            self.find(".tempActive").addClass("activeSlide");
            self.find(".tempActive").removeClass("tempActive");
        });
        self.find(".prevSlide").click(function ()
        {
            self.find(".activeSlide").fadeOut("slow");
            if (slideNum > 1)
            {
                self.find(".activeSlide").prev().fadeIn("slow");
                self.find(".activeSlide").prev().addClass("tempActive");
                slideNum = (slideNum - 1);
            } else
            {
                self.find(".slideshow li").last().fadeIn("slow");
                self.find(".slideshow li").last().addClass("tempActive");
                slideNum = (self.find(".slideshow").children().length);
            }
            self.find(".activeSlide").removeClass("activeSlide");
            self.find(".tempActive").addClass("activeSlide");
            self.find(".tempActive").removeClass("tempActive");
        });
    });
    

    // CHANGE TABS TO SELECT MENU
    $("<select />").appendTo("nav");

    // Create default option "Go to..."
    $("<option />", {
        "selected": "selected",
        "value": "",
        "text": "Select ..."
    }).appendTo("nav select");

    $("nav a").each(function ()
    {
        var el = $(this);
        $("<option />", {
            "value": el.attr("href"),
            "text": el.text()
        }).appendTo("nav select");
    });

    $("nav select").attr('id', 'accountSelect');

    $("nav a.active").each(function ()
    {
        $("nav select").val($(this).attr("href"));
    });

    $("nav select").change(function ()
    {
        window.location = $(this).find("option:selected").val();
    });

    checkWidth();
    $(window).resize(checkWidth);

    $(".nancyHome .nancyText").click(function ()
    {
        $(".nancyHome .container").addClass("hide");
        $(".nancyHome .videoBlock").css('display', 'block');
    });

    $(".nancyVideo").click(function ()
    {
        $(".nancyVideo").addClass("hide");
        $(".forumVideo").css('display', 'block');
    });

}


var qs = (function (a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));// JavaScript Document