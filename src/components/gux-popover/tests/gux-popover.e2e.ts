import { newE2EPage } from '@stencil/core/testing';

describe('gux-popover', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-popover></gux-popover>');
    const element = await page.find('gux-popover');
    expect(element).toHaveClass('hydrated');
  });

  it('Should trigger close event on popover cancel button click', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-popover></gux-popover>');
    const component = await page.find('gux-popover');
    const close = await component.spyOnEvent('close');
    const button = await page.find('.close');
    await button.click();
    expect(close).toHaveReceivedEvent();
  });

  it('Supports hiding the close button', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-popover></gux-popover>');
    const component = await page.find('gux-popover');
    component.setProperty('hideClose', true);
    await page.waitForChanges();
    const button = await page.find('.close');
    expect(button).toBeNull();
  });
});