import { Extension } from '@tiptap/core';

export interface LineSpacingOptions {
  types: string[];
  spacings: number[];
  defaultSpacing: number;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    lineSpacing: {
      setLineSpacing: (spacing: number) => ReturnType;
      unsetLineSpacing: () => ReturnType;
    };
  }
}

export const LineSpacing = Extension.create<LineSpacingOptions>({
  name: 'lineSpacing',

  addOptions() {
    return {
      types: ['paragraph', 'heading'],
      spacings: [1.5, 1.8, 2.0, 2.5],
      defaultSpacing: 1.8,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineSpacing: {
            default: this.options.defaultSpacing,
            parseHTML: (element) => {
              const lineHeight = element.style.lineHeight;
              return lineHeight ? parseFloat(lineHeight) : this.options.defaultSpacing;
            },
            renderHTML: (attributes) => {
              if (!attributes.lineSpacing) {
                return {};
              }
              return {
                style: `line-height: ${attributes.lineSpacing}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setLineSpacing:
        (spacing: number) =>
        ({ chain }) => {
          return chain()
            .updateAttributes('paragraph', { lineSpacing: spacing })
            .updateAttributes('heading', { lineSpacing: spacing })
            .run();
        },
      unsetLineSpacing:
        () =>
        ({ chain }) => {
          return chain()
            .resetAttributes('paragraph', 'lineSpacing')
            .resetAttributes('heading', 'lineSpacing')
            .run();
        },
    };
  },
});
