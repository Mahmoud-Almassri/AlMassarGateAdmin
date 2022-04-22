
export interface NavItem {
  displayName: string;
  disabled?: boolean;
  //iconName: string;
  route: string;
  icon: string;
  children?: NavItem[];
}
export class BaseModel {
  id: number;
  name: string;
}








