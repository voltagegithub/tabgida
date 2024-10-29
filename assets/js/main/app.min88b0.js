(function($,doc,global){'use strict';var Woohoo=window.Woohoo||{};Woohoo.debugMode=false;var $html=$('html'),$body=$('body'),$doc=$(document),$win=$(window);Woohoo.get={attr:function($control,_attr,_default){return Woohoo.is.validData($control.attr(_attr))?$control.attr(_attr):_default},data:function($control,_attr,_default){var data=$control.data();return _attr in data?data[_attr]:_default},attrOrData:function($control,_attr,_default){var data=$control.data();return Woohoo.is.validData($control.attr(_attr))?$control.attr(_attr):(_attr in data?data[_attr]:_default)}};(function($,window,i){$.fn.tinyNav=function(options){var settings=$.extend({active:'active',header:'',indent:'- ',label:''},options);return this.each(function(){i++;var $nav=$(this),$parent=$nav.parent(),namespace='tinynav',namespace_i=namespace+i,l_namespace_i='.l_'+namespace_i,$select=$('<select/>').attr({id:namespace_i,name:namespace_i}).addClass(namespace+' '+namespace_i),currPath=window.location.pathname.toLowerCase();if(currPath.charAt(0)!='/'){currPath='/'+currPath}if($nav.is('ul,ol')){if(settings.header!==''){$select.append($('<option/>').text(settings.header))}var options='';$nav.addClass('l_'+namespace_i).find('a').each(function(){options+='<option value="'+$(this).attr('href')+'">';var j;for(j=0;j<$(this).parents('ul, ol').length-1;j++){options+=settings.indent}options+=$(this).text()+'</option>'});$select.append(options);if(!settings.header){$select.find(':eq('+$(l_namespace_i+' li').index($(l_namespace_i+' li.'+settings.active))+')').attr('selected',true)}$('option',$select).each(function(){if($(this).val().toLowerCase()===currPath){$('option',$select).prop('selected',false);$(this).prop('selected',true)}});$select.change(function(){window.location.href=$(this).val()});if($parent.is('.sidebar-nav')){$parent.after($select)}else{$(l_namespace_i).after($select)}$select.wrap('<div class="sidebar-nav-phone"><span class="form-control select need-label"></span></div>');if(settings.label){$select.before($("<label/>").attr("for",namespace_i).addClass(namespace+'_label '+namespace_i+'_label').append(settings.label))}}})}})($,window,0);Woohoo.template=function(template,info){if(typeof template==="string"){var result=template;for(var key in info){var val=info[key];result=result.split('{'+key+'}').join(val===null?'':val)}return result}else return template(info)};Woohoo.stripContentTemplate=function(str){return str.replace(/\\\//g,'\/')};Woohoo.loadNeededContent=function(wrapperSelector){var $wrapper=$(wrapperSelector),$needed;if($wrapper.hasClass('load-when-needed')){$needed=$wrapper.not('.processing').not('.ready')}else{$needed=$('.load-when-needed',$wrapper).not('.processing').not('.ready')}$needed.each(function(){if($wrapper.is(':hidden')){$wrapper.show()}var $loadWrapper=$(this);$loadWrapper.addClass('processing');var $content=$('.content-template',$loadWrapper),$loading=$('.loading',$loadWrapper);if($content.length){$loadWrapper.append(Woohoo.stripContentTemplate($content.html()));if(window.twttr){twttr.widgets.load()}setTimeout(function(){$loadWrapper.addClass('ready');setTimeout(function(){$loadWrapper.addClass('done')},300)},2000)}})};Woohoo.block=function(selector,options){var $element=$(selector),message,defaults;options=options||{};if(typeof options==='string'){message=options;options={}}defaults={message:message,overlayCSS:{backgroundColor:'#fff'},css:{padding:0,margin:0,width:'100%',top:'40%',left:0,textAlign:'center',color:'#000',border:'none',borderRadius:'0',backgroundColor:'#fff',cursor:'wait'}};options=$.extend(true,{},defaults,options);if($element.length&&$.fn.block){$element.block(options)}};Woohoo.unblock=function(selector){$(selector).unblock()};Woohoo.preloader=function(selector,options){var defaults={message:'<img src="/assets/img/preloader.gif" />',css:{border:'0 none',backgroundColor:'transparent'}};options=options||{};options=$.extend(true,{},defaults,options);Woohoo.block(selector,options)};Woohoo.unpreloader=Woohoo.unblock;$doc.on('click','.btn-unblock-alert',function(event){Woohoo.unblock($(this).closest('.custom-modal'));event.preventDefault()});Woohoo.blockAlert=function(){};Woohoo.set={formText:function(selector){$(selector).each(function(){var $input=$(this),$fc=$(this).closest('.form-control');if($fc.is('[data-email="true"]')&&$input.attr('type')!=='email'&&!$html.is('.Explorer8')){$input.attr('type','email')}$input.on({mouseenter:function(){$fc.addClass('hover')},mouseleave:function(){$fc.removeClass('hover')},focus:function(){$fc.addClass('focus')},blur:function(){$fc.removeClass('focus');$input.trigger('keyup')},keyup:function(){$fc.toggleClass('not-empty',$input.val()!=='')}})})},formFile:function(selector){$(selector).each(function(){var $input=$(this),$fc=$(this).closest('.form-control'),$output=$('.file',$fc),refreshOutput=function(){var s=$input.val();if(s.length){s=s.split(/[\/\\]+/);s=s[(s.length-1)]}$output.text(s);$input.blur()};$input.on({change:function(){refreshOutput()}})})},formRadio:function(selector){$(selector).each(function(){var $input=$(this),$fc=$(this).closest('.form-control'),$label=$('label',$fc),name=$input.attr('name'),$otherInputs=$('input[name="'+name+'"]').not($input);$label.on({mouseenter:function(){$fc.addClass('hover')},mouseleave:function(){$fc.removeClass('hover')}});$input.on({change:function(evt){$fc.toggleClass('checked',$input.is(':checked'));if(evt.originalEvent!==undefined){$otherInputs.prop("checked",!$input.is(':checked')).change()}}});if($html.is('.Explorer8')){$label.on({click:function(){$input.prop("checked",!$input.is(':checked')).change();$otherInputs.prop("checked",!$input.is(':checked')).change()}})}$fc.toggleClass('checked',$input.is(':checked'))})},formCheckbox:function(selector){$(selector).each(function(){var $input=$(this),$fc=$(this).closest('.form-control'),$label=$('label',$fc),checked=$input.prop('checked');$label.on({mouseenter:function(){$fc.addClass('hover')},mouseleave:function(){$fc.removeClass('hover')}}).addClass("checkbox-label");$input.on({change:function(){$fc.toggleClass('checked',$input.is(':checked'));if($fc.is('[data-toggle="show-related-form-area"][data-target]')){var $target=$($fc.data('target'));if($target.length){$target.toggleClass('ignore-fields',!$input.is(':checked'));if($input.is(':checked')){$target.slideDown(300)}else{$target.slideUp(300)}}}},focus:function(){$fc.toggleClass('hover',$input.is(':focus'))},blur:function(){$fc.toggleClass('hover',$input.is(':focus'))}});if($html.is('.Explorer8')){$label.on({click:function(){$input.prop("checked",!$input.is(':checked')).trigger('change')}});$('a',$label).on({click:function(event){event.stopPropagation()}})}$fc.toggleClass('checked',$input.is(':checked'))})},formCheckboxCollapse:function(selector){$(selector).each(function(){var $input=$(this),$target=$($input.data('target'));!$target.length||$input.on({change:function(){if($input.is(':checked')){$target.slideDown(300)}else{$target.slideUp(300)}}})})},formTime:function(selector){$(selector).each(function(){var $input=$(this),$fc=$(this).closest('.form-control'),$label=$('label',$fc);$input.on({mouseenter:function(){$fc.addClass('hover')},mouseleave:function(){$fc.removeClass('hover')},focus:function(){$fc.addClass('focus')},blur:function(){$fc.removeClass('focus');$input.trigger('keyup')},keyup:function(){$fc.toggleClass('not-empty',$input.val()!=='')}});if(Woohoo.is.desktop){}else{$input.attr('type','time')}})},formTimeSelect:function(selector){$(selector).each(function(){var $input=$(this),$fc=$(this).closest('.form-control'),data=$fc.data()||{},timeToMinutes=function(time){var pieces=time.split(':');return parseInt(pieces[0])*60+parseInt(pieces[1])},min=0,max=24*60,useAmPm=false,start=data.start||timeToMinutes('00:00'),end=data.end||timeToMinutes('23:45'),step=Math.max(1,parseInt(data.step||15)),selected=data.selected||'09:00',i,hours,minutes,ampm,merged,options='';if(!$fc.is('[data-ride="timepicker"]')){return true}for(i=start;i<=end;i+=step){hours=Math.floor(i/60);minutes=i%60;if(minutes<10){minutes='0'+minutes}ampm=hours%24<12?'AM':'PM';hours=useAmPm?hours%12:hours;if(hours<10){hours='0'+hours}merged=hours+':'+minutes+(useAmPm?' '+ampm:'');options+='<option value="'+merged+'"'+(merged===selected?' selected="selected"':'')+'>'+merged+'</option>'}$input.html(options)})},formDate:function(selector){$(selector).each(function(){var $input=$(this),$fc=$(this).closest('.form-control'),$label=$('label',$fc),formattedDate='23.02.1986',oldVal=$input.val(),currentVal=$input.val(),penderT;if(Woohoo.is.desktop){if($.datepicker&&$fc.is('[data-ride="datepicker"]')){$input.datepicker({onClose:function(){},yearRange:'1942:'+(new Date).getFullYear(),defaultDate:'01.01.1942'})}if($.isFunction($.fn.mask)){$input.mask('99.99.9999',{placeholder:"_"})}}else{$input.attr('type','date');if(!$label.length){$label=$("<label />").addClass('need-label-added').text(Woohoo.globalDateStringToTrDateString(currentVal));$fc.prepend($label)}if(!$fc.hasClass("need-label-added")){if(!$label.is(".need-label-added")){$label.addClass('need-label-added').text(Woohoo.globalDateStringToTrDateString(currentVal));$fc.prepend($label)}}$input.data('label',$('label',$fc))}$input.on({mouseenter:function(){$fc.addClass('hover')},mouseleave:function(){$fc.removeClass('hover')},focus:function(){$fc.addClass('focus')},blur:function(){$fc.removeClass('focus');$input.trigger('keyup');if(Woohoo.is.mobile){!$label.length||$label.text(Woohoo.globalDateStringToTrDateString($input.val()))}},keyup:function(){$fc.toggleClass('not-empty',$input.val()!=='')},change:function(){if(Woohoo.is.mobile){!$label.length||$label.text(Woohoo.globalDateStringToTrDateString($input.val()))}}});if(Woohoo.is.mobile){penderT=setInterval(function(){if(Woohoo.is.validData(currentVal)&&Woohoo.is.validData($input.val())){if(currentVal!=$input.val()){!$label.length||$label.text(Woohoo.globalDateStringToTrDateString($input.val()));currentVal=$input.val()}}},500)}})},formSpin:function(selector){$(selector).each(function(){var $spin=$(this),$input=$('input',$spin),spin=function(el){var $trigger=$(el),val=$input.val(),below,above;val=val||0;below=Math.max(parseInt(val)-1,0);above=Math.max(parseInt(val)+1,0);if(below===0){below=''}if($trigger.is('.up')){$input.val(above);$trigger.trigger('spin.woohoo',[$input])}else{$input.val(below);$trigger.trigger('spin.woohoo',[$input])}};$spin.append('<a href="javascript:void(0)" class="arrow up"><span></span></a>'+'<a href="javascript:void(0)" class="arrow down"><span></span></a>');$('.arrow',$spin).on('click',function(event){spin(this);event.preventDefault()})})},formPhone:function(selector){$(selector).each(function(){var $input=$(this),$fc=$(this).closest('.form-control'),$label=$('label',$fc);if($.isFunction($.fn.mask)){$.mask.definitions['~']='[123456789]';$input.attr({type:'tel'}).mask('(~99) 999-9999',{placeholder:"_"})}})},formNumber:function(selector){$(selector).each(function(){var $input=$(this),$fc=$(this).closest('.form-control'),$label=$('label',$fc);if(Woohoo.is.desktop){Woohoo.makeNumeric($input);if($fc.hasClass('price')&&$.isFunction($.fn.priceFormat)){$input.priceFormat({prefix:'',suffix:'',centsSeparator:',',thousandsSeparator:'.',centsLimit:0})}}else{$input.attr({type:'number'})}})},formTC:function(selector){$(selector).each(function(){var $input=$(this),$fc=$(this).closest('.form-control'),$label=$('label',$fc);if(Woohoo.is.desktop){if($.isFunction($.fn.mask)){$input.mask('99999999999',{placeholder:"_"})}}else{$input.attr({type:'number'})}})},formSelect:function(selector){$(selector).each(function(){var $input=$(this),$fc=$(this).closest('.form-control'),$label=$('label',$fc);$input.on({mouseenter:function(){$fc.addClass('hover')},mouseleave:function(){$fc.removeClass('hover')},focus:function(){$fc.addClass('focus')},blur:function(){$fc.removeClass('focus')},change:function(){var val=$input.val(),text=$input.find('option:selected').text();$fc.toggleClass('not-empty',val!='');$label.text(text);if($input.is('[data-enabledisable]')){var $target=$($input.attr('data-enabledisable')),$targetClosest=$target.closest(".conditional-controls"),$selectedOption=$('option:selected',$input),data=$selectedOption.data();if("checkbox"in data){if(data.checkbox=="enabled"){$targetClosest.show()}else{$targetClosest.hide()}}else{$targetClosest.hide()}}if($fc.is('[data-toggle="show-related-form-area"][data-target]')){var $target=$($fc.data('target'));if($target.length){$target.toggleClass('ignore-fields',!(Number($input.val())>0));if(Number($input.val())>0){$target.slideDown(300)}else{$target.slideUp(300)}}}}})})},formSelectChange:function(selector){$(selector).each(function(){var $input=$(this),$fc=$input.closest('.form-control'),$label=$('label',$fc),val=$input.val(),text=$input.find('option:selected').text();$fc.toggleClass('not-empty',val!=='');!$label.length||$label.text(text)})}};Woohoo.makeNumeric=function(selector){$(selector).keydown(function(e){if($.inArray(e.keyCode,[46,8,9,27,13,110,190])!==-1||(e.keyCode==65&&e.ctrlKey===true)||(e.keyCode>=35&&e.keyCode<=39)){return}if((e.shiftKey||(e.keyCode<48||e.keyCode>57))&&(e.keyCode<96||e.keyCode>105)){e.preventDefault()}})};Woohoo.setFormControls=function(selector){Woohoo.set.formText(selector+' .form-control.text input, '+selector+' .form-control.textarea textarea');Woohoo.set.formFile(selector+' .form-control.text.file input');Woohoo.set.formRadio(selector+' .form-control.radio input');Woohoo.set.formCheckboxCollapse(selector+' input:checkbox[data-toggle="show-related-form-area"]');Woohoo.set.formCheckbox(selector+' .form-control.checkbox :checkbox');Woohoo.set.formTime(selector+' .form-control.time input');Woohoo.set.formTimeSelect(selector+' .form-control.time select');Woohoo.set.formDate(selector+' .form-control.date input');Woohoo.set.formSpin(selector+' .form-control-spin');Woohoo.set.formPhone(selector+' .form-control.phone input');Woohoo.set.formNumber(selector+' .form-control.number input, .form-control.price input');Woohoo.set.formTC(selector+' .form-control.tc input');Woohoo.set.formSelect(selector+' .form-control.select select, '+selector+' .form-control.time select');Woohoo.set.formSelectChange(selector+' .form-control.select select, '+selector+' .form-control.time select')};Woohoo.act={};Woohoo.ready=function(){Woohoo.setFormControls("body");if($.validator){Woohoo.validatedFormCount=0;$('[data-ride="validate"]').each(function(){var $form=$(this),id=$form.attr('id')||$form.attr('id','ValidatedForm_'+(++Woohoo.validatedFormCount)).attr('id');if(validateHelper){validateHelper.validate($form);validateHelper.setValidationSubmit('#'+id+' .btn-submit','#'+id,function(trigger,form){Woohoo.preloader(trigger);trigger.attr('disabled',true);$(form).unbind().submit()},function(trigger,form){})}})}Woohoo.console=(function(){if(!Woohoo.debugMode){return{settings:{},line:0,logs:{},log:function(){},prepend:function(){},append:function(){},clear:function(){},format:function(){},writeLog:function(){}}}else{return{settings:{command:Woohoo.is.mobile?'prepend':'append'},line:0,logs:(function(){var $JSConsole=$('#JSConsole');var $JSConsoleLogs=$('.logs',$JSConsole);var $JSConsoleTrigger=$('.trigger',$JSConsole);if(!$JSConsole.length){$body.append('<div id="JSConsole" class="js-console">'+'<div class="inner-wrap">'+'<div class="content">'+'<h2 class="heading">JS Console</h2>'+'<div class="logs">'+'</div>'+'</div>'+'</div>'+'<a class="trigger" href="javascript:;">Open JS Console</a>'+'</div>');$JSConsole=$('#JSConsole');$JSConsoleLogs=$('.logs',$JSConsole);$JSConsoleTrigger=$('.trigger',$JSConsole);$JSConsoleTrigger.click(function(){$JSConsole.toggleClass('in')})}return $JSConsoleLogs})(),format:function(log){return'<p><span class="line-number">'+(++this.line)+'</span> '+log+'</p>'},writeLog:function(log){if(!Woohoo.debugMode){return false}switch(this.settings.command){case'append':this.append(log);break;case'prepend':this.prepend(log);break}},log:function(log){var logger=this;var type=typeof log;if(log===null){type='null'}switch(type){case'object':$.each(log,function(k,v){logger.writeLog(k+' -> '+v)});break;case'array':$.each(log,function(k,v){this.writeLog(v)});break;default:this.writeLog(log);break}},clear:function(){this.logs.empty()},append:function(log){this.logs.append(this.format(log))},prepend:function(log){this.logs.prepend(this.format(log))}}}})();Woohoo.act.rideRetinaImages=function(){if($.isFunction($.fn.retina)){$('img[data-retina]').retina({dataRetina:true,suffix:"",checkIfImageExists:false,customFileNameCallback:"",overridePixelRation:false})}};Woohoo.act.rideRetinaImages();$doc.on('focus','input, textarea, select',function(){$html.addClass('has-focus');Woohoo.currentscrollpos=$win.scrollTop()});$doc.on('blur','input, textarea, select',function(){$html.removeClass('has-focus');if($html.is('.iPhone')||$html.is('.iPad')){setTimeout(function(){$("html, body").animate({scrollTop:Woohoo.currentscrollpos+1},0)},300)}});Woohoo.getDate=function(selector){var $input=$(selector),result=null;;if($input.length){if(Woohoo.is.desktop){result=$input.datepicker('getDate')}else if($input.data("label")){result=Woohoo.strToDate($input.data("label").text())}}return result?result:''};Woohoo.alert=function(options,alertType){var types=["warn","error","info"],temp=options,justMessage=typeof temp==="string",$element=justMessage?$(temp):$();if(!$.isPlainObject(options)||justMessage)options={};if(typeof alertType!=="undefined"&&types.indexOf(alertType)!=-1)options.type=alertType;var o=$.extend({type:"warn",extraClass:"",title:"Hata!",content:justMessage?temp:"Hata: W01"},options);if($(".modal.alert").length){o.content=o.content.stripHtmlTags();alert(o.content)}else{var $alert=$('<div class="modal modal-alert fade '+o.type+(o.extraClass!=""?" "+o.extraClass:"")+'">'+'<div class="modal-dialog">'+'<div class="modal-content"> '+'<button type="button" class="close" data-dismiss="modal" aria-label="Kapat"></button>'+'<div class="modal-header"><h2 class="modal-title">'+o.title+'</h2></div>'+'<div class="modal-body">'+o.content+'</div>'+'<div class="modal-footer">'+'<button class="btn btn-warning mr-5" data-dismiss="modal" aria-label="İptal Et"><span>İPTAL ET</span></button>'+'<button id="alertOk" class="btn btn-default ml-5"><span>ONAYLA</span></button>'+'</div>'+'</div>'+'</div>'+'<div class="modal-backdrop"></div>'+'</div>').appendTo("body").bind({"show.bs.modal":function(){},"shown.bs.modal":function(){if($html.hasClass("touch")){$(document).bind({touchmove:function(e){e.stopPropagation();return false}})}},"hide.bs.modal":function(){},"hidden.bs.modal":function(){$alert.unbind("show.bs.modal, shown.bs.modal, hide.bs.modal, hidden.bs.modal").remove();$(document).unbind("touchmove")}}).modal({show:true,keyboard:true,backdrop:false});$alert.find("#alertOk").on("click",function(e){e.stopPropagation();alert("işlem başlıyor");$(".modal.modal-alert").modal("hide");return false})}};if(!Modernizr.input.placeholder){$('input[placeholder!=""], textarea[placeholder!=""]').each(function(){var $input=$(this),placeholder=$input.attr('placeholder');$input.val(placeholder).addClass('has-placeholder').on({focus:function(){if($input.val()===placeholder){$input.val('').removeClass('has-placeholder')}},blur:function(){if($input.val()===''){$input.val(placeholder).addClass('has-placeholder')}}})})}};$doc.ready(function(){Woohoo.ready()});$win.load(function(){window.loaded=true;$html.addClass('window-load-done')});$win.resize(function(){});window.onerror=function(error,url,line){if(!Woohoo.debugMode){return false}var filename=url.substring(url.lastIndexOf('/')+1,url.lastIndexOf('.'));var filenameWithExtention=url.substring(url.lastIndexOf('/')+1);var message='Bir Javascript hatası ile karşılaşıldı. '+'\n\nHata:\n'+error+''+'\n\nDosya:\n'+filenameWithExtention+''+'\n\nSatır:\n'+line+'';alert(message)}})(jQuery,document,window)