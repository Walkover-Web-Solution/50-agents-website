// Picks a use case's product view from its content file: one per kind, each drawn from the 50agents app's own screens.
import type { ProductView as View } from '../types';
import { InvoicesDesk } from './invoices';
import { Desk } from './desk';
import { AgentPage } from './agent';
import { AutomationPage } from './automation';
import { BrowserPage } from './browser';

export function ProductView({ view }: { view: View }) {
  switch (view.type) {
    case 'invoices': return <InvoicesDesk />;
    case 'desk': return <Desk d={view.desk} />;
    case 'agent': return <AgentPage a={view.agent} />;
    case 'automation': return <AutomationPage a={view.automation} />;
    case 'browser': return <BrowserPage a={view.browser} />;
  }
}
