/*
*	Editor
*
*/

var Editor = function() { 
	this.initEditor();
	this.self = this;

}


Editor.prototype.initEditor = function() { 
	var editor = ace.edit("editor");
	this.editor = editor;
	var session = editor.getSession();
	this.session = session;
	session.setMode("ace/mode/javascript");

	ace.require("ace/lib/fixoldbrowsers");
	var config = ace.require("ace/config");
	ace.require("ace/edit_session");
	ace.require("ace/undomanager");
   	ace.require("ace/marker");
   	ace.require("ace/range");
 

	var dom = ace.require("ace/lib/dom");
	var net = ace.require("ace/lib/net");
	var lang = ace.require("ace/lib/lang");
	var useragent = ace.require("ace/lib/useragent");
	var Range = ace.require('ace/range').Range;
	var event = ace.require("ace/lib/event");
	var theme = ace.require("ace/theme/textmate");
	//editor.setTheme("ace/theme/chrome");

	var renderer = editor.renderer;

	session.setWrapLimitRange(null, null);
    renderer.setShowPrintMargin = null; 

	editor.setPrintMarginColumn(false);
	editor.setFontSize(14);
	renderer.setPadding(8);

	//------------------------------------------------- 
	//keybinding 

	//save
	editor.commands.addCommand({
	    name: 'save_command',
	    bindKey: {
	        win: 'Ctrl-S',
	        mac: 'Ctrl-S',
	        sender: 'mmeditor'
	    },
	    exec: function(env, args, request) {
	    	currentProject.code = session.getValue();
	    	protocoder.communication.pushCode(currentProject);
	    }
	});

	//save
	editor.commands.addCommand({
	    name: 'run_command',
	    bindKey: {
	        win: 'Ctrl-R',
	        mac: 'Ctrl-R',
	        sender: 'mmeditor'
	    },
	    exec: function(env, args, request) {
	    	currentProject.code = session.getValue();
	    	protocoder.communication.pushCode(currentProject);
	    	protocoder.dashboard.removeWidgets();
	    	protocoder.communication.runApp(currentProject);

	    }
	});

	editor.commands.addCommand({
    name: "showKeyboardShortcuts",
    bindKey: {win: "Ctrl-Alt-h", mac: "Command-Alt-h"},
    exec: function(editor) {
        config.loadModule("ace/ext/keybinding_menu", function(module) {
            module.init(editor);
            editor.showKeyboardShortcuts()
        })
    }
	});

 
	editor.commands.addCommand({
    name: "snippet",
    bindKey: {win: "Alt-C", mac: "Command-Alt-C"},
    exec: function(editor, needle) {
        if (typeof needle == "object") {
            editor.cmdLine.setValue("snippet ", 1);
            editor.cmdLine.focus();
            return;
        }
        var s = snippetManager.getSnippetByName(needle, editor);
        if (s)
            snippetManager.insertSnippet(editor, s.content);
    },
    readOnly: true
	});

	 
	editor.commands.addCommand({
    name: "increaseFontSize",
    bindKey: "Ctrl-+",
    exec: function(editor) {
        var size = parseInt(editor.getFontSize(), 10) || 12;
        editor.setFontSize(size + 1);
    }
	});

	 
	editor.commands.addCommand({
    name: "decreaseFontSize",
    bindKey: "Ctrl+-",
    exec: function(editor) {
        var size = parseInt(editor.getFontSize(), 10) || 12;
        editor.setFontSize(Math.max(size - 1 || 1));
    }
	});

	//save
	editor.commands.addCommand({
	    name: '',
	    bindKey: {
	        win: 'Ctrl-Q',
	        mac: 'Ctrl-Q',
	        sender: 'mmeditor'
	    },
	    exec: function(env, args, request) {

			var range = editor.getSelection().getRange(); 
	    	var selectedText = session.getTextRange(range); 

	    	//get the code selected or the whole row 
	    	if (selectedText.length > 0) { 
	    		protocoder.communication.executeCode(selectedText);
	    		protocoder.editor.highlight(range);

	    	} else { 
	    		var cursorPosition = editor.getCursorPosition();
	    		var numLine = cursorPosition['row'];

	    		currentLine = session.getDocument().$lines[numLine]; 
	    		var range_line = new Range(numLine, 0, numLine, currentLine.length);
			

	    		if (currentLine.length > 0) { 
	    			console.log("the text is " + currentLine);
	    			protocoder.communication.executeCode(currentLine);
	    			protocoder.editor.highlight(range_line);
	    		}

	    	}
	    }
	});



}


Editor.prototype.highlight = function(range) { 
	var self = this;
	var marker = self.session.addMarker( range, "run_code", "fullLine" );

	setTimeout(function() { 
		self.session.removeMarker(marker);
	}, 500); 
}


Editor.prototype.showErrors = function () { 
	this.session.setAnnotations([{row:1 ,column: 0, text: "message",type:"error"}]); 
}


//set Code 
Editor.prototype.setCode = function (code) { 
	this.session.setValue(code); 
}

