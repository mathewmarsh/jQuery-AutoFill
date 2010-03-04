/*
* Auto-Fill Plugin
* Written by Joe Sak 
* Website: http://www.joesak.com/
* Article: http://www.joesak.com/2008/11/19/a-jquery-function-to-auto-fill-input-fields-and-clear-them-on-click/
* GitHub: http://github.com/joemsak/jQuery-AutoFill
*/
(function($){
	$.fn.autofill=function(options){
		var defaults={
			value:'First Name',
			toValue:'',
			defaultTextColor:"#666",
			activeTextColor:"#333"};
			
			
			var options=$.extend(defaults,options);
			return this.each(function(){
				var obj=$(this);
				var pfield = (obj.attr('type')=='password');
				var p_obj = false;
				if(pfield){
					obj.hide();
					obj.after('<input type="text" id="'+this.id+'_autofill" class="'+$(this).attr('class')+'" />');
					p_obj = obj;
					obj = obj.next();
				} 
				
				 obj.css({color:options.defaultTextColor})
					.val(options.value);

				 obj.focus(function(){
						if(obj.val()==options.value){
							if(pfield) {
								obj.hide();
								p_obj.show()
								.focus()
							}
							obj.val(options.toValue)
							.css({color:options.activeTextColor});
						}
					})
					.blur(function(){
						if(obj.val()==options.toValue || obj.val() == ''){
							obj.css({color:options.defaultTextColor})
							.val(options.value);
						}
					});
					if(p_obj && p_obj.length > 0){
						p_obj.blur(function(){
							if(p_obj.val()==""){
								p_obj.hide();
								obj.show()
								.css({color:options.defaultTextColor})
								.val(options.value);
							}
						});
					}
				});
			};
		})(jQuery);