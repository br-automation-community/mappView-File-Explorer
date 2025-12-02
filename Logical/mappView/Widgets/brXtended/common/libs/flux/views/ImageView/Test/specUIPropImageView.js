'use strict';
define([
    'brTest',
    'widgets/brXtended/common/libs/flux/views/ImageView/ImageView',
    'widgets/brXtended/common/libs/wfUtils/UtilsImage',
    'widgets/brXtended/common/libs/flux/mocks/MockedStore',
    'widgets/brXtended/common/libs/flux/views/ImageView/Test/UIPropTest/cSpecUIPropImageView',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'
], function ({ TestUtils, appView }, ImageView, UtilsImage, MockedStore, cSpecUIProp) {

    var defaultView, mockedDispatcher, getOption, setOption,
        widgetmock = {
            el: $('<div id="widget_Image" style="display:flex"></div>')
        };                               

    describe('widgets.brXtended.common.libs.flux.views.ImageView', function () {   

        beforeAll(function () {
            appView.css({ 
                width: 'initial', 
                height: '300px', 
                position: 'absolute', 
                transform: 'none', 
                top: '0px', 
                left: '0px' 
            }).append(widgetmock.el);
        });

        describe('General properties', function () {

            describe('\u00BBTest BaseView\u00AB', function () {

                beforeAll(function () {
                    var mockedStore = new MockedStore();
                    defaultView = new ImageView(mockedStore, mockedDispatcher, widgetmock.el);
                });

                afterAll(function () {
                    defaultView.el.remove();
                });

                it(' \u00BBImageView Div\u00AB default imageView should have height & width \u00BB' +
                    cSpecUIProp.properties.defaultView.expect.width + '\u00AB if the elements are created', function () {

                    getOption = defaultView.el.css('width');
                    setOption = cSpecUIProp.properties.defaultView.expect.widthInPX;
                    expect(getOption).toBe(setOption);
                    getOption = defaultView.el[0].style.width;
                    setOption = cSpecUIProp.properties.defaultView.expect.width;
                    expect(getOption).toBe(setOption);

                    getOption = defaultView.el.css('height');
                    setOption = cSpecUIProp.properties.defaultView.expect.heightInPX;
                    expect(getOption).toBe(setOption);
                    getOption = defaultView.el[0].style.height;
                    setOption = cSpecUIProp.properties.defaultView.expect.height;
                    expect(getOption).toBe(setOption);
                });

                it(' \u00BBSvg\u00AB default svg tag should have display \u00BB' +
                    cSpecUIProp.properties.defaultView.svg.expect.display + '\u00AB if the elements are created', function () {

                    getOption = defaultView.el.find('svg').css('display');
                    setOption = cSpecUIProp.properties.defaultView.svg.expect.display;
                    expect(getOption).toBe(setOption);
                });

                it(' \u00BBHelper Span\u00AB default helper span should have display \u00BB' +
                    cSpecUIProp.properties.defaultView.helperspan.expect.display + '\u00AB if the elements are created', function () {
                    getOption = defaultView.el.find('.helper').css('display');
                    setOption = cSpecUIProp.properties.defaultView.helperspan.expect.display;
                    expect(getOption).toBe(setOption);
                });
            
            });

            describe('\u00BBImageType \u00AB', function () {

                var promiseSvgImage;

                describe('\u00BBinvalid\u00AB', function () {

                    beforeAll(function () {
                        var mockedStore = new MockedStore();
                        mockedStore.state.type = 'invalid';
                        defaultView = new ImageView(mockedStore, mockedDispatcher, widgetmock.el);
                        mockedStore.registerView(defaultView);
                        mockedStore.dispatchAction();
                    });

                    afterAll(function () {
                        defaultView.el.remove();
                    });

                    it(' \u00BBImage\u00AB default img span with type: invalid should have img src \u00BB' +
                        cSpecUIProp.properties.imageTypeInvalid.img.expect.src + '\u00AB and display \u00BB' +
                        cSpecUIProp.properties.imageTypeInvalid.img.expect.display + '\u00AB', function () {

                        getOption = defaultView.el.css('background-image');
                        expect(getOption).toBe('none');
                    });

                    it(' \u00BBSvg\u00AB default img span with type: invalid should have display \u00BB' +
                        cSpecUIProp.properties.imageTypeInvalid.svg.expect.display + '\u00AB', function () {

                        getOption = defaultView.el.find('svg').css('display');
                        setOption = cSpecUIProp.properties.imageTypeInvalid.svg.expect.display;
                        expect(getOption).toBe(setOption);
                    });

                    it(' \u00BBHelper span\u00AB default helper span with type: invalid should have display \u00BB' +
                        cSpecUIProp.properties.imageTypeInvalid.svg.expect.display + '\u00AB', function () {

                        getOption = defaultView.el.find('.helper').css('display');
                        setOption = cSpecUIProp.properties.imageTypeInvalid.helperspan.expect.display;
                        expect(getOption).toBe(setOption);
                    });

                });

                describe('\u00BBsvg\u00AB', function () {

                    var svgInline;

                    beforeAll(async function () {
                        var mockedStore;
                        
                        mockedStore = new MockedStore();
                        promiseSvgImage = UtilsImage.getInlineSvg(cSpecUIProp.properties.imageTypeSvg.svg.imagePath);
                       
                        await promiseSvgImage.then(function (svgElement) {
                            mockedStore.state.svgInline = svgElement; //set the SvgInline
                            svgInline = svgElement;
                        });

                        mockedStore.state.type = 'svg';
                        mockedStore.state.sizeMode = 'fill';
                        defaultView = new ImageView(mockedStore, mockedDispatcher, widgetmock.el);
                        mockedStore.registerView(defaultView);
                        mockedStore.dispatchAction();
                    });

                    afterAll(function () {
                        defaultView.el.remove();
                    });

                    it(' \u00BBImage\u00AB default img span with type: svg should have img src \u00BB' +
                        cSpecUIProp.properties.imageTypeSvg.img.expect.display + '\u00AB', function () {
                                                                
                        getOption = defaultView.el.css('background-image');
                        setOption = cSpecUIProp.properties.imageTypeSvg.img.expect.display;
                        expect(getOption).toBe(setOption);
                    });

                    it(' \u00BBSvg\u00AB default img span with type: svg should have display \u00BB' +
                        cSpecUIProp.properties.imageTypeSvg.svg.expect.display + '\u00AB and the html of the svg image \u00BB' +
                        cSpecUIProp.properties.imageTypeSvg.svg.imagePath + '\u00AB', function () {

                        getOption = defaultView.el.find('svg').css('display');
                        setOption = cSpecUIProp.properties.imageTypeSvg.svg.expect.display;
                        expect(getOption).toBe(setOption);

                        getOption = (defaultView.el.find('svg').html());
                        expect(getOption).toBe(svgInline.html());
                    });

                    it(' \u00BBHelper span\u00AB default helper span with type: svg should have display \u00BB' +
                        cSpecUIProp.properties.imageTypeSvg.helperspan.expect.display + '\u00AB', function () {

                        getOption = defaultView.el.find('.helper').css('display');
                        setOption = cSpecUIProp.properties.imageTypeSvg.helperspan.expect.display;
                        expect(getOption).toBe(setOption);
                    });

                });

                describe('\u00BBother\u00AB', function () {

                    beforeAll(async function () {
                        TestUtils.addSpyStrategy('callThroughAndThen');
                        return new Promise(function (resolve) {
                            var mockedStore = new MockedStore();
                            mockedStore.state.type = 'other';
                            mockedStore.state.sizeMode = 'fill';
                            mockedStore.state.actualImage = cSpecUIProp.properties.imageTypeOther.img.imagePath;
                            defaultView = new ImageView(mockedStore, mockedDispatcher, widgetmock.el);  
                            TestUtils.spyOnCallThroughAndThen(defaultView, '_readjustImageSize', resolve);
                            mockedStore.dispatchAction();
                        });
                    });

                    afterAll(function () {
                        defaultView.el.remove();
                    });

                    it(' \u00BBImage\u00AB default img span with type: other should have img src \u00BB' +
                        cSpecUIProp.properties.imageTypeOther.img.expect.src + '\u00AB', function () {
                        getOption = defaultView.el.css('background-image');
                        expect(getOption).toContain(cSpecUIProp.properties.imageTypeOther.img.expect.src);
                    });

                    it(' \u00BBSvg\u00AB default svg span with type: other should have display \u00BB' +
                        cSpecUIProp.properties.imageTypeOther.svg.expect.display + '\u00AB', function () {
                        getOption = defaultView.el.find('svg').css('display');
                        setOption = cSpecUIProp.properties.imageTypeOther.svg.expect.display;
                        expect(getOption).toBe(setOption);
                    });

                    it(' \u00BBHelper span\u00AB default helper span with type: other should have display \u00BB' +
                        cSpecUIProp.properties.imageTypeOther.svg.expect.display + '\u00AB', function () {
                        getOption = defaultView.el.find('.helper').css('display');
                        setOption = cSpecUIProp.properties.imageTypeOther.helperspan.expect.display;
                        expect(getOption).toBe(setOption);
                    });
                });
            });

            describe('\u00BBSizeMode\u00AB', function () {

                var promiseSvgImage;                  

                describe('\u00BBsvg\u00AB', function () {
                    var mockedStore;
                    beforeEach(async function () {

                        mockedStore = new MockedStore();
                        promiseSvgImage = UtilsImage.getInlineSvg(cSpecUIProp.properties.imageTypeSvg.svg.imagePath);
                            
                        await promiseSvgImage.then(function (svgElement) {
                            mockedStore.state.svgInline = svgElement; //set the SvgInline
                        });                                    
                        mockedStore.state.type = 'svg';
                        defaultView = new ImageView(mockedStore, mockedDispatcher, widgetmock.el);
                        mockedStore.registerView(defaultView);
                        mockedStore.dispatchAction();
                    });

                    afterEach(function () {
                        defaultView.el.remove();
                    });

                    it(' \u00BBContain\u00AB default svg tag should have the attribute height: \u00BB100%\u00AB and width: \u00BB100%\u00AB and the attribute preserveAspectRatio: \u00BBxMinYMin\u00AB', function () {
                        // contain is the default SizeMode

                        expect(defaultView.el.find('svg')[0].getAttribute('height')).toBe('100%');
                        expect(defaultView.el.find('svg')[0].getAttribute('width')).toBe('100%');
                        expect(defaultView.el.find('svg')[0].getAttribute('preserveAspectRatio')).toBe('xMinYMin');// because alignment is [left top]
                    });

                    it(' \u00BBCover\u00AB default svg tag should have the attribute height less-than \u00BB200\u00AB and width greater-than: \u00BB310\u00AB and the attribute preserveAspectRatio: \u00BBxMinYMin\u00AB', function () {
                        mockedStore.state.sizeMode = 'cover';
                        mockedStore.dispatchAction();
                        // size of svg depends on font-size if parent has auto ..looks like some browser thing... so we just use less than
                        expect(parseFloat(defaultView.el.find('svg')[0].getAttribute('height'))).toBeLessThan(200);
                        expect(parseFloat(defaultView.el.find('svg')[0].getAttribute('width'))).toBeGreaterThan(310);
                        expect(defaultView.el.find('svg')[0].getAttribute('preserveAspectRatio')).toBe('xMinYMin');
                    });

                    it(' \u00BBFill\u00AB default svg tag should have the attribute height: \u00BB100%\u00AB and width: \u00BB100%\u00AB and the attribute preserveAspectRatio: \u00BBnone\u00AB', function () {
                        mockedStore.state.sizeMode = 'fill';
                        mockedStore.dispatchAction();

                        expect(defaultView.el.find('svg')[0].getAttribute('height')).toBe('100%');
                        expect(defaultView.el.find('svg')[0].getAttribute('width')).toBe('100%');
                        expect(defaultView.el.find('svg')[0].getAttribute('preserveAspectRatio')).toBe('none');
                    });
                });

                describe('\u00BBother\u00AB', function () {

                    var mockedStore;
                    beforeEach(function () {
                        TestUtils.addSpyStrategy('callThroughAndThen');
                        return new Promise(function (resolve) {
                            mockedStore = new MockedStore();
                            mockedStore.state.type = 'other'; 
                            mockedStore.state.actualImage = cSpecUIProp.properties.imageTypeOther.img.imagePath;
                            defaultView = new ImageView(mockedStore, mockedDispatcher, widgetmock.el);
                            TestUtils.spyOnCallThroughAndThen(defaultView, '_readjustImageSize', resolve);
                            mockedStore.dispatchAction();
                        });
                    });

                    afterEach(function () {
                        defaultView.el.remove();
                    });

                    it(' \u00BBcontain\u00AB default img tag should have the attribute height: \u00BBauto\u00AB and width: \u00BB100%\u00AB', function () {
                        expect(defaultView.el.css('background-size')).toBe('contain');                                
                    });

                    it(' \u00BBCover\u00AB default img tag should have the attribute height: \u00BBauto\u00AB and width: \u00BB100%\u00AB', function () { 
                        mockedStore.state.sizeMode = 'cover';
                        mockedStore.dispatchAction();                                   
                    
                        expect(defaultView.el.css('background-size')).toBe('cover');                             
                    });

                    it(' \u00BBfill\u00AB default img tag should have the attribute height: \u00BB100%\u00AB and width: \u00BB100%\u00AB', function () {
                        mockedStore.state.sizeMode = 'fill';
                        mockedStore.dispatchAction();
                        expect(defaultView.el.css('background-size')).toBe('100% 100%'); 
                    });
                });

            });

            describe('\u00BBBackgroundAlignment\u00AB', function () {

                describe('\u00BBsvg\u00AB', function () {

                    var mockedStore;
                    beforeEach(async function () {

                        mockedStore = new MockedStore();
                            
                        await UtilsImage.getInlineSvg(cSpecUIProp.properties.imageTypeSvg.svg.imagePath)
                            .then(function (svgElement) {
                                mockedStore.state.svgInline = svgElement; //set the SvgInline
                            });

                        mockedStore.state.type = 'svg';
                        defaultView = new ImageView(mockedStore, mockedDispatcher, widgetmock.el);
                        mockedStore.registerView(defaultView);
                        mockedStore.dispatchAction();
                    });

                    afterEach(function () {
                        defaultView.el.remove();
                    });

                    it(" \u00BB['left', 'top']\u00AB default svg tag should have the the attribute preserveAspectRatio: \u00BBxMinYMin\u00AB", function () {
                        // ['left', 'top'] is the default BackgroundAlignment
                        expect(defaultView.el.find('svg')[0].getAttribute('preserveAspectRatio')).toBe('xMinYMin');
                    });

                    it(" \u00BB['right', 'top']\u00AB default svg tag should have the the attribute preserveAspectRatio: \u00BBxMinYMax\u00AB", function () {

                        mockedStore.state.backgroundAlignment = ['right', 'top'];
                        mockedStore.dispatchAction();

                        expect(defaultView.el.find('svg')[0].getAttribute('preserveAspectRatio')).toBe('xMaxYMin');
                    });

                    it(" \u00BB['center', 'center']\u00AB default svg tag should have the the attribute preserveAspectRatio: \u00BBxMidYMid\u00AB", function () {

                        mockedStore.state.backgroundAlignment = ['center', 'center'];
                        mockedStore.dispatchAction();

                        expect(defaultView.el.find('svg')[0].getAttribute('preserveAspectRatio')).toBe('xMidYMid');
                    });

                });

                describe('\u00BBother\u00AB', function () {

                    var mockedStore;
                    beforeEach(function () {
                        mockedStore = new MockedStore();
                        mockedStore.state.type = 'other';
                        mockedStore.state.actualImage = cSpecUIProp.properties.imageTypeOther.img.imagePath;
                        defaultView = new ImageView(mockedStore, mockedDispatcher, widgetmock.el);
                        mockedStore.dispatchAction();
                    });

                    afterEach(function () {
                        defaultView.el.remove();
                    });

                    it(" \u00BB['left', 'bottom']\u00AB default div tag should have css background-position: \u00BBleft\u00AB \u00BBbottom\u00AB", function () {

                        mockedStore.state.backgroundAlignment = ['left', 'bottom'];
                        mockedStore.dispatchAction();
                        
                        expect(defaultView.el.get(0).style['background-position']).toBe('left bottom');
                    });

                    it(" \u00BB['right', 'center']\u00AB default div tag should have css background-position: \u00BBright\u00AB \u00BBcenter\u00AB", function () {

                        mockedStore.state.backgroundAlignment = ['right', 'center'];
                        mockedStore.dispatchAction();

                        expect(defaultView.el.get(0).style['background-position']).toBe('right center');
                    });

                    it(" \u00BB['center', 'top']\u00AB default div tag should have css background-position: \u00BBcenter\u00AB  \u00BBtop\u00AB", function () {

                        mockedStore.state.backgroundAlignment = ['center', 'top'];
                        mockedStore.dispatchAction();

                        expect(defaultView.el.get(0).style['background-position']).toBe('center top');
                    });

                });

            });                  

            describe('\u00BBWidth & Height\u00AB', function () {

                describe('\u00BBsvg\u00AB', function () {

                    var mockedStore;
                    beforeEach(async function () {
                        mockedStore = new MockedStore();
                        await UtilsImage.getInlineSvg(cSpecUIProp.properties.imageTypeSvg.svg.imagePath)
                            .then(function (svgElement) {
                                mockedStore.state.svgInline = svgElement; //set the SvgInline
                            });
                        mockedStore.state.type = 'svg';
                        mockedStore.state.sizeMode = 'cover';
                        defaultView = new ImageView(mockedStore, mockedDispatcher, widgetmock.el);
                        mockedStore.registerView(defaultView);
                        mockedStore.dispatchAction();
                    });

                    afterEach(function () {
                        defaultView.el.remove();
                    });

                    it(' \u00BBrelation height bigger than width\u00AB default svg tag should have the the attribute height less-than: \u00BB160\u00AB less-than: \u00BB250\u00AB', function () {
                        // size of svg depends on font-size if parent has auto ..looks like some browser thing... so we just use less than
                        expect(parseFloat(defaultView.el.find('svg')[0].getAttribute('height'))).toBeLessThan(160);
                        expect(parseFloat(defaultView.el.find('svg')[0].getAttribute('width'))).toBeLessThan(250);

                        mockedStore.state.height = '90px';
                        mockedStore.dispatchAction();

                        getOption = (defaultView.el[0].style.height);
                        expect(getOption).toBe('90px');
                        getOption = (defaultView.el[0].style.width);
                        expect(getOption).toBe(mockedStore.state.width);

                        mockedStore.state.width = '260px';
                        mockedStore.dispatchAction();

                        getOption = (defaultView.el[0].style.width);
                        expect(getOption).toBe('260px');
                        getOption = (defaultView.el[0].style.height);
                        expect(getOption).toBe('90px');
                        // check the imageSize because there is a other calculation if is not (view.el.height() / view.el.width() > imageHeight / imageWidth)
                        expect(defaultView.el.find('svg')[0].getAttribute('height')).toBe('162.5');
                        expect(defaultView.el.find('svg')[0].getAttribute('width')).toBe('260');
                    });
                    
                });

                describe('\u00BBother\u00AB', function () {

                    var mockedStore;
                    beforeEach(function () {
                        TestUtils.addSpyStrategy('callThroughAndThen');
                        return new Promise(function (resolve) {
                            mockedStore = new MockedStore();
                            mockedStore.state.type = 'other';
                            mockedStore.state.actualImage = cSpecUIProp.properties.imageTypeOther.img.imagePath;
                            defaultView = new ImageView(mockedStore, mockedDispatcher, widgetmock.el);
                            TestUtils.spyOnCallThroughAndThen(defaultView, '_readjustImageSize', resolve);
                            mockedStore.dispatchAction();
                        });
                    });

                    afterEach(function () {
                        defaultView.el.remove();
                    });

                    it(' \u00BBCOVER\u00AB \u00BBrelation width bigger than height\u00AB default img tag should have the the attribute height: \u00BBauto\u00AB width: \u00BB100%\u00AB', function () {

                        mockedStore.state.sizeMode = 'cover';
                        mockedStore.dispatchAction();

                        expect(defaultView.el.css('background-size')).toBe('cover');

                        mockedStore.state.height = '20px';
                        mockedStore.dispatchAction();

                        getOption = (defaultView.el[0].style.height);
                        expect(getOption).toBe('20px');
                        getOption = (defaultView.el[0].style.width);
                        expect(getOption).toBe(mockedStore.state.width);

                        mockedStore.state.width = '260px';
                        mockedStore.dispatchAction();

                        getOption = (defaultView.el[0].style.width);
                        expect(getOption).toBe('260px');
                        getOption = (defaultView.el[0].style.height);
                        expect(getOption).toBe('20px');

                        expect(defaultView.el.css('background-size')).toBe('cover');
                    });

                    it(' \u00BBCONTAIN\u00AB \u00BBrelation width bigger than height\u00AB default img tag should have the the attribute height: \u00BB100%\u00AB width: \u00BBauto\u00AB', function () {

                        mockedStore.state.sizeMode = 'contain';
                        mockedStore.dispatchAction();

                        expect(defaultView.el.css('background-size')).toBe('contain');

                        mockedStore.state.height = '20px';
                        mockedStore.dispatchAction();

                        getOption = (defaultView.el[0].style.height);
                        expect(getOption).toBe('20px');
                        getOption = (defaultView.el[0].style.width);
                        expect(getOption).toBe(mockedStore.state.width);
                                                        
                        expect(defaultView.el.css('background-size')).toBe('contain');
                    });
                });

            });
        });

        afterAll(function () {
            appView.empty();
        });
    });

});
