
function UnSupBr(pMsg)
{
	var ua = navigator.userAgent;
	var version = 0, valid = false;
	var x = document.createElement("div");

	x.innerHTML = "<div style='text-align:center;font-size:20px;padding:10px 0;background:#99ccff;border-bottom:1px solid #CCC'>" + pMsg + "</div>";
	//Older Version: x.innerHTML = "<div style='text-align:center;font-size:20px;padding:10px 0;background:#FFEEA9;border-bottom:1px solid #CCC'>The browser version you’re using is no longer supported.  Please upgrade to a <label style='color:#99ccff;cursor:pointer' onclick=\"javascript:alert('Please upgrade to IE11+ or Chrome 39+ or Firefox 42+ or Safari 5.1+ in order to take advantage of all site features.')\"> supported browser</label>.</div>"
	if (/Trident.*rv[ :]*11\./.test(ua)) { version = 11; valid = true; }
	if (/MSIE (\d+\.\d+);/.test(ua)) { version = new Number(RegExp.$1); valid = false; }
	if (/Firefox[\/\s](\d+\.\d+)/.test(ua)) { version = new Number(RegExp.$1); valid = version >= 39; }
	if (ua.lastIndexOf('Chrome/') > 0) { version = ua.substr(ua.lastIndexOf('Chrome/') + 7, 2); valid = version >= 46; }
	if (ua.lastIndexOf('Safari/') > 0) { version = ua.substr(ua.lastIndexOf('Safari/') + 7, 2); valid = version >= 6; }
	if (ua.indexOf("Android") >= 0) { version = parseFloat(ua.slice(ua.indexOf("Android") + 8)); valid = version >= 2; }
	if (!valid)
	    document.body.insertBefore(x, document.body.firstChild);
	return valid;
}
function CookieEnabled(pMsg)
{
    var _cookieEnabled = navigator.cookieEnabled;
    if (_cookieEnabled)
    {
        document.cookie = 'landmarkCookieCheck=true';
        var $cookie = document.cookie;
        if (!$cookie || $cookie.indexOf('landmarkCookieCheck') == -1)
            _cookieEnabled = false;
    }
    if (!_cookieEnabled)
    {
        var x = document.createElement("div");
        x.innerHTML = "<div style='text-align:center;font-size:20px;padding:10px 0;background:#FFEEA9;border-bottom:1px solid #CCC'>" + pMsg + "</div>";
        document.body.insertBefore(x, document.body.firstChild);
    }
    return _cookieEnabled;
}

function WebService() {
    this.type = 'POST';
    this.url;
    this.data;
    this.contentType = 'application/json; charset=utf-8';
    this.dataType = 'json';
    this.cache = false;
    this.errMessage;
    this.async = true;
}
(function () {
    this.success = function (response) { return (typeof response !== 'undefined') ? response : null; };
    this.failure = function (response) { return  (typeof response !== 'undefined') ? response : null;  };
    this.error = function(jqXHR, textStatus, errorThrown) { };
    this.execute = function () {
        try {
            $.ajax({
                type: this.type,
                url: this.url,
                data: this.data,
                contentType: this.contentType,
                dataType: this.dataType,
                cache: this.cache,
                success: this.success,
                failure: this.failure,
                error: this.error,
                async: this.async
            });
        }
        catch (err) {
            if (typeof err.message !== 'undefined')
                this.errMessage = err.message;
            else
                this.errMessage = err;
            this.failure();
        }
    }
}).call(WebService.prototype);


function CheckboxController(controllerId) 
{
    if (!controllerId) return null;
    var __controllerObject = {};

    var __controller;
    var __checkbox;
    var __img;

    $('#' + controllerId).children().each(function (__i, __control) {
        if ($(__control).hasClass('checkbox-control-') || $(__control).hasClass('checkbox-termscontroller-'))
            __checkbox = __control;
        if ($(__control).hasClass('image-control'))
            __img = __control;
    });
    if (__checkbox && __img)  
    {
        Object.defineProperty(__controllerObject, "Checked",
            {
                get:
                    function ()
                    {
                        return $(__checkbox).attr('type') === 'input'
                           ? $(__checkbox).is(':checked')
                           : $(__checkbox).find('input').is(':checked');
                    },
                set:
                    function (value)
                    {
                        if (value != true && value != false) return;
                        var __src = $(__img).attr('src');
                        __src = value
                                    ? __src.substring(0, __src.indexOf('images')) + __settings('url').checked
                                    : __src.substring(0, __src.indexOf('images')) + __settings('url').unchecked;

                        if ($(__checkbox).attr('type') === 'input')
                            $(__checkbox).attr('checked', __checked);
                        else
                            $(__checkbox).find('input').attr('checked', value);

                        $(__img).attr('src', __src);
                    }
            });
    }

    return __controllerObject;
}


