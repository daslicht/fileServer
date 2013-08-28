$(document).ready(function () {

    var range = null;

    function getFirstRange() {
        var sel = rangy.getSelection();
        return sel.rangeCount ? sel.getRangeAt(0) : null;
    }

    $("#html-preview").resizable({});
    
    /*
     * INSERT IMAGE
     * ********************************************************************/
        var currentImage = null;
        var dialog = null;

        function createImageContainer(id, url, width, height) {
            var div = document.createElement('div');
            div.id=id;
            div.className = 'resizeable mImage vignette';
            div.style.backgroundImage =  "url("+url+")";
            div.style.width = width;
            div.style.height = height;
            div.style.float = 'left';
            return div;
        }

        /**
         * Queries a Baz for items.
         * @param {string} url Image Location
         */
        function insertImage(url) {
            if(range) {
                range.insertNode(
                    createImageContainer( 'myImage',
                         url,
                        '200px',
                        '300px'));
                $(".resizeable").resizable({
                    aspectRatio: true
                });
            }
        }

        $(document).on('mouseenter', '.mImage', function() {
            currentImage = $(this);
            dialog = $( "#imageSettings").clone().css({ display:'block', width:currentImage.css('width')});
            dialog.appendTo(this).animate({opacity:1},125);
        });
        $(document).on('mouseleave', '.mImage', function() {
            dialog.remove();
        });
        $(document).on('click', '#imageSettings #floatLeft', function() {
            currentImage.css({float:'left',margin:'15px'})
        });
        $(document).on('click', '#imageSettings #center', function() {
            currentImage.css({float:'',margin:'0 auto'})
        });
        $(document).on('click', '#imageSettings #floatRight', function() {
            currentImage.css({float:'right',margin:'15px'})
        });
        $(document).on('click', '#insertImage', function() {
            if(range) {
                $('#myFile').trigger('click')
            }else{
                alert('where?')
            }
        });

    /*SEND FORM
    * ********************************************************************************/
        function uploadImage() {
            // var formData = new FormData($('#myForm').get(0));
            var formData = new FormData();
            var file = document.getElementById('myFile').files[0];
            //This data can be accesed on teh Server like: req.post.id
            //I have just choosed 'post' as 'entry point'
            var vo = JSON.stringify( {
                "id" : "bar"
            } );
            formData.append('myFile', file);
            formData.append('post', vo);
            $.ajax({
                url: '/upload',
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                xhr: function() {
                    myXhr = $.ajaxSettings.xhr();
                    if(myXhr.upload){
                        myXhr.upload.addEventListener('progress',function( progress){
                            if (progress.lengthComputable) {
                                var percentage = Math.floor((progress.loaded / progress.total) * 100);
                                console.log('P:', percentage  );
                                $("#bar").width(percentage+'%');
                                $("#percent").html(percentage+'%');
                                if (percentage === 100) {
                                    $("#percent").html(percentage+'%');
                                    console.log('DONE!', percentage);

                                }
                            }
                        }, false);
                    }
                    return myXhr;
                },
                success: function(e)
                {
                    console.log('result: ', e.path)
                    insertImage(e.path);
                    $("#bar").width('100%');
                    $("#percent").html('100%');
                    console.log('Upload erfolgreich beendet!');
                }
            });
        }
        $(document).on('click', '#upload',function(e){
            e.preventDefault();
            uploadImage();
        })

        $(document).on('change', '#myFile',function(e){
            e.preventDefault();
            uploadImage();
        })
    /*FORMAT TEXT
    * *****************************************************************************************/
        $(document).on('click', '#toggle-bold', function (e) {
            document.execCommand('bold', false, null)
        });
        $(document).on('click', '#toggle-italic', function () {
            document.execCommand('italic', false, null)
        });
        $(document).on('click', '#toggle-left', function (e) {
            document.execCommand('justifyLeft', false, null)
        });
        $(document).on('click', '#toggle-center', function (e) {
            document.execCommand('justifyCenter', false, null)
        });
        $(document).on('click', '#toggle-right', function (e) {
            document.execCommand('justifyRight', false, null)
        });
        $(document).on('click', '#toggle-justify', function (e) {
            document.execCommand('justifyFull', false, null)
        });
        $(document).on('click', '#toggle-indent', function (e) {
            document.execCommand('indent', false, null)
        });
        $(document).on('click', '#toggle-outdent', function (e) {
            document.execCommand('outdent', false, null)
        });


    /*
    * INSERT URL
    * ********************************************************************/

        function createHyperlinkNode(title, url) {
            var a = document.createElement('a');
            var linkText = document.createTextNode(title);
            a.appendChild(linkText);
            a.title = title;
            a.href = url;
            return a;
        }
    
        var hyperlinkOptions = $('#hyperlinkOptions');
        var currentSelectedText;
        $('#html-preview').bind('mouseup', function() {//updateInfo keyup mousedown mousemove
            range = getFirstRange();
            if(range) {
                currentSelectedText = rangy.getSelection().getRangeAt(0)+'';
            }
        });

        $(document).on('click', '#show-url-options', function (e) {
            $('#formatButtons').css({opacity:0})
            hyperlinkOptions.css({'display':'inline-block'})
            hyperlinkOptions.transition({opacity:1})
            hyperlinkOptions.find('#title').val(currentSelectedText);
        });
        function hideURLOptions(){
            $('#formatButtons').css({opacity:1})
            hyperlinkOptions.transition({opacity:0},function(){
                hyperlinkOptions.css({display:'none'})
            })
        }
        $(document).on('click', '#hide-url-options', hideURLOptions );
        $(document).on('click', '#insert-link', function (e) {
            hideURLOptions();
            range.extractContents();
            range.insertNode( createHyperlinkNode(hyperlinkOptions.find('#title').val(), hyperlinkOptions.find('#url').val()));
            rangy.getSelection().setSingleRange(range);
        });


    /*
     * SAVE CONTENT
     * ********************************************************************/
        $(document).on('click', '#save-content', function (e) {
            $(".resizeable").resizable( "destroy" );
            $('#html-preview').resizable( "destroy" );
            $('#html-preview').attr('contenteditable','false')
            $('#html-preview').attr('selectable','false')
            $('#html-preview').html();
            console.log($('#html-preview').html())

        });


});