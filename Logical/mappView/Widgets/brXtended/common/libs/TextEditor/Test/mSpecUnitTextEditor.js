'use strict';
define(['brTest',
    'widgets/brXtended/common/libs/TextEditor/TextEditor',
    'widgets/brXtended/common/libs/TextEditor/Test/MockedKeyboard',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'],
function ({ appElem }, TextEditor, MockedKeyboard) {
  
    return {

        suite: function () {

            var element, textEditor, textEditorConfig,
                mocks = {
                    onModified: function () { /*console.log('onModified');*/ },
                    onToggleBreakPoint: function () { /*console.log('onToggleBreakpoint');*/ }
                };

            m.describe(true, 'Unit Test suite - INFO - Some test needs focus functionality,' +
                ' which means that you need to take the focus out of DevTools;' +
                ' Click on the document one time and run the test again if failing', function () {

                beforeEach(function () {
                    element = $('<div id="TE_WidgetMock" style="height:400px;width:400px;top:0px;left:0px"></div>')
                        .appendTo(appElem);
                });

                afterEach(function () {
                    if (textEditor.dispose !== undefined) {
                        textEditor.dispose();
                    }
                    element.remove();
                    textEditorConfig = undefined;
                });

                m.describe(true, ' INIT of the object', function () {

                    m.it(true, ' No element ', function () {
                        textEditor = new TextEditor(textEditorConfig);
                        expect(textEditor.editor).toEqual(undefined);
                    });

                    m.it(true, ' No options ', function () {
                        textEditorConfig = {
                            element: element[0]
                        };
                        textEditor = new TextEditor(textEditorConfig);
                        expect(textEditor.editor).not.toEqual(undefined);
                        expect(textEditor.getMode()).toEqual('plain');
                        expect(textEditor.getOnModified().name).toEqual('dummyOnModified');
                        expect(textEditor.isEnabled()).toEqual(true);
                        expect(textEditor.getKeyboard()).toEqual(false);
                        expect(textEditor.getShowLineNumber()).toEqual(true);
                    });

                    m.it(true, ' Full options ', function () {
                        textEditorConfig = {
                            element: element[0],
                            mode: 'gcode',
                            onModified: mocks.onModified,
                            onToggleBreakPoint: mocks.onToggleBreakPoint,
                            disabled: true,
                            Keyboard: MockedKeyboard,
                            showLineNumber: false
                        };
                        textEditor = new TextEditor(textEditorConfig);
                        expect(textEditor.editor).not.toEqual(undefined);
                        expect(textEditor.getMode()).toEqual('gcode');
                        expect(textEditor.getOnModified().toString()).toEqual(mocks.onModified.toString());
                        expect(textEditor.isEnabled()).toEqual(false);
                        expect(textEditor.getKeyboard()).toEqual(true);
                        expect(textEditor.getShowLineNumber()).toEqual(false);
                    });

                });

                m.describe(true, ' Interaction ', function () {

                    m.describe(true, ' Input API : setValue ', function () {

                        m.it(true, ' The default text should be empty', function () {
                            textEditorConfig = {
                                element: element[0],
                                mode: 'gcode',
                                onModified: mocks.onModified,
                                onToggleBreakPoint: mocks.onToggleBreakPoint,
                                disabled: true,
                                Keyboard: MockedKeyboard,
                                showLineNumber: false
                            };
                            textEditor = new TextEditor(textEditorConfig);
                            expect(textEditor.getValue()).toEqual('');
                        });

                        m.it(true, ' After setting some text the text editor should have it', function () {
                            textEditorConfig = {
                                element: element[0],
                                mode: 'gcode',
                                onModified: mocks.onModified,
                                onToggleBreakPoint: mocks.onToggleBreakPoint,
                                disabled: true,
                                Keyboard: MockedKeyboard,
                                showLineNumber: false
                            };
                            textEditor = new TextEditor(textEditorConfig);
                            textEditor.setValue('Test Text', false);
                            expect(textEditor.getValue()).toEqual('Test Text');
                        });

                    });

                    m.describe(true, ' Input Soft Keyboard', function () {

                        m.describe(true, ' Open functionality', function () {

                            m.it(true, ' Focus on the element should open the keyboard - if keyboard configured', function () {
                                textEditorConfig = {
                                    element: element[0],
                                    mode: 'gcode',
                                    onModified: mocks.onModified,
                                    onToggleBreakPoint: mocks.onToggleBreakPoint,
                                    disabled: false,
                                    Keyboard: MockedKeyboard,
                                    showLineNumber: false
                                };
                                textEditor = new TextEditor(textEditorConfig);
                                spyOn(textEditor, 'openKeyboard').and.callThrough();
                                textEditor.editor.focus();
                                expect(textEditor.openKeyboard).toHaveBeenCalled();
                            });

                            m.it(true, ' Focus on the element should NOT open the keyboard - if NO keyboard configured', function () {
                                textEditorConfig = {
                                    element: element[0],
                                    mode: 'gcode',
                                    onModified: mocks.onModified,
                                    onToggleBreakPoint: mocks.onToggleBreakPoint,
                                    disabled: false,
                                    Keyboard: undefined,
                                    showLineNumber: false
                                };
                                textEditor = new TextEditor(textEditorConfig);
                                spyOn(textEditor, 'openKeyboard').and.callThrough();
                                textEditor.editor.focus();
                                expect(textEditor.openKeyboard).not.toHaveBeenCalled();
                            });

                            m.it(true, ' Keyboard open should have a callback onKeyboardInput', function () {
                                textEditorConfig = {
                                    element: element[0],
                                    mode: 'gcode',
                                    onModified: mocks.onModified,
                                    onToggleBreakPoint: mocks.onToggleBreakPoint,
                                    disabled: false,
                                    Keyboard: MockedKeyboard,
                                    showLineNumber: false
                                };
                                textEditor = new TextEditor(textEditorConfig);
                                spyOn(textEditor, 'openKeyboard').and.callThrough();
                                textEditor.editor.focus();
                                expect(textEditor.openKeyboard).toHaveBeenCalled();
                                expect(textEditor.keyboard.callback).toEqual(textEditor.boundOnKeyboardInput);
                            });

                        });

                        m.describe(true, ' Close functionality', function () {

                            m.it(true, ' Blur on the element should close the keyboard', function () {
                                textEditorConfig = {
                                    element: element[0],
                                    mode: 'gcode',
                                    onModified: mocks.onModified,
                                    onToggleBreakPoint: mocks.onToggleBreakPoint,
                                    disabled: false,
                                    Keyboard: MockedKeyboard,
                                    showLineNumber: false
                                };
                                textEditor = new TextEditor(textEditorConfig);
                                spyOn(textEditor, 'openKeyboard').and.callThrough();
                                spyOn(textEditor, 'closeKeyboard').and.callThrough();
                                textEditor.editor.focus();
                                expect(textEditor.openKeyboard).toHaveBeenCalled();
                                textEditor.editor.blur();
                                expect(textEditor.closeKeyboard).toHaveBeenCalled();
                            });

                            m.it(true, ' A closed keyboard should not have the callback for keyboard input', function () {
                                textEditorConfig = {
                                    element: element[0],
                                    mode: 'gcode',
                                    onModified: mocks.onModified,
                                    onToggleBreakPoint: mocks.onToggleBreakPoint,
                                    disabled: false,
                                    Keyboard: MockedKeyboard,
                                    showLineNumber: false
                                };
                                textEditor = new TextEditor(textEditorConfig);
                                spyOn(textEditor, 'openKeyboard').and.callThrough();
                                spyOn(textEditor, 'closeKeyboard').and.callThrough();
                                textEditor.editor.focus();
                                expect(textEditor.openKeyboard).toHaveBeenCalled();
                                expect(textEditor.keyboard.callback).toEqual(textEditor.boundOnKeyboardInput);
                                textEditor.editor.blur();
                                expect(textEditor.closeKeyboard).toHaveBeenCalled();
                                expect(textEditor.keyboard.callback).toEqual(undefined);
                            });

                        });

                        m.describe(true, ' Input character/commands', function () {

                            m.it(true, ' An open keyboard can insert a character', function () {
                                textEditorConfig = {
                                    element: element[0],
                                    mode: 'gcode',
                                    onModified: mocks.onModified,
                                    onToggleBreakPoint: mocks.onToggleBreakPoint,
                                    disabled: false,
                                    Keyboard: MockedKeyboard,
                                    showLineNumber: false
                                };
                                textEditor = new TextEditor(textEditorConfig);
                                spyOn(textEditor, 'openKeyboard').and.callThrough();
                                textEditor.editor.focus();
                                expect(textEditor.openKeyboard).toHaveBeenCalled();
                                textEditor.keyboard.simulateInput({
                                    data: {
                                        action: 'insertCharacter',
                                        args: ['A']
                                    }
                                });
                                expect(textEditor.getValue()).toEqual('A');
                            });

                            m.it(true, ' Backspace should remove the last character', function () {
                                textEditorConfig = {
                                    element: element[0],
                                    mode: 'gcode',
                                    onModified: mocks.onModified,
                                    onToggleBreakPoint: mocks.onToggleBreakPoint,
                                    disabled: false,
                                    Keyboard: MockedKeyboard,
                                    showLineNumber: false
                                };
                                textEditor = new TextEditor(textEditorConfig);
                                spyOn(textEditor, 'openKeyboard').and.callThrough();
                                textEditor.editor.focus();
                                expect(textEditor.openKeyboard).toHaveBeenCalled();
                                textEditor.keyboard.simulateInput({
                                    data: {
                                        action: 'insertCharacter',
                                        args: ['A']
                                    }
                                });
                                expect(textEditor.getValue()).toEqual('A');
                                textEditor.keyboard.simulateInput({
                                    data: {
                                        action: 'backspace',
                                        args: []
                                    }
                                });
                                expect(textEditor.getValue()).toEqual('');
                            });

                            m.it(true, ' Undo should show the last text', function () {
                                textEditorConfig = {
                                    element: element[0],
                                    mode: 'gcode',
                                    onModified: mocks.onModified,
                                    onToggleBreakPoint: mocks.onToggleBreakPoint,
                                    disabled: false,
                                    Keyboard: MockedKeyboard,
                                    showLineNumber: false
                                };
                                textEditor = new TextEditor(textEditorConfig);
                                spyOn(textEditor, 'openKeyboard').and.callThrough();
                                textEditor.editor.focus();
                                expect(textEditor.openKeyboard).toHaveBeenCalled();
                                textEditor.keyboard.simulateInput({
                                    data: {
                                        action: 'insertCharacter',
                                        args: ['A']
                                    }
                                });
                                expect(textEditor.getValue()).toEqual('A');
                                textEditor.keyboard.simulateInput({
                                    data: {
                                        action: 'undo',
                                        args: []
                                    }
                                });
                                expect(textEditor.getValue()).toEqual('');
                            });

                            m.it(true, ' Undo should NOT show the last text after a setValue', function () {
                                textEditorConfig = {
                                    element: element[0],
                                    mode: 'gcode',
                                    onModified: mocks.onModified,
                                    onToggleBreakPoint: mocks.onToggleBreakPoint,
                                    disabled: false,
                                    Keyboard: MockedKeyboard,
                                    showLineNumber: false
                                };
                                textEditor = new TextEditor(textEditorConfig);
                                textEditor.setValue('This is a text', true);
                                expect(textEditor.getValue()).toEqual('This is a text');
                                spyOn(textEditor, 'openKeyboard').and.callThrough();
                                textEditor.editor.focus();
                                expect(textEditor.openKeyboard).toHaveBeenCalled();
                                textEditor.keyboard.simulateInput({
                                    data: {
                                        action: 'undo',
                                        args: []
                                    }
                                });
                                expect(textEditor.getValue()).toEqual('This is a text');
                            });

                        });

                        m.describe(true, ' Search/Replace dialog interaction', function () {

                            m.it(true, ' Search/Replace dialog should open when triggering command', function () {
                                textEditorConfig = {
                                    element: element[0],
                                    mode: 'gcode',
                                    onModified: mocks.onModified,
                                    onToggleBreakPoint: mocks.onToggleBreakPoint,
                                    disabled: false,
                                    Keyboard: MockedKeyboard,
                                    showLineNumber: false
                                };
                                textEditor = new TextEditor(textEditorConfig);
                                spyOn(textEditor, 'openKeyboard').and.callThrough();
                                textEditor.editor.focus();
                                expect(textEditor.openKeyboard).toHaveBeenCalled();
                                textEditor.keyboard.simulateInput({
                                    data: {
                                        action: 'find',
                                        args: []
                                    }
                                });
                                expect(textEditor.editor.searchBox.active).toEqual(true);
                            });

                            m.it(true, ' Backspace should not remove text on editor when searchBox is focused', function () {
                                textEditorConfig = {
                                    element: element[0],
                                    mode: 'gcode',
                                    onModified: mocks.onModified,
                                    onToggleBreakPoint: mocks.onToggleBreakPoint,
                                    disabled: false,
                                    Keyboard: MockedKeyboard,
                                    showLineNumber: false
                                };
                                textEditor = new TextEditor(textEditorConfig);
                                textEditor.setValue('This is a test.', false);
                                spyOn(textEditor, 'openKeyboard').and.callThrough();
                                textEditor.editor.focus();
                                expect(textEditor.openKeyboard).toHaveBeenCalled();
                                textEditor.keyboard.simulateInput({
                                    data: {
                                        action: 'find',
                                        args: []
                                    }
                                });
                                textEditor.keyboard.simulateInput({
                                    data: {
                                        action: 'backspace',
                                        args: []
                                    }
                                });
                                expect(textEditor.editor.searchBox.active).toEqual(true);
                                expect(textEditor.editor.searchBox.isFocused()).toEqual(true);
                                expect(textEditor.getValue()).toEqual('This is a test.');
                            });

                            m.it(true, ' Backspace should remove the text from the searchBox when focused', function () {
                                textEditorConfig = {
                                    element: element[0],
                                    mode: 'gcode',
                                    onModified: mocks.onModified,
                                    onToggleBreakPoint: mocks.onToggleBreakPoint,
                                    disabled: false,
                                    Keyboard: MockedKeyboard,
                                    showLineNumber: false
                                };
                                textEditor = new TextEditor(textEditorConfig);
                                spyOn(textEditor, 'openKeyboard').and.callThrough();
                                textEditor.editor.focus();
                                expect(textEditor.openKeyboard).toHaveBeenCalled();
                                textEditor.keyboard.simulateInput({
                                    data: {
                                        action: 'find',
                                        args: []
                                    }
                                });
                                expect(textEditor.editor.searchBox.active).toEqual(true);
                                expect(textEditor.editor.searchBox.isFocused()).toEqual(true);
                                textEditor.keyboard.simulateInput({
                                    data: {
                                        action: 'insertCharacter',
                                        args: ['a']
                                    }
                                });
                                expect(textEditor.editor.searchBox.activeInput.value).toEqual('a');
                                textEditor.keyboard.simulateInput({
                                    data: {
                                        action: 'backspace',
                                        args: []
                                    }
                                });
                                expect(textEditor.editor.searchBox.activeInput.value).toEqual('');
                                textEditor.keyboard.simulateInput({
                                    data: {
                                        action: 'insertCharacter',
                                        args: ['a']
                                    }
                                });
                                expect(textEditor.editor.searchBox.activeInput.value).toEqual('a');
                                textEditor.keyboard.simulateInput({
                                    data: {
                                        action: 'insertCharacter',
                                        args: ['b']
                                    }
                                });
                                expect(textEditor.editor.searchBox.activeInput.value).toEqual('ab');
                                textEditor.editor.searchBox.activeInput.setSelectionRange(1, 1);
                                textEditor.keyboard.simulateInput({
                                    data: {
                                        action: 'backspace',
                                        args: []
                                    }
                                });
                                expect(textEditor.editor.searchBox.activeInput.value).toEqual('b');
                            });

                            m.it(true, ' Delete should remove the text from the searchBox when focused', function () {
                                textEditorConfig = {
                                    element: element[0],
                                    mode: 'gcode',
                                    onModified: mocks.onModified,
                                    onToggleBreakPoint: mocks.onToggleBreakPoint,
                                    disabled: false,
                                    Keyboard: MockedKeyboard,
                                    showLineNumber: false
                                };
                                textEditor = new TextEditor(textEditorConfig);
                                spyOn(textEditor, 'openKeyboard').and.callThrough();
                                textEditor.editor.focus();
                                expect(textEditor.openKeyboard).toHaveBeenCalled();
                                textEditor.keyboard.simulateInput({
                                    data: {
                                        action: 'find',
                                        args: []
                                    }
                                });
                                expect(textEditor.editor.searchBox.active).toEqual(true);
                                expect(textEditor.editor.searchBox.isFocused()).toEqual(true);
                                textEditor.keyboard.simulateInput({
                                    data: {
                                        action: 'insertCharacter',
                                        args: ['a']
                                    }
                                });
                                expect(textEditor.editor.searchBox.activeInput.value).toEqual('a');
                                textEditor.editor.searchBox.activeInput.setSelectionRange(0, 0);
                                textEditor.keyboard.simulateInput({
                                    data: {
                                        action: 'del',
                                        args: []
                                    }
                                });
                                expect(textEditor.editor.searchBox.activeInput.value).toEqual('');
                                textEditor.keyboard.simulateInput({
                                    data: {
                                        action: 'insertCharacter',
                                        args: ['a']
                                    }
                                });
                                expect(textEditor.editor.searchBox.activeInput.value).toEqual('a');
                                textEditor.keyboard.simulateInput({
                                    data: {
                                        action: 'insertCharacter',
                                        args: ['b']
                                    }
                                });
                                expect(textEditor.editor.searchBox.activeInput.value).toEqual('ab');
                                textEditor.editor.searchBox.activeInput.setSelectionRange(1, 1);
                                textEditor.keyboard.simulateInput({
                                    data: {
                                        action: 'del',
                                        args: []
                                    }
                                });
                                expect(textEditor.editor.searchBox.activeInput.value).toEqual('a');
                            });

                            m.it(true, ' Backspace should remove the text from editor when searchBox is open but not focused', function () {
                                textEditorConfig = {
                                    element: element[0],
                                    mode: 'gcode',
                                    onModified: mocks.onModified,
                                    onToggleBreakPoint: mocks.onToggleBreakPoint,
                                    disabled: false,
                                    Keyboard: MockedKeyboard,
                                    showLineNumber: false
                                };
                                textEditor = new TextEditor(textEditorConfig);
                                textEditor.editor.setValue('A', false);
                                spyOn(textEditor, 'openKeyboard').and.callThrough();
                                textEditor.editor.focus();
                                expect(textEditor.openKeyboard).toHaveBeenCalled();
                                textEditor.keyboard.simulateInput({
                                    data: {
                                        action: 'find',
                                        args: []
                                    }
                                });
                                expect(textEditor.editor.searchBox.active).toEqual(true);
                                expect(textEditor.editor.searchBox.isFocused()).toEqual(true);
                                textEditor.keyboard.simulateInput({
                                    data: {
                                        action: 'insertCharacter',
                                        args: ['a']
                                    }
                                });
                                expect(textEditor.editor.searchBox.activeInput.value).toEqual('a');
                                textEditor.editor.focus();
                                expect(textEditor.editor.searchBox.active).toEqual(true);
                                expect(textEditor.editor.searchBox.isFocused()).toEqual(false);
                                textEditor.keyboard.simulateInput({
                                    data: {
                                        action: 'backspace',
                                        args: []
                                    }
                                });
                                expect(textEditor.getValue()).toEqual('');
                                expect(textEditor.editor.searchBox.activeInput.value).toEqual('a');
                            });

                        });

                    });
                });
            });
        }
    };
});
