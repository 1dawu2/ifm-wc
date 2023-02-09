import { newSpecPage } from '@stencil/core/testing';
import { IFMStories } from './ifm-stories';

describe('ifm-stories', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [IFMStories],
      html: '<ifm-stories></ifm-stories>',
    });
    expect(root).toEqualHtml(`
      <ifm-stories>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </ifm-stories>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [IFMStories],
      html: `<ifm-stories first="Stencil" last="'Don't call me a framework' JS"></ifm-stories>`,
    });
    expect(root).toEqualHtml(`
      <ifm-stories first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </ifm-stories>
    `);
  });
});
