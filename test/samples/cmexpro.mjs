export const properties = [
  // 作为 flex 子元素相关样式
  'order',
  'flex-grow',
  'flex-shrink',
  'flex-basis',
  'flex',
  'align-self',
  // position, left, right, top, bottom, z-index
  'position',
  'top',
  'right',
  'bottom',
  'left',
  'z-index',
  // display 以及作为 flex 容器元素相关样式
  'display',
  'flex-direction',
  'flex-wrap',
  'flex-flow',
  'justify-content',
  'align-items',
  'align-content',
  // margin
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'margin-inline',
  'margin-inline-start',
  'margin-inline-end',
  'margin-block',
  'margin-block-start',
  'margin-block-end',
  // box-sizing
  'box-sizing',
  // border, border-radius
  'border',
  'border-top',
  'border-right',
  'border-bottom',
  'border-left',
  'border-width',
  'border-top-width',
  'border-right-width',
  'border-bottom-width',
  'border-left-width',
  'border-style',
  'border-top-style',
  'border-right-style',
  'border-bottom-style',
  'border-left-style',
  'border-radius',
  'border-top-right-radius',
  'border-top-left-radius',
  'border-bottom-right-radius',
  'border-bottom-left-radius',
  'border-inline',
  'border-inline-color',
  'border-inline-style',
  'border-inline-width',
  'border-inline-start',
  'border-inline-start-color',
  'border-inline-start-style',
  'border-inline-start-width',
  'border-inline-end',
  'border-inline-end-color',
  'border-inline-end-style',
  'border-inline-end-width',
  'border-block',
  'border-block-color',
  'border-block-style',
  'border-block-width',
  'border-block-start',
  'border-block-start-color',
  'border-block-start-style',
  'border-block-start-width',
  'border-block-end',
  'border-block-end-color',
  'border-block-end-style',
  'border-block-end-width',
  'border-color',
  'border-image',
  'border-image-outset',
  'border-image-repeat',
  'border-image-slice',
  'border-image-source',
  'border-image-width',
  'border-top-color',
  'border-right-color',
  'border-bottom-color',
  'border-left-color',
  'border-collapse',
  'border-spacing',
  'border-start-start-radius',
  'border-start-end-radius',
  'border-end-start-radius',
  'border-end-end-radius',
  // padding
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'padding-inline',
  'padding-inline-start',
  'padding-inline-end',
  'padding-block',
  'padding-block-start',
  'padding-block-end',
  // width, height
  'width',
  'min-width',
  'max-width',
  'height',
  'min-height',
  'max-height',
  // line-height
  'line-height',
  // text-align
  'text-align',
  'text-align-last',
  // font-family,font-size,font-weight
  'font',
  'font-style',
  'font-variant',
  'font-weight',
  'font-stretch',
  'font-size',
  'font-family',
  'font-display',
  'font-kerning',
  'font-language-override',
  'font-optical-sizing',
  'font-size-adjust',
  'font-synthesis',
  'font-variant-alternates',
  'font-variant-caps',
  'font-variant-east-asian',
  'font-variant-ligatures',
  'font-variant-numeric',
  'font-variant-position',
  'font-variation-settings',
  // background
  'background',
  'background-image',
  'background-position',
  'background-size',
  'background-repeat',
  'background-origin',
  'background-clip',
  'background-attachment',
  'background-color',
  'background-blend-mode',
  'background-position-x',
  'background-position-y',
  // color
  'color',
  'accent-color',
  'print-color-adjust',
  'forced-color-adjust',
  'color-scheme',
  'caret-color',
  // cursor, outline, pointer-events
  'cursor',
  'outline',
  'outline-color',
  'outline-style',
  'outline-width',
  'outline-offset',
  'pointer-events',
  // 其他
  'all',
  'contain',
  'appearance',
  'visibility',
  'content-visibility',
  'paint-order',
  'offset',
  'offset-anchor',
  'offset-distance',
  'offset-path',
  'offset-rotate',
  'grid',
  'grid-template-rows',
  'grid-template-columns',
  'grid-template-areas',
  'grid-auto-rows',
  'grid-auto-columns',
  'grid-auto-flow',
  'column-gap',
  'row-gap',
  'grid-area',
  'grid-row',
  'grid-row-start',
  'grid-row-end',
  'grid-column',
  'grid-column-start',
  'grid-column-end',
  'grid-template',
  'justify-items',
  'justify-self',
  'box-decoration-break',
  'place-content',
  'place-items',
  'place-self',
  'aspect-ratio',
  '-webkit-line-clamp',
  'inline-size',
  'min-inline-size',
  'max-inline-size',
  'block-size',
  'min-block-size',
  'max-block-size',
  'inset',
  'inset-block',
  'inset-block-end',
  'inset-block-start',
  'inset-inline',
  'inset-inline-end',
  'inset-inline-start',
  'float',
  'clear',
  'overflow',
  'overflow-anchor',
  'overflow-block',
  'overflow-inline',
  'overflow-x',
  'overflow-y',
  'overscroll-behavior',
  'overscroll-behavior-block',
  'overscroll-behavior-inline',
  'overscroll-behavior-x',
  'overscroll-behavior-y',
  'orphans',
  'gap',
  'columns',
  'column-fill',
  'column-rule',
  'column-rule-color',
  'column-rule-style',
  'column-rule-width',
  'column-span',
  'column-count',
  'column-width',
  'object-fit',
  'object-position',
  'transform',
  'transform-box',
  'transform-origin',
  'transform-style',
  'translate',
  'rotate',
  'scale',
  'backdrop-filter',
  'backface-visibility',
  'box-shadow',
  'isolation',
  'content',
  'quotes',
  'hanging-punctuation',
  'src',
  'size-adjust',
  'ascent-override',
  'descent-override',
  'line-gap-override',
  'hyphens',
  'hyphenate-character',
  'letter-spacing',
  'line-break',
  'list-style',
  'list-style-image',
  'list-style-position',
  'list-style-type',
  'direction',
  'text-decoration',
  'text-decoration-line',
  'text-decoration-style',
  'text-decoration-color',
  'text-decoration-thickness',
  'text-decoration-skip-ink',
  'text-emphasis',
  'text-emphasis-style',
  'text-emphasis-color',
  'text-emphasis-position',
  'text-indent',
  'text-justify',
  'text-underline-position',
  'text-underline-offset',
  'text-orientation',
  'text-overflow',
  'text-shadow',
  'text-transform',
  'vertical-align',
  'white-space',
  'word-break',
  'word-spacing',
  'overflow-wrap',
  'animation',
  'animation-duration',
  'animation-timing-function',
  'animation-delay',
  'animation-iteration-count',
  'animation-direction',
  'animation-fill-mode',
  'animation-play-state',
  'animation-name',
  'mix-blend-mode',
  'break-before',
  'break-after',
  'break-inside',
  'page',
  'page-break-before',
  'page-break-after',
  'page-break-inside',
  'caption-side',
  'clip-path',
  'counter-increment',
  'counter-reset',
  'counter-set',
  'empty-cells',
  'filter',
  'image-rendering',
  'mask',
  'mask-border',
  'mask-border-outset',
  'mask-border-repeat',
  'mask-border-slice',
  'mask-border-source',
  'mask-border-width',
  'mask-clip',
  'mask-composite',
  'mask-image',
  'mask-mode',
  'mask-origin',
  'mask-position',
  'mask-repeat',
  'mask-size',
  'mask-type',
  'opacity',
  'perspective',
  'perspective-origin',
  'resize',
  'scroll-behavior',
  'scroll-margin',
  'scroll-margin-block',
  'scroll-margin-block-end',
  'scroll-margin-block-start',
  'scroll-margin-bottom',
  'scroll-margin-inline',
  'scroll-margin-inline-end',
  'scroll-margin-inline-start',
  'scroll-margin-left',
  'scroll-margin-right',
  'scroll-margin-top',
  'scroll-padding',
  'scroll-padding-block',
  'scroll-padding-block-end',
  'scroll-padding-block-start',
  'scroll-padding-bottom',
  'scroll-padding-inline',
  'scroll-padding-inline-end',
  'scroll-padding-inline-start',
  'scroll-padding-left',
  'scroll-padding-right',
  'scroll-padding-top',
  'scroll-snap-align',
  'scroll-snap-stop',
  'scroll-snap-type',
  'scrollbar-color',
  'scrollbar-gutter',
  'scrollbar-width',
  'shape-image-threshold',
  'shape-margin',
  'shape-outside',
  'tab-size',
  'table-layout',
  'ruby-position',
  'text-combine-upright',
  'touch-action',
  'transition',
  'transition-delay',
  'transition-duration',
  'transition-property',
  'transition-timing-function',
  'will-change',
  'unicode-bidi',
  'unicode-range',
  'user-select',
  'widows',
  'writing-mode',
];