$(window).load(function ()
{

    //Begin -- Checkbox Controller Management Functions
    var __settings;

    function ControllerCache()
    {
        var __cache = {};
        return function ()
        {
            if (arguments.length == 1)
            {
                return __cache[arguments[0]];
            }
            if (arguments.length == 2)
            {
                __cache[arguments[0]] = arguments[1];
            }
        };
    }
    (function ()
    {
        __settings = ControllerCache();
        __settings('url', {
            checked: 'images/checked.jpg',
            unchecked: 'images/unchecked.jpg'
        });
        __settings('css', {
            controller: {
                'position': 'relative',
                'width': '15px',
                'height': '15px',
                'border': '0 none',
                'outline': 'none'
            },
            checkbox: {
                'visibility': 'hidden'
            },
            image: {
                'position': 'absolute',
                'width': '15px',
                'height': '15px',
                'top': '0',
                'left': '0',
                'padding': '5px 0'
            }
        });
        (function ()
        {
            $(document.body).find('div[class*=checkbox-controller-]').each(function ()
            {
                $(this).css(__settings('css').controller);
                var __img = $(this).find('.image-control');

                // override style 
                var __width = $(__img)[0].style.width;
                var __height = $(__img)[0].style.height;
                $(__img).css(__settings('css').image);
                if (__width != '') $(__img)[0].style.width = __width;
                if (__height != '') $(__img)[0].style.height = __height;

                $(this).children().each(function ()
                {
                    if ($(this).attr('class').indexOf('checkbox-control-') != -1)
                    {
                        //$(this).change(function (e) { });
                        if ($(this).attr('type') === 'input')
                        {
                            $(__img)[0].src = ($(this).is(':checked')) ? __settings('url').checked : $(__img).attr('src');
                        }
                        else
                        {
                            if ($(this).find('input').is(':checked'))
                                $(__img)[0].src = $(__img)[0].src.substring(0, $(__img)[0].src.indexOf('images')) + __settings('url').checked
                            else
                                $(__img)[0].src.substring(0, $(__img)[0].src.indexOf('images')) + __settings('url').unchecked;
                        }
                        $(this).css(__settings('css').checkbox);
                        if ($(this).attr('readonly')) $(this).parent().attr('readonly', true);
                    }
                });
                $(this).unbind();
                var __event = document.createEvent('MouseEvent');
                __event.initEvent('OnControllerClickEventHandler', true, true);
                $(this)[0].addEventListener('OnControllerClickEventHandler', function ()
                {
                    if (typeof OnControllerClickEventHandler === 'function')
                        OnControllerClickEventHandler(__event);
                });
                $(this).click(
                    function ()
                    {
                        var __src = $(__img).attr('src');
                        var __checked = __src.substring(__src.lastIndexOf('/') + 1).toLowerCase() ==
                                        __settings('url').checked.substring(__settings('url').checked.lastIndexOf('/') + 1).toLowerCase()
                                               ? false
                                               : true;
                        __src = __checked
                                    ? __src.substring(0, __src.indexOf('images')) + __settings('url').checked
                                    : __src.substring(0, __src.indexOf('images')) + __settings('url').unchecked;
                        var __element = $(this).find('.checkbox-control-');
                        if (__element.length == 0)
                            __element = $(this).find('input[class*=checkbox-control-]');
                        var __targetElement = $(__element).attr('type') !== 'input'
                                ? $(__element).find('input')
                                : __element;
                        $(__targetElement).attr('checked', __checked);
                        $(__targetElement)[0].checked = __checked;
                        var __canceled = !$(__targetElement)[0].dispatchEvent(__event);
                        if (!__canceled)
                        {
                            $(__img).attr('src', __src);
                        }
                        else
                        {
                            $(__targetElement).attr('checked', !__checked);
                            $(__targetElement)[0].checked = !__checked;
                        }
                    });
                
                $(this).keypress(function (e)
                {
                    var __keyCode = (e.which) ? e.which : e.keyCode
                    if (__keyCode == 13)     // enter key 
                    {
                        var __element = $(this).find('.checkbox-control-');
                        __element = $(__element).attr('type') !== 'input' 
                                ? $(__element).find('input')
                                : __element;
                        var __checked = !$(__element)[0].checked;
                        $(__element).attr('checked', __checked);
                        $(__element)[0].checked = __checked;

                        var __src = $(__img).attr('src');
                        __src = __checked
                                    ? __src.substring(0, __src.indexOf('images')) + __settings('url').checked
                                    : __src.substring(0, __src.indexOf('images')) + __settings('url').unchecked;

                        var __canceled = !$(__element)[0].dispatchEvent(__event);
                        if (!__canceled)
                        {
                            $(__img).attr('src', __src);
                        }
                        else
                        {
                            $(__targetElement).attr('checked', !__checked);
                            $(__targetElement)[0].checked = !__checked;
                        }
                    }
                });
            });
        })();
    })();
    //End -- Checkbox Controller Management Functions

});



