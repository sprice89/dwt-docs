function GenerateContentByHead(needh3 = true) {
    var h2_list = $('.content h2');
    if (h2_list.length > 0) {
        var appendContent = '<ul style="display: block;">';
        for (var i = 0; i < h2_list.length; i++) {
            var curH2Text = $(h2_list[i]).text();
            var curH2Href = curH2Text.replace(/\s+/g, '-');
            curH2Href = curH2Href.replace(/[/#:\\\[\]@$^();,`"'|.&]/g, "");
            curH2Href = curH2Href.toLowerCase();
            var curliContent = '<li style="list-style-image: none; list-style-type: circle;"><a href="#' + curH2Href + '" class="otherLinkColour">' + curH2Text + '</a>';
            if (needh3)
            {
                var h3_list = $(h2_list[i]).nextUntil(h2_list[i + 1], "h3");
                if (h3_list.length > 0) {
                    curliContent += '<ul name="listLevel2">';
                    for (var j = 0; j < h3_list.length; j++) {
                        var curH3Text = $(h3_list[j]).text();
                        var curH3Href = curH3Text.replace(/\s+/g, '-');
                        curH3Href = curH3Href.replace(/[/#:\\\[\]@$^();,`"'|.&]/g, "");
                        curH3Href = curH3Href.toLowerCase();
                        curliContent += '<li style="list-style-image: none; list-style-type: none;"><a href="#' + curH3Href + '" class="otherLinkColour">' + curH3Text + '</a></li>';
                    }
                    curliContent += '</ul>'
                }
            }
            curliContent += '</li>'
            appendContent += curliContent;
        }
        appendContent += '</ul>'
        if ($('.sideMenu').length != 0) {
            $($('.sideMenu')[0]).append(appendContent);
        }
        if ($('#sidelistDocContent').length != 0)
        {
            $($('#sidelistDocContent')[0]).append(appendContent);
        }
    }
}

function FullTreeMenuList(generateDocHead){
    var navWrap = document.getElementById("fullTreeMenuListContainer");
    if (navWrap != null)
    {
        HighlightCurrentListForFullTree("fullTreeMenuListContainer", true, document.URL, generateDocHead);
        if (generateDocHead)
        {
            GenerateContentByHead(false);
        }

        navWrap = document.getElementById("fullTreeMenuListContainer");
        var liAry = navWrap.getElementsByTagName("li");

        for (var i = 0, len = liAry.length; i < len; i++) {
            liAry[i].onclick = (function (i) {
                return function (event) {
                    if ($(liAry[i]).children("a").length == 0)
                    {
                        var subUl = $(liAry[i]).children("ul");
                        if (subUl.length > 0)
                        {
                            for (var j = 0; j < subUl.length; j++)
                            {
                                if (subUl[j].style.display == "block") {
                                    var parentL = $(subUl[j]).parents("li");
                                    if (parentL.length > 0)
                                    {
                                        parentL[0].style.listStyleImage = "url('/barcode-sdk-docs-dev/assets/img-icon/collapse-list.png')";
                                    }
                                    subUl[j].style.display = "none";
                                }
                                else {
                                    subUl[j].style.display = "block";
                                    var parentL = $(subUl[j]).parents("li");
                                    if (parentL.length > 0)
                                    {
                                        parentL[0].style.listStyleImage = "url('/barcode-sdk-docs-dev/assets/img-icon/expand-list.png')";
                                    }
                                    var parentUl = $(liAry[i]).parents("ul");
                                    for (var m = 0; m < parentUl.length; m++)
                                    {
                                        if (parentUl[m].style.display != "block"){
                                            var parentL = $(parentUl[m]).parents("li");
                                            if (parentL.length > 0)
                                            {
                                                parentL[0].style.listStyleImage = "url('/barcode-sdk-docs-dev/assets/img-icon/expand-list.png')";
                                            }
                                            parentUl[m].style.display = "block";
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else{
                        HighlightCurrentListForFullTree("fullTreeMenuListContainer", false, ($(liAry[i]).children("a"))[0].href);
                    }
                    event.stopPropagation();
                }
            })(i)
        }
    }
}

function HighlightCurrentListForFullTree(searchListId, firstTime, searchUrl = document.URL, needGenerateDocHead = false)
{
    var navWrap = document.getElementById(searchListId);
    if (navWrap != null)
    {
        var listAry = navWrap.getElementsByTagName("li");
        
        searchUrl = searchUrl.replace(/-v[0-9]+.*\//g,"/");
        searchUrl = searchUrl.replace(/-v[0-9]+.*.html/g,".html");
        if (searchUrl.indexOf("/#") != -1)
        {
            searchUrl = searchUrl.substring(0, searchUrl.indexOf("/#") + 1 );
        }
        
        var foundCurList = false;

        for (var iter = 0; iter < 2; iter++)
        {
            if (iter == 1)
            {
                if (firstTime && !foundCurList && searchUrl.indexOf("#") != -1)
                {
                    searchUrl = searchUrl.substring(0, searchUrl.indexOf("#"));
                }
                else
                {
                    continue;
                }
                
            }

            for (var i = 0, len = listAry.length; i < len; i++)
            {
                var curLi = listAry[i];
                var curListATag =  $(curLi).children("a");
                if (curListATag.length > 0)
                {
                    var regExp = new RegExp(curListATag[0].href + '$');
                    if (regExp.exec(searchUrl) != null)
                    {
                        foundCurList = true;
                        curListATag[0].style.fontWeight = 'bold';
                        if (needGenerateDocHead)
                        {
                            curLi.id = "sidelistDocContent";
                        }
                        if (firstTime)
                        {
                            var parentsUL = $(curLi).parents("ul");
                            for (var j = 0, lenUL = parentsUL.length; j < lenUL; j++)
                            {
                                var curUL =  parentsUL[j];
                                if (curUL.style.display != "block")
                                {
                                    curUL.style.display = "block";
                                }
                                var curULChildrenListAry = $(curUL).children("li");
                                for (var k = 0, lenChildLi = curULChildrenListAry.length; k < lenChildLi; k++)
                                {
                                    var curATag = $(curULChildrenListAry[k]).children("a");
                                    if (curATag.length > 0)
                                    {
                                        continue;
                                    }
                                    var curULTag = $(curULChildrenListAry[k]).children("ul");
                                    if (curULTag.length > 0)
                                    {
                                        if (curULTag[0].style.display != "block")
                                        {
                                            curULChildrenListAry[k].style.listStyleImage = "url('/barcode-sdk-docs-dev/assets/img-icon/collapse-list.png')";  
                                        }
                                        else
                                        {
                                            curULChildrenListAry[k].style.listStyleImage = "url('/barcode-sdk-docs-dev/assets/img-icon/expand-list.png')";
                                        }
                                    }
                                }
                            }
    
                            var parentsLi = $(curLi).parents("li");
                            for (var j = 0, lenLi = parentsLi.length; j < lenLi; j++)
                            {
                                parentsLi[j].style.listStyleImage = "url('/barcode-sdk-docs-dev/assets/img-icon/expand-list.png')";
                            }
                            break;
                        }               
                    }
                    else if (!firstTime)
                    {
                        curListATag[0].style.fontWeight = 'normal';
                    }
                }
            }
        }
    }
}