'use strict';
define(['brTest',
    'widgets/brXtended/common/libs/redux/view/ImageView/ImageView'], 
function ({ appElem, appView }, ImageView) {

    describe('widgets.brXtended.common.libs.redux.view.ImageView', function () {   

        beforeAll(function () {
            //this.skipCleanup = true;
            this.parent = $('<div class="parent"></div>').appendTo(appElem);
        });
            
        afterEach(function () {
            this.view.dispose();
        });

        describe('with #param-config.image="projects/UnitTest/img/bild1.jpg"', function () {
            let src = 'projects/UnitTest/img/bild1.jpg';
            beforeEach(function () {
                this.view = new ImageView({
                    image: src
                }, this.parent);
                this.imgEl = this.parent.find('img');
            });
            it('should add img tag to parent', function () {
                expect(this.imgEl).toHaveSize(1);
            });
            it('should add img tag with src=config.image', function () {
                expect(this.imgEl.attr('src')).toEqual(src);
            });
        });

        describe('with #param-config.image="projects/UnitTest/svg/test.svg"', function () {
            let src = 'projects/UnitTest/svg/test.svg';
            beforeEach(async function () {
                this.view = new ImageView({
                    image: src
                }, this.parent);
                await this.view.imageDeferred;
                this.imgEl = this.parent.find('svg');
            });
            it('should add svg tag to parent', function () {
                expect(this.imgEl).toHaveSize(1);
            });
            it('should add svg tag with class="brease-test-library"', function () {
                expect(this.imgEl).toHaveClass('brease-test-library');
            });
        });

        describe('with #param-config.image="projects/UnitTest/svg/test.svg"', function () {
            let src = 'projects/UnitTest/svg/test.svg';
            describe('and #param-config.notStyleable=true', function () {
                beforeEach(async function () {
                    this.view = new ImageView({
                        image: src,
                        notStyleable: true
                    }, this.parent);
                    this.imgEl = this.parent.find('img');
                });
                it('should add img tag to parent', function () {
                    expect(this.imgEl).toHaveSize(1);
                }); 
                it('should add img tag with src=config.image', function () {
                    expect(this.imgEl.attr('src')).toEqual(src);
                });
            });
        });

        afterAll(function () {
            appView.empty();
        });
    });

});
