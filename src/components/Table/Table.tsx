import React from "react";
import "./Table.css";

interface Column {
  key: string;
  label: string;
}

interface TableProps<T> {
  columns: Column[];
  data: T[];
  actions?: (row: T) => React.ReactNode;
}

function Table<T extends { id: number }>({ columns, data, actions }: TableProps<T>) {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.key}>{(row as any)[col.key]}</td>
              ))}
              {actions && <td>{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