function findControlById(pElements, pID, pReturnAll)
{   /*
    Find DOM element by pID. Navigates down the DOM Tree searching every element and its children for pID 
    pElements: Top Node Collection of elemets or Single element containing child elements. It can be as small as DIV with children or
    pElements Examples: 
        document.getElementsByTagName("*")                      -- search the entire DOM Tree in the Page 
        document.getElementsByTagName("div") or $('div')        -- search through all DIV-s and their children 
        document.getElementsByTagName("a") or $('a')            -- search through LINK-s 
        document.getElementsByTagName("input") or $('input')    -- search through all INPUT elements. use $(':button') for finer search result 
        document.getElementById("containerDiv").getElementsByTagName("p") or $('#containerDiv > p')  -- search through all P elements inside DIV named containerDiv 
        document.getElementsByClassName("red") or $('.red')     -- search through elements of class 'red' 
        document.form[0]                                        -- search through all FORM elements  
    Returns: Element or NULL
    */
    var list = [];
    var isEqual = function (lst, el)
    {
        var bEqual = false;
        lst.forEach(function (a, b) { if (a === el) { bEqual = true; return; } });
        return bEqual;
    }
    if (arguments[3])
    {
        list = arguments[3];
        if (!pReturnAll && list.length > 0)
            return list[0];
    }

    for (var i = 0, len = pElements.length; i < len; i++)
    {
        var element = pElements[i];

        if (element && element.id && element.id.indexOf(pID) !== -1)
        {
            var elementID = element.id;

            if (elementID === pID && !(pReturnAll))
            {
                if (!isEqual(list, element))
                    list.push(element);
                return element;
            }

            if (element.name)
            {
                elementID = element.name.substr(element.name.lastIndexOf('$') + 1);
                if (elementID === pID && !(pReturnAll))
                {
                    if (!isEqual(list, element))
                        list.push(element);
                    return element;
                }
            }

            if (!isEqual(list, element))
                list.push(element);
        }
        if (element)
        {
            if (element.childNodes && element.childNodes.length > 0)
            {
                var localElement = findControlById(element.childNodes, pID, pReturnAll, list);
                if (localElement !== null)
                {
                    element = localElement;
                    if (!pReturnAll)
                    {
                        if (!isEqual(list, element))
                            list.push(element);
                        return element;
                    }
                }
            }
        }
    }
    if (pReturnAll)
        return list;
    else
        if (list.length > 0)
            return list[0];

    return null;
}


