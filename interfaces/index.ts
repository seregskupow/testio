import { ReactNode } from 'react';
export interface PageComponent<T = any> extends React.FC<T> {
  Layout: React.FC;
}
