'use strict';
define([
    'widgets/brXtended/common/libs/NativeScroller',
    'widgets/brease/common/Test/CommonTestUtils',
    'brTest'
], function (NativeScroller, CommonTestUtils, { appElem, appView }) {

    describe('widgets.brXtended.common.libs.NativeScroller', function () {
        var container, scrollWrapper, nativeScroller, mockedTime = 0;
        beforeEach(function () {
            mockedTime = 0;
            return CommonTestUtils.core.asyncAnimationFrame(function () {
                appView.css({ position: 'relative', 'height': '500px' });
                container = $('<div></div>').css({ position: 'absolute', width: '200px', height: '200px', 'max-width': '200px', 'max-height': '200px', 'overflow': 'scroll', background: 'yellow' }).get(0);
                scrollWrapper = $('<div></div>').css({ position: 'relative', width: '500px', height: '500px', background: 'blue' }).get(0);
                container.appendChild(scrollWrapper);
                appElem.appendChild(container);
            }).then(function () {
                nativeScroller = new NativeScroller();
                nativeScroller.init(container);
            });
        });
        afterEach(function () {
            nativeScroller.dispose();
            appElem.removeChild(container);
            CommonTestUtils.cleanup();
        });
        describe('#behavior-userinteraction', function () {
            beforeEach(function () {
                spyOn(nativeScroller, '_getTime').and.callFake(() => {
                    mockedTime += 100;
                    return mockedTime;
                });
            });
            it('should scroll horizontally when moving the cursor from right to left', function () {
                return CommonTestUtils.core.asyncAnimationFrame(function () {
                    moveContainerBy(50, -10, 50, 0);
                }).then(function () {
                    expect(container.scrollLeft).toBeGreaterThan(0);
                });
            });
            it('should not exceed the horizontal boundaries when scrolling horizontally', function () {
                return CommonTestUtils.core.asyncAnimationFrame(function () {
                    moveContainerBy(50, -500, 50, 0);
                }).then(function () {
                    expect(container.scrollLeft).toBeLessThan(500);
                });
            });
            it('should not scroll horizontally when moving the cursor from right to left while pressing the right mouse button', function () {
                return CommonTestUtils.core.asyncAnimationFrame(function () {
                    moveContainerBy(50, -10, 50, 0, { button: 2 });
                }).then(function () {
                    expect(container.scrollLeft).toEqual(0);
                });
            });
            it('should not scroll horizontally when moving the cursor from right to left with a distance of < 10px and more than 300ms have ellapsed', function () {
                return CommonTestUtils.core.asyncAnimationFrame(function () {
                    moveContainerBy(50, 0, 50, 0);
                    mockedTime += 200;
                    moveContainerBy(50, -5, 50, 0);
                }).then(function () {
                    expect(container.scrollLeft).toEqual(0);
                });
            });
            it('should scroll horizontally when moving the cursor from left to right', function () {
                return CommonTestUtils.core.asyncAnimationFrame(function () {
                    container.scrollLeft = 10;
                    moveContainerBy(50, 10, 50, 0);
                }).then(function () {
                    expect(container.scrollLeft).toEqual(0);
                });
            });
            it('should not scroll horizontally when moving the cursor from left to right while pressing the right mouse button', function () {
                return CommonTestUtils.core.asyncAnimationFrame(function () {
                    container.scrollLeft = 10;
                    moveContainerBy(50, 10, 50, 0, { button: 2 });
                }).then(function () {
                    expect(container.scrollLeft).toBeCloseTo(10, 0);
                });
            });
            it('should not scroll horizontally when moving the cursor from bottom to top with a distance of more than 5px and from left to right', function () {
                return CommonTestUtils.core.asyncAnimationFrame(function () {
                    let clientRect = container.getBoundingClientRect();
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mousedown', 50, 50, clientRect);
                    mockedTime = 0;
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mousemove', 50, 40, clientRect);
                    mockedTime = 0;
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mousemove', 40, 40, clientRect);
                    mockedTime = 0;
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mouseup', 40, 40, clientRect);
                }).then(function () {
                    expect(container.scrollLeft).toEqual(0);
                });
            });
            it('should scroll vertically when moving the cursor from top to bottom', function () {
                return CommonTestUtils.core.asyncAnimationFrame(function () {
                    container.scrollTop = 10;
                    moveContainerBy(50, 0, 50, 10);
                }).then(function () {
                    expect(container.scrollTop).toEqual(0);
                });
            });
            it('should not scroll vertically when moving the cursor from top to bottom while pressing the right mouse button', function () {
                return CommonTestUtils.core.asyncAnimationFrame(function () {
                    container.scrollTop = 10;
                    moveContainerBy(50, 0, 50, 10, { button: 2 });
                }).then(function () {
                    expect(container.scrollTop).toBeCloseTo(10, 0);
                });
            });
            it('should scroll vertically when moving the cursor from bottom to top', function () {
                return CommonTestUtils.core.asyncAnimationFrame(function () {
                    moveContainerBy(50, 0, 50, -10);
                }).then(function () {
                    expect(container.scrollTop).toBeGreaterThan(0);
                });
            });
            it('should not exceed the vertical boundaries when scrolling vertically', function () {
                return CommonTestUtils.core.asyncAnimationFrame(function () {
                    moveContainerBy(50, 0, 50, -500);
                }).then(function () {
                    expect(container.scrollTop).toBeLessThan(500);
                });
            });
            it('should not scroll vertically when moving the cursor from bottom to top while pressing the right mouse button', function () {
                return CommonTestUtils.core.asyncAnimationFrame(function () {
                    moveContainerBy(50, 0, 50, -10, { button: 2 });
                }).then(function () {
                    expect(container.scrollTop).toEqual(0);
                });
            });
            it('should not scroll vertically when moving the cursor from bottom to top with a distance of < 10px and more than 300ms have ellapsed', function () {
                return CommonTestUtils.core.asyncAnimationFrame(function () {
                    moveContainerBy(50, 0, 50, 0);
                    mockedTime += 200;
                    moveContainerBy(50, 0, 50, -1);
                }).then(function () {
                    expect(container.scrollTop).toEqual(0);
                });
            });
            it('should not scroll vertically when moving the cursor from left to right with a distance of more than 5px and from bottom to top', function () {
                return CommonTestUtils.core.asyncAnimationFrame(function () {
                    let clientRect = container.getBoundingClientRect();
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mousedown', 50, 50, clientRect);
                    mockedTime = 0;
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mousemove', 60, 50, clientRect);
                    mockedTime = 0;
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mousemove', 60, 40, clientRect);
                    mockedTime = 0;
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mouseup', 60, 40, clientRect);
                }).then(function () {
                    expect(container.scrollTop).toEqual(0);
                });
            });
            it('should not scroll vertically when disabled', function () {
                return CommonTestUtils.core.asyncAnimationFrame(function () {
                    nativeScroller.internal.enabled = false;
                    let clientRect = container.getBoundingClientRect();
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mousedown', 50, 50, clientRect);
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mousemove', 50, 50, clientRect);
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mousemove', 50, 40, clientRect);
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mouseup', 50, 40, clientRect);
                }).then(function () {
                    expect(container.scrollTop).toEqual(0);
                });
            });
            it('should not scroll vertically when disabled after mousedown', function () {
                return CommonTestUtils.core.asyncAnimationFrame(function () {
                    let clientRect = container.getBoundingClientRect();
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mousedown', 50, 50, clientRect);
                    nativeScroller.internal.enabled = false;
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mousemove', 50, 50, clientRect);
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mousemove', 50, 40, clientRect);
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mouseup', 50, 40, clientRect);
                }).then(function () {
                    expect(container.scrollTop).toEqual(0);
                });
            });
            it('should scroll vertically when disabled after mousemove', function () {
                return CommonTestUtils.core.asyncAnimationFrame(function () {
                    let clientRect = container.getBoundingClientRect();
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mousedown', 50, 50, clientRect);
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mousemove', 50, 50, clientRect);
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mousemove', 50, 40, clientRect);
                    nativeScroller.internal.enabled = false;
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mouseup', 50, 40, clientRect);
                }).then(function () {
                    expect(container.scrollTop).toBeGreaterThan(0);
                });
            });
            it('should not scroll horizontally when disabled', function () {
                return CommonTestUtils.core.asyncAnimationFrame(function () {
                    nativeScroller.internal.enabled = false;
                    let clientRect = container.getBoundingClientRect();
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mousedown', 50, 50, clientRect);
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mousemove', 50, 50, clientRect);
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mousemove', 40, 50, clientRect);
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mouseup', 40, 50, clientRect);
                }).then(function () {
                    expect(container.scrollLeft).toEqual(0);
                });
            });
            it('should not scroll horizontally when disabled after mousedown', function () {
                return CommonTestUtils.core.asyncAnimationFrame(function () {
                    let clientRect = container.getBoundingClientRect();
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mousedown', 50, 50, clientRect);
                    nativeScroller.internal.enabled = false;
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mousemove', 50, 50, clientRect);
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mousemove', 40, 50, clientRect);
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mouseup', 40, 50, clientRect);
                }).then(function () {
                    expect(container.scrollLeft).toEqual(0);
                });
            });
            it('should scroll horizontally when disabled after mousemove', function () {
                return CommonTestUtils.core.asyncAnimationFrame(function () {
                    let clientRect = container.getBoundingClientRect();
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mousedown', 50, 50, clientRect);
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mousemove', 50, 50, clientRect);
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mousemove', 40, 50, clientRect);
                    nativeScroller.internal.enabled = false;
                    CommonTestUtils.ui.triggerMouseEvent(container, 'mouseup', 40, 50, clientRect);
                }).then(function () {
                    expect(container.scrollLeft).toBeGreaterThan(0);
                });
            });
        });

        describe('#method-scrollToElement', () => {
            let childs = [];
            beforeEach(() => {
                for (let i = 0; i < 10; i++) {
                    let child = $('<div></div>').css({ position: 'relative', width: '400px', height: '100px', background: 'green', margin: '3px' }).get(0);
                    child.textContent = i;
                    childs.push(child);
                    scrollWrapper.appendChild(child);
                }
                return CommonTestUtils.core.asyncAnimationFrame();
            });
            afterEach(() => {
                childs = [];
            });
            it('should scroll vertically to child element', async function () {
                let idx = 4;
                nativeScroller.scrollToElement(childs[idx], 0, 0, 0);
                await CommonTestUtils.core.asyncAnimationFrame();
                // n-elems * height + n-elems * margin
                expect(container.scrollTop).toBeCloseTo(idx * 100 + idx * 3, 0);
            });
            it('should scroll vertically to child element with #param-offsetY="23"', async function () {
                let idx = 4;
                nativeScroller.scrollToElement(childs[idx], 0, 0, 23);
                await CommonTestUtils.core.asyncAnimationFrame();
                // n-elems * height + n-elems * margin + offset
                expect(container.scrollTop).toBeCloseTo(idx * 100 + idx * 3 + 23, 0);
            });
            it('should scroll vertically to child element and center with #param-offsetY="true"', async function () {
                let idx = 4;
                nativeScroller.scrollToElement(childs[idx], 0, 0, true);
                await CommonTestUtils.core.asyncAnimationFrame();
                // n-elems * height + n-elems * margin - height / 2
                expect(container.scrollTop).toBeCloseTo(idx * 100 + idx * 3 - 100 / 2, 0);
            });
        });
        
        function moveContainerBy(startX, deltaX, startY, deltaY, eventInitDict = {}) {
            let clientRect = container.getBoundingClientRect();
            CommonTestUtils.ui.triggerMouseEvent(container, 'mousedown', startX, startY, clientRect, eventInitDict);
            CommonTestUtils.ui.triggerMouseEvent(container, 'mousemove', startX, startY, clientRect, eventInitDict);
            CommonTestUtils.ui.triggerMouseEvent(container, 'mousemove', startX + deltaX, startY + deltaY, clientRect, eventInitDict);
            CommonTestUtils.ui.triggerMouseEvent(container, 'mouseup', startX + deltaX, startY + deltaY, clientRect, eventInitDict);
        }
    });
});
