'use client';
import { Assistant } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(localizedFormat);

// Extend Window interface to include Viasocket methods
declare global {
  interface Window {
    openViasocket?: (flowId?: string, config?: any) => void;
    handleclose?: () => void;
  }
}

/**
 * Updates the locale for the dayjs instance.
 * @param {string} locale - The locale to update.
 */
dayjs.updateLocale('en', {
  relativeTime: {
    future: (str: string) => (str === 'Just now' ? str : `in ${str}`),
    past: (str: string) => (str === 'Just now' ? str : `${str} ago`),
    s: 'Just now',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    w: '1w',
    ww: '%dw',
    M: '1mo',
    MM: '%dmo',
    y: '1y',
    yy: '%dy',
  },
});

export const formatTime = (value: any, format: string) => {
  if (!value) {
    return format === 'hrMinSec' ? '0 hr 0 min 0 sec' : '';
  }

  const timeToken = value;

  switch (format) {
    case 'longDate': {
      if (
        dayjs(timeToken).date() === dayjs().date() &&
        dayjs(timeToken).month() === dayjs().month() &&
        dayjs(timeToken).year() === dayjs().year()
      ) {
        return 'Today';
      } else if (
        dayjs(timeToken).date() === dayjs().date() - 1 &&
        dayjs(timeToken).month() === dayjs().month() &&
        dayjs(timeToken).year() === dayjs().year()
      ) {
        return 'Yesterday';
      }
      return dayjs(timeToken).format('LL');
    }
    case 'longtime': {
      return dayjs(timeToken).format('hh:mm a z');
    }
    case 'shortDate': {
      if (
        dayjs(timeToken).date() === dayjs().date() &&
        dayjs(timeToken).month() === dayjs().month() &&
        dayjs(timeToken).year() === dayjs().year()
      ) {
        return 'Today';
      } else if (
        dayjs(timeToken).date() === dayjs().date() - 1 &&
        dayjs(timeToken).month() === dayjs().month() &&
        dayjs(timeToken).year() === dayjs().year()
      ) {
        return 'Yesterday';
      }
      return dayjs(timeToken).format('DD MMM, YYYY');
    }
    case 'shortTime': {
      return dayjs(timeToken).format('hh:mm A');
    }
    case 'timeAgo': {
      return dayjs(timeToken).fromNow();
    }
    case 'hrMinSec': {
      if (value < 60) return value + ' Seconds';

      const h = Math.floor(value / 3600);
      const m = Math.floor((value % 3600) / 60);
      const s = Math.floor((value % 3600) % 60);

      let str = '0 hr 0 min 0 sec';

      if (h > 0) {
        str = h + ' hr';
        if (m > 0) str += ' ' + m + ' min';
        if (s > 0) str += ' ' + s + ' sec';
      } else if (m > 0) {
        str = m + ' min';
        if (s > 0) str += ' ' + s + ' sec';
      }

      return str;
    }
    default: {
      return dayjs(timeToken).fromNow();
    }
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAvatar(name: string): string {
  return `https://ui-avatars.com/api/?name=${name.trim()}`;
}

export function getThreadId(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  const url = new URL(window.location.href);
  const path = url.pathname;
  const pathSegments = path?.split('/');
  return pathSegments[1] === 'org' ? pathSegments[2] : pathSegments[1];
}

export function generateRandomId(): string {
  return Math.floor(Date.now() / 1000)?.toString();
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export function isTheAssistantEditable(assistant?: Assistant, userId?: string) {
  return userId && assistant && (userId === assistant?.createdBy || assistant?.editors?.some(ed => ed._id === userId));
}

export const openViasocketEmbed = (
  embedToken: string | undefined,
  source: string,
  flowId?: string,
  templateId?: string,
  configurationJson?: any
) => {
  if (!embedToken) return;
  const secondParameterJson = {
    meta: {
      source: source,
    },
    ...(templateId && { templateId: templateId }),
    embedToken: embedToken,
    ...(configurationJson && { configurationJson: configurationJson }),
  };
  if (window.openViasocket) {
    window.openViasocket(flowId, secondParameterJson);
  }
};

export const handleCloseVisocketEmbed = () => {
  try {
    if (window?.handleclose) {
      window.handleclose?.();
    }
  } catch (error) {
    console.log('Error closing Viasocket embed:', error);
  }
};

export const openMeetingAgentsPanel = () => {
  const url = new URL(window.location.href);
  url.searchParams.set('configure-meeting-agents', 'true');
  window.history.pushState({}, '', url.toString());
};

export const closeMeetingAgentsPanel = () => {
  const url = new URL(window.location.href);
  url.searchParams.delete('configure-meeting-agents');
  window.history.pushState({}, '', url.toString());
};

export const storCurrentUrl = () => {
  const currentUrl = window.location.pathname + window.location.search;
  localStorage.setItem('redirectAfterLogin', currentUrl);
};

interface ErrorMessageParams {
  error: any;
  pageUrl: string;
  source: string;
}

export const sendErrorMessage = ({ error, pageUrl, source }: ErrorMessageParams) => {
  // Log error details for debugging
  console.error('API Error Details:', {
    error: error?.response?.data || error.message || error,
    pageUrl,
    source,
    timestamp: new Date().toISOString(),
  });
};