var Util = {
    
    playVideo: function (sURL) {
        if (sURL == null || sURL.toString() == "") return;
        this.showModal("<div id='Player0' style='max-width:1280px;max-height:720px;'><video width='100%' height='100%' controls preload='auto' poster='/layouts/6.0/assets/images/landmark-logo.png'><source src='"+ sURL +"'></video></div>", "", true);
        $('#modalContentDiv').height('300px').width('410px').css('border-radius', '5px');
        $('.modal-header').css('border','none').css('width', '98%').css('margin', '5px');
        $('.modal-body').height('260px').width('380px');

        //this.showModal("<div id='Player0' style='max-width:640px;max-height:360px;'></div>", "", true);
        //this.playNow(sURL);
        //Run FlowPlayer Code Here
    },
    playFlowVideo: function (sURL) {
        if (sURL == null || sURL.toString() == "") return;
        this.showModal("<div id='Player0' style='max-width:640px;max-height:360px;'></div>", "", true);
        $('#modalContentDiv').height('300px').width('410px').css('border-radius', '5px');
        $('.modal-header').css('border', 'none').css('width', '98%').css('margin', '5px');
        $('.modal-body').height('260px').width('380px');
        this.playNow(sURL);
    },
    playNow : function (sURL) {
        flowplayer("#Player0", {
            key: "$115444669580974", swf: "/layouts/6.0/Assets/js/FlowPlayer/flowplayer.swf", swfHls: "/layouts/6.0/Assets/js/FlowPlayer/flowplayerhls.swf",
            share: false,
            clip: {
                sources: [
                    { type: "application/x-mpegurl", src: "https://wpc.6D5A.edgecastcdn.net/046D5A/CLO/140606-SJ-TJA/D1S1.mp4.m3u8" },
                    { type: "video/mp4", src: "https://wpc.6D5A.edgecastcdn.net/006D5A/CLO/140606-SJ-TJA/D1S1.mp4" }
                ]
            }
        })
    },
    isNumberKey: function (e)
    {
        var charCode = (e.which) ? e.which : e.keyCode
        if (charCode >= 48 && e.keyCode <= 57) return true;
        return false;
    },
    RegExpValidator: function (re, value)
    {
        if (typeof re === 'undefined' || re == null) return false;
        if (typeof value === 'undefined' || value == null) return false;

        // remove leading and trailing slashes 
        if (re.substr(0, 1) == '/')
            re = re.substr(1);

        if (re.substr(re.length - 1) == '/')
            re = re.substr(0, re.length - 1);

        var __match = value.match(re);
        if (__match != null)
            return __match.toString() == value;

        return false;
    },
    isEmailTaken: function (emailAddr, pid)
    {
        if (emailAddr === 'undefined' || emailAddr == null) return false;
        var __webService = new WebService();
        __webService.url = '/Components/WebService/Service.asmx/IsEmailTaken';
        __webService.data = JSON.stringify({ pEmailAddr: emailAddr, pPID: pid });
        __webService.success = function (response)
        {
            if (typeof response === 'undefined' || response.d == null)
            {
                return false;
            }
            return Boolean(response.d);
        }
    },
    trim: function (str)
    {
        return str.replace(/^\s+|\s+$/gm, '');
    },
    preventSpace: function (domElement)
    {
        if (domElement)
        {
            if ($().on)
            {
                $(domElement).on('paste drop keydown', function (e)
                {
                    var __keyCode = e.which || e.keyCode;

                    if (__keyCode && __keyCode == 32)
                    {
                        return false;
                    }
                    if (e.type == 'paste' || e.type == 'drop')
                    {
                        var $this = $(this);
                        var __previousVal = $(this).val();

                        window.setTimeout(function ()
                        {
                            if ($this.val().indexOf(' ') != -1)
                            {
                                // if keeping user action is desirable, replace all space(s) with empty string. 
                                var val = $this.val();
                                val = val.replace(/\s+/g, '');
                                $this.val(val);
                                // if rejecting user action is desirable, replace new value with original  
                                //$this.val(__previousVal);
                            }
                        }, 5);
                    }
                });
            }
        }
    },
    readSafe: function (str)
    {
        if (str)
        {
            str = str.replace(/\&#39;+/g, "\'");
            str = str.replace(/\&amp;#39;+/g, "\'");
            str = str.replace(/\&lt;+/g, "<");
            str = str.replace(/\&gt;+/g, ">");
            str = str.replace(/\&nbsp;+/g, " ");
            str = str.replace(/\&amp;nbsp;+/g, " ");
            str = str.replace(/\&amp;quot;+/g, "\"");

            return str;
        }
        return '';
    },
    showModal: function (pContent, footerContent, hidePrint)
    {
        showModal(pContent, footerContent, hidePrint);
    },
    processClickEvent: function (pButton)
    {
        if (pButton.click)
        {
            pButton.click();
        }
        else
        {   // for Safari only 
            if (document.createEvent)
            {
                var event = document.createEvent('MouseEvent');
                event.initEvent('click', true, true);
                pButton.dispatchEvent(event);
            }
            else
            {
                alert(MsgObject.ErrClientScripting);
            }
        }
    }
}

function ValidateDate(sender, args) {
	if (args.get_newValue() != "") {
		date = args.get_newValue().toString();
		var mo, day, yr;
		var delimChar = (date.indexOf("/") != -1) ? "/" : "-";

		var delim1 = date.indexOf(delimChar);

		var delim2 = date.lastIndexOf(delimChar);
		if (sender._dateFormat == "dd/MM/yyyy" || sender._dateFormat == "dd-MM-yyyy") {
			day = parseInt(date.substring(0, delim1), 10);
			mo = parseInt(date.substring(delim1 + 1, delim2), 10);
			yr = parseInt(date.substring(delim2 + 1), 10);
		}
		else if (sender._dateFormat == "MM/dd/yyyy" || sender._dateFormat == "MM-dd-yyyy") {
			mo = parseInt(date.substring(0, delim1), 10);
			day = parseInt(date.substring(delim1 + 1, delim2), 10);
			yr = parseInt(date.substring(delim2 + 1), 10);
		}
		var testDate = new Date(yr, mo - 1, day);
		if ((testDate.getMonth() + 1 != mo) || (testDate.getDate() != day) || (testDate.getFullYear() != yr)) {
			alert("Date is not valid.Date format is: " + sender._dateFormat)
			args.set_cancel(true);
			var datepicker = $find(sender._clientID);
			datepicker.clear();
		}
	}
}

function IsNumeric(strString) {
    var strValidChars = "0123456789";
    var strChar;
    var blnResult = true;

    if (strString.length == 0) return false;

    for (i = 0; i < strString.length && blnResult == true; i++) {
        strChar = strString.charAt(i);
        if (strValidChars.indexOf(strChar) == -1) {
            blnResult = false;
        }
    }
    return blnResult;
}

function EnterDecimalNumericValues(event, ctrl) {
    if (event.keyCode == 46) {
        if (ctrl.value.indexOf('.') > -1)
        { event.returnValue = false; }
    }
    else {
        if (!(event.keyCode > 47 && event.keyCode < 58)) {
            event.returnValue = false;
        }
    }
}

function EnterNumericValuesOnly(event) {
    if (!(event.keyCode > 47 && event.keyCode < 58)) {
        event.returnValue = false;
    }
}


function checkTextAreaMaxLength(textBox, e, length) {
    var mLen = textBox["MaxLength"];
    if (null == mLen)
        mLen = length;

    var maxLength = parseInt(mLen);
    if (!checkSpecialKeys(e)) {
        if (textBox.value.length > maxLength - 1) {
            if (window.event) {//IE
                e.returnValue = false;
                return false;
            }
            else//FF
                e.preventDefault();
        }
    }
    updateCounter(textBox.value.length, maxLength, textBox);
}

function fnPaste(textBox, length) {
    var mLen = textBox["MaxLength"];
    if (null == mLen)
        mLen = length;

    var maxLength = parseInt(mLen);

    var objTxtBox = textBox;//window.event.srcElement;
    event.returnValue = false; // Cancel the default behavior
    var PasteData = window.clipboardData.getData("Text");
    if ((objTxtBox.value.length + PasteData.length) > maxLength) {
        objTxtBox.value = objTxtBox.value + PasteData.substr(0, maxLength - objTxtBox.value.length - 1);
    }
    updateCounter(objTxtBox.value.length, maxLength, textBox);
}

function checkSpecialKeys(e) {
    if (e.keyCode != 8 && e.keyCode != 46 && e.keyCode != 35 && e.keyCode != 36 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40)
        return false;
    else
        return true;
}

function updateCounter(currentLength, maxLength, textBox) {
    try {
        var _thiLevelLablesList = textBox.parentNode.getElementsByTagName("label");
        var _counter = null;
        for (i = 0; i < _thiLevelLablesList.length; i++) {
            if (_thiLevelLablesList[i].id.substr(0, 5) == "__LM_") _counter = _thiLevelLablesList[i];
        }

        if (_counter == null) {
            var _counterID = "__LM_max_length_counter__";
            _counter = document.getElementById(_counterID);
        }
        if (null != _counter) {
            _counter.style.visibility = "visible";
            var __left = maxLength - currentLength;
            _counter.innerHTML = "(" + __left.toString().trim() + " characters left)";
        }
    } catch (err) { }
}

function cleanHTML(e)
{
    $("textarea, input[type='text']").change(function ()
    {
        var className = $(this).attr('class');
        if (className == undefined || (className != undefined && className.indexOf("ignore") == -1))
        {
            html = $(this).val(); //get the value
            html = html.replace(/</g, ""); //before: if there's space after < remove
            html = html.replace(/>/g, ""); // add space after <
            $(this).val(html); //set new value
        }
    });
}// JavaScript Document