// Member Dashboard Models
export interface ContributionCard {
  title: string;
  amount: number;
  type: 'thrif' | 'special_savings' | 'share';
}

export interface ContributionsResponse {
  cards: ContributionCard[];
}

export interface TotalContributionCard {
  title: string;
  amount: number;
  type: 'share' | 'thrif' | 'savings';
}

export interface TotalContributionsResponse {
  cards: TotalContributionCard[];
  lastUpdated: string | null;
}

export interface LoanProgress {
  percentage: number;
  timeProgress: number;
  monthsRemaining: number;
  startDate: string | null;
  endDate: string | null;
}

export interface OutstandingLoanCard {
  title: string;
  amount: number;
  type: 'balance' | 'essential' | 'fixed_asset' | 'layya' | 'soft_loan' | 'watanda' | 'total';
  progress?: LoanProgress;
}

export interface OutstandingLoansResponse {
  cards: OutstandingLoanCard[];
}

export interface DeductionModule {
  share: number;
  thrif: number;
  savings: number;
  softloan: number;
  fixedAsset: number;
  essential: number;
  layya: number;
  watanda: number;
  refund: number;
  other: number;
  formFee: number;
}

export interface DeductionHistoryItem {
  month: string;
  date: string;
  modules: DeductionModule;
  total: number;
}

export interface DeductionHistoryResponse {
  history: DeductionHistoryItem[];
  summary: {
    totalMonths: number;
    totalAmount: number;
  };
}

export interface ChartDataItem {
  name: string;
  value: number;
  type: string;
}

export interface ContributionsChartResponse {
  data: ChartDataItem[];
  total: number;
}

export interface TotalContributionsChartResponse {
  data: ChartDataItem[];
  total: number;
  lastUpdated: string | null;
}

