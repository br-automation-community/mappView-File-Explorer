/* eslint-disable */
define({
  "mixinAttributes": [
    {
      "name": "width",
      "attribute": "width",
      "attributeInclude": "@include elemWidth($value)"
    },
    {
      "name": "height",
      "attribute": "height",
      "attributeInclude": "@include elemHeight($value)"
    },
    {
      "name": "top",
      "attribute": "top",
      "attributeInclude": "@include elemTop($value)"
    },
    {
      "name": "left",
      "attribute": "left",
      "attributeInclude": "@include elemLeft($value)"
    },
    {
      "name": "shadow",
      "attribute": "box-shadow",
      "attributeInclude": "@include box-shadow($value)"
    },
    {
      "name": "cornerRadius",
      "attribute": "border-radius",
      "attributeInclude": "@include border-radius($value)"
    },
    {
      "name": "headerBold",
      "attribute": "font-weight",
      "attributeInclude": "@include font-weight-bold($value)"
    },
    {
      "name": "headerItalic",
      "attribute": "font-style",
      "attributeInclude": "@include font-style-italic($value)"
    },
    {
      "name": "headerTextAlign",
      "attribute": "text-align",
      "attributeInclude": "@include text-alignment($value)"
    },
    {
      "name": "bold",
      "attribute": "font-weight",
      "attributeInclude": "@include font-weight-bold($value)"
    },
    {
      "name": "italic",
      "attribute": "font-style",
      "attributeInclude": "@include font-style-italic($value)"
    },
    {
      "name": "textAlign",
      "attribute": "text-align",
      "attributeInclude": "@include text-alignment($value)"
    },
    {
      "name": "backColor",
      "attribute": "background-color",
      "attributeInclude": "@include importantBackColor($value)"
    },
    {
      "name": "textColor",
      "dataType": "Styleable Property",
      "attribute": "color",
      "attributeInclude": "@include importantTextColor($value)"
    },
    {
      "name": "rotation",
      "attribute": "transform",
      "attributeInclude": "@include rotate($value)"
    },
    {
      "name": "borderWidth",
      "attribute": "stroke-width",
      "attributeInclude": "@include SVGFactorBorder($value, 2)"
    },
    {
      "name": "backGround",
      "attribute": "background",
      "attributeInclude": "@include backGroundImage('../$value')"
    },
    {
      "name": "minSize",
      "attribute": "flex-basis",
      "attributeInclude": "@include elemFlexBasis($value)"
    },
    {
      "name": "buttonCornerRadius",
      "attribute": "border-radius",
      "attributeInclude": "@include border-radius($value)"
    },
    {
      "name": "textRotation",
      "attribute": "writing-mode",
      "attributeInclude": "@include writing-mode($value)"
    },
    {
      "name": "textAlign",
      "attribute": "text-align",
      "attributeInclude": "@include text-alignment-all('$value')"
    },
    {
      "name": "underline",
      "attribute": "text-decoration",
      "attributeInclude": "@include text-decoration-underline($value)"
    },
    {
      "name": "cornerRadius",
      "attribute": "border-radius",
      "attributeInclude": "@include border-radius($value)"
    },
    {
      "name": "barCornerRadius",
      "attribute": "border-radius",
      "attributeInclude": "@include border-radius($value)"
    },
    {
      "name": "labelWidth",
      "attribute": "width",
      "attributeInclude": "@include elemWidth($value)"
    },
    {
      "name": "inputWidth",
      "attribute": "width",
      "attributeInclude": "@include elemWidth($value)"
    },
    {
      "name": "activeCornerRadius",
      "attribute": "border-radius",
      "attributeInclude": "@include border-radius($value)"
    },
    {
      "name": "evenInputCellBackColor",
      "attribute": "background-color",
      "attributeInclude": "@include active-background-color($value)"
    },
    {
      "name": "oddInputCellBackColor",
      "attribute": "background-color",
      "attributeInclude": "@include active-background-color($value)"
    },
    {
      "name": "headerBackColor",
      "attribute": "background-color",
      "attributeInclude": "@include importantBackColor($value)"
    },
    {
      "name": "headerGradient",
      "attribute": "background-image",
      "attributeInclude": "@include importantGradient($value)"
    },
    {
      "name": "headerTextColor",
      "attribute": "color",
      "attributeInclude": "@include importantTextColor($value)"
    },
    {
      "name": "oddTextColor",
      "attribute": "color",
      "attributeInclude": "@include importantTextColor($value)"
    },
    {
      "name": "evenTextColor",
      "attribute": "color",
      "attributeInclude": "@include importantTextColor($value)"
    },
    {
      "name": "itemShadow",
      "attribute": "box-shadow",
      "attributeInclude": "@include box-shadow($value)"
    },
    {
      "name": "itemCornerRadius",
      "attribute": "border-radius",
      "attributeInclude": "@include border-radius($value)"
    },
    {
      "name": "infoBoxOpacity",
      "attribute": "background-color",
      "attributeInclude": "@include backgroundOpacity($value)"
    },
    {
      "name": "sliderWidth",
      "attribute": "width",
      "attributeInclude": "@include elemWidth($value)"
    },
    {
      "name": "sliderHeight",
      "attribute": "height",
      "attributeInclude": "@include elemHeight($value)"
    },
    {
      "name": "sliderImage",
      "attribute": "background-image",
      "attributeInclude": "@include pureBackgroundImage('../$value')"
    },
    {
      "name": "controlBarCornerRadius",
      "attribute": "border-radius",
      "attributeInclude": "@include border-radius($value)"
    },
    {
      "name": "colorList",
      "attribute": "fill",
      "attributeInclude": "fill: nth(($value),$index)"
    },
    {
      "name": "importantBoldText",
      "attribute": "font-weight",
      "attributeInclude": "@include importantBoldText($value)"
    },
    {
      "name": "importantItalicText",
      "attribute": "font-style",
      "attributeInclude": "@include importantItalicText($value)"
    },
    {
      "name": "cellAlign",
      "attribute": [ "text-align", "vertical-align" ],
      "attributeInclude": "@include text-position('$value')"
    },
    {
      "name": "backGroundGradient",
      "attribute": "background-image",
      "attributeInclude": "@include backGroundGradient('$value')"
    },
    {
      "name": "borderImageGradient",
      "attribute": "border-image",
      "attributeInclude": "@include borderImageGradient('$value')"
    },
    {
      "name": "showOpenIndicatorImage",
      "attribute": "display",
      "attributeInclude": "@include display($value, 'flex')"
    },
    {
      "name": "mouseDownBackColor",
      "attribute": "background-color",
      "attributeInclude": "@include active-background-color-important($value)"
    },
    {
      "name": "mouseDownTextColor",
      "attribute": "color",
      "attributeInclude": "@include active-color($value)"
    }
  ]
});
