import { select } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { html, render } from 'lit-html';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module).add(
  'Panel Frame',
  withReadme(README, () => {
    const el = document.createElement('div');
    render(
      html`
        <style>
          gux-panel-frame > div {
            width: 300px;
          }
        </style>
        <gux-panel-frame>
          <div slot="header">
            <div
              style="display: flex; justify-content: flex-end; align-items: center"
            >
              <h2 style="margin-right: auto">Find Events</h2>
            </div>
          </div>
          <div slot="body">
            <div style="display: flex; flex-direction: column">
              <gux-text-label label="Event Name">
                <gux-text-field></gux-text-field>
              </gux-text-label>
              <gux-rating></gux-rating>
              <gux-text-label label="Comment">
                <gux-text-field></gux-text-field>
              </gux-text-label>
              <gux-toggle></gux-toggle>
            </div>
          </div>
          <div slot="footer">
            <div style="display: flex; justify-content: space-between">
              <gux-button>Close</gux-button>
              <gux-button accent="primary">Accept</gux-button>
            </div>
          </div>
        </gux-panel-frame>
      `,
      el
    );
    document.getElementsByTagName('html')[0].className =
      'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
    return el;
  })
);