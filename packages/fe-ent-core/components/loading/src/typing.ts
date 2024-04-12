export interface LoadingProps {
  tip: string;
  size: 'small' | 'medium' | 'large' | number;
  absolute: boolean;
  loading: boolean;
  background: string;
  theme: 'dark' | 'light';
}
