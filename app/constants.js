import browser from 'bowser';

const Menu = {
  Links: [
    {
      title: 'Other Page',
      alt: 'Other Page',
      route: '#!/other',
      menu: true
    }
  ]
};

const GLOBAL = {
  isMobile: browser.mobile,
  isTablet: browser.tablet
};

const HEADER = {
  project: 'Project Name'
};

const FOOTER = {
  copyright: 'Some Copyright Text',
  contact: 'Some Contact <a href="mailto:user@domain.com" title="Email address">user@domain.com</a>'
};
export default {
  Menu,
  FOOTER,
  GLOBAL,
  HEADER
};
