define(['widgets/brXtended/common/libs/SVGUtils'],
    function (SVGUtils) {
        'use strict';

        describe('widgets.brXtended.common.libs.SVGUtils', function () {
            describe('#method-importToSVGNamespace', () => {
                describe('while #param-elem is an instance of Element', () => {
                    let documentFragment;
                    let testElem;
                    [
                        { value: 'path' },
                        { value: 'g' },
                        { value: 'svg' }
                    ].forEach((test) => {
                        beforeEach(() => {
                            documentFragment = document.createDocumentFragment();
                            testElem = document.createElement(test.value);
                            documentFragment.appendChild(testElem);
                        });
                        it('should return an element with #property-namespaceURI = "http://www.w3.org/2000/svg"', () => {
                            expect(SVGUtils.importToSVGNamespace(testElem).namespaceURI).toEqual('http://www.w3.org/2000/svg');
                        });
                    });

                    describe('and contains child elements', () => {
                        let template;
                        beforeEach(() => {
                            documentFragment = document.createDocumentFragment();
                            template = document.createElement('template');
                            template.innerHTML = `<g id="content_1_BarChartItem2" class="barWidget breaseWidget visible editMode breaseBarChartItem widgets_brease_BarChartItem_style_default" data-brease-widget="widgets/brease/BarChartItem" style="position:relative;"><defs><clipPath id="content_1_BarChartItem2_clipPath"><rect height="115" width="300" y="145" x="45"></rect></clipPath></defs><rect class="bar" clip-path="url(/some/url)" height="115" width="300" y="145" x="45"></rect><text class="valueText" y="140" x="195" dominant-baseline="ideographic" text-anchor="middle">50</text></g>`;
                            documentFragment.appendChild(template.content.cloneNode(true));
                            testElem = documentFragment.querySelector('g');
                        });
                        it('should return an element with #property-namespaceURI = "http://www.w3.org/2000/svg"', () => {
                            expect(SVGUtils.importToSVGNamespace(testElem).namespaceURI).toEqual('http://www.w3.org/2000/svg');
                        });
                        it('should return an element with the same id', () => {
                            expect(SVGUtils.importToSVGNamespace(testElem).id).toEqual(template.content.firstElementChild.id);
                        });
                        it('should return an element with the same css classes', () => {
                            expect(SVGUtils.importToSVGNamespace(testElem).classList).toEqual(template.content.firstElementChild.classList);
                        });
                        it('should return an element with the same attributes', () => {
                            expect(SVGUtils.importToSVGNamespace(testElem).getAttribute('data-brease-widget')).toEqual(template.content.firstElementChild.getAttribute('data-brease-widget'));
                        });
                        it('should return an element with the same inline styles', () => {
                            expect(SVGUtils.importToSVGNamespace(testElem).getAttribute('style')).toEqual(template.content.firstElementChild.getAttribute('style'));
                        });
                        it('should return an element with the same html content', () => {
                            expect(SVGUtils.importToSVGNamespace(testElem).outerHTML).toHaveSize(template.innerHTML.length);
                        });
                        [
                            { selector: 'rect' },
                            { selector: 'clipPath' },
                            { selector: 'defs' },
                            { selector: 'text' },
                            { selector: '.valueText' },
                            { selector: '.bar' }
                        ].forEach((test) => {
                            it(`should return an element where #method-querySelector(${test.selector}) returns a valid element`, () => {
                                expect(SVGUtils.importToSVGNamespace(testElem).querySelector(test.selector)).not.toBeNull();
                            });
                        });
                    });
                });
                describe('while #param-elem does not implement the Element interface', () => {
                    [
                        { value: null },
                        { value: undefined },
                        { value: 'hello' },
                        { value: 1 },
                        { value: true }
                    ].forEach((test) => {
                        it('should return the unmodified value', () => {
                            expect(SVGUtils.importToSVGNamespace(test.value)).toEqual(test.value);
                        });
                    });
                });
            });
        });
    });
