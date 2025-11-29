export type AppItem = {
  pluginData: string;
  userData: {
    id: string;
  };
  _id: string;
};

export type OrgAgentMap = Record<string, string>;

export type User = {
  _id: string;
  proxyId: string;
  channelId: string;
  name: string;
  appList: AppItem[];
  createdAt: string;
  updatedAt: string;
  agent: string;
  aiModel: string;
  aiService: string;
  prompt: string;
  email: string;
  orgAgentMap: OrgAgentMap;
  avatar: string;
};

export type Message = {
  id: string;
  content: string;
  timestamp: Date | string;
  isUser: boolean;
  loading?: boolean;
  metadata?: any;
};

export type editor = {
  _id: string;
  name: string;
};
export type DiaryEntry = {
  content: string;
  heading: string;
  privacy: 'private' | 'public' | 'thread';
};
export type Assistant = {
  _id: string;
  name: string;
  logo: string;
  createdBy: string;
  instructions?: string;
  diary?: {
    [key: string]: DiaryEntry;
  };
  llm?: {
    model: string;
  };
  editors?: editor[];
  unread: number;
  ownerName: string;
  slugName?: string;
  is_template?: boolean;
};
export type metadata = {
  status: 'loaded' | 'deleted' | 'chunked' | 'error';
  message?: string;
};
export type Resource = {
  _id: string;
  agentId: string;
  content: string;
  createdAt: Date;
  createdBy: string;
  public: boolean;
  title: string;
  updatedAt: Date;
  url: string;
  metadata?: metadata;
};

export type Thread = {
  id: string;
  name: string;
  uid: string;
  assistantId: string;
  unread: number;
};
export type ThreadFromBackend = {
  _id: string;
  name: string;
  createdBy: string;
  agent: string;
  unread: number;
};

export type ViasocketFlow = {
  status: 'deleted' | 'active' | 'paused' | 'drafted' | 'published';
  title: 'string';
  id: 'string';
  serviceIcons?: string[];
};
export type Tool = {
  _id: string;
  name: string;
  description: string;
  url: string;
  agentId: string;
  createdBy: string;
  actions: any[];
  status: string;
  privacy: string;
  serviceIcons?: string[];
};

export type dbDashAgentIdea = {
  rowid: string;
  agentname: string;
  logo: string;
  createdby: string;
  agentinstructions: string;
};
export type Org = any;

export type Company = {
  id: number;
  name: string;
  company_uname: string;
  mobile: string | null;
  email: string;
  feature_configuration_id: number;
  meta: any; // Adjust if meta has a specific structure
  created_at: Date;
  updated_at: Date;
  timezone: string;
  is_block: boolean;
  created_by: number;
  is_readable: boolean;
};

export type proxyUser = {
  id: number;
  name: string;
  mobile: string | null;
  email: string;
  client_id: number;
  meta: any; // Adjust if meta has a specific structure
  created_at: Date;
  updated_at: Date;
  is_block: boolean;
  feature_configuration_id: number;
  is_password_verified: number;
  c_companies: Company[];
  currentCompany: Company;
};
export type member = any;
