define(function () {

    'use strict';
        
    var specList = {
     
        widgetNames: {            
        },
        properties: {
            run: true,
            defaultView: {                
                run: true,
                expect: {
                    height: 'auto',
                    heightInPX: '0px',
                    width: 'auto',
                    widthInPX: '0px'
                },
                img: {
                    run: true,
                    expect: {                        
                        display: 'none',
                        draggable: 'false'
                    }
                },
                svg: {
                    run: true,
                    expect: {
                        display: 'none'
                    }
                },
                helperspan: {
                    run: true,
                    expect: {
                        display: 'none'
                    }
                }
            },
            imageTypeInvalid: {                
                run: true,                
                img: {
                    run: true,
                    expect: {                        
                        display: 'inline',
                        src: ''
                    }
                },
                svg: {
                    run: true,
                    expect: {
                        display: 'none'
                    }
                },
                helperspan: {
                    run: true,
                    expect: {
                        display: 'none'
                    }
                }
            },
            imageTypeSvg: {                
                run: true,                
                img: {
                    run: true,
                    expect: {                        
                        display: 'none',
                        src: ''
                    }
                },
                svg: {
                    run: true,
                    imagePath: 'projects/UnitTest/img/img1.svg',
                    expect: {
                        display: 'inline'
                    }
                },
                helperspan: {
                    run: true,
                    expect: {
                        display: 'none'
                    }
                }
            },
            imageTypeOther: {                
                run: true,                
                img: {
                    run: true,
                    imagePath: 'projects/UnitTest/img/bild1.jpg',
                    expect: {                        
                        display: 'inline',
                        src: 'projects/UnitTest/img/bild1.jpg'
                    }
                },
                svg: {
                    run: true,
                    imagePath: 'projects/UnitTest/img/img1.svg',
                    expect: {
                        display: 'none'
                    }
                },
                helperspan: {
                    run: true,
                    expect: {
                        display: 'none'
                    }
                }
            }
        },
        ReUseConfigFromOldImage: {
            run: true,
            defaultImageView: {
                expect: {
                    src: null
                }
            },
            imageJPGImageView: {
                setup: {
                    image: 'projects/UnitTest/img/bild1.jpg',
                    type: 'other'
                },
                expect: {
                    src: 'projects/UnitTest/img/bild1.jpg'
                }
            }

        }

    };

    return specList;

});
