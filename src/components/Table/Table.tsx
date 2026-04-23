import React from "react";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface CommonTableProps {
  columns: Column[];
  data: Record<string, any>[];
  actions?: (row: any) => React.ReactNode;
  tableClassName?: string; 
}

const CommonTable: React.FC<CommonTableProps> = ({ columns, data, actions, tableClassName }) => {
  return (
    <div className="table-wrapper">
      <table className={`common-table w-full ${tableClassName || ""}`.trim()}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, i) => (
              <tr key={i}>
                {columns.map((col) => {
                  const value = row[col.key];
                  return (
                    <td key={col.key}>
                      {col.render ? col.render(value, row) : value}
                    </td>
                  );
                })}
                {actions && <td><div className="action-group">{actions(row)}</div></td>}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} style={{ textAlign: "center", padding: "12px" }}>
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;
