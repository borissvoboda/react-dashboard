export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof users
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof users;
  label: string;
  numeric: boolean;
}

interface users {
  id: number;
  firstName: string;
  lastName: string;
}
