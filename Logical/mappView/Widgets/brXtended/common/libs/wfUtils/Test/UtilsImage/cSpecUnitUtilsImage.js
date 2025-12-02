define([], function () {

    var specList = {
        getInlineSvg: {
            run: true,
            brokenSvg: '<svg style="width: 20px; height:23px"><line x1="3.75" y1="-0.069449" x2="0.75" y2="23" stroke="#b2b2b2" stroke-width="1.5"></line><line x1="23" y1="22.25" x2="0" y2="22.25" stroke="#666666" stroke-width="1.5"></line><line x1="22.521265" y1="3.787241" x2="22.521265" y2="16.808505" stroke="#666666" stroke-width="1.5"></line><line x1="19.25" y1="5.202132" x2="19.25" y2="23" stroke="#666666" stroke-width="1.5"></line><rect height="3.339856" width="15.40424" x="2.297881" y="17.436729" stroke="#00bf00" stroke-width="1.5" fill="#00bf00"></rect><rect height="7.914511" width="14.553177" x="2.808519" y="8.01064" stroke="#97c9fc" stroke-width="2.5" fill="#97c9fc"></rect><rect height="3.489358" width="8.51063" x="2.808518" y="2.563837" stroke="#97c9fc" stroke-width="2.5" fill="#97c9fc"></rect><ellipse rx="1.548673" ry="0.309735" cx="5.840707" cy="5.615045" stroke="#ffffff" stroke-width="1.5"></ellipse><ellipse rx="7.743362" ry="2.964602" cx="10.088495" cy="16.676991" stroke="#00bf00" stroke-width="1.5" fill="#00bf00"></ellipse><line x1="21.814158" y1="12.207965" x2="7.743362" y2="25.039822" stroke="#ffffff" stroke-width="3.5"></line><line x1="12.964601" y1="0.349558" x2="19.690264" y2="6.013275" stroke="#666666" stroke-width="1.5"></line><line x1="0" y1="0.615045" x2="13.672565" y2="0.792036" stroke="#b2b2b2" stroke-width="1.5"></line><line x1="12.964601" y1="-0.09292" x2="13.053096" y2="6.89823" stroke="#666666" stroke-width="1.5"></line><line x1="19.867255" y1="6.190266" x2="12.610619" y2="6.278761" stroke="#666666" stroke-width="1.5"></line></svg>',
            validSvg: '<svg xmlns="http://www.w3.org/2000/svg" id="Ebene_1" data-name="Ebene 1" viewBox="0 0 247.03 300"><defs><style>.cls-1{fill:#fff;}.cls-1,.cls-2,.cls-3,.cls-4,.cls-5,.cls-6,.cls-7{stroke:#000;stroke-miterlimit:10;}.cls-2{fill:#f66;}.cls-3{fill:none;}.cls-5{fill:red;}.cls-6{fill:#fcc;}.cls-7{fill:#ccc;}</style></defs><title>TestSVG</title><polygon class="cls-1" points="0.53 19.5 7.53 102.5 20.53 165.5 24.53 253.5 91.53 299.5 155.53 299.5 223.53 263.5 229.53 164.5 246.53 96.5 246.53 13.5 204.53 0.5 43.53 0.5 0.53 19.5"/><path class="cls-2" d="M46.5,41.5c13,23,36,14,36,14l30,12-8.53,10-8.47,10-30-2-21-20Z" transform="translate(-9.97 -2)"/><path class="cls-2" d="M225.5,41.5c-13,23-36,14-36,14l-30,12,17,20,30-2,21-20Z" transform="translate(-9.97 -2)"/><polyline class="cls-3" points="102.53 100.5 82.53 168.5 168.53 168.5 142.53 100.5"/><path class="cls-3" d="M102.5,170.5s16.64-16,20.82,0" transform="translate(-9.97 -2)"/><path class="cls-3" d="M165.7,170.5s-18.19-15-20.2,0" transform="translate(-9.97 -2)"/><polygon class="cls-4" points="50.53 33.5 115.53 62.5 110.53 48.5 56.53 16.5 50.53 33.5"/><polygon class="cls-4" points="201.53 33.5 136.53 62.5 141.53 48.5 195.53 16.5 201.53 33.5"/><polygon class="cls-5" points="158.14 75.63 172.53 70.5 183.53 84.37 166.53 85.5 158.14 75.63"/><polygon class="cls-5" points="93.53 75.5 77.53 70.5 68.53 84.37 85.53 85.5 93.53 75.5"/><polygon class="cls-6" points="29.53 186.5 85.53 208.5 163.53 208.5 210.53 186.5 191.53 236.5 149.53 249.5 111.53 249.5 100.53 249.5 53.53 236.5 50.53 230.25 29.53 186.5"/><polygon class="cls-7" points="50.53 230.5 61.53 219.5 73.53 222.5 73.53 242.03 82.53 223.5 88.4 246.15 95.53 227.5 100.53 225.5 102.53 228.5 110.53 226.5 113.53 227.5 115.53 249.5 122.53 229.5 127.53 230.5 125.53 234.5 129.53 234.5 129.53 231.5 132.53 230.5 135.53 249.5 145.53 230.5 153.61 248.24 158.53 228.5 170.83 242.91 170.53 224.5 180.53 223.5 188.42 237.46 188.53 221.5 197.23 221.49 191.53 236.5 149.53 249.5 100.53 249.5 53.53 236.5 50.53 230.5"/><polygon class="cls-7" points="41.76 191.3 48.53 209.5 58.24 197.78 61.53 215.5 72.55 203.4 74.53 217.5 85.53 217.5 86.86 208.5 96.53 221.5 110.53 221.5 113.53 209.5 115.53 221.5 119.53 221.5 121.53 217.5 123.53 217.5 125.53 221.5 128.53 221.5 128.53 208.5 136.53 221.5 143.81 208.5 149.53 221.5 158.14 208.5 161.53 221.5 170.53 219.5 170.53 205.22 177.53 217.5 183.53 213.5 183.53 199.14 193.53 211.5 195.56 193.51 164.53 206.5 125.53 206.5 96.53 206.5 77.53 203.5 41.76 191.3"/></svg>',
            validSvgPath: 'widgets/brXtended/common/libs/wfUtils/Test/UtilsImage/TestSVG.svg',
            validSvgPath2: 'widgets/brXtended/common/libs/wfUtils/Test/UtilsImage/TestSVG2.svg',
            consoleException: {
                run: true
            },
            imageMissing: {
                run: true
            },
            imageNotMissing: {
                run: true
            }
        }

    };

    return specList;
});
