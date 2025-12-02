define(function () {

    var specList = {
        initialization: {
            run: true,
            description: 'When creating a new Instance all the provided functions should be available (\u00BBsetImage\u00AB , \u00BBcreateSvgTag\u00AB , \u00BBcreateImgTag\u00AB , \u00BBcreateImgSvgTags\u00AB)'
        },
        setImage: {
            run: true,
            description: 'When calling the setImage function, the callback function should be called when the image is loaded/resolved (png, svg)',
            svg: {
                description: 'Check if everything works as expected when calling with svg',
                image: 'widgets/brXtended/common/libs/Test/ImageHandlingTest/Alarm.svg'
            },
            png: {
                description: 'Check if everything works as expected when calling with png',
                image: 'widgets/brXtended/common/libs/Test/ImageHandlingTest/mappView.png'
            }
        },
        createImgTag: {
            run: true,
            description: 'When calling the createImgTag function, the Img-Tag should be returned with the class remove'
        },
        createSvgTag: {
            run: true,
            description: 'When calling the createSvgTag function, the Svg-Tag should be returned with the class remove'
        },
        createImgSvgTags: {
            run: true,
            description: 'When calling the createImgSvgTag function, an Object including the Img-Tag & Svg-Tag should be returned with the class remove'
        }
    };

    return specList;

});
